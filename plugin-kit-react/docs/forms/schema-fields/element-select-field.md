# ElementSelectField

## Basic Usage

Use `ElementSelectField` when the schema needs to select Craft elements through the host UI.

<ComponentPreview src="./examples/element-select-field-basic.preview.tsx" />

## Registry

- **Key:** `elementSelect`
- **Module:** `src/forms/fields/ElementSelectField.tsx`

## Role in SchemaForm

Craft element selection using the host bridge’s **`openElementSelector`** / request APIs to search and persist element IDs in form state.

Requires **`configurePluginKitReact({ hostBridge: createCraftHostBridge() })`** (or equivalent) in CP.

## Example schema

```json
{
  "$field": "elementSelect",
  "name": "relatedEntry",
  "label": "Related entry"
}
```

Element type and sources are typically schema-driven; verify prop names in `ElementSelectField.tsx`.

## Related

- Related component docs: [Button](../../components/button.md), [Spinner](../../components/spinner.md), and [Status](../../components/status.md)
