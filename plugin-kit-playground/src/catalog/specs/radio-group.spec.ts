import { radioPlaygroundComparison } from '../data/comparison.js';
import { radioGroupPlaygroundMeta, radioGroupPlaygroundSections } from '../data/meta-radio-group.js';
import type { PlaygroundSpec } from '../types.js';

export type RadioGroupSectionId =
    | keyof typeof radioPlaygroundComparison
    | keyof typeof radioGroupPlaygroundSections;

/** Single source of truth for RadioGroup playground section order and copy. */
export const radioGroupPlaygroundSpec: PlaygroundSpec = {
    meta: radioGroupPlaygroundMeta,
    sections: [
        { id: 'craftComparison', bare: true, ...radioPlaygroundComparison.craftComparison },
        { id: 'basicUsage', ...radioGroupPlaygroundSections.basicUsage },
        { id: 'supportingDescriptions', ...radioGroupPlaygroundSections.supportingDescriptions },
        { id: 'disabledOptions', ...radioGroupPlaygroundSections.disabledOptions },
        { id: 'layoutAndError', ...radioGroupPlaygroundSections.layoutAndError },
    ],
};

export const radioGroupSectionIds = radioGroupPlaygroundSpec.sections.map((section) => section.id);
