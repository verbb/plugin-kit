import {
    defineComponent,
    h,
    inject,
    onBeforeUnmount,
    onMounted,
    provide,
    ref,
    shallowRef,
    type PropType,
    type VNodeChild,
} from 'vue';
import {
    FormStateStore,
    buildGroupedMessage,
    createValidationEngine,
    evaluateCondition,
    normalizeSchema,
} from '@verbb/plugin-kit-forms';
import type { SchemaIndex, SchemaNode, SchemaRenderable } from '@verbb/plugin-kit-forms';

import { Separator } from '../components/Separator.js';
import { getFormComponentRegistry } from './registry.js';
import { SchemaFormFieldNode } from './SchemaFormFieldNode.js';
import type {
    FormValues,
    NestedFormApi,
    SchemaFieldApi,
    SchemaFormEngineApi,
} from './engine/context.js';
import { SchemaEngineContextKey } from './engine/context.js';
import { isRecord, normalizeAttrs, readEventValue } from './utils.js';

type SchemaFormEngineErrors = Record<string, unknown> | { errors?: unknown } | unknown[];

type SchemaFormEngineOptions = {
    schemaIndex: SchemaIndex | null;
    defaultValues?: FormValues;
    errors?: SchemaFormEngineErrors;
    onChange?: (values: Record<string, unknown>, form: SchemaFormEngineApi) => void;
    getConditionContext?: (values: FormValues, field?: SchemaNode) => Record<string, unknown>;
    parentForm?: SchemaFormEngineApi | null;
    parentPath?: string;
};

const normalizeServerErrors = (rawErrors: SchemaFormEngineErrors | undefined): Record<string, string[]> => {
    const normalized: Record<string, string[]> = {};

    if (!rawErrors) {
        return normalized;
    }

    const appendMessages = (path: string, messages: unknown[]) => {
        if (!path) {
            return;
        }

        const nextMessages = messages
            .filter((message) => message !== undefined && message !== null && message !== '')
            .map((message) => String(message));

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

            const isMessageArray = node.every((entry) => typeof entry === 'string');
            if (isMessageArray) {
                appendMessages(path, node);
                return;
            }

            if (!path) {
                node.forEach((entry) => collectErrors(entry, path));
                return;
            }

            node.forEach((entry, index) => {
                collectErrors(entry, `${path}.${index}`);
            });
            return;
        }

        if (!isRecord(node)) {
            return;
        }

        Object.entries(node).forEach(([key, value]) => {
            const nextPath = path ? `${path}.${key}` : key;
            collectErrors(value, nextPath);
        });
    };

    if (Array.isArray(rawErrors)) {
        collectErrors(rawErrors, '');
        return normalized;
    }

    if (isRecord(rawErrors) && 'errors' in rawErrors) {
        collectErrors(rawErrors.errors, '');
        return normalized;
    }

    collectErrors(rawErrors, '');
    return normalized;
};

const createEngineFieldComponent = (formRef: { value: SchemaFormEngineApi | null }) => defineComponent({
    name: 'SchemaEngineField',
    props: {
        name: { type: String, required: true },
    },
    setup(props, { slots }) {
        const version = ref(0);
        let unsubscribe: (() => void) | undefined;

        onMounted(() => {
            unsubscribe = formRef.value?.store.subscribe(() => {
                version.value += 1;
            });
        });
        onBeforeUnmount(() => {
            unsubscribe?.();
        });

        return () => {
            const form = formRef.value;
            if (!form) {
                return null;
            }

            version.value;
            const fieldApi: SchemaFieldApi = {
                state: { value: form.getFieldValue(props.name) },
                handleChange: (valueOrEvent: unknown) => {
                    form.setFieldValue(props.name, readEventValue(valueOrEvent));
                },
                handleBlur: () => {
                    form.store.setTouched(props.name, true);
                },
                errors: form.getErrorMapFields()[props.name] || [],
            };

            return slots.default?.(fieldApi);
        };
    },
});

const buildConditionData = (
    form: SchemaFormEngineApi,
    field: SchemaNode,
    values: FormValues,
): Record<string, unknown> => {
    const scopePath = typeof field._scopePath === 'string' ? field._scopePath : '';
    const scopedValues = scopePath ? form.getFieldValue(scopePath) : null;
    const scopedObject = isRecord(scopedValues) ? scopedValues : {};
    const conditionContext = form.getConditionContext?.(values, field);
    const normalizedConditionContext = isRecord(conditionContext) ? conditionContext : {};
    const fieldData = isRecord(field._data) ? field._data : {};

    return {
        ...values,
        ...scopedObject,
        ...fieldData,
        ...normalizedConditionContext,
    };
};

