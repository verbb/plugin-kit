import { defineComponent, h, ref, type Component } from 'vue';

import { TimePicker } from '@verbb/plugin-kit-vue/components';

import { DateTimePickerDemo } from '../shared/dateTimePickerDemo.js';
import { DemoValueReadout } from '../shared/sectionHelpers.js';

const TimePickerDemo = defineComponent({
    name: 'TimePickerDemo',
    props: {
        initialValue: { type: String, default: '' },
        placeholder: { type: String, default: undefined },
        disabled: { type: Boolean, default: false },
        invalid: { type: Boolean, default: false },
    },
    setup(props) {
        const value = ref(props.initialValue);

        return () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.25rem' } }, [
            h(TimePicker, {
                value: value.value,
                placeholder: props.placeholder,
                disabled: props.disabled || undefined,
                invalid: props.invalid || undefined,
                onChange: (event: Event) => {
                    value.value = (event.target as { value: string }).value;
                },
            }),
            h(DemoValueReadout, { value: value.value }),
        ]);
    },
});

/** Vue previews — one component per section id from timePickerPlaygroundSpec. */
export const timePickerVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'TimePickerBasicSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(TimePickerDemo, { initialValue: '09:00', placeholder: 'Select time' }),
        ]),
    }),

    dateTimePicker: defineComponent({
        name: 'TimePickerDateTimePickerSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [h(DateTimePickerDemo)]),
    }),

    empty: defineComponent({
        name: 'TimePickerEmptySection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(TimePickerDemo, { placeholder: 'Select time' }),
        ]),
    }),

    states: defineComponent({
        name: 'TimePickerStatesSection',
        setup: () => () => h('div', {
            class: 'pg-demo-narrow',
            style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
        }, [
            h(TimePickerDemo, { initialValue: '14:30', invalid: true }),
            h(TimePickerDemo, { initialValue: '09:00', disabled: true }),
        ]),
    }),
};
