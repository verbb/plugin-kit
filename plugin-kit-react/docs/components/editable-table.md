# EditableTable

Editable tables are useful when related values need to be authored in rows instead of isolated fields.

## Mixed Field Types

An editable table can combine text, selects, booleans, colors, dates, and longer freeform notes in the same row model.

<ComponentPreview src="./examples/editable-table-mixed-field-types.preview.tsx" />

## Cell Validation

Validation can be targeted per cell by combining a `fieldName` with a `cellErrors` map.

<ComponentPreview src="./examples/editable-table-cell-validation.preview.tsx" />

## Derived Columns

Handle and value columns can derive from a source field without overwriting existing content.

<ComponentPreview src="./examples/editable-table-derived-columns.preview.tsx" />

## Compact Selection Columns

Use `thin` checkbox columns or radio-style exclusivity when the table is modeling option lists.

<ComponentPreview src="./examples/editable-table-compact-selection.preview.tsx" />
