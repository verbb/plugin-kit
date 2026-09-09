# Input

Inputs collect short freeform text and should stay visually aligned with surrounding controls.

## Basic Usage

Use a placeholder for empty guidance and `value` when the control should open with an existing value.

<ComponentPreview src="./examples/input-basic.preview.web.ts" />

## Sizes

The input size scale matches adjacent buttons, selects, and other field controls so dense CP layouts still line up cleanly.

<ComponentPreview src="./examples/input-sizes.preview.web.ts" />

## Widths

Inputs are full-width by default. Constrain the parent for field layouts, or set an explicit width when the input needs to be fixed.

<ComponentPreview src="./examples/input-widths.preview.web.ts" />

## Validation

Use `invalid` when the current value has failed validation so the field can surface its error state consistently.

<ComponentPreview src="./examples/input-validation.preview.web.ts" />

## Disabled

Disable the field when it is present for context but not currently editable.

<ComponentPreview src="./examples/input-disabled.preview.web.ts" />

## Adornments

Use `slot="start"` / `slot="end"` for icons or short units **inside** the field border. Prefer this for a single leading/trailing glyph (search, currency). Use [input groups](/web/components/input-group) when the adornment is a separate control (button, select) or multi-part addon.

```html
<pk-input placeholder="Search">
  <pk-icon slot="start" icon="magnifying-glass"></pk-icon>
</pk-input>
```

<ComponentPreview src="./examples/input-adornments.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `label` | — |
| `instructions` | — |
| `hint` | Alias for `instructions` |
| `start` | Leading adornment inside the field chrome (icon, unit, etc.) |
| `end` | Trailing adornment inside the field chrome (icon, unit, or in-control action such as `pk-copy-button`) |
| `clear-icon` | — |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `autocomplete` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `autofocus` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `customError` `custom-error` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` `value` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `fitCell` `fit-cell` | Flush + fill parent cell (editable tables).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `instructions` | <small><strong>Type</strong> <code>string</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `max` | <small><strong>Type</strong> <code>number \| string \| undefined</code></small> |
| `maxlength` | <small><strong>Type</strong> <code>number \| undefined</code></small> |
| `min` | <small><strong>Type</strong> <code>number \| string \| undefined</code></small> |
| `minlength` | <small><strong>Type</strong> <code>number \| undefined</code></small> |
| `mono` | Monospace typography for handle, slug, and code-like values.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `pattern` | <small><strong>Type</strong> <code>string \| undefined</code></small> |
| `placeholder` | <small><strong>Type</strong> <code>string</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>PkInputSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `step` | <small><strong>Type</strong> <code>number \| 'any' \| undefined</code></small> |
| `type` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>text</code></small> |
| `withClear` `with-clear` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withInstructions` `with-instructions` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withLabel` `with-label` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

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
| `blur` | — |
| `change` | — |
| `focus` | — |
| `input` | — |

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

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Input row | `::part(base)` |
| `clear-button` | Clear button | `::part(clear-button)` |
| `end` | End slot container | `::part(end)` |
| `form-control` | Wrapper | `::part(form-control)` |
| `input` | Native input | `::part(input)` |
| `instructions` | Instructions | `::part(instructions)` |
| `label` | Label | `::part(label)` |
| `start` | Start slot container | `::part(start)` |

<!-- pk-api:end -->
