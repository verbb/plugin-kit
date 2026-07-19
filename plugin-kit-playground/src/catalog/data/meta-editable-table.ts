import {
    editableTableCellValidation,
    editableTableCompactSelection,
    editableTableDerivedColumns,
    editableTableMixedFieldTypes,
    type EditableTableDemo,
} from '../../../../docs/web/components/examples/editable-table.fixtures.js';

export const editableTablePlaygroundMeta = {
    eyebrow: 'Components',
    title: 'EditableTable',
    description: 'Inline-editable table with mixed cell types, derived columns, validation, and row affordances.',
} as const;

/**
 * Section copy matches docs/web/components/editable-table.md.
 * Demo data is imported from the docs fixtures (single source of truth).
 */
export const editableTablePlaygroundSections = {
    mixedFieldTypes: {
        title: 'Mixed Field Types',
        description: 'An editable table can combine text, selects, booleans, colors, dates, and longer freeform notes in the same row model.',
        demo: editableTableMixedFieldTypes,
    },
    cellValidation: {
        title: 'Cell Validation',
        description: 'Validation can be targeted per cell by combining a `fieldName` with a `cellErrors` map.',
        demo: editableTableCellValidation,
    },
    derivedColumns: {
        title: 'Derived Columns',
        description: 'Handle and value columns can derive from a source field without overwriting existing content.',
        demo: editableTableDerivedColumns,
    },
    compactSelectionColumns: {
        title: 'Compact Selection Columns',
        description: 'Use `thin` checkbox columns or radio-style exclusivity when the table is modeling option lists.',
        demo: editableTableCompactSelection,
    },
} as const;

export type { EditableTableDemo };
