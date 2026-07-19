# CodeEditorField

## Basic Usage

Use `CodeEditorField` when the schema needs HTML or plain-text source editing stored as a string in form state.

<ComponentPreview src="./examples/code-editor-field-basic.preview.tsx" />

## Registry

- **Key:** `codeEditor`
- **Module:** `src/forms/fields/CodeEditorField.tsx`

## Role in SchemaForm

String-backed code editing using the [`CodeEditor`](../../react/components/code-editor.md) component and [`FieldLayout`](../schema-fields.md#field-anatomy), with [`useEngineField`](../api/schema-form-api.md) for store binding.

Host apps register the field automatically through the default SchemaForm registry. Formie maps PHP schema nodes with `'$field' => 'codeEditor'` to this component.

## Common `field` props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Form value path. |
| `label` | `string` | — | Field label. |
| `instructions` | `string` | — | Help text below the label. |
| `warning` | `string` | — | Non-blocking warning below errors. |
| `placeholder` | `string` | — | Forwarded to CodeMirror when supported. |
| `language` | `'html' \| 'text' \| 'javascript' \| 'css' \| 'json'` | `'html'` | Editor language mode. |
| `rows` | `number` | `12` | Minimum visible rows. |
| `tabSize` | `number` | `4` | Tab width. |
| `lineNumbers` | `boolean` | `true` | Line-number gutter visibility. |
| `required` | `boolean` | `false` | Shows the required indicator. |
| `disabled` | `boolean` | `false` | Disables editing. |

## Example schema

```json
{
  "$field": "codeEditor",
  "name": "htmlContent",
  "label": "HTML Content",
  "language": "html",
  "rows": 12,
  "tabSize": 4,
  "lineNumbers": true,
  "validation": "required"
}
```

## Host configuration

Formie exposes project-config defaults through a PHP helper (`HtmlHelper::getHtmlEditorConfig()`), which merges into the schema node alongside standard field props. Other plugins can pass the same props directly on the schema field definition.

Typical defaults:

```json
{
  "rows": 12,
  "tabSize": 4,
  "lineNumbers": true,
  "language": "html"
}
```

## Related

- Plain component docs: [CodeEditor](../../react/components/code-editor.md)
- Rich text authoring: [TiptapEditor](../../react/components/tiptap-editor.md)
- Read-only rich text previews: [TiptapContent](../../react/components/tiptap-content.md)
