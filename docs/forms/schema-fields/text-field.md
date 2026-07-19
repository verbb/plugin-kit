# TextField

## Basic Usage

Use `TextField` when the schema needs a standard single-line text input bound to one value.

<ComponentPreview src="./examples/text-field-basic.preview.tsx" />

## Registry

- **Key:** `text` (`$field: 'text'` or `type: 'text'` with default `$field` resolution)
- **Module:** `src/forms/fields/TextField.tsx`
- **Contract:** `SchemaFormFieldComponent` — receives `{ form, field, schema }`.

## Role in SchemaForm

Renders a single-line **`Input`** inside **`FieldLayout`**, bound with **`useEngineField(form, field.name)`**. Value is coerced with `String(value ?? '')`.

## Common `field` props

`name` (required), `label`, `instructions`, `warning`, `placeholder`, `required`, `disabled`. Validation uses the shared engine pipeline from `field.validation` / `required`.

## Example schema

```json
{
  "$field": "text",
  "name": "title",
  "label": "Title",
  "required": true,
  "validation": "required|max:255"
}
```

## Related

- Plain component docs: [Input](../../react/components/input.md)
- [Schema Fields](../schema-fields.md) · [Conditions](../conditions.md)
