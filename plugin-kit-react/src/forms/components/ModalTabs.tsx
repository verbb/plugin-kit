import {
    Fragment,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import { evaluateCondition } from '@verbb/plugin-kit-forms';
import { Icon, Tab, TabPanel, Tabs } from '../../components/index.js';
import { cn } from '../../utils/index.js';
import type { SchemaFormComponentProps } from '../engine/context.js';
import { SchemaEngineContext } from '../engine/context.js';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { schemaSubtreeHasErrors } from './schemaErrors.js';

const ModalTabsErrorsContext = createContext<Record<string, boolean>>({});

export const useModalTabsErrors = () => {
    return useContext(ModalTabsErrorsContext);
};

type ModalTabsRootProps = SchemaFormComponentProps & {
    children?: ReactNode;
    className?: string;
    value?: string;
    defaultValue?: string;
};

type TabHandleMeta = {
    value: string;
    if?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Collect ModalTabsTrigger handles + optional tab-level `if` from schema.
 * O(schema nodes under this ModalTabs) once per schema identity — not nested field visibility.
 */
const collectTabHandles = (node: SchemaNode | undefined): TabHandleMeta[] => {
    if (!node?.children) {
        return [];
    }

    const handles: TabHandleMeta[] = [];

    const visit = (items: unknown): void => {
        if (!Array.isArray(items)) {
            return;
        }

        items.forEach((item) => {
            if (!isRecord(item)) {
                return;
            }

            const child = item as SchemaNode;

            if (child.$cmp === 'ModalTabsTrigger') {
                const value = typeof child.props?.value === 'string'
                    ? child.props.value
                    : (typeof (child as { value?: unknown }).value === 'string'
                        ? (child as { value: string }).value
                        : '');

                if (value) {
                    handles.push({
                        value,
                        if: typeof child.if === 'string' ? child.if : undefined,
                    });
                }

                return;
            }

            if (child.children) {
                visit(child.children);
            }
        });
    };

    visit(node.children);

    return handles;
};

/**
 * Schema `$cmp: 'ModalTabs'` — wraps stock `Tabs` `variant="modal"`.
 * Owns tab ↔ schema error mapping (same contract as kit v1 ModalTabs).
 */
const ModalTabs = Object.assign(({
    children,
    schemaNode,
    // Pull schema bookkeeping off before Tabs — even if the renderer strips these,
    // keep the same contract as kit v1 (schemaNode ?? schema for error mapping).
    schema,
    _id: _schemaId,
    _data: _schemaData,
    className,
    value: controlledValue,
    defaultValue = '',
    ...props
}: ModalTabsRootProps & {
    schema?: SchemaNode;
    _id?: string;
    _data?: Record<string, unknown>;
}) => {
    void _schemaId;
    void _schemaData;

    const form = useContext(SchemaEngineContext);
    const node = schemaNode ?? schema;
    const [tabErrors, setTabErrors] = useState<Record<string, boolean>>({});
    const [uncontrolledValue, setUncontrolledValue] = useState(
        () => controlledValue ?? defaultValue ?? '',
    );

    const isControlled = controlledValue !== undefined && controlledValue !== null;
    const resolvedValue = isControlled ? String(controlledValue) : uncontrolledValue;

    // Tab handles + optional `if` — fixed for a given schema node (not recomputed per field).
    const tabHandles = useMemo(() => collectTabHandles(node), [node]);

    const getTabErrors = useCallback(() => {
        const errors: Record<string, boolean> = {};

        if (!node?.children || !form?.getErrorMapFields) {
            return errors;
        }

        const formErrors = form.getErrorMapFields?.() || {};

        Object.values(node.children as Record<string, unknown>).forEach((item) => {
            if (typeof item !== 'object' || item === null || Array.isArray(item)) {
                return;
            }

            const childNode = item as SchemaNode;
            const value = typeof childNode.props?.value === 'string' ? childNode.props.value : '';
            if (childNode.$cmp === 'ModalTabsContent' && value) {
                errors[value] = schemaSubtreeHasErrors(formErrors, childNode.children || []);
            }
        });

        return errors;
    }, [form, node]);

    /** First tab whose tab-level `if` (if any) currently passes. */
    const getFirstVisibleTabValue = useCallback((values: Record<string, unknown>) => {
        for (const handle of tabHandles) {
            if (!handle.if || evaluateCondition(handle.if, values)) {
                return handle.value;
            }
        }

        return tabHandles[0]?.value ?? '';
    }, [tabHandles]);

    const isTabVisible = useCallback((tabValue: string, values: Record<string, unknown>) => {
        const handle = tabHandles.find((item) => item.value === tabValue);

        if (!handle) {
            return false;
        }

        if (!handle.if) {
            return true;
        }

        return evaluateCondition(handle.if, values);
    }, [tabHandles]);

    useEffect(() => {
        if (!form?.store?.subscribe) {
            setTabErrors(getTabErrors());
            return undefined;
        }

        const update = () => {
            setTabErrors(getTabErrors());

            // Tab-level `if` can hide the active tab (e.g. Name → multi fields).
            // Cheap: only re-eval each tab's own `if` — never walk nested field visibility.
            if (isControlled) {
                return;
            }

            const { values } = form.store.state;
            const formValues = (values && typeof values === 'object')
                ? values as Record<string, unknown>
                : {};

            if (!resolvedValue || isTabVisible(resolvedValue, formValues)) {
                return;
            }

            const next = getFirstVisibleTabValue(formValues);

            if (next && next !== resolvedValue) {
                setUncontrolledValue(next);
            }
        };

        update();
        return form.store.subscribe(update);
    }, [
        form,
        getFirstVisibleTabValue,
        getTabErrors,
        isControlled,
        isTabVisible,
        resolvedValue,
    ]);

    return (
        <ModalTabsErrorsContext.Provider value={tabErrors}>
            <Tabs
                variant="modal"
                value={resolvedValue}
                className={cn('h-full min-h-0', className)}
                {...props}
                onPkChange={(event) => {
                    // Nested inside FormBuilderTabs — stop bubble so pane routing does not navigate away.
                    event.stopPropagation();

                    const detail = (event as CustomEvent<{ value?: string }>).detail;
                    const next = detail?.value;
                    if (typeof next !== 'string' || !next || isControlled) {
                        return;
                    }
                    setUncontrolledValue(next);
                }}
            >
                {children}
            </Tabs>
        </ModalTabsErrorsContext.Provider>
    );
}, { usesSchemaNode: true as const });

function ModalTabsList({ children }: { children?: ReactNode }) {
    // pk-tabs only indexes `pk-tab` nodes on `slot="nav"` — no list wrapper.
    return <Fragment>{children}</Fragment>;
}

function ModalTabsTrigger({
    children,
    value,
    className,
    ...props
}: {
    children?: ReactNode;
    value?: string;
    className?: string;
}) {
    const tabErrors = useModalTabsErrors();
    const hasErrors = Boolean(value && tabErrors[value]);

    return (
        <Tab
            value={value}
            data-has-errors={hasErrors ? 'true' : undefined}
            // Host text-* cannot pierce pk-tab — error color is :host([data-has-errors]) in kit.
            className={className}
            {...props}
            slot="nav"
        >
            {/* Default slot (not status): :has(::slotted(*)) on .status is unreliable across browsers. */}
            <span className="inline-flex items-center gap-1">
                {children}
                {hasErrors ? (
                    <Icon icon="triangle-exclamation" className="block size-3" />
                ) : null}
            </span>
        </Tab>
    );
}

function ModalTabsContent({
    children,
    className,
    ...props
}: {
    children?: ReactNode;
    className?: string;
    value?: string;
}) {
    return (
        <TabPanel className={className} {...props}>
            <div className="grid grid-cols-1 gap-4">
                {children}
            </div>
        </TabPanel>
    );
}

export {
    ModalTabs,
    ModalTabsList,
    ModalTabsTrigger,
    ModalTabsContent,
};
