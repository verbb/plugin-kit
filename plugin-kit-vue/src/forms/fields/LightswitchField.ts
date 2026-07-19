import { defineComponent, h, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { Lightswitch } from '../../components/Lightswitch.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

export const LightswitchField = defineComponent({
    name: 'SchemaLightswitchField',
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
            default: () => h(Lightswitch, {
                checked: Boolean(binding.value.value),
                'aria-label': props.field.label,
                'onUpdate:checked': (checked: boolean) => {
                    binding.setValue(checked);
                },
            }),
        });
    },
});
