# Textarea

Textareas collect longer freeform content while still matching the surrounding field system.

## Basic Usage

Use a textarea when users need more room than a single-line input can comfortably provide.

<ComponentPreview src="./examples/textarea-basic.preview.tsx" />

## Sizes

The textarea size scale matches the rest of the field system so longer-form inputs still align cleanly with nearby controls.

<ComponentPreview src="./examples/textarea-sizes.preview.tsx" />

## Widths

Textareas are full-width by default. Constrain the parent for field layouts, or set an explicit width when the textarea needs to be fixed.

<ComponentPreview src="./examples/textarea-widths.preview.tsx" />

## Validation

Use validation state in the same way as other fields so error styling stays consistent across the form system.

<ComponentPreview src="./examples/textarea-validation.preview.tsx" />

## Disabled

Disable the textarea when longer-form content should be visible but not editable.

<ComponentPreview src="./examples/textarea-disabled.preview.tsx" />

## Resize

Textareas remain vertically resizable by default so longer content can expand without changing the field type.

<ComponentPreview src="./examples/textarea-resize.preview.tsx" />

## Character Count

Show a character count when text length matters but the field should remain flexible.

<ComponentPreview src="./examples/textarea-character-count.preview.tsx" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `label` | — |
| `instructions` | — |
| `hint` | Alias for `instructions` |

### Props

| Name | Description |
| --- | --- |
| `customError` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `fitCell` | Flush + fill parent cell (editable tables).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `instructions` | <small><strong>Type</strong> <code>string</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `maxlength` | <small><strong>Type</strong> <code>number \| undefined</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `placeholder` | <small><strong>Type</strong> <code>string</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `readOnly` | Alias for `readonly`. |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `rows` | Native `rows` — use `1` in table cells so intrinsic height doesn't overflow.<br><small><strong>Type</strong> <code>number \| undefined</code></small> |
| `size` | <small><strong>Type</strong> <code>PkTextareaSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `withInstructions` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withLabel` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

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
| `onFocus` | — |
| `onInput` | — |

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
| `form-control` | Wrapper | `::part(form-control)` |
| `instructions` | Instructions | `::part(instructions)` |
| `label` | Label | `::part(label)` |
| `textarea` | Native textarea | `::part(textarea)` |

<!-- pk-api:end -->
