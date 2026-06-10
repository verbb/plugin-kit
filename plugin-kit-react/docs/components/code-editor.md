# CodeEditor

CodeEditor provides a monospace code surface for HTML or plain text, built on [CodeMirror 6](https://codemirror.net/) via [`@uiw/react-codemirror`](https://uiwjs.github.io/react-codemirror/).

Use it when a schema field or settings screen needs syntax-aware editing with line numbers, tab sizing, and validation styling — without pulling in a full IDE.

## Basic Usage

Keep the editor controlled so value changes stay in sync with the surrounding form.

<ComponentPreview src="./examples/code-editor-basic.preview.tsx" />

## Validation and Read-only

Use `isInvalid` for field-level error styling. Use `readOnly` or `disabled` when the markup should be visible but not editable.

<ComponentPreview src="./examples/code-editor-states.preview.tsx" />

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Current editor content. |
| `onChange` | `(value: string) => void` | — | Called when the document changes. |
| `language` | `'html' \| 'text'` | `'html'` | Enables HTML language support and bracket matching when set to `html`. |
| `rows` | `number` | `12` | Minimum visible row count used to calculate editor height. |
| `tabSize` | `number` | `4` | Tab width for indentation. |
| `lineNumbers` | `boolean` | `true` | Shows the line-number gutter. |
| `isInvalid` | `boolean` | `false` | Applies error border styling. |
| `disabled` | `boolean` | `false` | Prevents editing and lowers opacity. |
| `readOnly` | `boolean` | `false` | Prevents editing while keeping full opacity. |

Additional props are forwarded to `@uiw/react-codemirror` except `value` and `onChange`.

## Implementation notes

- HTML mode enables `@codemirror/lang-html`, bracket matching, and close-brackets support.
- Text mode omits HTML language extensions for generic monospace editing.
- The wrapper exposes `data-slot="code-editor"` for styling hooks in host apps.
- Min height is derived from `rows` and a fixed line height so the control stays stable in modal layouts.

## Related

- Schema field wrapper: [CodeEditorField](../forms/schema-fields/code-editor-field.md)
- Rich text editing: [TiptapEditor](./tiptap-editor.md)
- Read-only rich text output: [TiptapContent](./tiptap-content.md)
