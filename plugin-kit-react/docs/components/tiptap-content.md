# TiptapContent

TiptapContent renders read-only TipTap / ProseMirror content from the same JSON document shape used by [TiptapEditor](./tiptap-editor.md) and [RichTextField](../forms/schema-fields/rich-text-field.md).

Use it for previews, summaries, and builder canvases where formatted content should display without a toolbar or editing surface.

## Basic Usage

Pass a TipTap JSON document, a JSON string, or an HTML string. The component normalizes input through the shared `valueToContent()` helper in `tiptap/editorConfig`.

<ComponentPreview src="./examples/tiptap-content-basic.preview.tsx" />

## Accepted `value` shapes

`TiptapContent` accepts the same value shapes as the rich-text field stack:

- ProseMirror node array (most common in Formie form state)
- `{ type: 'doc', content: [...] }` document object
- JSON string containing either shape
- HTML string (parsed into a document when detected)

## Live updates

The editor instance is read-only (`editable: false`), but content still updates when the `value` prop changes. The component compares serialized document content before calling `setContent`, so parent re-renders do not reset selection or cause unnecessary DOM churn.

This matters for builder previews where field settings change before the form is saved.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `unknown` | `''` | TipTap JSON, HTML, or empty content. |
| `className` | `string` | — | Applied to the underlying `EditorContent` wrapper. |

Remaining props are forwarded to TipTap `EditorContent`.

## Styling

Default classes reset paragraph spacing and hide the focus outline so previews sit cleanly inside surrounding field chrome:

- `[&_.ProseMirror]:outline-none`
- `[&_.ProseMirror_p]:m-0`
- `[&_.ProseMirror]:text-sm`

Add host-specific classes through `className` when previews need extra padding or typography.

## Related

- Editable authoring: [TiptapEditor](./tiptap-editor.md)
- Schema field binding: [RichTextField](../forms/schema-fields/rich-text-field.md)
- Shared extensions and normalization: `src/components/tiptap/editorConfig.ts`
