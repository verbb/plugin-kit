# Tiptap Content

`TiptapContent` / `<pk-tiptap-content>` renders read-only TipTap / ProseMirror content from the same JSON document shape used by [TiptapEditor](/vue/components/tiptap-editor).
Use it for previews, summaries, and builder canvases where formatted content should display without a toolbar or editing surface.

## Basic Usage

Pass a TipTap JSON document, a JSON string, or an HTML string. Normalization uses `@verbb/plugin-kit-tiptap-core` `valueToContent()`.

<ComponentPreview src="./examples/tiptap-content-basic.preview.vue.ts" />

## Accepted `value` shapes

`TiptapContent` accepts the same value shapes as the rich-text field stack:

- ProseMirror node array (most common in Formie form state)
- `{ type: 'doc', content: [...] }` document object
- JSON string containing either shape
- HTML string (parsed into a document when detected)

## Live updates

The editor instance is read-only (`editable: false`), but content still updates when the `value` prop / attribute changes. The component compares serialized document content before calling `setContent`, so parent re-renders do not reset selection or cause unnecessary DOM churn.

This matters for builder previews where field settings change before the form is saved.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `''` | TipTap JSON, HTML, or empty content (arrays/objects should be serialized by the Vue facade or caller). |

Host attributes and remaining Lit properties follow the web component. Styling is owned by shadow DOM — use host class names or `--pk-tiptap-content-*` tokens where documented, not Tailwind ProseMirror piercing selectors.

## Related

- Editable authoring: [TiptapEditor](./tiptap-editor.md)
- SchemaForm: bind TipTap via [Custom Schema Fields](../../forms/custom-schema-fields.md) (rich-text `$field`s are product-owned)
- Shared extensions and normalization: `@verbb/plugin-kit-tiptap-core`
