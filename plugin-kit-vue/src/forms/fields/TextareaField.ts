import { defineComponent, h, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { Textarea } from '../../components/Textarea.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

export const TextareaField = defineComponent({
    name: 'SchemaTextareaField',
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
            translatable: props.field.translatable as boolean | undefined,
            errors: binding.errors.value,
        }, {
            default: () => h(Textarea, {
                value: String(binding.value.value ?? ''),
                placeholder: props.field.placeholder,
                disabled: props.field.disabled || undefined,
                invalid: binding.isInvalid.value || undefined,
                rows: props.field.rows,
                onInput: (event: Event) => {
                    binding.setValue((event.target as { value?: string }).value ?? '');
                },
                onBlur: binding.setTouched,
            }),
        });
    },
});
