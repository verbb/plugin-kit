# LightswitchField

## Basic Usage

Use `LightswitchField` when the schema needs a simple boolean toggle.

<ComponentPreview src="./examples/lightswitch-field-basic.preview.tsx" />

## Registry

- **Key:** `lightswitch`
- **Module:** `src/forms/fields/LightswitchField.tsx`

## Role in SchemaForm

Boolean toggle using **`Lightswitch`** component + **`FieldLayout`**, storing `true` / `false` (or empty) in the form store per binding logic.

## Example schema

```json
{
  "$field": "lightswitch",
  "name": "enabled",
  "label": "Enabled"
}
```

## Related

- Plain component docs: [Lightswitch](../../components/lightswitch.md)
