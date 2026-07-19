import { colorInputPlaygroundMeta, colorInputPlaygroundSections } from '../data/meta-color-input.js';
import type { PlaygroundSpec } from '../types.js';

export type ColorInputSectionId = keyof typeof colorInputPlaygroundSections;

/** Single source of truth for Color Input playground section order and copy. */
export const colorInputPlaygroundSpec: PlaygroundSpec = {
    meta: colorInputPlaygroundMeta,
    sections: [
        { id: 'basic', ...colorInputPlaygroundSections.basic },
        { id: 'resolved', ...colorInputPlaygroundSections.resolved },
        { id: 'sizes', ...colorInputPlaygroundSections.sizes },
        { id: 'states', ...colorInputPlaygroundSections.states },
    ],
};

export const colorInputSectionIds = colorInputPlaygroundSpec.sections.map((section) => section.id);
