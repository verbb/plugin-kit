import { getErrorMessage, type ErrorContent } from './forms.js';

export type ConnectStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export type ConnectLabels = {
    connected: string;
    notConnected: string;
    connecting: string;
    error: string;
    connect: string;
    refresh: string;
    saveToConnect: string;
    errorHeading: string;
    genericError: string;
    showDetails: string;
    hideDetails: string;
};

export type BuildConnectPayloadOptions = {
    /** POST key for the record id (`sourceId` for Metrix/VP, `id` for Formie). */
    idParam?: string;
    sourceId?: number | string | null;
    type?: string | null;
    /** When true (default), include `types[{type}][…]` fields from the form. */
    includeTypeNamespace?: boolean;
    /** Extra top-level keys to copy from serialized form values. */
    extraKeys?: string[];
};

/**
 * Craft CP globals used by connect helpers.
 * Kept as a local cast type — never `declare global` on Window — so importing
 * this module does not conflict with consumer Window.$ / Craft typings.
 */
type CraftCpWindow = Window & {
    Craft?: {
        csrfTokenName?: string;
        escapeHtml?: (value: string) => string;
        sendActionRequest?: <T = unknown>(
            method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
            action: string,
            config?: { data?: Record<string, unknown> },
        ) => Promise<T>;
        submitForm?: (
            $form: unknown,
            options: {
                action?: string;
                redirect?: string;
                params?: Record<string, string>;
                confirm?: string;
            },
        ) => void;
    };
    $?: (el: Element) => unknown;
};

const craftWindow = (): CraftCpWindow => window as CraftCpWindow;

const DEFAULT_FORM_SELECTOR = '#main-form';

type ResolveCpFormOptions = {
    formSelector?: string;
    /** Nearest ancestor `<form>` is used when the explicit selector misses. */
    host?: Element | null;
};

const resolveCpForm = ({
    formSelector = DEFAULT_FORM_SELECTOR,
    host,
}: ResolveCpFormOptions = {}): HTMLFormElement | null => {
    if (formSelector) {
        const explicit = document.querySelector<HTMLFormElement>(formSelector);

        if (explicit) {
            return explicit;
        }
    }

    const hostForm = host?.closest('form') ?? null;

    if (hostForm) {
        return hostForm;
    }

    return document.querySelector<HTMLFormElement>(DEFAULT_FORM_SELECTOR)
        ?? document.getElementById('main') as HTMLFormElement | null;
};

/** Escape text for CP dialog markup; prefers `Craft.escapeHtml` when available. */
export const escapeCpHtml = (value: string): string => {
    const craft = craftWindow().Craft;

    if (craft?.escapeHtml) {
        return craft.escapeHtml(value);
    }

    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};

/** POST a credentials connect/check controller action from the CP. */
export const sendCpConnectRequest = (
    action: string,
    data: Record<string, unknown>,
): Promise<{ data?: { success?: boolean; message?: string } }> => {
    const craft = craftWindow().Craft;

    if (!craft?.sendActionRequest) {
        return Promise.reject(new Error('Craft.sendActionRequest is unavailable.'));
    }

    return craft.sendActionRequest('POST', action, { data });
};

/**
 * Serialize named CP form controls into a flat key → value map.
 * Mirrors Video Picker / Formie connect payloads (name attribute only).
 */
export const serializeCpForm = (
    formSelector: string = DEFAULT_FORM_SELECTOR,
    host?: Element | null,
): Record<string, string> => {
    const form = resolveCpForm({ formSelector, host });

    if (!form) {
        return {};
    }

    const values: Record<string, string> = {};

    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input, select, textarea',
    ).forEach((input) => {
        const name = input.getAttribute('name');

        if (name) {
            values[name] = input.value;
        }
    });

    return values;
};

/**
 * Build the POST body for check-connection controller actions from serialized form values.
 */
export const buildConnectPayload = (
    values: Record<string, string>,
    options: BuildConnectPayloadOptions = {},
): Record<string, unknown> => {
    const includeTypeNamespace = options.includeTypeNamespace !== false;
    const type = values.type || options.type || '';
    const idParam = options.idParam ?? 'sourceId';
    const payload: Record<string, unknown> = {
        type,
    };

    // Resolve id from form fields first, then pk-connect fallback attribute.
    payload[idParam] = values[idParam] ?? values.sourceId ?? values.id ?? options.sourceId;

    const csrfTokenName = typeof window !== 'undefined' ? craftWindow().Craft?.csrfTokenName : undefined;

    if (csrfTokenName && values[csrfTokenName]) {
        payload[csrfTokenName] = values[csrfTokenName];
    }

    if (includeTypeNamespace && type) {
        const prefix = `types[${type}]`;

        Object.keys(values).forEach((key) => {
            if (key.startsWith(prefix)) {
                payload[key] = values[key];
            }
        });
    }

    const extraKeys = options.extraKeys ?? ['name', 'handle', 'enabled'];

    extraKeys.forEach((key) => {
        if (values[key] !== undefined) {
            payload[key] = values[key];
        }
    });

    return payload;
};

