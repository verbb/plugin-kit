import { defineComponent, h, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { ColorInput } from '../../components/ColorInput.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';
import { readPkValue } from '../utils.js';

export const ColorField = defineComponent({
    name: 'SchemaColorField',
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
            default: () => h(ColorInput, {
                value: String(binding.value.value || ''),
                disabled: props.field.disabled || undefined,
                invalid: binding.isInvalid.value || undefined,
                onPkChange: (event: Event) => {
                    binding.setValue(readPkValue(event));
                    binding.setTouched();
                },
            }),
        });
    },
});
