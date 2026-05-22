# RadioGroupField

## Basic Usage

Use `RadioGroupField` when the schema needs a single choice from a small set of visible options.

<ComponentPreview src="./examples/radio-group-field-basic.preview.tsx" />

## Supporting Descriptions

When each radio choice needs a little more context, add a `description` to the option so the user can understand the tradeoff without extra surrounding copy.

<ComponentPreview src="./examples/radio-group-field-supporting-descriptions.preview.tsx" />

## Registry

- **Key:** `radioGroup`
- **Module:** `src/forms/fields/RadioGroupField.tsx`

## Role in SchemaForm

Single-value choice UI using **`RadioGroup`** and **`RadioGroupItem`**, bound via **`useEngineField`**. Options come from **`field.options`**: `{ value, label, description?, disabled?, if? }[]`. Option visibility can use per-option **`if`** (JEXL), just like `SelectField`.

## Example schema

```json
{
  "$field": "radioGroup",
  "name": "audience",
  "label": "Audience",
  "options": [
    { "value": "team", "label": "Team" },
    { "value": "private", "label": "Private" }
  ]
}
```

## Related

- Plain component docs: [RadioGroup](../../components/radio-group.md)
