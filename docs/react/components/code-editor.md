# Code Editor

CodeEditor provides a monospace code surface for HTML or plain text, built on [CodeMirror 6](https://codemirror.net/) via `@verbb/plugin-kit-codemirror-core` (shared with the `<CodeEditor>` web component).
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


## Implementation notes

- HTML mode enables `@codemirror/lang-html`, bracket matching, and close-brackets support.
- Text mode omits HTML language extensions for generic monospace editing.
- The wrapper exposes `data-slot="code-editor"` for styling hooks in host apps.
- Min height is derived from `rows` and a fixed line height so the control stays stable in modal layouts.
- Vanilla plugins can import `@verbb/plugin-kit-web/components/code-editor.js` and listen for `pk-change` events.
- Web component attributes: `rows`, `tab-size`, `line-numbers`, `language`, `invalid`, `readonly`, `disabled`.

## Related

- Schema field wrapper: [CodeEditorField](../../forms/schema-fields/code-editor-field.md)
- Rich text editing: [TiptapEditor](./tiptap-editor.md)
- Read-only rich text output: [TiptapContent](./tiptap-content.md)

<!-- pk-api:begin -->

## API

### Props

| Name | Description |
| --- | --- |
| `customError` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` | <small><strong>Type</strong> <code>string \| null</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `language` | <small><strong>Type</strong> <code>CodeEditorLanguage</code></small><br><small><strong>Default</strong> <code>html</code></small> |
| `lineNumbers` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `readOnly` | Alias for `readonly`. |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `rows` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>12</code></small> |
| `tabSize` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `checkValidity()` | Runs constraint validation without showing the browser UI. |
| `reportValidity()` | Runs constraint validation and shows the browser UI when invalid. |
| `resetValidity()` | Clears custom errors and re-syncs validity state. |
| `setCustomValidity(message: string)` | Sets or clears a custom validation message. |

### Events

| Name | Description |
| --- | --- |
| `onBlur` | — |
| `onChange` | — |
| `onInput` | — |
| `onPkChange` | Some facades also expose value sugar via `onChange`. |

### Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `disabled` | The control is disabled. | `:state(disabled)` |
| `invalid` | The control currently fails constraint validation. | `:state(invalid)` |
| `optional` | The control is not required. | `:state(optional)` |
| `required` | The control is required. | `:state(required)` |
| `user-invalid` | Invalid after the user has interacted with the control. | `:state(user-invalid)` |
| `user-valid` | Valid after the user has interacted with the control. | `:state(user-valid)` |
| `valid` | The control currently passes constraint validation. | `:state(valid)` |

<!-- pk-api:end -->