/**
 * Normalize Craft AJAX / logical failures into dialog-friendly error content.
 */
export const resolveConnectError = (
    sourceError: unknown,
    labels: Pick<ConnectLabels, 'errorHeading' | 'genericError'>,
): ErrorContent => {
    if (sourceError == null || sourceError === '') {
        return {
            heading: labels.errorHeading,
            text: labels.genericError,
            trace: '',
            traceAsString: '',
            traceAsArray: [],
        };
    }

    if (typeof sourceError === 'string') {
        return {
            heading: labels.errorHeading,
            text: sourceError,
            trace: '',
            traceAsString: '',
            traceAsArray: [],
        };
    }

    // Logical failures from Craft.sendActionRequest `.then()` use `{ data }`, not `{ response.data }`.
    let normalized = sourceError;

    if (
        typeof sourceError === 'object'
        && sourceError !== null
        && 'data' in sourceError
        && !('response' in sourceError)
    ) {
        normalized = {
            response: {
                data: (sourceError as { data: unknown }).data,
                statusText: labels.errorHeading,
            },
        };
    }

    const parsed = getErrorMessage(normalized as Parameters<typeof getErrorMessage>[0]);

    if (parsed.text) {
        return parsed;
    }

    return {
        heading: labels.errorHeading,
        text: labels.genericError,
        trace: '',
        traceAsString: '',
        traceAsArray: [],
    };
};

export type WatchCpFormDirtyOptions = {
    formSelector?: string;
    /** Nearest ancestor `<form>` when the explicit selector misses. */
    host?: Element | null;
    onDirty: () => void;
    onClean?: () => void;
};

export type SubmitCpFormActionOptions = {
    formSelector?: string;
    /** Nearest ancestor `<form>` when the explicit selector misses (read-only mini-forms). */
    host?: Element | null;
    action: string;
    redirect?: string;
    paramName?: string;
    paramValue?: string;
    confirm?: string;
};

/**
 * Submit a Craft CP controller action via the edit form (or host's ancestor form).
 * Mirrors `.formsubmit` / `Craft.submitForm` without requiring a Craft-styled trigger.
 */
export const submitCpFormAction = ({
    formSelector = DEFAULT_FORM_SELECTOR,
    host,
    action,
    redirect,
    paramName,
    paramValue,
    confirm,
}: SubmitCpFormActionOptions): void => {
    const form = resolveCpForm({ formSelector, host });
    const { Craft: craft, $ } = craftWindow();

    if (!form || typeof craft?.submitForm !== 'function' || !$) {
        return;
    }

    const params: Record<string, string> = {};

    if (paramName && paramValue) {
        params[paramName] = paramValue;
    }

    craft.submitForm($(form), {
        action,
        redirect,
        params,
        confirm,
    });
};

/**
 * Watch the main CP edit form for unsaved changes.
 * Returns a cleanup function — use for OAuth rows or custom connect hosts.
 */
export const watchCpFormDirty = ({
    formSelector = DEFAULT_FORM_SELECTOR,
    host,
    onDirty,
    onClean,
}: WatchCpFormDirtyOptions): (() => void) => {
    const form = resolveCpForm({ formSelector, host });

    if (!form) {
        return () => {};
    }

    const initialSnapshot = JSON.stringify(serializeCpForm(formSelector, host));

    const handleChange = () => {
        const isDirty = JSON.stringify(serializeCpForm(formSelector, host)) !== initialSnapshot;

        if (isDirty) {
            onDirty();
        } else {
            onClean?.();
        }
    };

    const inputs = form.querySelectorAll('input, select, textarea');
    const lightswitches = form.querySelectorAll('.lightswitch');

    inputs.forEach((input) => {
        input.addEventListener('input', handleChange);
    });

    lightswitches.forEach((lightswitch) => {
        lightswitch.addEventListener('change', handleChange);
    });

    return () => {
        inputs.forEach((input) => {
            input.removeEventListener('input', handleChange);
        });

        lightswitches.forEach((lightswitch) => {
            lightswitch.removeEventListener('change', handleChange);
        });
    };
};
