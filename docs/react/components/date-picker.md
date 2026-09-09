# Date Picker

Date pickers wrap a field and calendar trigger into a single input pattern for choosing one date.

## Basic Usage

Use a controlled value when the chosen date needs to stay in sync with surrounding form state.

<ComponentPreview src="./examples/date-picker-basic.preview.tsx" />

## States

Show required (with clear), invalid, and disabled states when the picker is used inside forms.

<ComponentPreview src="./examples/date-picker-states.preview.tsx" />

## Constraints

Bound selectable days with `disablePast` / `disableFuture`, weekday rules, and `min` / `max`.

<ComponentPreview src="./examples/date-picker-constraints.preview.tsx" />

## Range

`mode="range"` with `months="2"` for a two-month booking-style picker.

<ComponentPreview src="./examples/date-picker-range.preview.tsx" />

## Multiple

`mode="multiple"` lets users toggle several individual dates. The panel stays open while selecting, the control shows a count summary, and the value is a comma-separated, sorted list of ISO dates.

<ComponentPreview src="./examples/date-picker-multiple.preview.tsx" />

## Date and Time

Compose `DatePicker` with `TimePicker` side by side; combine the values in your app code.

<ComponentPreview src="./examples/date-picker-date-time.preview.tsx" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `label` | — |
| `instructions` | — |
| `hint` | — |
| `start` | — |
| `end` | — |
| `clear-icon` | — |
| `expand-icon` | — |
| `footer` | — |

### Props

| Name | Description |
| --- | --- |
| `ariaLabel` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `customError` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` | <small><strong>Type</strong> <code>string</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disabledDates` | <small><strong>Type</strong> <code>string</code></small> |
| `disabledDaysOfWeek` | <small><strong>Type</strong> <code>string</code></small> |
| `disableFuture` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disablePast` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `firstDayOfWeek` | <small><strong>Type</strong> <code>'auto' \| 'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'</code></small><br><small><strong>Default</strong> <code>auto</code></small> |
| `instructions` | <small><strong>Type</strong> <code>string</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `isInvalid` | Alias for `invalid`. |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `locale` | <small><strong>Type</strong> <code>string</code></small> |
| `max` | <small><strong>Type</strong> <code>string</code></small> |
| `maxRange` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `min` | <small><strong>Type</strong> <code>string</code></small> |
| `minRange` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `mode` | <small><strong>Type</strong> <code>PkDatePickerMode</code></small><br><small><strong>Default</strong> <code>single</code></small> |
| `months` | <small><strong>Type</strong> <code>1 \| 2</code></small><br><small><strong>Default</strong> <code>1</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `open` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `pageBy` | <small><strong>Type</strong> <code>'months' \| 'single'</code></small><br><small><strong>Default</strong> <code>months</code></small> |
| `placeholder` | <small><strong>Type</strong> <code>string</code></small> |
| `placement` | <small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>bottom</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `readOnly` | Alias for `readonly`. |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `sideOffset` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `size` | <small><strong>Type</strong> <code>PkDatePickerSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `value` | <small><strong>Type</strong> <code>string \| Date</code></small> |
| `weekdayFormat` | <small><strong>Type</strong> <code>'narrow' \| 'short' \| 'long' \| undefined</code></small> |
| `width` | When `full`, the control stretches to the host width.<br><small><strong>Type</strong> <code>'full' \| undefined</code></small> |
| `withClear` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withInstructions` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withLabel` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withOutsideDays` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `withWeekNumbers` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

### Methods

| Name | Description |
| --- | --- |
| `checkValidity()` | Runs constraint validation without showing the browser UI. |
| `hide()` | — |
| `reportValidity()` | Runs constraint validation and shows the browser UI when invalid. |
| `resetValidity()` | Clears custom errors and re-syncs validity state. |
| `setCustomValidity(message: string)` | Sets or clears a custom validation message. |
| `show()` | — |

### Events

| Name | Description |
| --- | --- |
| `onChange` | — |
| `onInput` | — |
| `onPkChange` | Some facades also expose value sugar via `onChange`. |
| `onPkClear` | — |

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
| `pk-popup` | — |

<!-- pk-api:end -->
