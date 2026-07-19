import { iconPlaygroundMeta, iconPlaygroundSections } from '../data/meta-icon.js';
import type { PlaygroundSpec } from '../types.js';

export type IconSectionId = keyof typeof iconPlaygroundSections;

/** Single source of truth for Icon playground section order and copy. */
export const iconPlaygroundSpec: PlaygroundSpec = {
    meta: iconPlaygroundMeta,
    sections: [
        { id: 'common', ...iconPlaygroundSections.common },
        { id: 'sizing', ...iconPlaygroundSections.sizing },
        { id: 'color', ...iconPlaygroundSections.color },
        { id: 'inContext', overflowVisible: true, ...iconPlaygroundSections.inContext },
        { id: 'accessibility', ...iconPlaygroundSections.accessibility },
        { id: 'gallery', ...iconPlaygroundSections.gallery },
    ],
};

export const iconSectionIds = iconPlaygroundSpec.sections.map((section) => section.id);
