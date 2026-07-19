import { editableTablePlaygroundMeta, editableTablePlaygroundSections } from '../data/meta-editable-table.js';
import type { PlaygroundSpec } from '../types.js';

export type EditableTableSectionId = keyof typeof editableTablePlaygroundSections;

/** Single source of truth for EditableTable playground section order and copy (docs parity). */
export const editableTablePlaygroundSpec: PlaygroundSpec = {
    meta: editableTablePlaygroundMeta,
    sections: [
        { id: 'mixedFieldTypes', ...editableTablePlaygroundSections.mixedFieldTypes },
        { id: 'cellValidation', ...editableTablePlaygroundSections.cellValidation },
        { id: 'derivedColumns', ...editableTablePlaygroundSections.derivedColumns },
        { id: 'compactSelectionColumns', ...editableTablePlaygroundSections.compactSelectionColumns },
    ],
};

export const editableTableSectionIds = editableTablePlaygroundSpec.sections.map((section) => section.id);
