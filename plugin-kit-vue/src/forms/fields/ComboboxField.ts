import { defineComponent, h, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { Combobox } from '../../components/Combobox.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';
import { readPkValue } from '../utils.js';

export const ComboboxField = defineComponent({
    name: 'SchemaComboboxField',
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
            default: () => h(Combobox, {
                options: props.field.options,
                fetchOptions: props.field.fetchOptions,
                multiple: props.field.multiple || undefined,
                value: binding.value.value,
                disabled: props.field.disabled || undefined,
                placeholder: props.field.placeholder,
                emptyMessage: props.field.emptyMessage,
                invalid: binding.isInvalid.value || undefined,
                onPkChange: (event: Event) => {
                    binding.setValue(readPkValue(event));
                    binding.setTouched();
                },
            }),
        });
    },
});
