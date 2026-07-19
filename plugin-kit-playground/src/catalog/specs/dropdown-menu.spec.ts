import { dropdownMenuPlaygroundMeta, dropdownMenuPlaygroundSections } from '../data/meta-dropdown-menu.js';
import type { PlaygroundSpec } from '../types.js';

export type DropdownMenuSectionId = keyof typeof dropdownMenuPlaygroundSections;

/** Single source of truth for DropdownMenu playground section order and copy. */
export const dropdownMenuPlaygroundSpec: PlaygroundSpec = {
    meta: dropdownMenuPlaygroundMeta,
    sections: [
        { id: 'basicUsage', overflowVisible: true, ...dropdownMenuPlaygroundSections.basicUsage },
        { id: 'grouped', overflowVisible: true, ...dropdownMenuPlaygroundSections.grouped },
        { id: 'triggers', overflowVisible: true, ...dropdownMenuPlaygroundSections.triggers },
        { id: 'submenus', overflowVisible: true, ...dropdownMenuPlaygroundSections.submenus },
        { id: 'selection', overflowVisible: true, ...dropdownMenuPlaygroundSections.selection },
        { id: 'disabledItems', overflowVisible: true, ...dropdownMenuPlaygroundSections.disabledItems },
        { id: 'icons', overflowVisible: true, ...dropdownMenuPlaygroundSections.icons },
        { id: 'sizes', overflowVisible: true, ...dropdownMenuPlaygroundSections.sizes },
    ],
};

export const dropdownMenuSectionIds = dropdownMenuPlaygroundSpec.sections.map((section) => section.id);
