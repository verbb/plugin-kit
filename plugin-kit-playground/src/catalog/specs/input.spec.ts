import { inputPlaygroundComparison } from '../data/comparison.js';
import { inputPlaygroundMeta, inputPlaygroundSections } from '../data/meta-input.js';
import type { PlaygroundSpec } from '../types.js';

export type InputSectionId =
    | keyof typeof inputPlaygroundComparison
    | keyof typeof inputPlaygroundSections;

/** Single source of truth for Input playground section order and copy. */
export const inputPlaygroundSpec: PlaygroundSpec = {
    meta: inputPlaygroundMeta,
    sections: [
        { id: 'craftComparison', bare: true, ...inputPlaygroundComparison.craftComparison },
        { id: 'basicUsage', ...inputPlaygroundSections.basicUsage },
        { id: 'sizes', ...inputPlaygroundSections.sizes },
        { id: 'widths', ...inputPlaygroundSections.widths },
        { id: 'inputGroup', ...inputPlaygroundSections.inputGroup },
        { id: 'inputGroupIcon', ...inputPlaygroundSections.inputGroupIcon },
        { id: 'inputGroupText', ...inputPlaygroundSections.inputGroupText },
        { id: 'inputGroupButton', ...inputPlaygroundSections.inputGroupButton },
        { id: 'validation', ...inputPlaygroundSections.validation },
        { id: 'disabled', ...inputPlaygroundSections.disabled },
    ],
};

export const inputSectionIds = inputPlaygroundSpec.sections.map((section) => section.id);
