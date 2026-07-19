import { toggleGroupPlaygroundMeta, toggleGroupPlaygroundSections } from '../data/meta-toggle-group.js';
import type { PlaygroundSpec } from '../types.js';

export type ToggleGroupSectionId = keyof typeof toggleGroupPlaygroundSections;

/** Single source of truth for Toggle Group playground section order and copy. */
export const toggleGroupPlaygroundSpec: PlaygroundSpec = {
    meta: toggleGroupPlaygroundMeta,
    sections: [
        { id: 'basicUsage', ...toggleGroupPlaygroundSections.basicUsage },
        { id: 'variants', ...toggleGroupPlaygroundSections.variants },
        { id: 'sizes', ...toggleGroupPlaygroundSections.sizes },
        { id: 'orientation', ...toggleGroupPlaygroundSections.orientation },
        { id: 'spacing', ...toggleGroupPlaygroundSections.spacing },
        { id: 'selection', ...toggleGroupPlaygroundSections.selection },
    ],
};

export const toggleGroupSectionIds = toggleGroupPlaygroundSpec.sections.map((section) => section.id);
