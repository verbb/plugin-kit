import { defineComponent, h, watch, type Component, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { Option, Select } from '../../components/Select.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';
import { readPkValue } from '../utils.js';
import { useFilteredOptions } from './options.js';

export const SelectField = defineComponent({
    name: 'SchemaSelectField',
    props: {
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
        field: { type: Object as PropType<SchemaNode & { name: string }>, required: true },
    },
    setup(props) {
        const binding = useEngineField(props.form, props.field.name);
        const filteredOptions = useFilteredOptions(props.form, props.field);

        // If conditions hide the selected option, pick the first enabled fallback.
        watch([filteredOptions, binding.value], ([options, value]) => {
            if (value === undefined || value === null || value === '') {
                return;
            }

            const hasCurrentValue = options.some((option) => String(option.value) === String(value));
            if (hasCurrentValue) {
                return;
            }

            const fallback = options.find((option) => option.value !== undefined && option.disabled !== true);
            binding.setValue(fallback ? fallback.value : '');
        }, { immediate: true });

        return () => h(FieldLayout, {
            name: props.field.name,
            label: props.field.label,
            instructions: props.field.instructions as string | undefined,
            warning: props.field.warning as string | undefined,
            required: props.field.required,
            errors: binding.errors.value,
        }, {
            default: () => h(Select as Component, {
                value: binding.value.value ?? '',
                placeholder: props.field.placeholder,
                disabled: props.field.disabled || undefined,
                invalid: binding.isInvalid.value || undefined,
                onPkChange: (event: Event) => {
                    const nextValue = readPkValue(event);
                    const match = filteredOptions.value.find((option) => String(option.value) === String(nextValue));
                    binding.setValue(match ? match.value : nextValue);
                    binding.setTouched();
                },
                onBlur: binding.setTouched,
            }, {
                default: () => filteredOptions.value.map((option) => h(
                    Option as Component,
                    {
                        key: String(option.value),
                        value: String(option.value ?? ''),
                        disabled: option.disabled || undefined,
                    },
                    { default: () => option.label },
                )),
            }),
        });
    },
});
