import { selectPlaygroundComparison } from '../data/comparison.js';
import { selectPlaygroundMeta, selectPlaygroundSections } from '../data/meta-select.js';
import type { PlaygroundSpec } from '../types.js';

export type SelectSectionId =
    | keyof typeof selectPlaygroundComparison
    | keyof typeof selectPlaygroundSections;

/** Single source of truth for Select playground section order and copy. */
export const selectPlaygroundSpec: PlaygroundSpec = {
    meta: selectPlaygroundMeta,
    sections: [
        { id: 'craftComparison', bare: true, ...selectPlaygroundComparison.craftComparison },
        { id: 'basicUsage', overflowVisible: true, ...selectPlaygroundSections.basicUsage },
        { id: 'sizes', overflowVisible: true, ...selectPlaygroundSections.sizes },
        { id: 'widths', overflowVisible: true, ...selectPlaygroundSections.widths },
        { id: 'grouped', overflowVisible: true, ...selectPlaygroundSections.grouped },
        { id: 'longList', overflowVisible: true, ...selectPlaygroundSections.longList },
        { id: 'decorations', overflowVisible: true, ...selectPlaygroundSections.decorations },
        { id: 'statusInput', overflowVisible: true, ...selectPlaygroundSections.statusInput },
        { id: 'multiple', overflowVisible: true, ...selectPlaygroundSections.multiple },
        { id: 'clearable', overflowVisible: true, ...selectPlaygroundSections.clearable },
    ],
};

export const selectSectionIds = selectPlaygroundSpec.sections.map((section) => section.id);
