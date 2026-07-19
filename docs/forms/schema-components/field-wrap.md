# FieldWrap

`FieldWrap` is a **schema registry component** (`$cmp: 'FieldWrap'`) defined in `src/forms/components/FieldWrap.tsx`. It is **not** a general-purpose layout primitive; the engine instantiates it when the schema references this `$cmp` key.

## Basic Usage

Use `FieldWrap` when several related fields should read like one grouped section with a shared label and grouped error display.

<ComponentPreview src="./examples/field-wrap-basic.preview.tsx" />

## Role

- Subscribes to **`useSchemaEngineContext()`** and the form store’s error map.
- Collects nested field names from **`schemaNode.children`** to aggregate validation messages for the wrapped subtree.
- Renders **`FieldLayout`** with merged errors, optional **`InlineFieldErrorVisibilityContext`** suppression for nested inline errors, and reformats some attribute-style messages using the wrapper **`label`**.

## Typical schema

```json
{
  "$cmp": "FieldWrap",
  "name": "settings",
  "label": "Settings",
  "instructions": "Optional help text.",
  "required": true,
  "children": [
    { "$field": "text", "name": "settings.title", "label": "Title" }
  ]
}
```

Props like `name`, `label`, `instructions`, `required`, `warning` come from the schema node (and merge with top-level keys the engine forwards).

## Registry

Registered by default in `registry.ts` as **`FieldWrap`**. Override by calling `registerFormComponent('FieldWrap', YourWrap)` if you need a different wrapper layout (last write wins).

## Related

- [Schema Components](../schema-components.md)
- [SchemaForm Registry](../api/schema-form-registry.md)
