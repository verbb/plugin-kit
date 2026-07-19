import { copyButtonPlaygroundMeta, copyButtonPlaygroundSections } from '../data/meta-copy-button.js';
import type { PlaygroundSpec } from '../types.js';

export type CopyButtonSectionId = keyof typeof copyButtonPlaygroundSections;

/** Single source of truth for CopyButton playground section order and copy. */
export const copyButtonPlaygroundSpec: PlaygroundSpec = {
    meta: copyButtonPlaygroundMeta,
    sections: [
        { id: 'basicUsage', overflowVisible: true, ...copyButtonPlaygroundSections.basicUsage },
        { id: 'variants', overflowVisible: true, ...copyButtonPlaygroundSections.variants },
    ],
};

export const copyButtonSectionIds = copyButtonPlaygroundSpec.sections.map((section) => section.id);
