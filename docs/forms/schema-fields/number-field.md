# NumberField

## Basic Usage

Use `NumberField` when the schema needs numeric input with standard field UI and validation.

<ComponentPreview src="./examples/number-field-basic.preview.tsx" />

## Registry

- **Key:** `number`
- **Module:** `src/forms/fields/NumberField.tsx`

## Role in SchemaForm

Numeric input: **`Input`** with **`type="number"`**, optional **`size`**, bound with **`useEngineField`**.

## Notes

Pair with `validation` rules such as `min`, `max`, or `integer` where supported by `utils/validation.ts` rule parsing.

## Example schema

```json
{
  "$field": "number",
  "name": "capacity",
  "label": "Capacity",
  "validation": "min:1|max:100"
}
```

## Related

- Plain component docs: [Input](../../react/components/input.md)
