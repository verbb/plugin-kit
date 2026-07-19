import { statusPlaygroundMeta, statusPlaygroundSections } from '../data/meta-status.js';
import type { PlaygroundSpec } from '../types.js';

export type StatusSectionId = keyof typeof statusPlaygroundSections;

/** Single source of truth for Status playground section order and copy. */
export const statusPlaygroundSpec: PlaygroundSpec = {
    meta: statusPlaygroundMeta,
    sections: [
        { id: 'variants', ...statusPlaygroundSections.variants },
    ],
};

export const statusSectionIds = statusPlaygroundSpec.sections.map((section) => section.id);
