# Code Editor

CodeEditor provides a monospace code surface for HTML or plain text, built on [CodeMirror 6](https://codemirror.net/) via `@verbb/plugin-kit-codemirror-core`.
Use it when a schema field or settings screen needs syntax-aware editing with line numbers, tab sizing, and validation styling — without pulling in a full IDE.

## Basic Usage

Keep the editor controlled so value changes stay in sync with the surrounding form.

<ComponentPreview src="./examples/code-editor-basic.preview.tsx" />

## Longer HTML

HTML mode works well for notification templates, partials, and other multi-line markup.

<ComponentPreview src="./examples/code-editor-long-html.preview.tsx" />

## Other Languages

Use the `language` prop for JavaScript, CSS, JSON, or plain text highlighting.

<ComponentPreview src="./examples/code-editor-languages.preview.tsx" />

## Layout Options

Use `rows` for minimum height, `tabSize` for tab character width and indent unit, and `lineNumbers` to toggle the gutter.

<ComponentPreview src="./examples/code-editor-layout.preview.tsx" />

## Validation and Read-only

Use `isInvalid` for field-level error styling. Use `readOnly` or `disabled` when the markup should be visible but not editable.

<ComponentPreview src="./examples/code-editor-states.preview.tsx" />

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Current editor content. |
| `onChange` | `(value: string) => void` | — | Called when the document changes. |
| `language` | `'html' \| 'text' \| 'javascript' \| 'css' \| 'json'` | `'html'` | Enables syntax support for the selected language. |
| `rows` | `number` | `12` | Minimum visible row count used to calculate editor height. |
| `tabSize` | `number` | `4` | Tab character width and indent unit (Tab key / auto-indent). Existing space indentation is unchanged. |
| `lineNumbers` | `boolean` | `true` | Shows the line-number gutter. |
| `isInvalid` | `boolean` | `false` | Applies error border styling. |
| `disabled` | `boolean` | `false` | Prevents editing and lowers opacity. |
| `readOnly` | `boolean` | `false` | Prevents editing while keeping full opacity. |
| `className` | `string` | — | Optional wrapper class name. |

## Implementation notes

- HTML mode enables `@codemirror/lang-html`, bracket matching, and close-brackets support.
- Text mode omits HTML language extensions for generic monospace editing.
- The wrapper exposes `data-slot="code-editor"` for styling hooks in host apps.
- Min height is derived from `rows` and a fixed line height so the control stays stable in modal layouts.
- Common props: `rows`, `tabSize`, `lineNumbers`, `language`, `invalid`, `readOnly`, `disabled`.
- Listen for `onPkChange` (and native `onChange` / `onInput` where applicable) for value updates.

## Related

- Schema field wrapper: [CodeEditorField](../../forms/schema-fields/code-editor-field.md)
- Rich text editing: [TiptapEditor](./tiptap-editor.md)
- Read-only rich text output: [TiptapContent](./tiptap-content.md)
