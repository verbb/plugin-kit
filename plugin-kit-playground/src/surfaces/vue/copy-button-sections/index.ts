import { defineComponent, h, type Component } from 'vue';
import { copyButtonPlaygroundSections } from '@verbb/plugin-kit-playground';

import { CopyButton, Icon, Input } from '@verbb/plugin-kit-vue/components';

/** Vue previews — one component per section id from copyButtonPlaygroundSpec. */
export const copyButtonVueSectionComponents: Record<string, Component> = {
    basicUsage: defineComponent({
        name: 'CopyButtonBasicUsageSection',
        setup: () => () => {
            const { value } = copyButtonPlaygroundSections.basicUsage;

            return h('div', { class: 'pg-card__inner--row' }, [
                h(Input, { value, readOnly: true, style: { width: '16rem' } }),
                h(CopyButton, { value }, {
                    icon: () => h(Icon, { icon: 'clipboard' }),
                }),
            ]);
        },
    }),

    variants: defineComponent({
        name: 'CopyButtonVariantsSection',
        setup: () => () => {
            const { value, variants } = copyButtonPlaygroundSections.variants;

            return h('div', {}, [
                h('div', { class: 'pg-card__inner--row', style: { marginBottom: '0.75rem' } }, [
                    h(Input, { value, readOnly: true, style: { width: '16rem' } }),
                    h(CopyButton, { value }, {
                        icon: () => h(Icon, { icon: 'clipboard' }),
                    }),
                ]),
                h('div', { class: 'pg-card__inner--row' },
                    variants.map((variant) => h(
                        CopyButton,
                        { key: variant, value, variant },
                        { icon: () => h(Icon, { icon: 'clipboard' }) },
                    )),
                ),
            ]);
        },
    }),
};
