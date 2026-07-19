import { popoverPlaygroundMeta, popoverPlaygroundSections } from '../data/meta-popover.js';
import type { PlaygroundSpec } from '../types.js';

export type PopoverSectionId = keyof typeof popoverPlaygroundSections;

/** Single source of truth for Popover playground section order and copy. */
export const popoverPlaygroundSpec: PlaygroundSpec = {
    meta: popoverPlaygroundMeta,
    sections: [
        { id: 'basicUsage', overflowVisible: true, ...popoverPlaygroundSections.basicUsage },
        { id: 'placement', overflowVisible: true, ...popoverPlaygroundSections.placement },
        { id: 'withArrow', overflowVisible: true, ...popoverPlaygroundSections.withArrow },
        { id: 'formContent', overflowVisible: true, ...popoverPlaygroundSections.formContent },
    ],
};

export const popoverSectionIds = popoverPlaygroundSpec.sections.map((section) => section.id);
