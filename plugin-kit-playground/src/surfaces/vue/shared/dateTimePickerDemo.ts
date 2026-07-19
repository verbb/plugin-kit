import { defineComponent, h, ref } from 'vue';

import { DatePicker, TimePicker } from '@verbb/plugin-kit-vue/components';

function pad2(value: string | number): string {
    return String(value).padStart(2, '0');
}

function formatDateTimeValue(date: string, time: string): string {
    if (!date) {
        return '';
    }

    const [hour = '00', minute = '00'] = (time || '00:00').split(':');
    return `${date} ${pad2(hour)}:${pad2(minute)}:00`;
}

/** Shared date + time picker row used by date-picker and time-picker playground sections. */
export const DateTimePickerDemo = defineComponent({
    name: 'DateTimePickerDemo',
    props: {
        date: { type: String, default: '2026-05-20' },
        time: { type: String, default: '09:00' },
        datePlaceholder: { type: String, default: 'Pick a date' },
        timePlaceholder: { type: String, default: 'Select time' },
    },
    setup(props) {
        const date = ref(props.date);
        const time = ref(props.time);

        return () => {
            const combined = formatDateTimeValue(date.value, time.value);

            return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.25rem' } }, [
                h('div', {
                    style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        alignItems: 'center',
                    },
                }, [
                    h(DatePicker, {
                        value: date.value,
                        placeholder: props.datePlaceholder,
                        onChange: (event: Event) => {
                            date.value = (event.target as { value: string }).value;
                        },
                    }),
                    h(TimePicker, {
                        value: time.value,
                        placeholder: props.timePlaceholder,
                        onChange: (event: Event) => {
                            time.value = (event.target as { value: string }).value;
                        },
                    }),
                ]),
                h(
                    'div',
                    {
                        class: 'pg-demo-output',
                        style: { fontSize: '11px', color: 'var(--pk-color-gray-500)' },
                    },
                    [
                        'Date: ',
                        h('code', date.value || '(empty)'),
                        ' · Time: ',
                        h('code', time.value || '(empty)'),
                        ' · Value: ',
                        h('code', combined || '(empty)'),
                    ],
                ),
            ]);
        };
    },
});
