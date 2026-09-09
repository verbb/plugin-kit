# AutocompleteField

## Basic Usage

Use `AutocompleteField` when the schema needs freeform text with optional
suggestions (paths, aliases, env tokens). Unlike ComboboxField, the typed value
is always the answer — suggestions only help complete it.

<ComponentPreview src="./examples/autocomplete-field-basic.preview.tsx" />

## Registry

- **Key:** `autocomplete`
- **Module:** `src/forms/fields/AutocompleteField.tsx`

## Role in SchemaForm

Freeform suggest using **`AutocompleteInput`**. Supports static **`options`**,
async **`fetchOptions`**, **`placeholder`**, **`emptyMessage`**, **`showClear`**,
and Field **`warning`** for plugin-owned existence checks (no kit filesystem scan).

## Example schema

```json
{
  "$field": "autocomplete",
  "name": "iconsPath",
  "label": "Icons Path",
  "placeholder": "Type a path or pick an alias…",
  "warning": "This path does not exist yet.",
  "options": [
    { "value": "@webroot/", "label": "@webroot/" },
    { "value": "@webroot/cpnav-icons/", "label": "@webroot/cpnav-icons/" }
  ]
}
```

## Related

- Plain component docs: [Autocomplete](../../react/components/autocomplete.md)
- Selection-first alternative: [ComboboxField](./combobox-field.md)
