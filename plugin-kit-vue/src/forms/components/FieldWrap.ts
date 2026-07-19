import { computed, defineComponent, h, onBeforeUnmount, ref, type PropType } from 'vue';
import type { SchemaRenderable } from '@verbb/plugin-kit-forms';

import { FieldLayout } from '../Field.js';
import { useSchemaEngineContext, type SchemaFormComponentProps } from '../engine/context.js';
import { collectSchemaFieldNames } from './schemaErrors.js';

const ATTRIBUTE_MESSAGE_PATTERN = /^(.+?) (cannot be blank\.|must be .+)$/;

const formatWrapperMessage = (message: string, wrapperLabel?: string): string => {
    if (!wrapperLabel) {
        return message;
    }

    const match = String(message).match(ATTRIBUTE_MESSAGE_PATTERN);
    if (match) {
        const [, , suffix] = match;
        return `${wrapperLabel} ${suffix}`;
    }

    return `${wrapperLabel} ${message}`;
};

/**
 * Schema `$cmp: 'FieldWrap'` labels a control cluster and promotes nested errors
 * onto the wrapper, matching the v1/Formie field-wrap contract.
 */
export const FieldWrap = Object.assign(defineComponent({
    name: 'SchemaFieldWrap',
    props: {
        name: { type: String, default: undefined },
        label: { type: String, default: undefined },
        instructions: { type: String, default: undefined },
        required: { type: Boolean, default: false },
        warning: { type: String, default: undefined },
        schemaNode: { type: Object as PropType<SchemaFormComponentProps['schemaNode']>, default: undefined },
    },
    setup(props, { slots }) {
        const form = useSchemaEngineContext();
        const version = ref(0);
        const unsubscribe = form.store.subscribe(() => {
            version.value += 1;
        });

        onBeforeUnmount(unsubscribe);

        const fieldName = computed(() => props.name || props.label || 'field');
        const nestedFieldNames = computed(() => {
            return Array.from(collectSchemaFieldNames((props.schemaNode?.children || []) as SchemaRenderable));
        });
        const errors = computed(() => {
            version.value;

            if (props.name && typeof form.getGroupedErrorsForPath === 'function') {
                return form.getGroupedErrorsForPath(props.name) || [];
            }

            if (!nestedFieldNames.value.length) {
                return [];
            }

            const errorMap = form.getErrorMapFields() || {};
            const groupedErrors: string[] = [];

            nestedFieldNames.value.forEach((fieldPath) => {
                (errorMap[fieldPath] || []).forEach((message) => {
                    groupedErrors.push(formatWrapperMessage(String(message), props.label || props.name || fieldName.value));
                });

                Object.entries(errorMap).forEach(([errorPath, messages]) => {
                    if (!errorPath.startsWith(`${fieldPath}.`)) {
                        return;
                    }

                    (messages || []).forEach((message) => {
                        groupedErrors.push(formatWrapperMessage(String(message), props.label || props.name || fieldName.value));
                    });
                });
            });

            return Array.from(new Set(groupedErrors));
        });

        return () => h(
            FieldLayout,
            {
                name: fieldName.value,
                label: props.label,
                instructions: props.instructions,
                required: props.required,
                warning: props.warning,
                errors: errors.value,
            },
            {
                default: () => h(
                    'div',
                    {
                        'data-pk-field-wrap-controls': '',
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                        },
                    },
                    slots.default?.() ?? [],
                ),
            },
        );
    },
}), { usesSchemaNode: true as const });
