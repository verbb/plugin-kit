import { checkboxPlaygroundComparison } from '../data/comparison.js';
import { checkboxPlaygroundMeta, checkboxPlaygroundSections } from '../data/meta-checkbox.js';
import type { PlaygroundSpec } from '../types.js';

export type CheckboxSectionId =
    | keyof typeof checkboxPlaygroundComparison
    | keyof typeof checkboxPlaygroundSections;

/** Single source of truth for Checkbox playground section order and copy. */
export const checkboxPlaygroundSpec: PlaygroundSpec = {
    meta: checkboxPlaygroundMeta,
    sections: [
        { id: 'craftComparison', bare: true, ...checkboxPlaygroundComparison.craftComparison },
        { id: 'groupSpacing', ...checkboxPlaygroundComparison.groupSpacing },
        { id: 'basicUsage', ...checkboxPlaygroundSections.basicUsage },
        { id: 'checked', ...checkboxPlaygroundSections.checked },
        { id: 'disabled', ...checkboxPlaygroundSections.disabled },
        { id: 'hint', ...checkboxPlaygroundSections.hint },
    ],
};

export const checkboxSectionIds = checkboxPlaygroundSpec.sections.map((section) => section.id);
