import { fieldPlaygroundMeta, fieldPlaygroundSections } from '../data/meta-field.js';
import type { PlaygroundSpec } from '../types.js';

export type FieldSectionId = keyof typeof fieldPlaygroundSections;

/** Single source of truth for Field playground section order and copy. */
export const fieldPlaygroundSpec: PlaygroundSpec = {
    meta: fieldPlaygroundMeta,
    sections: [
        { id: 'standaloneLabels', ...fieldPlaygroundSections.standaloneLabels },
        { id: 'errorsAndWarnings', ...fieldPlaygroundSections.errorsAndWarnings },
        { id: 'translatable', ...fieldPlaygroundSections.translatable },
        { id: 'tip', ...fieldPlaygroundSections.tip },
        { id: 'inlineCode', ...fieldPlaygroundSections.inlineCode },
        { id: 'headerEnd', ...fieldPlaygroundSections.headerEnd },
    ],
};

export const fieldSectionIds = fieldPlaygroundSpec.sections.map((section) => section.id);
