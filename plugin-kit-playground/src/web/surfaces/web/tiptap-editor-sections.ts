import { tiptapEditorPlaygroundSections } from '../../../catalog/data/meta-tiptap-editor.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

function createPkTiptapEditor(options: {
    value?: string;
    buttons?: string;
    toolbar?: string;
    placeholder?: string;
    rows?: number;
    maxWidth?: string;
} = {}): HTMLElement {
    const editor = document.createElement('pk-tiptap-editor');

    if (options.value !== undefined) {
        editor.setAttribute('value', options.value);
    }

    if (options.toolbar) {
        editor.setAttribute('toolbar', options.toolbar);
    } else if (options.buttons) {
        editor.setAttribute('buttons', options.buttons);
    }

    if (options.placeholder) {
        editor.setAttribute('placeholder', options.placeholder);
    }

    if (options.rows !== undefined) {
        editor.setAttribute('rows', String(options.rows));
    }

    if (options.maxWidth) {
        editor.style.maxWidth = options.maxWidth;
    }

    return editor;
}

function appendEditorForSection(
    preview: HTMLElement,
    sectionKey: keyof typeof tiptapEditorPlaygroundSections,
): void {
    const sectionConfig = tiptapEditorPlaygroundSections[sectionKey];

    preview.append(createPkTiptapEditor({
        value: sectionConfig.initialValue,
        ...('toolbar' in sectionConfig && sectionConfig.toolbar
            ? { toolbar: sectionConfig.toolbar }
            : { buttons: sectionConfig.buttons }),
        placeholder: sectionConfig.placeholder,
        rows: sectionConfig.rows,
        maxWidth: sectionConfig.maxWidth,
    }));
}

/** Web component previews — one function per section id from tiptapEditorPlaygroundSpec. */
export const tiptapEditorWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        appendEditorForSection(preview, 'basic');
    },

    expandedToolbar(preview) {
        appendEditorForSection(preview, 'expandedToolbar');
    },

    groupedToolbar(preview) {
        appendEditorForSection(preview, 'groupedToolbar');
    },
};
