import { defineComponent, h, type Component } from 'vue';
import {
    buttonLoadingSpinnerSections,
    spinnerButtonVariants,
    spinnerMatrixSizes,
    spinnerMatrixTones,
} from '@verbb/plugin-kit-playground';

import { Button, Spinner } from '@verbb/plugin-kit-vue/components';

/** Vue previews — one component per section id from spinnerPlaygroundSpec. */
export const spinnerVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'SpinnerBasicSection',
        setup: () => () => h(Spinner),
    }),

    colors: defineComponent({
        name: 'SpinnerColorsSection',
        setup: () => () => h('div', { class: 'cmp-row-items' },
            spinnerMatrixTones.map(({ tone }) => h(Spinner, { key: tone, tone })),
        ),
    }),

    buttonVariants: defineComponent({
        name: 'SpinnerButtonVariantsSection',
        setup: () => () => h('div', { class: 'cmp-row-items' },
            spinnerButtonVariants.map(({ label, variant }) => h(
                Button,
                { key: variant, variant, loading: true },
                () => label,
            )),
        ),
    }),

    sizes: defineComponent({
        name: 'SpinnerSizesSection',
        setup: () => () => h('div', { class: 'cmp-row-items pg-spinner-size-row' },
            spinnerMatrixSizes.map(({ label, size }) => h('div', { class: 'pg-spinner-size-item', key: size }, [
                h(Spinner, { size }),
                h('span', { class: 'pg-spinner-size-label' }, label),
            ])),
        ),
    }),

    buttonLoadingOverrides: defineComponent({
        name: 'SpinnerButtonLoadingOverridesSection',
        setup: () => () => h('div', {},
            buttonLoadingSpinnerSections.flatMap((section) => [
                h('h3', { class: 'cmp-row-heading', key: `${section.id}-heading` }, section.title),
                h('div', { class: 'cmp-row-items', key: section.id },
                    section.buttons.map((buttonOptions) => h(
                        Button,
                        {
                            key: buttonOptions.label,
                            variant: buttonOptions.variant,
                            loading: true,
                            spinnerVariant: 'spinnerVariant' in buttonOptions ? buttonOptions.spinnerVariant : undefined,
                            spinnerTone: 'spinnerTone' in buttonOptions ? buttonOptions.spinnerTone : undefined,
                        },
                        () => buttonOptions.label,
                    )),
                ),
            ]),
        ),
    }),
};
