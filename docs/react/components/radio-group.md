# Radio Group

Radio groups let users choose one option from a small set of mutually exclusive values.

## Basic Usage

Keep radio options in a group so keyboard navigation and value selection remain mutually exclusive.

<ComponentPreview src="./examples/radio-group-basic.preview.tsx" />

## Supporting Descriptions

When the choice affects behavior, add a short supporting line so the options can stand on their own without extra nearby copy.

<ComponentPreview src="./examples/radio-group-supporting-descriptions.preview.tsx" />

## Disabled Options

Disable individual options when the broader choice is valid but one route is unavailable in the current context.

<ComponentPreview src="./examples/radio-group-disabled-options.preview.tsx" />

## Layout and Error

Use horizontal layout for compact choices, and apply invalid state to the group when validation fails.

<ComponentPreview src="./examples/radio-group-layout-error.preview.tsx" />

<!-- pk-api:begin -->

## API

### RadioGroup

#### Slots

| Name | Description |
| --- | --- |
| `label` | Group label |
| `instructions` | Instructions text |
| `hint` | Alias for `instructions` |
| `(default)` | `pk-radio` items |

#### Props

| Name | Description |
| --- | --- |
| `ariaLabel` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `customError` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` | Default value — reflected as the `value` attribute.<br><small><strong>Type</strong> <code>string</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `instructions` | <small><strong>Type</strong> <code>string</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `orientation` | <small><strong>Type</strong> <code>PkRadioGroupOrientation</code></small><br><small><strong>Default</strong> <code>vertical</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

#### Methods

| Name | Description |
| --- | --- |
| `checkValidity()` | Runs constraint validation without showing the browser UI. |
| `reportValidity()` | Runs constraint validation and shows the browser UI when invalid. |
| `resetValidity()` | Clears custom errors and re-syncs validity state. |
| `setCustomValidity(message: string)` | Sets or clears a custom validation message. |

#### Events

| Name | Description |
| --- | --- |
| `onChange` | — |
| `onInput` | — |
| `onPkChange` | Some facades also expose value sugar via `onChange`. |

#### Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `disabled` | The control is disabled. | `:state(disabled)` |
| `invalid` | The control currently fails constraint validation. | `:state(invalid)` |
| `optional` | The control is not required. | `:state(optional)` |
| `required` | The control is required. | `:state(required)` |
| `user-invalid` | Invalid after the user has interacted with the control. | `:state(user-invalid)` |
| `user-valid` | Valid after the user has interacted with the control. | `:state(user-valid)` |
| `valid` | The control currently passes constraint validation. | `:state(valid)` |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `form-control` | Form control wrapper | `::part(form-control)` |
| `instructions` | Instructions text | `::part(instructions)` |
| `label` | Label text | `::part(label)` |
| `radios` | Radio items container | `::part(radios)` |

### Radio

#### Slots

| Name | Description |
| --- | --- |
| `(default)` | Visible label text |

#### Props

| Name | Description |
| --- | --- |
| `ariaLabel` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `checked` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `forceDisabled` | Set by `pk-radio-group` when the group is disabled.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `required` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `tabIndex` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>-1</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |

#### Methods

| Name | Description |
| --- | --- |
| `focusControl(options: FocusOptions)` | — |

#### Events

| Name | Description |
| --- | --- |
| `onPkRadioSelect` | — |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Root label element | `::part(base)` |
| `control` | Visual radio circle | `::part(control)` |
| `indicator` | Indicator container | `::part(indicator)` |
| `input` | Native radio input | `::part(input)` |

<!-- pk-api:end -->
