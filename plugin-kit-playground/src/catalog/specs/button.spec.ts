import { buttonPlaygroundMeta, buttonPlaygroundSections } from '../data/meta-button.js';
import type { PlaygroundSpec } from '../types.js';

export type ButtonSectionId = keyof typeof buttonPlaygroundSections;

/** Single source of truth for Button playground section order and copy. */
export const buttonPlaygroundSpec: PlaygroundSpec = {
    meta: buttonPlaygroundMeta,
    sections: [
        { id: 'craftComparison', bare: true, ...buttonPlaygroundSections.craftComparison },
        { id: 'variantsAndSizes', ...buttonPlaygroundSections.variantsAndSizes },
        { id: 'icons', ...buttonPlaygroundSections.icons },
        { id: 'loading', ...buttonPlaygroundSections.loading },
    ],
};

export const buttonSectionIds = buttonPlaygroundSpec.sections.map((section) => section.id);
