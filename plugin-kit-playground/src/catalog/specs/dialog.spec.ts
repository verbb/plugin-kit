import { dialogPlaygroundMeta, dialogPlaygroundSections } from '../data/meta-dialog.js';
import type { PlaygroundSpec } from '../types.js';

export type DialogSectionId = keyof typeof dialogPlaygroundSections;

/** Single source of truth for Dialog playground section order and copy. */
export const dialogPlaygroundSpec: PlaygroundSpec = {
    meta: dialogPlaygroundMeta,
    sections: [
        { id: 'basicUsage', ...dialogPlaygroundSections.basicUsage },
        { id: 'confirmation', ...dialogPlaygroundSections.confirmation },
        { id: 'scrollable', ...dialogPlaygroundSections.scrollable },
        { id: 'initialFocus', ...dialogPlaygroundSections.initialFocus },
    ],
};

export const dialogSectionIds = dialogPlaygroundSpec.sections.map((section) => section.id);
