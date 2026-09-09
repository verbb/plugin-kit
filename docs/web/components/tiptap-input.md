# Tiptap Input

TiptapInput provides a compact inline rich-text field. It is useful for subjects, placeholders, formulas, and other short authoring surfaces.

## Plain Input

Use TiptapInput as a compact rich-text capable inline authoring field.

<ComponentPreview src="./examples/tiptap-input-plain.preview.web.ts" />

## States

Use invalid, disabled, and read-only states when the input participates in form validation or locked settings.

<ComponentPreview src="./examples/tiptap-input-states.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Attributes & Properties

| Name | Description |
| --- | --- |
| `customError` `custom-error` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` `value` | <small><strong>Type</strong> <code>string \| null</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `fitCell` `fit-cell` | Flush + fill parent cell (editable tables).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `variableCategories` | Variable options used to resolve chip labels when hydrating from `{token}` strings. Without this, saved field tokens fall back to UID title-casing after reload.<br><small><strong>Type</strong> <code>PkTiptapVariableCategories</code></small><br><small><strong>Default</strong> <code>{}</code></small> |
| `variableTagConfigure` | Formie / React configure bridge — called when a chip is activated for editing. Prefer this over listening for `pk-variable-tag-configure` from React.<br><small><strong>Type</strong> <code>((detail: import('./variable-tag-node-view.js').PkVariableTagConfigureDetail) => void) \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |

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
| `change` | — |
| `input` | — |
| `pk-change` | — |

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
