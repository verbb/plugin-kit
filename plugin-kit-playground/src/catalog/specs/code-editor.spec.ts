import { codeEditorPlaygroundMeta, codeEditorPlaygroundSections } from '../data/meta-code-editor.js';
import type { PlaygroundSpec } from '../types.js';

export type CodeEditorSectionId = keyof typeof codeEditorPlaygroundSections;

/** Single source of truth for CodeEditor playground section order and copy. */
export const codeEditorPlaygroundSpec: PlaygroundSpec = {
    meta: codeEditorPlaygroundMeta,
    sections: [
        { id: 'basic', ...codeEditorPlaygroundSections.basic },
        { id: 'longerHtml', ...codeEditorPlaygroundSections.longerHtml },
        { id: 'languages', ...codeEditorPlaygroundSections.languages },
        { id: 'layoutOptions', ...codeEditorPlaygroundSections.layoutOptions },
        { id: 'validationAndReadOnly', ...codeEditorPlaygroundSections.validationAndReadOnly },
    ],
};

export const codeEditorSectionIds = codeEditorPlaygroundSpec.sections.map((section) => section.id);
