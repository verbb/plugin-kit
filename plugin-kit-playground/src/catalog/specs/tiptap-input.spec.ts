import type { PlaygroundSpec } from '../types.js';

export type TiptapInputSectionId = 'basicUsage';

/** Single source of truth for TiptapInput playground section order and copy. */
export const tiptapInputPlaygroundSpec: PlaygroundSpec = {
    meta: {
        eyebrow: 'Components',
        title: 'TiptapInput',
        description: 'Single-line tokenized Tiptap field.',
    },
    sections: [
        {
            id: 'basicUsage',
            title: 'Basic usage',
            description: 'Plain string value with inline variable tags.',
        },
    ],
};

export const tiptapInputSectionIds = tiptapInputPlaygroundSpec.sections.map((section) => section.id);
