# StaticTableField

## Basic Usage

Use `StaticTableField` when the schema needs fixed rows with editable values.

<ComponentPreview src="./examples/static-table-field-basic.preview.tsx" />

## Registry

- **Key:** `staticTable`
- **Module:** `src/forms/fields/StaticTableField.tsx`

## Role in SchemaForm

Fixed-row table UI backed by **`EditableTable`**: **`field.rows`** defines row keys/defaults; **`field.columns`** defines column types (`heading`, `label`, or editable types with `name`). The form value is an **object** keyed by row id (`key` / `name` on each row config), each value either a scalar (single editable column) or a record of column values.

## Example schema

```json
{
  "$field": "staticTable",
  "name": "pricing",
  "label": "Pricing",
  "rows": [
    { "key": "standard", "label": "Standard" }
  ],
  "columns": [
    { "name": "amount", "type": "text", "heading": "Amount" }
  ]
}
```

See `StaticTableField.tsx` for full column/row normalization.

## Related

- Plain component docs: [EditableTable](../../components/editable-table.md)
