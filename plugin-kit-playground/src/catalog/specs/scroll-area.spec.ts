import { scrollAreaPlaygroundMeta, scrollAreaPlaygroundSections } from '../data/meta-scroll-area.js';
import type { PlaygroundSpec } from '../types.js';

export type ScrollAreaSectionId = keyof typeof scrollAreaPlaygroundSections;

/** Single source of truth for ScrollArea playground section order and copy. */
export const scrollAreaPlaygroundSpec: PlaygroundSpec = {
    meta: scrollAreaPlaygroundMeta,
    sections: [
        { id: 'basic', ...scrollAreaPlaygroundSections.basic },
    ],
};

export const scrollAreaSectionIds = scrollAreaPlaygroundSpec.sections.map((section) => section.id);
