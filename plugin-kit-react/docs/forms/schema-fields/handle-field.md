# HandleField

## Basic Usage

Use `HandleField` when the schema needs a Craft-style handle or slug input.

<ComponentPreview src="./examples/handle-field-basic.preview.tsx" />

## Registry

- **Key:** `handle`
- **Module:** `src/forms/fields/HandleField.tsx`

## Role in SchemaForm

Slug/handle input with helpers from **`utils/handle`** (for example reserved handle checks / uniqueness UX—see source). Uses **`FieldLayout`** and engine binding.

## Example schema

```json
{
  "$field": "handle",
  "name": "handle",
  "label": "Handle",
  "required": true
}
```

Use when the CP should mirror Craft-style handle generation behavior bundled in the kit.

## Related

- Plain component docs: [Input](../../components/input.md)
