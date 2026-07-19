import { defineComponent, h, ref, type Component, type PropType } from 'vue';
import {
    buildCraftCheckboxComparisonHtml,
    buildCraftCheckboxSelectComparisonHtml,
    checkboxCheckedStates,
    checkboxPlaygroundSections,
    checkboxSelectComparisonOptions,
    checkboxSelectPlaygroundSections,
    checkboxUncheckedStates,
} from '@verbb/plugin-kit-playground';

import { Calendar, Checkbox, CheckboxSelect, Field } from '@verbb/plugin-kit-vue/components';

function slugify(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
}

const checkboxGroupDemos = [
    {
        legend: 'Notifications',
        items: [
            { id: 'pg-cb-notify-updates', label: 'Product updates', checked: true },
            { id: 'pg-cb-notify-security', label: 'Security alerts', checked: true },
            { id: 'pg-cb-notify-marketing', label: 'Marketing tips' },
        ],
    },
    {
        legend: 'Preferences',
        items: [
            { id: 'pg-cb-pref-compact', label: 'Compact mode' },
            { id: 'pg-cb-pref-autosave', label: 'Auto-save', checked: true },
            { id: 'pg-cb-pref-offline', label: 'Offline access', disabled: true },
        ],
    },
] as const;

const checkboxSelectDemoOptions = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];

const CalendarValueReadout = defineComponent({
    name: 'CalendarValueReadout',
    props: {
        value: { type: String, required: true },
    },
    setup(props) {
        return () => h(
            'div',
            {
                class: 'pg-demo-output',
                style: { fontSize: '11px', color: 'var(--pk-color-gray-500)' },
            },
            ['Value: ', h('code', props.value || '(empty)')],
        );
    },
});

const CalendarDemo = defineComponent({
    name: 'CalendarDemo',
    props: {
        initialValue: { type: String, required: true },
        caption: { type: String, default: undefined },
        calendarProps: { type: Object as PropType<Record<string, unknown>>, default: () => ({}) },
    },
    setup(props) {
        const value = ref(props.initialValue);

        return () => {
            const calendar = h(
                Calendar,
                {
                    value: value.value,
                    ...props.calendarProps,
                    onChange: (event: Event) => {
                        value.value = (event.target as HTMLInputElement & { value: string }).value;
                    },
                },
            );
            const readout = h(CalendarValueReadout, { value: value.value });

            if (!props.caption) {
                return h('div', [calendar, readout]);
            }

            return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.25rem' } }, [
                h('div', { class: 'pg-spinner-size-label' }, props.caption),
                calendar,
                readout,
            ]);
        };
    },
});

/** Vue previews — one component per section id from checkboxPlaygroundSpec. */
export const checkboxVueSectionComponents: Record<string, Component> = {
    craftComparison: defineComponent({
        name: 'CheckboxCraftComparisonSection',
        setup() {
            return () => h('div', { class: 'cmp-layout' }, [
                h('div', { class: 'cmp-column' }, [
                    h('span', { class: 'cmp-column-title' }, 'Plugin Kit'),
                    h('div', { class: 'cmp-rows' }, [
                        h('div', { class: 'cmp-row' }, [
                            h('h3', { class: 'cmp-row-heading' }, 'Unchecked'),
                            h('div', { class: 'cmp-row-items cmp-row-items--state-matrix' },
                                checkboxUncheckedStates.map(({ label, invalid, disabled, focus }) => h(
                                    'div',
                                    { class: 'cmp-state-cell', key: label },
                                    h(
                                        Checkbox,
                                        {
                                            id: `pg-checkbox-unchecked-${slugify(label)}`,
                                            invalid,
                                            disabled,
                                            ...(focus ? { 'data-state': 'focus-visible' } : {}),
                                        },
                                        () => label,
                                    ),
                                )),
                            ),
                        ]),
                        h('div', { class: 'cmp-row' }, [
                            h('h3', { class: 'cmp-row-heading' }, 'Checked'),
                            h('div', { class: 'cmp-row-items cmp-row-items--state-matrix' },
                                checkboxCheckedStates.map(({ label, checked, invalid, disabled, focus }) => h(
                                    'div',
                                    { class: 'cmp-state-cell', key: label },
                                    h(
                                        Checkbox,
                                        {
                                            id: `pg-checkbox-checked-${slugify(label)}`,
                                            checked,
                                            invalid,
                                            disabled,
                                            ...(focus ? { 'data-state': 'focus-visible' } : {}),
                                        },
                                        () => label,
                                    ),
                                )),
                            ),
                        ]),
                    ]),
                ]),
                h('div', { class: 'cmp-column' }, [
                    h('span', { class: 'cmp-column-title' }, 'Craft'),
                    h('div', { innerHTML: buildCraftCheckboxComparisonHtml() }),
                ]),
            ]);
        },
    }),

    groupSpacing: defineComponent({
        name: 'CheckboxGroupSpacingSection',
        setup() {
            return () => h('div', { class: 'pg-checkbox-groups' },
                checkboxGroupDemos.map(({ legend, items }) => h('fieldset', { class: 'pg-checkbox-group', key: legend }, [
                    h('legend', { class: 'pg-checkbox-group__legend' }, legend),
                    ...items.map((item) => h(
                        Checkbox,
                        {
                            key: item.id,
                            id: item.id,
                            checked: 'checked' in item ? item.checked : false,
                            disabled: 'disabled' in item ? item.disabled : false,
                        },
                        () => item.label,
                    )),
                ])),
            );
        },
    }),

    basicUsage: defineComponent({
        name: 'CheckboxBasicUsageSection',
        setup() {
            return () => h('div', { class: 'pg-demo-narrow' }, [
                h(Checkbox, {
                    id: 'checkbox-basic',
                    'aria-label': checkboxPlaygroundSections.basicUsage.ariaLabel,
                }),
            ]);
        },
    }),

    checked: defineComponent({
        name: 'CheckboxCheckedSection',
        setup() {
            return () => h('div', { class: 'pg-demo-narrow' }, [
                h(Checkbox, {
                    id: 'checkbox-checked',
                    checked: true,
                    'aria-label': checkboxPlaygroundSections.checked.ariaLabel,
                }),
            ]);
        },
    }),

    disabled: defineComponent({
        name: 'CheckboxDisabledSection',
        setup() {
            return () => h('div', { class: 'pg-demo-narrow' }, [
                h(Checkbox, {
                    id: 'checkbox-disabled',
                    checked: true,
                    disabled: true,
                    'aria-label': checkboxPlaygroundSections.disabled.ariaLabel,
                }),
            ]);
        },
    }),

    hint: defineComponent({
        name: 'CheckboxHintSection',
        setup() {
            return () => h('div', { class: 'pg-demo-narrow' }, [
                h(
                    Checkbox,
                    {
                        id: 'checkbox-hint',
                        hint: checkboxPlaygroundSections.hint.hint,
                    },
                    () => checkboxPlaygroundSections.hint.label,
                ),
            ]);
        },
    }),
};

