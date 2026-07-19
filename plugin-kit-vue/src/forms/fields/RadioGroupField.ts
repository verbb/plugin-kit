import { defineComponent, h, watch, type Component, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { RadioGroupInput } from '../../components/RadioGroupInput.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';
import { useFilteredOptions } from './options.js';

export const RadioGroupField = defineComponent({
    name: 'SchemaRadioGroupField',
    props: {
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
        field: { type: Object as PropType<SchemaNode & { name: string }>, required: true },
    },
    setup(props) {
        const binding = useEngineField(props.form, props.field.name);
        const filteredOptions = useFilteredOptions(props.form, props.field);

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
            default: () => h(RadioGroupInput as Component, {
                name: props.field.name,
                modelValue: binding.value.value,
                options: filteredOptions.value.map((option) => ({
                    value: option.value,
                    label: option.label,
                    disabled: option.disabled,
                })),
                disabled: Boolean(props.field.disabled) || undefined,
                ariaLabel: props.field.label,
                'onUpdate:modelValue': (nextValue: unknown) => {
                    binding.setValue(nextValue);
                    binding.setTouched();
                },
            }),
        });
    },
});
