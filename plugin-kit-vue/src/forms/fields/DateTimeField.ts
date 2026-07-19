import { computed, defineComponent, h, type PropType } from 'vue';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { DatePicker } from '../../components/DatePicker.js';
import { TimePicker } from '../../components/TimePicker.js';
import { FieldLayout } from '../Field.js';
import { formatDateTimeParts, parseDateTimeParts } from '../datetime.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';
import { readPkValue } from '../utils.js';

export const DateTimeField = defineComponent({
    name: 'SchemaDateTimeField',
    props: {
        form: { type: Object as PropType<SchemaFormEngineApi>, required: true },
        field: { type: Object as PropType<SchemaNode & { name: string }>, required: true },
    },
    setup(props) {
        const binding = useEngineField(props.form, props.field.name);
        const parts = computed(() => parseDateTimeParts(binding.value.value));

        return () => h(FieldLayout, {
            name: props.field.name,
            label: props.field.label,
            instructions: props.field.instructions as string | undefined,
            warning: props.field.warning as string | undefined,
            required: props.field.required,
            errors: binding.errors.value,
        }, {
            default: () => h('div', { style: { display: 'flex', gap: '0.5rem' } }, [
                h(DatePicker, {
                    value: parts.value.date,
                    invalid: binding.isInvalid.value || undefined,
                    onPkChange: (event: Event) => {
                        binding.setValue(formatDateTimeParts(String(readPkValue(event) ?? ''), parts.value.time));
                        binding.setTouched();
                    },
                }),
                h(TimePicker, {
                    value: parts.value.time,
                    invalid: binding.isInvalid.value || undefined,
                    onPkChange: (event: Event) => {
                        binding.setValue(formatDateTimeParts(parts.value.date, String(readPkValue(event) ?? '')));
                        binding.setTouched();
                    },
                }),
            ]),
        });
    },
});
