import { checkboxSelectPlaygroundComparison } from '../data/comparison.js';
import { checkboxSelectPlaygroundMeta, checkboxSelectPlaygroundSections } from '../data/meta-checkbox-select.js';
import type { PlaygroundSpec } from '../types.js';

export type CheckboxSelectSectionId =
    | keyof typeof checkboxSelectPlaygroundComparison
    | keyof typeof checkboxSelectPlaygroundSections;

/** Single source of truth for CheckboxSelect playground section order and copy. */
export const checkboxSelectPlaygroundSpec: PlaygroundSpec = {
    meta: checkboxSelectPlaygroundMeta,
    sections: [
        { id: 'craftComparison', bare: true, ...checkboxSelectPlaygroundComparison.craftComparison },
        { id: 'basic', ...checkboxSelectPlaygroundSections.basic },
        { id: 'withAll', ...checkboxSelectPlaygroundSections.withAll },
        { id: 'withLabel', ...checkboxSelectPlaygroundSections.withLabel },
    ],
};

export const checkboxSelectSectionIds = checkboxSelectPlaygroundSpec.sections.map((section) => section.id);
