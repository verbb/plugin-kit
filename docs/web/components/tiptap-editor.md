# Tiptap Editor

TiptapEditor provides a rich-text editing surface with a configurable toolbar and structured JSON output.

## Basic Usage

Use a focused toolbar for the default writing experience and keep the editor controlled so value changes stay in sync with the surrounding form.

<ComponentPreview src="./examples/tiptap-editor-basic.preview.web.ts" />

## Expanded Toolbar

Use a broader toolbar when the editor is the primary authoring surface and needs headings, tables, links, code, and undo or redo support.

<ComponentPreview src="./examples/tiptap-editor-expanded-toolbar.preview.web.ts" />

## Available Toolbar Controls

The default toolbar contains `bold` and `italic`. Set `buttons` to a comma-separated list when you only need standalone controls:

```html
<pk-tiptap-editor
    buttons="bold,italic,underline,small-caps,link,undo,redo"
></pk-tiptap-editor>
```

All built-in control IDs are listed below. IDs are case-sensitive.

| ID | Action |
| --- | --- |
| `bold` | Bold |
| `italic` | Italic |
| `underline` | Underline |
| `strikethrough` | Strikethrough |
| `subscript` | Subscript |
| `superscript` | Superscript |
| `small-caps` | Small caps using the constrained `textStyle.fontVariantCaps` attribute |
| `font-family` | Font family menu |
| `font-size` | Font size menu |
| `text-color` | Text and background color menus |
| `line-height` | Line height menu |
| `unordered-list` | Bulleted list |
| `ordered-list` | Numbered list |
| `blockquote` | Block quote |
| `highlight` | Highlight |
| `code` | Inline code |
| `code-block` | Code block |
| `hr` | Horizontal rule |
| `line-break` | Hard line break |
| `h1`–`h6` | Heading levels 1–6 |
| `align-left` | Align left |
| `align-center` | Align centre |
| `align-right` | Align right |
| `align-justify` | Justify |
| `clear-format` | Clear block formatting and marks |
| `undo` | Undo |
| `redo` | Redo |
| `link` | Open the link editor |
| `table` | Insert a 3 × 3 table with a header row |

`paragraph` is also available inside a custom toolbar group. It changes the current block to body text, but is not a standalone `buttons` ID.

Keep `link` as a standalone toolbar control because it opens its own menu and dialog. Keep `font-family`, `font-size`, `text-color`, and `line-height` standalone as well because each opens its own value menu. `variableTag` is a reserved integration ID: the base web component removes it from the rendered toolbar so consuming products can supply their variable picker through `toolbar-end`. Unknown IDs are ignored unless they have been registered through the [TipTap extensibility API](/web/guides/tiptap-extensibility).

## TextStyle Controls

The TextStyle controls use TipTap's official FontFamily, FontSize, Color, BackgroundColor, and LineHeight extensions. Small caps adds one constrained attribute to the same `textStyle` mark, so all six styles can coexist without creating additional marks. These controls are available to every editor but remain opt-in through `buttons` or `toolbar`.

<ComponentPreview src="./examples/tiptap-editor-text-styles.preview.web.ts" />

Set `textStyleOptions` as a property—or `text-style-options` as JSON in HTML—to replace any default option family:

```js
const editor = document.querySelector('pk-tiptap-editor');

editor.textStyleOptions = {
    fontFamilies: [
        { label: 'Default font', value: null },
        { label: 'Brand Sans', value: 'Brand Sans, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
    ],
    fontSizes: [
        { label: 'Default', value: null },
        { label: 'Body', value: '16px' },
        { label: 'Large', value: '24px' },
    ],
};
```

Available option-family keys are `fontFamilies`, `fontSizes`, `textColors`, `backgroundColors`, and `lineHeights`. Each entry has a `label` and a CSS `value`; use `null` for the reset/default entry. Supplying one family leaves the other default families unchanged.

## Grouped Toolbar

The `toolbar` attribute accepts a JSON array of buttons, separators (`"|"`), and group objects. Groups use a `preset` (or custom `items`) to open a dropdown cluster.

Built-in presets:

| Preset | Menu contents |
| --- | --- |
| `formatting` | Paragraph, heading levels, blockquote, and code block |
| `headings` | Heading levels only |
| `lists` | Unordered and ordered list |
| `align` | Left, center, right, and justify |

`formatting` and `headings` accept optional `headingLevels` (e.g. `[1, 2, 3, 4]`). When omitted, levels default to `1`–`4`.

Custom groups are supported through `items`. Items can be any built-in control ID, `paragraph`, a separator (`"|"` or `"separator"`), or a custom control ID that was [registered before the editor mounted](/web/guides/tiptap-extensibility#register-a-toolbar-control). Use either `preset` or `items`; when a non-empty `items` list is present, it defines the menu contents.

```js
const editor = document.querySelector('pk-tiptap-editor');

if (editor) {
    editor.toolbar = [
        {
            type: 'group',
            label: 'Text style',
            icon: 'bold',
            items: ['paragraph', '|', 'bold', 'italic', 'underline', 'small-caps'],
        },
        '|',
        {
            type: 'group',
            label: 'Insert',
            icon: 'table',
            items: ['table', 'hr', 'code-block'],
        },
        'link',
        'undo',
        'redo',
    ];
}
```

A group accepts `label`, `icon`, and `items`, or `preset` with optional `headingLevels`. Groups can be mixed with standalone buttons and top-level separators in the same toolbar.

<ComponentPreview src="./examples/tiptap-editor-grouped-toolbar.preview.web.ts" />

## Extending TipTap

Plugin Kit supports application-level registration of TipTap nodes, marks, behaviour extensions, and stock-toolbar-compatible controls. Registration has schema and server-rendering implications, so it is documented separately in [Extending TipTap](/web/guides/tiptap-extensibility).

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `toolbar` | Replace the entire default toolbar (opt-in via light-DOM presence). |
| `toolbar-end` | Append controls after stock toolbar buttons (same flex gap). |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `buttons` | Flat toolbar button list. HTML uses a comma-separated attribute; React may pass a `string[]`. Named `buttons` (not `buttonsAttr`) so React can set the property — a getter-only `buttons` previously threw on assign.<br><small><strong>Type</strong> <code>string \| string[]</code></small><br><small><strong>Default</strong> <code>bold,italic</code></small> |
| `customError` `custom-error` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` `value` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalidContentMessage` `invalid-content-message` | <small><strong>Type</strong> <code>string</code></small> |
| `linkOptions` `link-options` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `linkSelectorStorageKeyPrefix` `link-selector-storage-key-prefix` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `placeholder` | <small><strong>Type</strong> <code>string</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `rows` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `textStyleOptions` `text-style-options` | Values shown by the optional TextStyle toolbar controls.<br><small><strong>Type</strong> <code>TiptapTextStyleToolbarConfig \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `toolbar` | Structured toolbar config — JSON string attribute, or a node array from React.<br><small><strong>Type</strong> <code>string \| ToolbarNode[] \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `toolbarTooltips` `toolbar-tooltips` | Show `pk-tooltip` hints on toolbar buttons (default: on).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
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
