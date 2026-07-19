import { defineComponent, h, type Component } from 'vue';
import { fieldPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Button, Field, Icon, Input } from '@verbb/plugin-kit-vue/components';

const {
    standaloneLabels,
    errorsAndWarnings,
    translatable,
    tip,
    inlineCode,
    headerEnd,
} = fieldPlaygroundSections;

/** Vue previews — one component per section id from fieldPlaygroundSpec. */
export const fieldVueSectionComponents: Record<string, Component> = {
    standaloneLabels: defineComponent({
        name: 'FieldStandaloneLabelsSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(Input, {
                label: standaloneLabels.label,
                instructions: standaloneLabels.instructions,
                placeholder: standaloneLabels.placeholder,
            }),
        ]),
    }),

    errorsAndWarnings: defineComponent({
        name: 'FieldErrorsAndWarningsSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(
                Field,
                {
                    label: errorsAndWarnings.label,
                    instructions: errorsAndWarnings.instructions,
                    required: true,
                    errors: [errorsAndWarnings.error],
                    warning: errorsAndWarnings.warning,
                },
                () => h(Input, { placeholder: errorsAndWarnings.placeholder, invalid: true }),
            ),
        ]),
    }),

    translatable: defineComponent({
        name: 'FieldTranslatableSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(
                Field,
                {
                    label: translatable.label,
                    instructions: translatable.instructions,
                    required: true,
                    translatable: true,
                },
                () => h(Input, { placeholder: translatable.placeholder }),
            ),
        ]),
    }),

    tip: defineComponent({
        name: 'FieldTipSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(
                Field,
                {
                    label: tip.label,
                    instructions: tip.instructions,
                    required: true,
                    tip: tip.tip,
                },
                () => h(Input, { placeholder: tip.placeholder, value: tip.value, mono: true }),
            ),
        ]),
    }),

    inlineCode: defineComponent({
        name: 'FieldInlineCodeSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(
                Field,
                {
                    label: inlineCode.label,
                    instructions: inlineCode.instructions,
                    required: true,
                    tip: inlineCode.tip,
                    warning: inlineCode.warning,
                    errors: [inlineCode.error],
                },
                () => h(Input, { placeholder: inlineCode.placeholder, invalid: true }),
            ),
        ]),
    }),

    headerEnd: defineComponent({
        name: 'FieldHeaderEndSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(
                Field,
                {
                    label: headerEnd.label,
                    instructions: headerEnd.instructions,
                    headerEnd: h(Button, { size: 'sm' }, {
                        start: () => h(Icon, { icon: 'plus' }),
                        default: () => headerEnd.action,
                    }),
                },
                () => h('div', { class: 'pg-field-header-end-demo' }, 'Option rows would render here.'),
            ),
        ]),
    }),
};
