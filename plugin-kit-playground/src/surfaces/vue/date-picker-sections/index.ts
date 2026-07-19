import { defineComponent, h, onMounted, ref, type Component } from 'vue';

import { DatePicker } from '@verbb/plugin-kit-vue/components';

import { DateTimePickerDemo } from '../shared/dateTimePickerDemo.js';
import { DemoValueReadout } from '../shared/sectionHelpers.js';

const DatePickerDemo = defineComponent({
    name: 'DatePickerDemo',
    props: {
        initialValue: { type: String, default: '' },
        label: { type: String, default: undefined },
        placeholder: { type: String, default: undefined },
        required: { type: Boolean, default: false },
        withClear: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        invalid: { type: Boolean, default: false },
        min: { type: String, default: undefined },
        max: { type: String, default: undefined },
        disablePast: { type: Boolean, default: false },
        disableFuture: { type: Boolean, default: false },
        disabledDaysOfWeek: { type: String, default: undefined },
        firstDayOfWeek: { type: String, default: undefined },
        weekdayFormat: { type: String, default: undefined },
        withOutsideDays: { type: Boolean, default: undefined },
        mode: { type: String as () => 'single' | 'range', default: undefined },
        months: { type: String, default: undefined },
        isDateDisabled: { type: Function as () => ((date: Date) => boolean) | undefined, default: undefined },
    },
    setup(props) {
        const value = ref(props.initialValue);
        const pickerRef = ref<HTMLElement & { isDateDisabled?: (date: Date) => boolean } | null>(null);

        onMounted(() => {
            if (props.isDateDisabled && pickerRef.value) {
                pickerRef.value.isDateDisabled = props.isDateDisabled;
            }
        });

        return () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.25rem' } }, [
            h(DatePicker, {
                ref: pickerRef,
                value: value.value,
                label: props.label,
                placeholder: props.placeholder,
                required: props.required || undefined,
                withClear: props.withClear || undefined,
                disabled: props.disabled || undefined,
                invalid: props.invalid || undefined,
                min: props.min,
                max: props.max,
                disablePast: props.disablePast || undefined,
                disableFuture: props.disableFuture || undefined,
                disabledDaysOfWeek: props.disabledDaysOfWeek,
                firstDayOfWeek: props.firstDayOfWeek,
                weekdayFormat: props.weekdayFormat,
                withOutsideDays: props.withOutsideDays,
                mode: props.mode,
                months: props.months,
                onChange: (event: Event) => {
                    value.value = (event.target as { value: string }).value;
                },
            }),
            h(DemoValueReadout, { value: value.value }),
        ]);
    },
});

/** Vue previews — one component per section id from datePickerPlaygroundSpec. */
export const datePickerVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'DatePickerBasicSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(DatePickerDemo, {
                initialValue: '2026-05-20',
                label: 'Event date',
                placeholder: 'Pick a date',
            }),
        ]),
    }),

    dateTimePicker: defineComponent({
        name: 'DatePickerDateTimePickerSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [h(DateTimePickerDemo)]),
    }),

    states: defineComponent({
        name: 'DatePickerStatesSection',
        setup: () => () => h('div', {
            class: 'pg-demo-narrow',
            style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
        }, [
            h(DatePickerDemo, { label: 'Required', required: true, withClear: true, placeholder: 'Required date' }),
            h(DatePickerDemo, { label: 'Invalid', initialValue: '2026-01-15', invalid: true }),
            h(DatePickerDemo, { label: 'Disabled', initialValue: '2026-05-20', disabled: true }),
        ]),
    }),

    constraints: defineComponent({
        name: 'DatePickerConstraintsSection',
        setup: () => () => h('div', {
            class: 'pg-demo-narrow',
            style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
        }, [
            h(DatePickerDemo, { label: 'disable-past', disablePast: true, placeholder: 'Future dates only' }),
            h(DatePickerDemo, { label: 'disable-future', disableFuture: true, placeholder: 'Past dates only' }),
            h(DatePickerDemo, {
                label: 'disabled-days-of-week="sat sun"',
                disabledDaysOfWeek: 'sat sun',
                placeholder: 'Weekdays only',
            }),
            h(DatePickerDemo, {
                label: 'first-day-of-week="mon"',
                firstDayOfWeek: 'mon',
                placeholder: 'Week starts Monday',
            }),
            h(DatePickerDemo, {
                label: 'weekday-format="long"',
                weekdayFormat: 'long',
                placeholder: 'Long weekday headers',
            }),
            h(DatePickerDemo, {
                label: 'without outside days',
                withOutsideDays: false,
                placeholder: 'No adjacent-month days',
            }),
            h(DatePickerDemo, {
                label: 'Bounded range',
                min: '2026-01-01',
                max: '2026-12-31',
                placeholder: 'Within 2026',
            }),
        ]),
    }),

    range: defineComponent({
        name: 'DatePickerRangeSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(DatePickerDemo, {
                label: 'Booking',
                mode: 'range',
                months: '2',
                placeholder: 'Select a range',
            }),
        ]),
    }),

    callbacks: defineComponent({
        name: 'DatePickerCallbacksSection',
        setup() {
            const value = ref('');
            const pickerRef = ref<HTMLElement & { isDateDisabled?: (date: Date) => boolean } | null>(null);

            onMounted(() => {
                if (pickerRef.value) {
                    pickerRef.value.isDateDisabled = (date) => {
                        const day = date.getDay();
                        return day === 0 || day === 6;
                    };
                }
            });

            return () => h('div', { class: 'pg-demo-narrow' }, [
                h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.25rem' } }, [
                    h(DatePicker, {
                        ref: pickerRef,
                        value: value.value,
                        label: 'Weekdays only',
                        placeholder: 'Mon–Fri only',
                        onChange: (event: Event) => {
                            value.value = (event.target as { value: string }).value;
                        },
                    }),
                    h(DemoValueReadout, { value: value.value }),
                ]),
            ]);
        },
    }),
};
