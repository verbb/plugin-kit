# TextareaField

## Basic Usage

Use `TextareaField` when the schema needs multi-line text input.

<ComponentPreview src="./examples/textarea-field-basic.preview.tsx" />

## Registry

- **Key:** `textarea`
- **Module:** `src/forms/fields/TextareaField.tsx`

## Role in SchemaForm

Multi-line text using the **`Textarea`** component and **`FieldLayout`**, with **`useEngineField`** for store binding.

## Common `field` props

`name`, `label`, `instructions`, `warning`, `placeholder`, `required`, `disabled`, optional rows/cols if present on schema node (forwarded per implementation).

## Example schema

```json
{
  "$field": "textarea",
  "name": "description",
  "label": "Description",
  "validation": "max:2000"
}
```

## Related

- Plain component docs: [Textarea](../../react/components/textarea.md)
