# EditableTableField

## Basic Usage

Use `EditableTableField` when the schema needs editable rows and columns backed by array data.

<ComponentPreview src="./examples/editable-table-field-basic.preview.tsx" />

## Registry

- **Key:** `table`
- **Module:** `src/forms/fields/EditableTableField.tsx`

## Role in SchemaForm

Tabular data backed by an array value. Uses **`useEditableTableFieldBinding`** (`src/forms/useEditableTableFieldBinding.ts`) to:

- Track row-level error paths under `${fieldName}.*`
- Surface grouped errors via `getGroupedErrorsForPath` when available

Formie registers a custom implementation for the same key in some builds (`FormieEditableTableField`); the kit default remains **`EditableTableField`**.

## Example schema

```json
{
  "$field": "table",
  "name": "columns",
  "label": "Columns",
  "columns": []
}
```

Column metadata is schema-driven; see source types for `columns` entries.

## Related

- Plain component docs: [EditableTable](../../components/editable-table.md)
- `useEditableTableFieldBinding` in [SchemaForm API](../../api/schema-form-api.md)
