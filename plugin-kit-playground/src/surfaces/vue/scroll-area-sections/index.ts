import { defineComponent, h, type Component } from 'vue';

import { ScrollArea } from '@verbb/plugin-kit-vue/components';

/** Vue previews — one component per section id from scrollAreaPlaygroundSpec. */
export const scrollAreaVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'ScrollAreaBasicSection',
        setup: () => () => h(
            ScrollArea,
            { style: { height: '12rem', width: '100%', maxWidth: '24rem' } },
            () => h('div', { style: { padding: '0.75rem' } },
                Array.from({ length: 20 }, (_, index) => h(
                    'p',
                    {
                        key: index,
                        style: {
                            margin: '0 0 0.75rem',
                            fontSize: '14px',
                            color: 'var(--pk-color-gray-600)',
                        },
                    },
                    `Scrollable row ${index + 1} — long content inside a constrained scroll region.`,
                )),
            ),
        ),
    }),
};
