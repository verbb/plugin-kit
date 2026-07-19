import { defineComponent, h, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { CheckboxSelect } from '../../components/CheckboxSelect.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';
import { readPkValue } from '../utils.js';

export const CheckboxSelectField = defineComponent({
    name: 'SchemaCheckboxSelectField',
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
            default: () => h(CheckboxSelect, {
                options: props.field.options || [],
                value: binding.value.value === undefined || binding.value.value === null ? [] : binding.value.value,
                showAllOption: props.field.showAllOption ?? false,
                allLabel: props.field.allLabel,
                disabled: props.field.disabled || undefined,
                onPkChange: (event: Event) => {
                    binding.setValue(readPkValue(event));
                    binding.setTouched();
                },
            }),
        });
    },
});
