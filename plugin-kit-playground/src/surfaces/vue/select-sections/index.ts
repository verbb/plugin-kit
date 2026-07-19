import { defineComponent, h, type Component, type VNodeChild } from 'vue';
import {
    buildCraftSelectComparisonHtml,
    selectFieldStates,
    selectFruitItems,
    selectLargeFruitItems,
    selectPlaygroundSections,
    selectStatusInputItems,
    selectStatusItems,
} from '@verbb/plugin-kit-playground';

import {
    Icon,
    Option,
    OptionGroup,
    Select,
    Separator,
    Status,
} from '@verbb/plugin-kit-vue/components';

import { ComparisonRow, StateMatrixCell } from '../shared/sectionHelpers.js';

function FruitOptions() {
    return selectFruitItems.map(({ value, label }) => h(Option, { key: value, value }, () => label));
}

function SelectSizeRow(props: { label: string; children: VNodeChild }) {
    return h('div', { class: 'pg-select-size-row' }, [
        h('div', { class: 'pg-select-size-row__label' }, props.label),
        props.children,
    ]);
}

function DecoratedSelect(props: { size?: string }) {
    return h(
        Select,
        {
            value: 'demo',
            ...(props.size && props.size !== 'default' ? { size: props.size } : {}),
        },
        {
            start: () => h(Icon, { icon: 'house', 'aria-hidden': true }),
            default: () => h(Option, { value: 'demo' }, () => 'Demo'),
            end: () => h(Icon, { icon: 'flag', 'aria-hidden': true }),
        },
    );
}

function GroupedSelect() {
    return h(Select, { placeholder: 'Select produce' }, {
        default: () => [
            h(OptionGroup, { label: 'Fruits' }, () =>
                selectFruitItems.map(({ value, label }) => h(Option, { key: value, value }, () => label))),
            h(Separator),
            h(OptionGroup, { label: 'Vegetables' }, () => [
                h(Option, { value: 'carrot' }, () => 'Carrot'),
                h(Option, { value: 'broccoli' }, () => 'Broccoli'),
                h(Option, { value: 'spinach' }, () => 'Spinach'),
            ]),
        ],
    });
}

/** Vue previews — one component per section id from selectPlaygroundSpec. */
export const selectVueSectionComponents: Record<string, Component> = {
    craftComparison: defineComponent({
        name: 'SelectCraftComparisonSection',
        setup: () => () => h('div', { class: 'cmp-layout' }, [
            h('div', { class: 'cmp-column' }, [
                h('span', { class: 'cmp-column-title' }, 'Plugin Kit'),
                h('div', { class: 'cmp-rows' }, [
                    h(ComparisonRow, { heading: 'Field states', layout: 'stack' }, () =>
                        selectFieldStates.map(({ label, placeholder, invalid, disabled, focus }) => h(
                            StateMatrixCell,
                            { key: label, label },
                            () => h(
                                Select,
                                {
                                    placeholder,
                                    invalid,
                                    disabled,
                                    width: 'full',
                                    style: { width: '9rem' },
                                    ...(focus ? { 'data-state': 'focus-visible' } : {}),
                                },
                                {
                                    default: () => selectStatusItems.map(({ value, label: optionLabel }) => h(
                                        Option,
                                        { key: value, value },
                                        () => optionLabel,
                                    )),
                                },
                            ),
                        ))),
                ]),
            ]),
            h('div', { class: 'cmp-column' }, [
                h('span', { class: 'cmp-column-title' }, 'Craft'),
                h('div', { innerHTML: buildCraftSelectComparisonHtml() }),
            ]),
        ]),
    }),

    basicUsage: defineComponent({
        name: 'SelectBasicUsageSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Select, { placeholder: 'Select a fruit' }, { default: () => FruitOptions() }),
        ]),
    }),

    sizes: defineComponent({
        name: 'SelectSizesSection',
        setup: () => () => h('div', { class: 'pg-demo-stack pg-demo-narrow' },
            selectPlaygroundSections.sizes.items.map(({ label, size }) => SelectSizeRow({
                label,
                children: h(
                    Select,
                    {
                        value: 'apple',
                        ...(size !== 'default' ? { size } : {}),
                    },
                    { default: () => FruitOptions() },
                ),
            })),
        ),
    }),

    widths: defineComponent({
        name: 'SelectWidthsSection',
        setup: () => () => h('div', { class: 'pg-demo-stack pg-demo-narrow' }, [
            h('div', { class: 'pg-select-width-fixed' }, [
                h(Select, { value: 'apple', width: 'full' }, { default: () => FruitOptions() }),
            ]),
            h('div', { class: 'pg-select-width-full' }, [
                h(Select, { value: 'banana', width: 'full' }, { default: () => FruitOptions() }),
            ]),
        ]),
    }),

    grouped: defineComponent({
        name: 'SelectGroupedSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [GroupedSelect()]),
    }),

    longList: defineComponent({
        name: 'SelectLongListSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Select, { placeholder: 'Select a fruit', value: 'apple' }, {
                default: () => selectLargeFruitItems.map(({ value, label }) => h(
                    Option,
                    { key: value, value },
                    () => label,
                )),
            }),
        ]),
    }),

    decorations: defineComponent({
        name: 'SelectDecorationsSection',
        setup: () => () => h('div', { class: 'pg-demo-stack pg-demo-narrow' },
            selectPlaygroundSections.decorations.items.map(({ label, size }) => SelectSizeRow({
                label,
                children: DecoratedSelect({ size }),
            })),
        ),
    }),

    statusInput: defineComponent({
        name: 'SelectStatusInputSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Select, { placeholder: 'Select status', value: 'testing' }, {
                default: () => selectStatusInputItems.map(({ value, label, status }) => h(
                    Option,
                    { key: value, value },
                    {
                        start: () => h(Status, { status, 'aria-label': label }),
                        default: () => label,
                    },
                )),
            }),
        ]),
    }),

    multiple: defineComponent({
        name: 'SelectMultipleSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Select, { multiple: true, placeholder: 'Choose statuses…' }, {
                default: () => selectStatusItems.map(({ value, label }) => h(
                    Option,
                    { key: value, value },
                    () => label,
                )),
            }),
        ]),
    }),

    clearable: defineComponent({
        name: 'SelectClearableSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Select, { clearable: true, placeholder: 'Choose status…' }, {
                default: () => selectStatusItems.map(({ value, label }) => h(
                    Option,
                    { key: value, value },
                    () => label,
                )),
            }),
        ]),
    }),
};