const renderSchemaItem = (schemaItem: SchemaNode, index: number, form: SchemaFormEngineApi): VNodeChild => {
    const key = typeof schemaItem._id === 'string' ? schemaItem._id : `schema-item-${index}`;

    return h(SchemaItem, { key, field: schemaItem, form }, {
        default: () => h(SchemaRenderer, { schema: schemaItem }),
    });
};

const renderFormField = (schema: SchemaNode, form: SchemaFormEngineApi): VNodeChild => {
    const fieldProps = schema.$field ? { $field: schema.$field, ...schema } : { $field: schema.type, ...schema };
    const { $field, ...props } = fieldProps;
    const fieldType = String($field ?? '');

    return h(SchemaFormFieldNode, {
        fieldType,
        schema,
        field: { ...props },
        form,
    }, {
        default: () => (props.children ? h(SchemaRenderer, { schema: props.children as SchemaRenderable }) : null),
    });
};

const renderHtmlElement = (schema: SchemaNode): VNodeChild => {
    const { $el, children, attrs = {} } = schema;
    const normalizedAttrs = normalizeAttrs(isRecord(attrs) ? attrs : {});

    if (typeof $el !== 'string' || !$el) {
        return null;
    }

    if ($el === 'hr') {
        return h(Separator, normalizedAttrs);
    }

    return h($el, normalizedAttrs, children ? () => h(SchemaRenderer, { schema: children }) : undefined);
};

const renderFormComponent = (schema: SchemaNode): VNodeChild => {
    const {
        $cmp, props = {}, children, ...rest
    } = schema;
    const Component = getFormComponentRegistry()[$cmp as string];

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

    return h(Component, componentProps, {
        default: () => (children ? h(SchemaRenderer, { schema: children as SchemaRenderable }) : null),
    });
};

const SchemaItem = defineComponent({
    name: 'SchemaItem',
    props: {
        field: { type: Object as PropType<SchemaNode>, required: true },
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
    },
    setup(props, { slots }) {
        const shouldShow = ref(true);

        const resolveVisibility = (values: FormValues): boolean => {
            if (!props.field.if) {
                return true;
            }

            return Boolean(evaluateCondition(props.field.if, buildConditionData(props.form, props.field, values)));
        };

        const update = () => {
            shouldShow.value = resolveVisibility(props.form.store.state.values);
        };

        update();
        const unsubscribe = props.form.store.subscribe(update);
        onBeforeUnmount(unsubscribe);

        return () => {
            if (!shouldShow.value) {
                return props.field.hideOnIf ? h('div', { style: { display: 'none' } }, slots.default?.()) : null;
            }

            return slots.default?.();
        };
    },
});

const SchemaRenderer = defineComponent({
    name: 'SchemaRenderer',
    props: {
        schema: { type: null as unknown as PropType<SchemaRenderable>, required: true },
    },
    setup(props) {
        const form = provideAwareForm();

        return () => {
            const schema = props.schema;

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

                    return renderSchemaItem(schemaItem as SchemaNode, index, form);
                });
            }

            if (schema.$field || schema.$cmp === 'Field') {
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
        };
    },
});

