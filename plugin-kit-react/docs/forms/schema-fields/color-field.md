# ColorField

## Basic Usage

Use `ColorField` when the schema needs a color value with standard field UI and validation support.

<ComponentPreview src="./examples/color-field-basic.preview.tsx" />

## Registry

- **Key:** `color`
- **Module:** `src/forms/fields/ColorField.tsx`

## Role in SchemaForm

Color value using **`ColorInput`** (or related kit primitive) with **`FieldLayout`** and engine binding.

## Example schema

```json
{
  "$field": "color",
  "name": "brandColor",
  "label": "Brand color"
}
```

## Related

- Plain component docs: [ColorInput](../../components/color-input.md)