/** Vue previews — one component per section id from calendarPlaygroundSpec. */
export const calendarVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'CalendarBasicSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(CalendarDemo, { initialValue: '2026-05-11' }),
        ]),
    }),

    constraints: defineComponent({
        name: 'CalendarConstraintsSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(CalendarDemo, {
                initialValue: '2026-05-15',
                calendarProps: { min: '2026-05-08', max: '2026-05-22' },
            }),
        ]),
    }),

    range: defineComponent({
        name: 'CalendarRangeSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(CalendarDemo, {
                initialValue: '2026-05-11/2026-05-18',
                calendarProps: { mode: 'range' },
            }),
        ]),
    }),

    dualMonth: defineComponent({
        name: 'CalendarDualMonthSection',
        setup: () => () => h('div', { style: { overflowX: 'auto' } }, [
            h(CalendarDemo, {
                initialValue: '2026-05-11/2026-05-25',
                calendarProps: { mode: 'range', months: '2' },
            }),
        ]),
    }),

    weekNumbers: defineComponent({
        name: 'CalendarWeekNumbersSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(CalendarDemo, {
                initialValue: '2026-05-11',
                calendarProps: { 'with-week-numbers': true },
            }),
        ]),
    }),

    viewStepper: defineComponent({
        name: 'CalendarViewStepperSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h('p', {
                style: { fontSize: '11px', color: 'var(--pk-color-gray-500)', margin: '0' },
            }, 'Click the month/year title to step into month and year views.'),
            h(CalendarDemo, { initialValue: '2026-05-11' }),
        ]),
    }),

    disablePastFuture: defineComponent({
        name: 'CalendarDisablePastFutureSection',
        setup: () => () => h('div', {
            class: 'pg-demo-narrow',
            style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
        }, [
            h(CalendarDemo, {
                caption: 'disable-past — today is 15 May 2026',
                initialValue: '2026-05-20',
                calendarProps: { today: '2026-05-15', 'disable-past': true },
            }),
            h(CalendarDemo, {
                caption: 'disable-future — today is 15 May 2026',
                initialValue: '2026-05-10',
                calendarProps: { today: '2026-05-15', 'disable-future': true },
            }),
        ]),
    }),

    disabledDaysOfWeek: defineComponent({
        name: 'CalendarDisabledDaysOfWeekSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(CalendarDemo, {
                caption: 'disabled-days-of-week="sat sun"',
                initialValue: '2026-05-16',
                calendarProps: { 'disabled-days-of-week': 'sat sun' },
            }),
        ]),
    }),

    firstDayOfWeek: defineComponent({
        name: 'CalendarFirstDayOfWeekSection',
        setup: () => () => h('div', {
            class: 'pg-demo-narrow',
            style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
        }, [
            h(CalendarDemo, {
                caption: 'first-day-of-week="auto" (locale default)',
                initialValue: '2026-05-11',
            }),
            h(CalendarDemo, {
                caption: 'first-day-of-week="mon"',
                initialValue: '2026-05-11',
                calendarProps: { 'first-day-of-week': 'mon' },
            }),
        ]),
    }),

    weekdayFormat: defineComponent({
        name: 'CalendarWeekdayFormatSection',
        setup: () => () => h('div', {
            class: 'pg-demo-narrow',
            style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
        }, [
            h(CalendarDemo, {
                caption: 'weekday-format="narrow" (default)',
                initialValue: '2026-05-11',
                calendarProps: { 'weekday-format': 'narrow' },
            }),
            h(CalendarDemo, {
                caption: 'weekday-format="short"',
                initialValue: '2026-05-11',
                calendarProps: { 'weekday-format': 'short' },
            }),
            h(CalendarDemo, {
                caption: 'weekday-format="long"',
                initialValue: '2026-05-11',
                calendarProps: { 'weekday-format': 'long' },
            }),
        ]),
    }),

    outsideDays: defineComponent({
        name: 'CalendarOutsideDaysSection',
        setup: () => () => h('div', {
            class: 'pg-demo-narrow',
            style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
        }, [
            h(CalendarDemo, {
                caption: 'with-outside-days (default)',
                initialValue: '2026-05-11',
                calendarProps: { 'with-outside-days': true },
            }),
            h(CalendarDemo, {
                caption: 'without outside days',
                initialValue: '2026-05-11',
                calendarProps: { 'with-outside-days': false },
            }),
        ]),
    }),
};