const provideAwareForm = (): SchemaFormEngineApi => {
    const form = inject(SchemaEngineContextKey, null);
    if (!form) {
        throw new Error('SchemaRenderer must be used within SchemaFormEngine.');
    }
    return form;
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
    if (!schemaIndex) {
        throw new Error('SchemaFormEngine requires a compiled schemaIndex.');
    }

    const index = {
        ...schemaIndex,
        schema: normalizeSchema(schemaIndex.schema),
    };
    const store = new FormStateStore(defaultValues);
    const validationEngine = createValidationEngine(index, { conditionDataResolver: getConditionContext });
    const labelMap = new Map<string, string>();
    const nestedForms = new Map<string, NestedFormApi>();
    const formRef = shallowRef<SchemaFormEngineApi | null>(null);
    const Field = createEngineFieldComponent(formRef);

    index.fieldEntries.forEach((entry) => {
        if (entry.path) {
            const label = String(entry.field?.label || entry.field?.name || entry.path);
            labelMap.set(entry.path, label);
        }
    });

    let onSubmitHandler: ((value: FormValues) => Promise<void> | void) | null = null;
    let onErrorHandler: ((errors: Record<string, unknown>) => void) | null = null;
    let onSuccessHandler: ((value: FormValues) => void) | null = null;
    let onChangeHandler: ((value: FormValues) => void) | null = onChange
        ? (value) => {
            if (formRef.value) {
                onChange(value, formRef.value);
            }
        }
        : null;

    const validateNestedForms = (): Record<string, string[]> => {
        const nestedErrors: Record<string, string[]> = {};

        nestedForms.forEach((api, path) => {
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

    const getGroupedErrorsForPath = (path: string): string[] => {
        if (!path) {
            return [];
        }

        const currentErrors = store.state.errors || {};
        const rootErrors = currentErrors[path] || [];
        const childKeys = Object.keys(currentErrors).filter((key) => key.startsWith(`${path}.`));

        if (!childKeys.length) {
            return rootErrors;
        }

        const parentLabel = labelMap.get(path);
        const groupedMessages: string[] = [];

        childKeys.forEach((key) => {
            const wildcardPath = key.replace(/\.\d+(?=\.|$)/g, '.*');
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

    const handleSubmit = async (): Promise<void> => {
        const result = validationEngine.validate(store.state.values);
        const errorsMap = result?.fields || {};
        const nestedErrors = validateNestedForms();
        const mergedErrors = { ...errorsMap, ...nestedErrors };

        if (Object.keys(mergedErrors).length > 0) {
            store.setErrors(mergedErrors);
            onErrorHandler?.(mergedErrors);
            return;
        }

        store.clearErrors();
        await onSubmitHandler?.(store.state.values);

        if (parentForm && parentPath) {
            parentForm.setFieldValue(parentPath, store.state.values);
        }

        onSuccessHandler?.(store.state.values);
    };

    const form: SchemaFormEngineApi = {
        schema: index.schema,
        store,
        index,
        Field,
        getFieldValue: (path: string) => store.getValue(path),
        setFieldValue: (path: string, value: unknown) => store.setValue(path, value),
        getErrorMapFields: () => store.state.errors || {},
        SchemaRenderer,
        handleSubmit,
        onChange: (handler) => {
            onChangeHandler = handler;
        },
        onSubmit: (handler) => {
            onSubmitHandler = handler;
        },
        onError: (handler) => {
            onErrorHandler = handler;
        },
        onSuccess: (handler) => {
            onSuccessHandler = handler;
        },
        registerNestedForm: (path, api) => {
            nestedForms.set(path, api);
        },
        unregisterNestedForm: (path) => {
            nestedForms.delete(path);
        },
        getGroupedErrorsForPath,
        getConditionContext: (values, field) => getConditionContext?.(values, field) || {},
    };

    formRef.value = form;

    const unsubscribeChange = store.subscribe(() => {
        onChangeHandler?.(store.state.values);
    });
    onBeforeUnmount(unsubscribeChange);

    const normalized = normalizeServerErrors(errors);
    if (Object.keys(normalized).length) {
        store.setErrors(normalized);
    }

    if (parentForm && parentPath) {
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
            getValues: () => store.state.values,
        };

        parentForm.registerNestedForm(parentPath, nestedApi);
        onBeforeUnmount(() => {
            parentForm.unregisterNestedForm(parentPath);
        });
    }

    return form;
};

export const SchemaFormEngine = defineComponent({
    name: 'SchemaFormEngine',
    props: {
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
        class: { type: null as unknown as PropType<unknown>, default: undefined },
        withoutForm: { type: Boolean, default: false },
    },
    setup(props, { expose }) {
        expose(props.form);
        provide(SchemaEngineContextKey, props.form);

        return () => {
            const content = h(SchemaRenderer, { schema: props.form.schema });

            if (props.withoutForm) {
                return h('div', { class: props.class }, content);
            }

            return h(
                'form',
                {
                    class: props.class,
                    onSubmit: (event: Event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        void props.form.handleSubmit();
                    },
                },
                [
                    content,
                    h('button', {
                        type: 'submit',
                        tabindex: -1,
                        'aria-hidden': 'true',
                        class: 'sr-only',
                    }),
                ],
            );
        };
    },
});
