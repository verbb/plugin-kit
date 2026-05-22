# GroupField

## Basic Usage

Use `GroupField` when related child fields should live under one nested object path.

<ComponentPreview src="./examples/group-field-basic.preview.tsx" />

## Registry

- **Key:** `group`
- **Module:** `src/forms/fields/GroupField.tsx`

## Role in SchemaForm

Prefixes nested **`schema` / `children`** so each child `$field` **`name`** becomes `${groupName}.${childName}` and sets **`_scopePath`** for JEXL condition data. Nested **`$field: 'group'`** subtrees manage their own prefixing to avoid double-prefixes.

The engine still passes rendered **`children`** when provided on the node.

## Example schema

```json
{
  "$field": "group",
  "name": "seo",
  "label": "SEO",
  "children": [
    { "$field": "text", "name": "title", "label": "SEO title" }
  ]
}
```

Effective path for the text field becomes `seo.title` when `name` on the child is `title`.

## Related

- Child controls usually map to plain component docs like [Input](../../components/input.md).
- [Conditions](../conditions.md)
