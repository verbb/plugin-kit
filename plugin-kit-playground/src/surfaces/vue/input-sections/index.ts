import { defineComponent, h, type Component } from 'vue';
import {
    buildCraftInputComparisonHtml,
    inputFieldStates,
    inputMatrixSizes,
    inputPlaygroundSections,
} from '@verbb/plugin-kit-playground';

import {
    Icon,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from '@verbb/plugin-kit-vue/components';

import { ComparisonRow, StateMatrixCell } from '../shared/sectionHelpers.js';

/** Vue previews — one component per section id from inputPlaygroundSpec. */
export const inputVueSectionComponents: Record<string, Component> = {
    craftComparison: defineComponent({
        name: 'InputCraftComparisonSection',
        setup: () => () => h('div', { class: 'cmp-layout' }, [
            h('div', { class: 'cmp-column' }, [
                h('span', { class: 'cmp-column-title' }, 'Plugin Kit'),
                h('div', { class: 'cmp-rows' }, [
                    h(ComparisonRow, { heading: 'Field states', layout: 'stack' }, () =>
                        inputFieldStates.map(({ label, placeholder, invalid, disabled, focus }) => h(
                            StateMatrixCell,
                            { key: label, label },
                            () => h(Input, {
                                placeholder,
                                invalid,
                                disabled,
                                style: { width: '9rem' },
                                ...(focus ? { 'data-state': 'focus-visible' } : {}),
                            }),
                        ))),
                ]),
            ]),
            h('div', { class: 'cmp-column' }, [
                h('span', { class: 'cmp-column-title' }, 'Craft'),
                h('div', { innerHTML: buildCraftInputComparisonHtml() }),
            ]),
        ]),
    }),

    basicUsage: defineComponent({
        name: 'InputBasicUsageSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Input, { placeholder: inputPlaygroundSections.basicUsage.placeholder }),
        ]),
    }),

    sizes: defineComponent({
        name: 'InputSizesSection',
        setup: () => () => h('div', { class: 'pg-demo-stack pg-demo-narrow' },
            inputMatrixSizes.map(({ label, size }) => h(Input, { key: size, placeholder: label, size })),
        ),
    }),

    widths: defineComponent({
        name: 'InputWidthsSection',
        setup: () => () => h('div', { class: 'pg-demo-stack' }, [
            h('div', { class: 'pg-demo-narrow' }, [
                h(Input, { placeholder: inputPlaygroundSections.widths.fullWidthPlaceholder }),
            ]),
            h(Input, {
                placeholder: inputPlaygroundSections.widths.fixedWidthPlaceholder,
                style: { width: '320px' },
            }),
        ]),
    }),

    inputGroup: defineComponent({
        name: 'InputInputGroupSection',
        setup: () => () => h('div', { class: 'pg-demo-stack pg-demo-narrow' }, [
            h(InputGroup, {}, {
                default: () => [
                    h(InputGroupInput, { placeholder: inputPlaygroundSections.inputGroupIcon.placeholder }),
                    h(InputGroupAddon, { align: 'inline-end' }, {
                        default: () => h(Icon, { icon: 'search', 'aria-hidden': true }),
                    }),
                ],
            }),
        ]),
    }),

    inputGroupIcon: defineComponent({
        name: 'InputInputGroupIconSection',
        setup: () => () => h('div', { class: 'pg-demo-stack pg-demo-narrow' }, [
            h(InputGroup, {}, {
                default: () => [
                    h(InputGroupInput, { placeholder: inputPlaygroundSections.inputGroupIcon.placeholder }),
                    h(InputGroupAddon, { align: 'inline-end' }, {
                        default: () => h(Icon, { icon: 'search', 'aria-hidden': true }),
                    }),
                ],
            }),
            h(InputGroup, {}, {
                default: () => [
                    h(InputGroupInput, { placeholder: inputPlaygroundSections.inputGroupIcon.placeholder }),
                    h(InputGroupAddon, { align: 'inline-end' }, {
                        default: () => h(Icon, { icon: 'search', 'aria-hidden': true }),
                    }),
                ],
            }),
        ]),
    }),

    inputGroupText: defineComponent({
        name: 'InputInputGroupTextSection',
        setup: () => () => {
            const {
                currencyPlaceholder,
                urlPlaceholder,
                emailPlaceholder,
                charsLeft,
            } = inputPlaygroundSections.inputGroupText;

            return h('div', { class: 'pg-demo-stack pg-demo-narrow' }, [
                h(InputGroup, {}, {
                    default: () => [
                        h(InputGroupInput, { placeholder: currencyPlaceholder }),
                        h(InputGroupAddon, { align: 'inline-start' }, {
                            default: () => h(InputGroupText, {}, () => '$'),
                        }),
                        h(InputGroupAddon, { align: 'inline-end' }, {
                            default: () => h(InputGroupText, {}, () => 'USD'),
                        }),
                    ],
                }),
                h(InputGroup, {}, {
                    default: () => [
                        h(InputGroupInput, { placeholder: urlPlaceholder }),
                        h(InputGroupAddon, { align: 'inline-start' }, {
                            default: () => h(InputGroupText, {}, () => 'https://'),
                        }),
                        h(InputGroupAddon, { align: 'inline-end' }, {
                            default: () => h(InputGroupText, {}, () => '.com'),
                        }),
                    ],
                }),
                h(InputGroup, {}, {
                    default: () => [
                        h(InputGroupInput, { placeholder: emailPlaceholder, type: 'email' }),
                        h(InputGroupAddon, { align: 'inline-end' }, {
                            default: () => h(InputGroupText, {}, () => '@company.com'),
                        }),
                    ],
                }),
                h(InputGroup, {}, {
                    default: () => [
                        h(InputGroupInput, { placeholder: 'Bio' }),
                        h(InputGroupAddon, { align: 'inline-end' }, {
                            default: () => h(InputGroupText, {}, () => charsLeft),
                        }),
                    ],
                }),
            ]);
        },
    }),

    inputGroupButton: defineComponent({
        name: 'InputInputGroupButtonSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(InputGroup, {}, {
                default: () => [
                    h(InputGroupInput, { placeholder: inputPlaygroundSections.inputGroupButton.urlPlaceholder }),
                    h(InputGroupAddon, { align: 'inline-start' }, {
                        default: () => h(InputGroupText, {}, () => 'https://'),
                    }),
                    h(InputGroupAddon, { align: 'inline-end' }, {
                        default: () => h(InputGroupButton, {}, () => inputPlaygroundSections.inputGroupButton.buttonLabel),
                    }),
                ],
            }),
        ]),
    }),

    validation: defineComponent({
        name: 'InputValidationSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Input, { placeholder: inputPlaygroundSections.validation.placeholder, invalid: true }),
        ]),
    }),

    disabled: defineComponent({
        name: 'InputDisabledSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Input, { placeholder: inputPlaygroundSections.disabled.placeholder, disabled: true }),
        ]),
    }),
};
