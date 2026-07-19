import { defineComponent, h, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { Input } from '../../components/Input.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

export const NumberField = defineComponent({
    name: 'SchemaNumberField',
    props: {
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
        field: { type: Object as PropType<SchemaNode & { name: string }>, required: true },
    },
    setup(props) {
        const binding = useEngineField(props.form, props.field.name);

        return () => h(FieldLayout, {
            name: props.field.name,
            label: props.field.label,
            instructions: props.field.instructions as string | undefined,
            warning: props.field.warning as string | undefined,
            required: props.field.required,
            errors: binding.errors.value,
        }, {
            default: () => h(Input, {
                type: 'number',
                value: String(binding.value.value ?? ''),
                placeholder: props.field.placeholder,
                disabled: props.field.disabled || undefined,
                invalid: binding.isInvalid.value || undefined,
                style: props.field.size ? { width: `${props.field.size}rem` } : undefined,
                onInput: (event: Event) => {
                    binding.setValue((event.target as { value?: string }).value ?? '');
                },
                onBlur: binding.setTouched,
            }),
        });
    },
});
