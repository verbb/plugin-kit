import { defineComponent, h, type Component } from 'vue';
import { tiptapEditorPlaygroundSections } from '@verbb/plugin-kit-playground';

import { TiptapEditor } from '@verbb/plugin-kit-vue/components';

type TiptapEditorSectionKey = keyof typeof tiptapEditorPlaygroundSections;

function renderTiptapEditor(sectionKey: TiptapEditorSectionKey) {
    const sectionConfig = tiptapEditorPlaygroundSections[sectionKey];

    return h(TiptapEditor, {
        value: sectionConfig.initialValue,
        placeholder: sectionConfig.placeholder,
        rows: sectionConfig.rows,
        style: { maxWidth: sectionConfig.maxWidth },
        ...('toolbar' in sectionConfig && sectionConfig.toolbar
            ? { toolbar: sectionConfig.toolbar }
            : { buttons: sectionConfig.buttons }),
    });
}

/** Vue previews — one component per section id from tiptapEditorPlaygroundSpec. */
export const tiptapEditorVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'TiptapEditorBasicSection',
        setup: () => () => renderTiptapEditor('basic'),
    }),

    expandedToolbar: defineComponent({
        name: 'TiptapEditorExpandedToolbarSection',
        setup: () => () => renderTiptapEditor('expandedToolbar'),
    }),

    groupedToolbar: defineComponent({
        name: 'TiptapEditorGroupedToolbarSection',
        setup: () => () => renderTiptapEditor('groupedToolbar'),
    }),
};
