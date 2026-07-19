import { defineComponent, h, type Component } from 'vue';
import { statusPlaygroundVariants } from '@verbb/plugin-kit-playground';

import { Status } from '@verbb/plugin-kit-vue/components';

/** Vue previews — one component per section id from statusPlaygroundSpec. */
export const statusVueSectionComponents: Record<string, Component> = {
    variants: defineComponent({
        name: 'StatusVariantsSection',
        setup: () => () => h('div', { class: 'pg-status-grid pg-status-grid--variants' },
            statusPlaygroundVariants.map((status) => h(Status, { key: status, status })),
        ),
    }),
};
