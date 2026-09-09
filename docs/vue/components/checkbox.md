# Checkbox

Checkbox is the low-level checkbox control. Use it when you need to compose custom layouts around the checkbox yourself.
For the common labeled row pattern, use [CheckboxInput](/web/components/checkbox-input).

## Basic Usage

Use an accessible name when the checkbox is not paired with visible text in the same component.

<ComponentPreview src="./examples/checkbox-basic.preview.vue.ts" />

## Checked

Use checked state for persisted preferences so the current selection reads clearly at a glance.

<ComponentPreview src="./examples/checkbox-checked.preview.vue.ts" />

## Disabled

Disable the checkbox when an option is visible for context but currently unavailable. Disabled checkboxes use a muted opacity and disabled cursor.

<ComponentPreview src="./examples/checkbox-disabled.preview.vue.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Checkbox label text |
| `hint` | Descriptive hint (or use the `hint` attribute) |

### Props

| Name | Description |
| --- | --- |
| `ariaLabel` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `checkboxValue` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>on</code></small> |
| `checked` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `customError` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultChecked` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `hint` | Descriptive hint — use the `hint` slot for HTML content.<br><small><strong>Type</strong> <code>string</code></small> |
| `indeterminate` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withHint` | Only required for SSR when slotting a hint.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

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
| `@change` | — |
| `@input` | — |
| `@pk-change` | — |

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
| `base` | Root label element | `::part(base)` |
| `checked-icon` | Checked state icon | `::part(checked-icon)` |
| `control` | Visual checkbox box | `::part(control)` |
| `hint` | Hint text container | `::part(hint)` |
| `indeterminate-icon` | Indeterminate state icon | `::part(indeterminate-icon)` |
| `input` | Native checkbox input | `::part(input)` |
| `label` | Label text container | `::part(label)` |

<!-- pk-api:end -->
