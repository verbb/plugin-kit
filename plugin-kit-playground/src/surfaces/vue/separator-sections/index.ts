import { defineComponent, h, type Component } from 'vue';
import { separatorPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Separator } from '@verbb/plugin-kit-vue/components';

/** Vue previews — one component per section id from separatorPlaygroundSpec. */
export const separatorVueSectionComponents: Record<string, Component> = {
    horizontal: defineComponent({
        name: 'SeparatorHorizontalSection',
        setup: () => () => {
            const { above, below } = separatorPlaygroundSections.horizontal;

            return h('div', {}, [
                h('p', { style: { margin: '0 0 12px' } }, above),
                h(Separator),
                h('p', { style: { margin: '12px 0 0' } }, below),
            ]);
        },
    }),

    vertical: defineComponent({
        name: 'SeparatorVerticalSection',
        setup: () => () => h('div', { class: 'pg-separator-row' },
            separatorPlaygroundSections.vertical.items.flatMap((item, index) => [
                ...(index > 0 ? [h(Separator, { key: `${item}-sep`, orientation: 'vertical' })] : []),
                h('span', { key: item, style: { display: 'contents' } }, item),
            ]),
        ),
    }),
};
