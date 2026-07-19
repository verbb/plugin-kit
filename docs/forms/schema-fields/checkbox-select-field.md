# CheckboxSelectField

## Basic Usage

Use `CheckboxSelectField` when the schema needs a multi-select checkbox list.

<ComponentPreview src="./examples/checkbox-select-field-basic.preview.tsx" />

## Registry

- **Key:** `checkboxSelect`
- **Module:** `src/forms/fields/CheckboxSelectField.tsx`

## Role in SchemaForm

Multi-select via **`CheckboxSelect`**. Value is an array (`CheckboxSelectValue`); props include **`options`**, optional **`showAllOption`**, **`allLabel`**, **`required`**, **`disabled`**.

## Example schema

```json
{
  "$field": "checkboxSelect",
  "name": "tags",
  "label": "Tags",
  "showAllOption": true,
  "options": [
    { "value": "a", "label": "Option A" },
    { "value": "b", "label": "Option B" }
  ]
}
```

## Related

- Plain component docs: [CheckboxSelect](../../react/components/checkbox-select.md)
