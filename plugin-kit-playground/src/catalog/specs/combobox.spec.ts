import { comboboxPlaygroundMeta, comboboxPlaygroundSections } from '../data/meta-combobox.js';
import type { PlaygroundSpec } from '../types.js';

export type ComboboxSectionId = keyof typeof comboboxPlaygroundSections;

/** Single source of truth for Combobox playground section order and copy. */
export const comboboxPlaygroundSpec: PlaygroundSpec = {
    meta: comboboxPlaygroundMeta,
    sections: [
        { id: 'basic', overflowVisible: true, ...comboboxPlaygroundSections.basic },
        { id: 'withClear', overflowVisible: true, ...comboboxPlaygroundSections.withClear },
        { id: 'grouped', overflowVisible: true, ...comboboxPlaygroundSections.grouped },
        { id: 'multiple', overflowVisible: true, ...comboboxPlaygroundSections.multiple },
        { id: 'popupMode', overflowVisible: true, ...comboboxPlaygroundSections.popupMode },
        { id: 'sizes', overflowVisible: true, ...comboboxPlaygroundSections.sizes },
        { id: 'allowCreate', overflowVisible: true, ...comboboxPlaygroundSections.allowCreate },
        { id: 'allowCustomValue', overflowVisible: true, ...comboboxPlaygroundSections.allowCustomValue },
        { id: 'asyncSearch', overflowVisible: true, ...comboboxPlaygroundSections.asyncSearch },
    ],
};

export const comboboxSectionIds = comboboxPlaygroundSpec.sections.map((section) => section.id);
