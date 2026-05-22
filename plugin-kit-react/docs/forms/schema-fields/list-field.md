# ListField

## Basic Usage

Use `ListField` when the schema needs a repeatable set of nested field rows.

<ComponentPreview src="./examples/list-field-basic.preview.tsx" />

## Registry

- **Key:** `list`
- **Module:** `src/forms/fields/ListField.tsx`

## Role in SchemaForm

Binds to an **array** value at `field.name`. For each index, it renders **`field.schema`** through **`form.SchemaRenderer`**, rewriting nested `$field` names to `${field.name}.${index}.${childName}` and attaching **`_data.$item` / `$key`** on nodes for JEXL or UI. Uses **`getGroupedErrorsForPath`** for row errors unless **`showGroupedErrors`** is `false`.

## Example schema

```json
{
  "$field": "list",
  "name": "items",
  "label": "Items",
  "schema": [
    { "$field": "text", "name": "title", "label": "Row title" }
  ]
}
```

The store value must be an array; each row’s fields live under indexed paths as above.

## Related

- Child controls usually map to plain component docs like [Input](../../components/input.md).
