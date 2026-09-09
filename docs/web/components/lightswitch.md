# Lightswitch

Lightswitches communicate immediate on or off state for binary settings.

## Basic Usage

Use a lightswitch for binary settings where the current state should be immediately visible.

<ComponentPreview src="./examples/lightswitch-basic.preview.web.ts" />

## Sizes

The reduced size scale is useful when lightswitches appear in dense settings rows or supporting metadata panels.

<ComponentPreview src="./examples/lightswitch-sizes.preview.web.ts" />

## Checked

Use checked state for persisted settings so the current toggle value is immediately visible.

<ComponentPreview src="./examples/lightswitch-checked.preview.web.ts" />

## Disabled

Disable the toggle when the setting is shown for context but cannot currently be changed.

<ComponentPreview src="./examples/lightswitch-disabled.preview.web.ts" />

## Labels

Pair switches with clear labels when the setting needs more context than the control alone can provide.

<ComponentPreview src="./examples/lightswitch-labels.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `(default)` | Switch label |
| `instructions` | Instructions text (or use `instructions` attribute) |
| `hint` | Alias for `instructions` |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `checked` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `customError` `custom-error` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultChecked` `default-checked` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `instructions` | <small><strong>Type</strong> <code>string</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>PkLightswitchSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>on</code></small> |

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

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Root wrapper | `::part(base)` |
| `input` | Hidden checkbox input | `::part(input)` |
| `instructions` | Instructions text | `::part(instructions)` |
| `label` | Label text | `::part(label)` |
| `switch` | Switch button | `::part(switch)` |
| `thumb` | Thumb element | `::part(thumb)` |

<!-- pk-api:end -->
