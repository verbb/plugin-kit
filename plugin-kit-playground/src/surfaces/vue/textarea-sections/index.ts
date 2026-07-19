import { defineComponent, h, ref, type Component } from 'vue';
import {
    buildCraftTextareaComparisonHtml,
    textareaFieldStates,
    textareaPlaygroundSections,
} from '@verbb/plugin-kit-playground';

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
    Textarea,
} from '@verbb/plugin-kit-vue/components';

import { ComparisonRow, StateMatrixCell } from '../shared/sectionHelpers.js';

/** Vue previews — one component per section id from textareaPlaygroundSpec. */
export const textareaVueSectionComponents: Record<string, Component> = {
    craftComparison: defineComponent({
        name: 'TextareaCraftComparisonSection',
        setup: () => () => h('div', { class: 'cmp-layout' }, [
            h('div', { class: 'cmp-column' }, [
                h('span', { class: 'cmp-column-title' }, 'Plugin Kit'),
                h('div', { class: 'cmp-rows' }, [
                    h(ComparisonRow, { heading: 'Field states', layout: 'stack' }, () =>
                        textareaFieldStates.map(({ label, placeholder, invalid, disabled, focus }) => h(
                            StateMatrixCell,
                            { key: label, label },
                            () => h(Textarea, {
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
                h('div', { innerHTML: buildCraftTextareaComparisonHtml() }),
            ]),
        ]),
    }),

    basicUsage: defineComponent({
        name: 'TextareaBasicUsageSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Textarea, { placeholder: textareaPlaygroundSections.basicUsage.placeholder }),
        ]),
    }),

    sizes: defineComponent({
        name: 'TextareaSizesSection',
        setup: () => () => h('div', { class: 'pg-demo-stack pg-demo-narrow' }, [
            h(Textarea, { placeholder: 'Default', size: 'default' }),
            h(Textarea, { placeholder: 'Small', size: 'sm' }),
        ]),
    }),

    widths: defineComponent({
        name: 'TextareaWidthsSection',
        setup: () => () => h('div', { class: 'pg-demo-stack' }, [
            h('div', { class: 'pg-demo-narrow' }, [
                h(Textarea, { placeholder: textareaPlaygroundSections.widths.fullWidthPlaceholder }),
            ]),
            h(Textarea, {
                placeholder: textareaPlaygroundSections.widths.fixedWidthPlaceholder,
                style: { width: '320px' },
            }),
        ]),
    }),

    validation: defineComponent({
        name: 'TextareaValidationSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Textarea, { placeholder: textareaPlaygroundSections.validation.placeholder, invalid: true }),
        ]),
    }),

    disabled: defineComponent({
        name: 'TextareaDisabledSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Textarea, { placeholder: textareaPlaygroundSections.disabled.placeholder, disabled: true }),
        ]),
    }),

    resize: defineComponent({
        name: 'TextareaResizeSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Textarea, { value: textareaPlaygroundSections.resize.value }),
        ]),
    }),

    characterCount: defineComponent({
        name: 'TextareaCharacterCountSection',
        setup() {
            const { defaultValue, maxLength } = textareaPlaygroundSections.characterCount;
            const value = ref(defaultValue);

            return () => h('div', { class: 'pg-field-stack pg-demo-narrow' }, [
                h(Textarea, {
                    id: 'textarea-char-count',
                    value: value.value,
                    maxLength,
                    onInput: (event: Event) => {
                        value.value = (event.target as HTMLTextAreaElement).value;
                    },
                }),
                h('p', { id: 'textarea-char-count-value', class: 'pg-char-count' }, `${value.value.length}/${maxLength}`),
            ]);
        },
    }),

    inputGroup: defineComponent({
        name: 'TextareaInputGroupSection',
        setup: () => () => {
            const { placeholder, headerLabel, footerCount, footerAction } = textareaPlaygroundSections.inputGroup;

            return h('div', { class: 'pg-demo-stack pg-demo-narrow' }, [
                h(InputGroup, {}, {
                    default: () => [
                        h(InputGroupAddon, { align: 'block-start' }, {
                            default: () => h(InputGroupText, {}, () => headerLabel),
                        }),
                        h(InputGroupTextarea, { placeholder, rows: 4 }),
                    ],
                }),
                h(InputGroup, {}, {
                    default: () => [
                        h(InputGroupTextarea, { placeholder, rows: 4 }),
                        h(InputGroupAddon, { align: 'block-end' }, {
                            default: () => h('div', { class: 'pg-input-group-block-footer' }, [
                                h(InputGroupText, {}, () => footerCount),
                                h(InputGroupButton, {}, () => footerAction),
                            ]),
                        }),
                    ],
                }),
            ]);
        },
    }),
};
