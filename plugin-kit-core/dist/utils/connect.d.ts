import { ErrorContent } from './forms.js';
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
/** Escape text for CP dialog markup; prefers `Craft.escapeHtml` when available. */
export declare const escapeCpHtml: (value: string) => string;
/** POST a credentials connect/check controller action from the CP. */
export declare const sendCpConnectRequest: (action: string, data: Record<string, unknown>) => Promise<{
    data?: {
        success?: boolean;
        message?: string;
    };
}>;
/**
 * Serialize named CP form controls into a flat key → value map.
 * Mirrors Video Picker / Formie connect payloads (name attribute only).
 */
export declare const serializeCpForm: (formSelector?: string, host?: Element | null) => Record<string, string>;
/**
 * Build the POST body for check-connection controller actions from serialized form values.
 */
export declare const buildConnectPayload: (values: Record<string, string>, options?: BuildConnectPayloadOptions) => Record<string, unknown>;
/**
 * Normalize Craft AJAX / logical failures into dialog-friendly error content.
 */
export declare const resolveConnectError: (sourceError: unknown, labels: Pick<ConnectLabels, "errorHeading" | "genericError">) => ErrorContent;
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
export declare const submitCpFormAction: ({ formSelector, host, action, redirect, paramName, paramValue, confirm, }: SubmitCpFormActionOptions) => void;
/**
 * Watch the main CP edit form for unsaved changes.
 * Returns a cleanup function — use for OAuth rows or custom connect hosts.
 */
export declare const watchCpFormDirty: ({ formSelector, host, onDirty, onClean, }: WatchCpFormDirtyOptions) => (() => void);
//# sourceMappingURL=connect.d.ts.map