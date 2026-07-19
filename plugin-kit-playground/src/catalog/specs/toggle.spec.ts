import { togglePlaygroundMeta, togglePlaygroundSections } from '../data/meta-toggle.js';
import type { PlaygroundSpec } from '../types.js';

export type ToggleSectionId = keyof typeof togglePlaygroundSections;

/** Single source of truth for Toggle playground section order and copy. */
export const togglePlaygroundSpec: PlaygroundSpec = {
    meta: togglePlaygroundMeta,
    sections: [
        { id: 'basicUsage', ...togglePlaygroundSections.basicUsage },
        { id: 'variants', ...togglePlaygroundSections.variants },
        { id: 'sizes', ...togglePlaygroundSections.sizes },
        { id: 'pressed', ...togglePlaygroundSections.pressed },
        { id: 'disabled', ...togglePlaygroundSections.disabled },
    ],
};

export const toggleSectionIds = togglePlaygroundSpec.sections.map((section) => section.id);
