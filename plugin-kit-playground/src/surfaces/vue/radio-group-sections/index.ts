import { defineComponent, h, type Component } from 'vue';
import {
    buildCraftRadioComparisonHtml,
    radioCheckedStates,
    radioGroupPlaygroundSections,
    radioUncheckedStates,
} from '@verbb/plugin-kit-playground';

import { Radio, RadioGroup } from '@verbb/plugin-kit-vue/components';

import { ComparisonRow, slugify, StateMatrixCell } from '../shared/sectionHelpers.js';

function RichRadioLabel(props: { title: string; description: string }) {
    return h('span', {}, [
        h('span', { style: { fontWeight: 500 } }, props.title),
        h('span', { style: { display: 'block', color: 'var(--pk-color-slate-500)' } }, props.description),
    ]);
}

/** Vue previews — one component per section id from radioGroupPlaygroundSpec. */
export const radioGroupVueSectionComponents: Record<string, Component> = {
    craftComparison: defineComponent({
        name: 'RadioGroupCraftComparisonSection',
        setup: () => () => h('div', { class: 'cmp-layout' }, [
            h('div', { class: 'cmp-column' }, [
                h('span', { class: 'cmp-column-title' }, 'Plugin Kit'),
                h('div', { class: 'cmp-rows' }, [
                    h(ComparisonRow, { heading: 'Unchecked' }, () =>
                        radioUncheckedStates.map(({ label, invalid, disabled, focus }) => h(
                            StateMatrixCell,
                            { key: label, label },
                            () => h(Radio, {
                                value: `pg-radio-unchecked-${slugify(label)}`,
                                invalid,
                                disabled,
                                ...(focus ? { 'data-state': 'focus-visible' } : {}),
                            }),
                        ))),
                    h(ComparisonRow, { heading: 'Checked' }, () =>
                        radioCheckedStates.map(({ label, checked, invalid, disabled, focus }) => h(
                            StateMatrixCell,
                            { key: label, label },
                            () => h(Radio, {
                                value: `pg-radio-checked-${slugify(label)}`,
                                checked,
                                invalid,
                                disabled,
                                ...(focus ? { 'data-state': 'focus-visible' } : {}),
                            }),
                        ))),
                ]),
            ]),
            h('div', { class: 'cmp-column' }, [
                h('span', { class: 'cmp-column-title' }, 'Craft'),
                h('div', { innerHTML: buildCraftRadioComparisonHtml() }),
            ]),
        ]),
    }),

    basicUsage: defineComponent({
        name: 'RadioGroupBasicUsageSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(RadioGroup, { id: 'pg-radio-basic', name: 'pg-radio-frequency', value: 'daily' }, () => [
                h(Radio, { value: 'daily' }, () => 'Daily'),
                h(Radio, { value: 'weekly' }, () => 'Weekly'),
                h(Radio, { value: 'monthly' }, () => 'Monthly'),
            ]),
        ]),
    }),

    supportingDescriptions: defineComponent({
        name: 'RadioGroupSupportingDescriptionsSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(RadioGroup, { id: 'pg-radio-descriptions', name: 'pg-radio-visibility', value: 'team' }, () => [
                h(Radio, { value: 'team' }, () => RichRadioLabel({
                    title: 'Team',
                    description: 'Visible to the whole team.',
                })),
                h(Radio, { value: 'private' }, () => RichRadioLabel({
                    title: 'Private',
                    description: 'Only visible to you.',
                })),
            ]),
        ]),
    }),

    disabledOptions: defineComponent({
        name: 'RadioGroupDisabledOptionsSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(RadioGroup, { id: 'pg-radio-disabled', name: 'pg-radio-plan', value: 'starter' }, () => [
                h(Radio, { value: 'starter' }, () => 'Starter'),
                h(Radio, { value: 'pro' }, () => 'Pro'),
                h(Radio, { value: 'enterprise', disabled: true }, () => 'Enterprise'),
            ]),
        ]),
    }),

    layoutAndError: defineComponent({
        name: 'RadioGroupLayoutAndErrorSection',
        setup: () => () => {
            const { errorMessage } = radioGroupPlaygroundSections.layoutAndError;

            return h('div', {
                class: 'pg-demo-narrow',
                style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
            }, [
                h(RadioGroup, {
                    id: 'pg-radio-horizontal',
                    name: 'pg-radio-layout',
                    value: 'daily',
                    orientation: 'horizontal',
                }, () => [
                    h(Radio, { value: 'daily' }, () => 'Daily'),
                    h(Radio, { value: 'weekly' }, () => 'Weekly'),
                    h(Radio, { value: 'monthly' }, () => 'Monthly'),
                ]),
                h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.5rem' } }, [
                    h(RadioGroup, {
                        id: 'pg-radio-invalid',
                        name: 'pg-radio-channel',
                        value: 'email',
                        invalid: true,
                    }, () => [
                        h(Radio, { value: 'email' }, () => 'Email'),
                        h(Radio, { value: 'sms' }, () => 'SMS'),
                    ]),
                    h('p', {
                        style: { margin: 0, fontSize: '0.875rem', color: 'var(--pk-color-rose-600)' },
                    }, errorMessage),
                ]),
            ]);
        },
    }),
};
