import { defineComponent, h, ref, type Component } from 'vue';

import { ColorInput } from '@verbb/plugin-kit-vue/components';

import { DemoValueReadout } from '../shared/sectionHelpers.js';

const ColorInputDemo = defineComponent({
    name: 'ColorInputDemo',
    props: {
        initialValue: { type: String, default: '#35e533' },
        showValue: { type: Boolean, default: true },
        size: { type: String, default: undefined },
        invalid: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    setup(props) {
        const value = ref(props.initialValue);

        return () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.25rem' } }, [
            h(ColorInput, {
                value: value.value,
                ...(props.size && props.size !== 'default' ? { size: props.size } : {}),
                invalid: props.invalid || undefined,
                disabled: props.disabled || undefined,
                onPkChange: (event: CustomEvent<{ value: string }>) => {
                    value.value = event.detail.value;
                },
            }),
            props.showValue ? h(DemoValueReadout, { value: value.value }) : null,
        ]);
    },
});

/** Vue previews — one component per section id from colorInputPlaygroundSpec. */
export const colorInputVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'ColorInputBasicSection',
        setup: () => () => h('div', { class: 'pg-demo-narrow' }, [
            h(ColorInputDemo, { initialValue: '#35e533' }),
        ]),
    }),

    resolved: defineComponent({
        name: 'ColorInputResolvedSection',
        setup: () => () => h('div', {
            class: 'pg-demo-narrow',
            style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
        }, [
            h(ColorInputDemo, { initialValue: '' }),
            h(ColorInputDemo, { initialValue: '#a9' }),
            h(ColorInputDemo, { initialValue: '#9c4' }),
            h(ColorInputDemo, { initialValue: '#35e533' }),
            h(ColorInputDemo, { initialValue: '#35e533', invalid: true }),
            h(ColorInputDemo, { initialValue: '#35e533', disabled: true }),
        ]),
    }),

    sizes: defineComponent({
        name: 'ColorInputSizesSection',
        setup: () => () => h('div', {
            class: 'pg-demo-narrow',
            style: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
        },
            (['xs', 'sm', 'default', 'lg'] as const).map((size) => h(
                'div',
                { key: size, style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                [
                    h('span', {
                        style: {
                            flexShrink: 0,
                            width: '4rem',
                            fontSize: '12px',
                            color: 'var(--pk-color-gray-500)',
                        },
                    }, size),
                    h(ColorInputDemo, {
                        initialValue: '#35e533',
                        ...(size !== 'default' ? { size } : {}),
                    }),
                ],
            )),
        ),
    }),

    states: defineComponent({
        name: 'ColorInputStatesSection',
        setup: () => () => h('div', { class: 'pg-card__inner--row' }, [
            h(ColorInputDemo, { initialValue: '#e64d4c', showValue: false }),
            h(ColorInput, { value: '#ff', invalid: true }),
            h(ColorInput, { value: '#64748b', disabled: true }),
        ]),
    }),
};
