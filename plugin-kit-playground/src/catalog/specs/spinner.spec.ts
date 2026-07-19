import { spinnerPlaygroundMeta, spinnerPlaygroundSections } from '../data/meta-spinner.js';
import type { PlaygroundSpec } from '../types.js';

export type SpinnerSectionId =
    | keyof typeof spinnerPlaygroundSections
    | 'buttonLoadingOverrides';

/** Single source of truth for Spinner playground section order and copy. */
export const spinnerPlaygroundSpec: PlaygroundSpec = {
    meta: spinnerPlaygroundMeta,
    sections: [
        { id: 'basic', ...spinnerPlaygroundSections.basic },
        { id: 'colors', ...spinnerPlaygroundSections.colors },
        { id: 'buttonVariants', ...spinnerPlaygroundSections.buttonVariants },
        { id: 'sizes', ...spinnerPlaygroundSections.sizes },
        {
            id: 'buttonLoadingOverrides',
            title: 'Button loading overrides',
            description: 'Spinner variant and tone overrides for advanced button loading states.',
        },
    ],
};

export const spinnerSectionIds = spinnerPlaygroundSpec.sections.map((section) => section.id);