/** Vue previews — one component per section id from checkboxSelectPlaygroundSpec. */
export const checkboxSelectVueSectionComponents: Record<string, Component> = {
    craftComparison: defineComponent({
        name: 'CheckboxSelectCraftComparisonSection',
        setup() {
            return () => h('div', { class: 'cmp-layout' }, [
                h('div', { class: 'cmp-column' }, [
                    h('span', { class: 'cmp-column-title' }, 'Plugin Kit'),
                    h('div', { class: 'cmp-rows' }, [
                        h('div', { class: 'cmp-row' }, [
                            h('h3', { class: 'cmp-row-heading' }, 'With “All” option'),
                            h('div', { class: 'cmp-row-items' }, [
                                h(CheckboxSelect, {
                                    'show-all-option': true,
                                    'all-label': 'All users',
                                    options: [...checkboxSelectComparisonOptions],
                                    value: [],
                                }),
                            ]),
                        ]),
                        h('div', { class: 'cmp-row' }, [
                            h('h3', { class: 'cmp-row-heading' }, 'All selected'),
                            h('div', { class: 'cmp-row-items' }, [
                                h(CheckboxSelect, {
                                    'show-all-option': true,
                                    'all-label': 'All users',
                                    options: [...checkboxSelectComparisonOptions],
                                    value: '*',
                                }),
                            ]),
                        ]),
                        h('div', { class: 'cmp-row' }, [
                            h('h3', { class: 'cmp-row-heading' }, 'Selected values'),
                            h('div', { class: 'cmp-row-items' }, [
                                h(CheckboxSelect, {
                                    options: [...checkboxSelectComparisonOptions],
                                    value: ['admins', 'editors'],
                                }),
                            ]),
                        ]),
                    ]),
                ]),
                h('div', { class: 'cmp-column' }, [
                    h('span', { class: 'cmp-column-title' }, 'Craft'),
                    h('div', { innerHTML: buildCraftCheckboxSelectComparisonHtml() }),
                ]),
            ]);
        },
    }),

    basic: defineComponent({
        name: 'CheckboxSelectBasicSection',
        setup: () => () => h(CheckboxSelect, {
            options: checkboxSelectDemoOptions,
            value: ['contact'],
        }),
    }),

    withAll: defineComponent({
        name: 'CheckboxSelectWithAllSection',
        setup() {
            const value = ref<string | string[]>('*');

            return () => h('div', [
                h(CheckboxSelect, {
                    'show-all-option': true,
                    options: checkboxSelectDemoOptions,
                    value: value.value,
                    onPkChange: (event: CustomEvent<{ value: string | string[] }>) => {
                        value.value = event.detail.value;
                    },
                }),
                h('p', {
                    class: 'pg-demo-output',
                    style: {
                        marginTop: '0.75rem',
                        fontSize: '0.875rem',
                        color: 'var(--pk-color-gray-500)',
                    },
                }, `Value: ${JSON.stringify(value.value)}`),
            ]);
        },
    }),

    withLabel: defineComponent({
        name: 'CheckboxSelectWithLabelSection',
        setup() {
            const { fieldLabel, fieldInstructions } = checkboxSelectPlaygroundSections.withLabel;

            return () => h(
                Field,
                { label: fieldLabel, instructions: fieldInstructions },
                () => h(CheckboxSelect, {
                    options: checkboxSelectDemoOptions,
                    value: ['contact', 'newsletter'],
                }),
            );
        },
    }),
};
