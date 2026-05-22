# SelectField

## Basic Usage

Use `SelectField` when the schema needs a standard dropdown choice.

<ComponentPreview src="./examples/select-field-basic.preview.tsx" />

## Registry

- **Key:** `select`
- **Module:** `src/forms/fields/SelectField.tsx`

## Role in SchemaForm

Dropdown selection using **`SelectInput`**, bound via **`useEngineField`**. Options come from **`field.options`**: `{ value, label, disabled?, if? }[]`. Option visibility can use per-option **`if`** (JEXL) with the same condition data pattern as the main schema.

## Example schema

```json
{
  "$field": "select",
  "name": "status",
  "label": "Status",
  "options": [
    { "value": "live", "label": "Live" },
    { "value": "draft", "label": "Draft" }
  ]
}
```

## Related

- Plain component docs: [Select](../../components/select.md)
