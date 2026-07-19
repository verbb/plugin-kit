import { defineComponent, h, ref, type Component } from 'vue';

import { TiptapInput } from '@verbb/plugin-kit-vue/components';

/** Vue previews — one component per section id from tiptapInputPlaygroundSpec. */
export const tiptapInputVueSectionComponents: Record<string, Component> = {
    basicUsage: defineComponent({
        name: 'TiptapInputBasicUsageSection',
        setup() {
            const value = ref('Hello {field:total}');

            return () => h('div', {}, [
                h(TiptapInput, {
                    value: value.value,
                    style: { maxWidth: '32rem' },
                    onPkChange: (event: CustomEvent<{ value: string }>) => {
                        value.value = event.detail.value;
                    },
                }),
                h('pre', { class: 'pg-code-block' }, value.value),
            ]);
        },
    }),
};
