import { separatorPlaygroundMeta, separatorPlaygroundSections } from '../data/meta-separator.js';
import type { PlaygroundSpec } from '../types.js';

export type SeparatorSectionId = keyof typeof separatorPlaygroundSections;

/** Single source of truth for Separator playground section order and copy. */
export const separatorPlaygroundSpec: PlaygroundSpec = {
    meta: separatorPlaygroundMeta,
    sections: [
        { id: 'horizontal', ...separatorPlaygroundSections.horizontal },
        { id: 'vertical', ...separatorPlaygroundSections.vertical },
    ],
};

export const separatorSectionIds = separatorPlaygroundSpec.sections.map((section) => section.id);
