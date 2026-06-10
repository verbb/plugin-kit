# RichTextField

## Basic Usage

Use `RichTextField` when the schema needs rich text content stored in the form state.

<ComponentPreview src="./examples/rich-text-field-basic.preview.tsx" />

## Registry

- **Key:** `richText`
- **Module:** `src/forms/fields/RichTextField.tsx`

## Role in SchemaForm

[TipTap](https://tiptap.dev/)-based rich text bound to the form store (JSON document shape per TipTap). Uses components under `@verbb/plugin-kit-react/components/tiptap`.

## Example schema

```json
{
  "$field": "richText",
  "name": "body",
  "label": "Body"
}
```

## Related

- Plain component docs: [TiptapEditor](../../components/tiptap-editor.md)
- Read-only previews: [TiptapContent](../../components/tiptap-content.md)
- `getRichTextHtml` / `getRichTextText` in `@verbb/plugin-kit-react/utils` for serialization helpers
