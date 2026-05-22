# ComboboxField

## Basic Usage

Use `ComboboxField` when the schema needs a searchable select-style input.

<ComponentPreview src="./examples/combobox-field-basic.preview.tsx" />

## Registry

- **Key:** `combobox`
- **Module:** `src/forms/fields/ComboboxField.tsx`

## Role in SchemaForm

Searchable select using **`ComboboxInput`**. Supports static **`options`**, async **`fetchOptions`**, **`multiple`**, **`placeholder`**, **`emptyMessage`**, and optional client cache via **`cacheKey`** / **`cacheTtlMs`**.

## Example schema

```json
{
  "$field": "combobox",
  "name": "country",
  "label": "Country",
  "multiple": false,
  "options": [{ "value": "us", "label": "United States" }]
}
```

## Related

- Plain component docs: [Combobox](../../components/combobox.md)
