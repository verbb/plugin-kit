import { defineComponent, h, type Component } from 'vue';
import {
    buildCraftLightswitchComparisonHtml,
    lightswitchCheckedStates,
    lightswitchPlaygroundSections,
    lightswitchUncheckedStates,
} from '@verbb/plugin-kit-playground';

import { Lightswitch } from '@verbb/plugin-kit-vue/components';

import { ComparisonRow, slugify, StateMatrixCell } from '../shared/sectionHelpers.js';

function LabelRow({ label, children }: { label: string; children: ReturnType<typeof h> }) {
    return h('div', { class: 'cmp-craft-ls-row pg-lightswitch-row' }, [
        h('div', { class: 'cmp-craft-ls-control' }, [children]),
        h('span', { class: 'cmp-craft-ls-label' }, label),
    ]);
}

/** Vue previews — one component per section id from lightswitchPlaygroundSpec. */
export const lightswitchVueSectionComponents: Record<string, Component> = {
    craftComparison: defineComponent({
        name: 'LightswitchCraftComparisonSection',
        setup: () => () => h('div', { class: 'cmp-layout' }, [
            h('div', { class: 'cmp-column' }, [
                h('span', { class: 'cmp-column-title' }, 'Plugin Kit'),
                h('div', { class: 'cmp-rows' }, [
                    h(ComparisonRow, { heading: 'Unchecked' }, () =>
                        lightswitchUncheckedStates.map(({ label, disabled, invalid, focus }) => h(
                            StateMatrixCell,
                            { key: label, label },
                            () => h(Lightswitch, {
                                id: `pg-ls-unchecked-${slugify(label)}`,
                                disabled,
                                invalid,
                                ...(focus ? { 'data-state': 'focus-visible' } : {}),
                            }),
                        ))),
                    h(ComparisonRow, { heading: 'Checked' }, () =>
                        lightswitchCheckedStates.map(({ label, on, disabled, invalid, focus }) => h(
                            StateMatrixCell,
                            { key: label, label },
                            () => h(Lightswitch, {
                                id: `pg-ls-checked-${slugify(label)}`,
                                checked: on,
                                disabled,
                                invalid,
                                ...(focus ? { 'data-state': 'focus-visible' } : {}),
                            }),
                        ))),
                ]),
            ]),
            h('div', { class: 'cmp-column' }, [
                h('span', { class: 'cmp-column-title' }, 'Craft'),
                h('div', { innerHTML: buildCraftLightswitchComparisonHtml() }),
            ]),
        ]),
    }),

    basicUsage: defineComponent({
        name: 'LightswitchBasicUsageSection',
        setup: () => () => h(Lightswitch, { id: 'lightswitch-basic' }),
    }),

    sizes: defineComponent({
        name: 'LightswitchSizesSection',
        setup: () => () => h('div', { class: 'pg-demo-stack' },
            lightswitchPlaygroundSections.sizes.items.map(({ label, size }) => LabelRow({
                label,
                children: h(Lightswitch, {
                    id: `lightswitch-size-${size}`,
                    ...(size !== 'default' ? { size } : {}),
                }),
            })),
        ),
    }),

    checked: defineComponent({
        name: 'LightswitchCheckedSection',
        setup: () => () => h(Lightswitch, { id: 'lightswitch-checked', checked: true }),
    }),

    disabled: defineComponent({
        name: 'LightswitchDisabledSection',
        setup: () => () => h(Lightswitch, { id: 'lightswitch-disabled', checked: true, disabled: true }),
    }),

    labels: defineComponent({
        name: 'LightswitchLabelsSection',
        setup: () => () => {
            const { simpleLabel, titleLabel, descriptionLabel } = lightswitchPlaygroundSections.labels;

            return h('div', { class: 'pg-card__inner pg-demo-stack' }, [
                h(Lightswitch, { id: 'lightswitch-label-simple', checked: true }, () => simpleLabel),
                h(Lightswitch, {
                    id: 'lightswitch-label-hint',
                    checked: true,
                    instructions: descriptionLabel,
                }, () => titleLabel),
            ]);
        },
    }),
};
