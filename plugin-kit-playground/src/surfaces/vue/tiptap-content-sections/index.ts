import { defineComponent, h, type Component } from 'vue';
import { tiptapContentSampleValue } from '@verbb/plugin-kit-playground';

import { TiptapContent } from '@verbb/plugin-kit-vue/components';

/** Vue previews — one component per section id from tiptapContentPlaygroundSpec. */
export const tiptapContentVueSectionComponents: Record<string, Component> = {
    basicUsage: defineComponent({
        name: 'TiptapContentBasicUsageSection',
        setup: () => () => h(TiptapContent, {
            value: tiptapContentSampleValue,
            style: { maxWidth: '32rem' },
        }),
    }),
};
