import {
    createContext,
    createElement,
    forwardRef,
    memo,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';

import { evaluateCondition, normalizeAttrs } from '@verbb/plugin-kit-react/utils/schema';
import { getFormComponentRegistry, getFormFieldRegistry } from './registry';

import { FormStateStore } from './engine/FormStateStore';
import { normalizeSchema } from './engine/SchemaIndex';
import type { SchemaIndex, SchemaNode, SchemaRenderable } from './engine/SchemaIndex';
import { createValidationEngine } from './engine/ValidationEngine';
import { buildGroupedMessage } from './engine/buildGroupedMessage';
import type {
    FormValues,
    NestedFormApi,
    SchemaFieldApi,
    SchemaFormEngineApi,
} from './engine/context';
import { SchemaEngineContext } from './engine/context';

type SchemaFormEngineErrors = Record<string, unknown> | { errors?: unknown } | unknown[];

type SchemaFormEngineOptions = {
    schema?: SchemaRenderable;
    schemaIndex: SchemaIndex | null;
    defaultValues?: FormValues;
    errors?: SchemaFormEngineErrors;
    onChange?: (values: Record<string, unknown>, form: SchemaFormEngineApi) => void;
    getConditionContext?: (values: FormValues, field?: SchemaNode) => Record<string, unknown>;
    parentForm?: SchemaFormEngineApi | null;
    parentPath?: string;
};

type SchemaItemProviderProps = {
    children: React.ReactNode;
    [key: string]: unknown;
};

type SchemaItemProps = {
    field: SchemaNode;
    children: React.ReactNode;
};

type SchemaContextValue = {
    form: SchemaFormEngineApi;
    schema: SchemaRenderable;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const hasEventTarget = (value: unknown): value is { target: { type?: string; checked?: boolean; value?: unknown } } => {
    return isRecord(value) && isRecord(value.target);
};

const SchemaContext = createContext<SchemaContextValue | null>(null);
const SchemaItemContext = createContext<Record<string, unknown> | null>(null);

const SchemaItemProvider = ({ children, ...props }: SchemaItemProviderProps) => {
    return (
        <SchemaItemContext.Provider value={props}>
            {children}
        </SchemaItemContext.Provider>
    );
};

const useSchemaContext = () => {
    const context = useContext(SchemaContext);

    if (!context) {
        throw new Error('useSchemaContext must be used within a SchemaProvider');
    }

    return context;
};

const SchemaItem = memo(({ field, children }: SchemaItemProps) => {
    const { form } = useSchemaContext();

    const buildConditionData = useCallback((values: FormValues) => {
        const scopePath = typeof field._scopePath === 'string' ? field._scopePath : '';
        const scopedValues = scopePath ? form?.getFieldValue?.(scopePath) : null;
        const scopedObject = isRecord(scopedValues) ? scopedValues : {};
        const conditionContext = form?.getConditionContext?.(values, field);
        const normalizedConditionContext = isRecord(conditionContext) ? conditionContext : {};
        const fieldData = isRecord(field._data) ? field._data : {};

        return {
            ...values,
            ...scopedObject,
            ...fieldData,
            ...normalizedConditionContext,
        };
    }, [field, form]);

    const resolveVisibility = useCallback((values: FormValues) => {
        if (!field.if) {
            return true;
        }

        return evaluateCondition(field.if, buildConditionData(values));
    }, [buildConditionData, field.if]);

    const [shouldShow, setShouldShow] = useState(() => {
        const initialValues = form?.store?.state?.values;

        if (!initialValues || typeof initialValues !== 'object') {
            return !field.if;
        }

        return resolveVisibility(initialValues);
    });

    useEffect(() => {
        if (!field.if) {
            setShouldShow(true);
            return;
        }

        const initialValues = form?.store?.state?.values;
        if (initialValues && typeof initialValues === 'object') {
            setShouldShow(resolveVisibility(initialValues));
        }

        if (!form?.store?.subscribe) {
            return;
        }

        const unsubscribe = form.store.subscribe(() => {
            const { values } = form.store.state;
            const isVisible = resolveVisibility(values);

            setShouldShow(isVisible);
        });

        return unsubscribe;
    }, [field.if, form, resolveVisibility]);

    if (!shouldShow) {
        return (field.hideOnIf) ? <div style={{ display: 'none' }}>{children}</div> : null;
    }

    return children;
});

SchemaItem.displayName = 'SchemaItem';

/* eslint-disable no-use-before-define */
const renderFormField = (schema: SchemaNode, form: SchemaFormEngineApi) => {
    const fieldProps = schema.$field ? { $field: schema.$field, ...schema } : { $field: schema.type, ...schema };
    const { $field, ...props } = fieldProps;

    const Component = getFormFieldRegistry()[$field];

    if (!Component) {
        console.warn(`Unknown form field type: ${$field}`);
        return null;
    }

    return createElement(Component, {
        schema,
        field: { ...props },
        form,
    }, props.children ? <SchemaRenderer schema={props.children} /> : null);
};

const renderHtmlElement = (schema: SchemaNode) => {
    const { $el, children, attrs = {} } = schema;
    const normalizedAttrs = normalizeAttrs(isRecord(attrs) ? attrs : {});

    if (typeof $el !== 'string' || !$el) {
        return null;
    }

    return createElement($el, { ...normalizedAttrs }, children ? <SchemaRenderer schema={children} /> : null);
};

const renderFormComponent = (schema: SchemaNode) => {
    const {
        $cmp, props = {}, children, ...rest
    } = schema;
    const Component = getFormComponentRegistry()[$cmp];

    if (!Component) {
        console.warn(`Unknown form component: ${$cmp}`);
        return null;
    }

    const componentProps = { ...(isRecord(props) ? props : {}), ...rest } as Record<string, unknown>;
    const usesSchemaNode = Boolean(Component.usesSchemaNode);

    if (usesSchemaNode) {
        componentProps.schemaNode = schema;
    } else if ('schemaNode' in componentProps) {
        delete componentProps.schemaNode;
    }

    return createElement(
        Component,
        componentProps,
        children ? <SchemaRenderer schema={children} /> : null,
    );
};

type SchemaRendererProps = {
    schema: SchemaRenderable;
};

const SchemaRenderer = memo(({ schema }: SchemaRendererProps) => {
    const { form } = useSchemaContext();

    if (typeof schema === 'string') {
        return schema;
    }

    if (Array.isArray(schema)) {
        return schema.map((schemaItem, index) => {
            if (typeof schemaItem === 'string') {
                return schemaItem;
            }

            if (!isRecord(schemaItem)) {
                return null;
            }

            const key = typeof schemaItem._id === 'string' ? schemaItem._id : `schema-item-${index}`;
            return (
                <SchemaItemProvider key={key}>
                    <SchemaItem field={schemaItem}>
                        <SchemaRenderer schema={schemaItem} />
                    </SchemaItem>
                </SchemaItemProvider>
            );
        });
    }

    if (schema.$field || (schema.$cmp === 'Field')) {
        return renderFormField(schema, form);
    }

    if (schema.$el) {
        return renderHtmlElement(schema);
    }

    if (schema.$cmp) {
        return renderFormComponent(schema);
    }

    console.warn('Unknown schema item:', schema);
    return null;
});

SchemaRenderer.displayName = 'SchemaRenderer';
/* eslint-enable no-use-before-define */

const SchemaProvider = ({ children, form }: { children: React.ReactNode; form: SchemaFormEngineApi }) => {
    const contextValue = useMemo(() => {
        return {
            form,
            schema: form.schema,
        };
    }, [form]);

    return (
        <SchemaContext.Provider value={contextValue}>
            {children}
        </SchemaContext.Provider>
    );
};

const normalizeServerErrors = (rawErrors: SchemaFormEngineErrors | undefined) => {
    const normalized: Record<string, string[]> = {};

    if (!rawErrors) {
        return normalized;
    }

    const appendMessages = (path: string, messages: unknown[]) => {
        if (!path) {
            return;
        }

        const nextMessages = messages
            .filter((message) => { return message !== undefined && message !== null && message !== ''; })
            .map((message) => { return String(message); });

        if (!nextMessages.length) {
            return;
        }

        if (!normalized[path]) {
            normalized[path] = [];
        }

        normalized[path].push(...nextMessages);
    };

    const collectErrors = (node: unknown, path: string) => {
        if (Array.isArray(node)) {
            if (node.length === 0) {
                return;
            }

            const isMessageArray = node.every((entry) => { return typeof entry === 'string'; });
            if (isMessageArray) {
                appendMessages(path, node);
                return;
            }

            if (!path) {
                node.forEach((entry) => { collectErrors(entry, path); });
                return;
            }

            node.forEach((entry, index) => {
                collectErrors(entry, `${path}.${index}`);
            });
            return;
        }

        if (!node || typeof node !== 'object') {
            return;
        }

        Object.entries(node as Record<string, unknown>).forEach(([key, value]) => {
            const nextPath = path ? `${path}.${key}` : key;
            collectErrors(value, nextPath);
        });
    };

    if (Array.isArray(rawErrors)) {
        collectErrors(rawErrors, '');
        return normalized;
    }

    if (rawErrors && typeof rawErrors === 'object' && 'errors' in rawErrors) {
        collectErrors((rawErrors as { errors?: unknown }).errors, '');
        return normalized;
    }

    collectErrors(rawErrors, '');
    return normalized;
};

const useStoreSelector = <T,>(
    store: FormStateStore | null | undefined,
    selector: (state: FormStateStore['state'] | null) => T,
    fallbackValue: T,
) => {
    const subscribe = store
        ? store.subscribe.bind(store)
        : (() => {
            return () => {};
        });

    return useSyncExternalStore(
        subscribe,
        () => { return store ? selector(store.state) : fallbackValue; },
        () => { return store ? selector(store.state) : fallbackValue; },
    );
};

const EngineField = ({ name, children }: { name: string; children: (fieldApi: SchemaFieldApi) => React.ReactNode }) => {
    const form = useContext(SchemaEngineContext);
    const store = form?.store ?? null;

    const value = useStoreSelector(
        store,
        () => { return form?.getFieldValue(name); },
        undefined,
    );
    const errors = useStoreSelector(
        store,
        (state) => { return state?.errors[name] || []; },
        [],
    );

    if (!form) {
        return null;
    }

    const fieldApi: SchemaFieldApi = {
        state: { value },
        handleChange: (valueOrEvent: unknown) => {
            if (hasEventTarget(valueOrEvent)) {
                const { type, checked, value: nextValue } = valueOrEvent.target;
                form.setFieldValue(name, type === 'checkbox' ? checked : nextValue);
                return;
            }

            form.setFieldValue(name, valueOrEvent);
        },
        handleBlur: () => {
            form.store.setTouched(name, true);
        },
        errors,
    };

    return children(fieldApi);
};

export const useSchemaFormEngine = ({
    schemaIndex = null,
    defaultValues = {},
    errors,
    onChange,
    getConditionContext,
    parentForm,
    parentPath,
}: SchemaFormEngineOptions): SchemaFormEngineApi => {
    const index = useMemo(() => {
        if (!schemaIndex) {
            throw new Error('SchemaFormEngine requires a compiled schemaIndex.');
        }
        const normalizedSchema = normalizeSchema(schemaIndex.schema);
        return { ...schemaIndex, schema: normalizedSchema };
    }, [schemaIndex]);
    const storeRef = useRef<FormStateStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = new FormStateStore(defaultValues);
    }

    const store = storeRef.current;
    const validationEngine = useMemo(() => {
        return createValidationEngine(index, { conditionDataResolver: getConditionContext });
    }, [index, getConditionContext]);
    const labelMap = useMemo(() => {
        const map = new Map<string, string>();
        index.fieldEntries.forEach((entry) => {
            if (entry.path) {
                const label = String(entry.field?.label || entry.field?.name || entry.path);
                map.set(entry.path, label);
            }
        });
        return map;
    }, [index]);

    const onSubmitHandlerRef = useRef<((value: FormValues) => Promise<void> | void) | null>(null);
    const onErrorHandlerRef = useRef<((errors: Record<string, unknown>) => void) | null>(null);
    const onSuccessHandlerRef = useRef<((value: FormValues) => void) | null>(null);
    const onChangeHandlerRef = useRef<((value: FormValues) => void) | null>(null);
    const formRef = useRef<SchemaFormEngineApi | null>(null);

    const nestedFormsRef = useRef<Map<string, NestedFormApi>>(new Map());

    useEffect(() => {
        if (!onChange) {
            onChangeHandlerRef.current = null;
            return;
        }

        onChangeHandlerRef.current = (value: FormValues) => {
            if (formRef.current) {
                onChange(value, formRef.current);
            }
        };
    }, [onChange]);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            if (onChangeHandlerRef.current) {
                onChangeHandlerRef.current(store.state.values);
            }
        });

        return unsubscribe;
    }, [store]);

    useEffect(() => {
        const normalized = normalizeServerErrors(errors);
        if (Object.keys(normalized).length) {
            store.setErrors(normalized);
        } else {
            store.clearErrors();
        }
    }, [errors, store]);

    const registerNestedForm = (path: string, api: NestedFormApi) => {
        nestedFormsRef.current.set(path, api);
    };

    const unregisterNestedForm = (path: string) => {
        nestedFormsRef.current.delete(path);
    };

    const validateNestedForms = () => {
        const nestedErrors: Record<string, string[]> = {};

        nestedFormsRef.current.forEach((api, path) => {
            const result = api.validate();
            if (result?.fields) {
                Object.entries(result.fields).forEach(([fieldPath, messages]) => {
                    const mergedPath = fieldPath ? `${path}.${fieldPath}` : path;
                    nestedErrors[mergedPath] = messages;
                });
            }
        });

        return nestedErrors;
    };

    const getGroupedErrorsForPath = (path: string) => {
        if (!path) {
            return [];
        }

        const currentErrors = store.state.errors || {};
        const rootErrors = currentErrors[path] || [];
        const childKeys = Object.keys(currentErrors).filter((key) => {
            return key.startsWith(`${path}.`);
        });

        if (!childKeys.length) {
            return rootErrors;
        }

        const parentLabel = labelMap.get(path);
        const groupedMessages: string[] = [];

        childKeys.forEach((key) => {
            const wildcardPath = key.replace(/\\.\\d+(?=\\.|$)/g, '.*');
            const childLabel = labelMap.get(wildcardPath) || key.split('.').slice(-1)[0];
            (currentErrors[key] || []).forEach((message) => {
                if (parentLabel) {
                    groupedMessages.push(buildGroupedMessage(String(message), parentLabel, childLabel));
                    return;
                }

                groupedMessages.push(String(message));
            });
        });

        return Array.from(new Set([...rootErrors, ...groupedMessages]));
    };

    const handleSubmit = async () => {
        const result = validationEngine.validate(store.state.values);
        const errorsMap = result?.fields || {};
        const nestedErrors = validateNestedForms();
        const mergedErrors = { ...errorsMap, ...nestedErrors };

        if (Object.keys(mergedErrors).length > 0) {
            store.setErrors(mergedErrors);
            if (onErrorHandlerRef.current) {
                onErrorHandlerRef.current(mergedErrors);
            }
            return;
        }

        store.clearErrors();

        if (onSubmitHandlerRef.current) {
            await onSubmitHandlerRef.current(store.state.values);
        }

        if (parentForm && parentPath) {
            parentForm.setFieldValue(parentPath, store.state.values);
        }

        if (onSuccessHandlerRef.current) {
            onSuccessHandlerRef.current(store.state.values);
        }
    };

    const form = {
        schema: index.schema,
        store,
        index,
        Field: EngineField,
        getFieldValue: (path: string) => { return store.getValue(path); },
        setFieldValue: (path: string, value: unknown) => { return store.setValue(path, value); },
        getErrorMapFields: () => { return store.state.errors || {}; },
        SchemaRenderer,
        handleSubmit,
        onChange: (handler) => { onChangeHandlerRef.current = handler; },
        onSubmit: (handler) => { onSubmitHandlerRef.current = handler; },
        onError: (handler) => { onErrorHandlerRef.current = handler; },
        onSuccess: (handler) => { onSuccessHandlerRef.current = handler; },
        registerNestedForm,
        unregisterNestedForm,
        getGroupedErrorsForPath,
        getConditionContext: (values: FormValues, field?: SchemaNode) => {
            return getConditionContext?.(values, field) || {};
        },
    } as SchemaFormEngineApi;

    formRef.current = form;

    useEffect(() => {
        if (!parentForm || !parentPath) {
            return;
        }

        const nestedApi: NestedFormApi = {
            path: parentPath,
            validate: () => {
                const result = validationEngine.validate(store.state.values);
                const fieldErrors = result?.fields || {};

                if (Object.keys(fieldErrors).length) {
                    store.setErrors(fieldErrors);
                } else {
                    store.clearErrors();
                }

                return result;
            },
            getValues: () => { return store.state.values; },
        };

        parentForm.registerNestedForm(parentPath, nestedApi);
        return () => {
            parentForm.unregisterNestedForm(parentPath);
        };
    }, [parentForm, parentPath, store, validationEngine]);

    return form;
};

export const SchemaFormEngine = forwardRef(({
    form,
    className,
    withoutForm = false,
}: {
    form: SchemaFormEngineApi;
    className?: string;
    withoutForm?: boolean;
}, ref: React.Ref<SchemaFormEngineApi>) => {
    useImperativeHandle(ref, () => {
        return form;
    });

    if (withoutForm) {
        return (
            <SchemaEngineContext.Provider value={form}>
                <SchemaProvider form={form}>
                    <div className={className}>
                        <SchemaRenderer schema={form.schema} />
                    </div>
                </SchemaProvider>
            </SchemaEngineContext.Provider>
        );
    }

    return (
        <SchemaEngineContext.Provider value={form}>
            <SchemaProvider form={form}>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        form.handleSubmit();
                    }}
                    className={className}
                >
                    <SchemaRenderer schema={form.schema} />
                    <button type="submit" tabIndex={-1} aria-hidden="true" className="sr-only" />
                </form>
            </SchemaProvider>
        </SchemaEngineContext.Provider>
    );
});

SchemaFormEngine.displayName = 'SchemaFormEngine';
