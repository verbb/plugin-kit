import { tiptapEditorPlaygroundMeta, tiptapEditorPlaygroundSections } from '../data/meta-tiptap-editor.js';
import type { PlaygroundSpec } from '../types.js';

export type TiptapEditorSectionId = keyof typeof tiptapEditorPlaygroundSections;

/** Single source of truth for TiptapEditor playground section order and copy. */
export const tiptapEditorPlaygroundSpec: PlaygroundSpec = {
    meta: tiptapEditorPlaygroundMeta,
    sections: [
        { id: 'basic', ...tiptapEditorPlaygroundSections.basic },
        { id: 'expandedToolbar', ...tiptapEditorPlaygroundSections.expandedToolbar },
        { id: 'groupedToolbar', ...tiptapEditorPlaygroundSections.groupedToolbar },
    ],
};

export const tiptapEditorSectionIds = tiptapEditorPlaygroundSpec.sections.map((section) => section.id);
