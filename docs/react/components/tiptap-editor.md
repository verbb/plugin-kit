# Tiptap Editor

TiptapEditor provides a rich-text editing surface with a configurable toolbar and structured JSON output.

## Basic Usage

Use a focused toolbar for the default writing experience and keep the editor controlled so value changes stay in sync with the surrounding form.

<ComponentPreview src="./examples/tiptap-editor-basic.preview.tsx" />

## Expanded Toolbar

Use a broader toolbar when the editor is the primary authoring surface and needs headings, tables, links, code, and undo or redo support.

<ComponentPreview src="./examples/tiptap-editor-expanded-toolbar.preview.tsx" />

## Toolbar Controls and Extensions

See the canonical [toolbar control reference](/web/components/tiptap-editor#available-toolbar-controls) for every built-in control ID. Custom nodes, marks, TextStyle attributes, and toolbar controls use the framework-neutral [TipTap extensibility API](/web/guides/tiptap-extensibility); register them before mounting the React component.

Font family, font size, text color, background color, line height, and small caps are built in but opt-in. See the canonical [TextStyle controls](/web/components/tiptap-editor#textstyle-controls) for IDs, defaults, and the `textStyleOptions` prop shape.

## Grouped Toolbar

The `toolbar` prop accepts a JSON array of buttons, separators (`"|"`), and group objects. Groups use a `preset` (or custom `items`) to open a dropdown cluster.

Built-in presets:

| Preset | Menu contents |
| --- | --- |
| `formatting` | Paragraph, heading levels, blockquote, and code block |
| `headings` | Heading levels only |
| `lists` | Unordered and ordered list |
| `align` | Left, center, right, and justify |

`formatting` and `headings` accept optional `headingLevels` (e.g. `[1, 2, 3, 4]`). When omitted, levels default to `1`–`4`.

Custom groups are supported through `items`. Items can be any built-in control ID, `paragraph`, a separator (`"|"` or `"separator"`), or a registered custom control ID. Use either `preset` or `items`; a non-empty `items` list defines the menu contents.

```tsx
<TiptapEditor
    toolbar={[
        {
            type: 'group',
            group: {
                label: 'Text style',
                icon: 'bold',
                items: ['paragraph', '|', 'bold', 'italic', 'underline', 'small-caps'],
            },
        },
        { type: 'separator' },
        {
            type: 'group',
            group: {
                label: 'Insert',
                icon: 'table',
                items: ['table', 'hr', 'code-block'],
            },
        },
        { type: 'button', name: 'link' },
        { type: 'button', name: 'undo' },
        { type: 'button', name: 'redo' },
    ]}
/>
```

Groups can be mixed with standalone buttons and top-level separators in the same toolbar. Register custom control IDs before mounting the component. Keep `link` standalone because it opens its own menu and dialog.

<ComponentPreview src="./examples/tiptap-editor-grouped-toolbar.preview.tsx" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `toolbar` | Replace the entire default toolbar (opt-in via light-DOM presence). |
| `toolbar-end` | Append controls after stock toolbar buttons (same flex gap). |

### Props

| Name | Description |
| --- | --- |
| `buttons` | Flat toolbar button list. HTML uses a comma-separated attribute; React may pass a `string[]`. Named `buttons` (not `buttonsAttr`) so React can set the property — a getter-only `buttons` previously threw on assign.<br><small><strong>Type</strong> <code>string \| string[]</code></small><br><small><strong>Default</strong> <code>bold,italic</code></small> |
| `customError` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `invalidContentMessage` | <small><strong>Type</strong> <code>string</code></small> |
| `linkOptions` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `linkSelectorStorageKeyPrefix` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `placeholder` | <small><strong>Type</strong> <code>string</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `readOnly` | Alias for `readonly`. |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `rows` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `textStyleOptions` | Values shown by the optional TextStyle toolbar controls.<br><small><strong>Type</strong> <code>TiptapTextStyleToolbarConfig \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `toolbar` | Structured toolbar config — JSON string attribute, or a node array from React.<br><small><strong>Type</strong> <code>string \| ToolbarNode[] \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `toolbarTooltips` | Show `pk-tooltip` hints on toolbar buttons (default: on).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `value` | Document JSON string. Also accepts a TipTap node array (common from React) and serializes it — arrays previously bypassed JSON.parse and mounted empty.<br><small><strong>Type</strong> <code>string</code></small> |
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

### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-button` | — |
| `pk-checkbox` | — |
| `pk-dialog` | — |
| `pk-dropdown-item` | — |
| `pk-dropdown-label` | — |
| `pk-dropdown-menu` | — |
| `pk-dropdown-separator` | — |
| `pk-field` | — |
| `pk-input` | — |
| `pk-tooltip` | — |

<!-- pk-api:end -->
