# Date Picker

Date pickers wrap a field and calendar trigger into a single input pattern for choosing one date.

## Basic Usage

Use a controlled value when the chosen date needs to stay in sync with surrounding form state.

<ComponentPreview src="./examples/date-picker-basic.preview.web.ts" />

## States

Show required (with clear), invalid, and disabled states when the picker is used inside forms.

<ComponentPreview src="./examples/date-picker-states.preview.web.ts" />

## Constraints

Bound selectable days with `disable-past` / `disable-future`, weekday rules, and `min` / `max`.

<ComponentPreview src="./examples/date-picker-constraints.preview.web.ts" />

## Range

`mode="range"` with `months="2"` for a two-month booking-style picker.

<ComponentPreview src="./examples/date-picker-range.preview.web.ts" />

## Multiple

`mode="multiple"` lets users toggle several individual dates. The panel stays open while selecting, the control shows a count summary, and the value is a comma-separated, sorted list of ISO dates.

<ComponentPreview src="./examples/date-picker-multiple.preview.web.ts" />

## Date and Time

Compose `pk-date-picker` with `pk-time-picker` side by side; combine the values in your app code.

<ComponentPreview src="./examples/date-picker-date-time.preview.web.ts" />

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

### Attributes & Properties

| Name | Description |
| --- | --- |
| `ariaLabel` `aria-label` | <small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `customError` `custom-error` | Custom validation message; also settable via `setCustomValidity()`.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `defaultValue` `default-value` | <small><strong>Type</strong> <code>string</code></small> |
| `disabled` | Disables the control and excludes it from constraint validation.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disabledDates` `disabled-dates` | <small><strong>Type</strong> <code>string</code></small> |
| `disabledDaysOfWeek` `disabled-days-of-week` | <small><strong>Type</strong> <code>string</code></small> |
| `disableFuture` `disable-future` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disablePast` `disable-past` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `firstDayOfWeek` `first-day-of-week` | <small><strong>Type</strong> <code>'auto' \| 'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'</code></small><br><small><strong>Default</strong> <code>auto</code></small> |
| `instructions` | <small><strong>Type</strong> <code>string</code></small> |
| `invalid` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `label` | <small><strong>Type</strong> <code>string</code></small> |
| `locale` | <small><strong>Type</strong> <code>string</code></small> |
| `max` | <small><strong>Type</strong> <code>string</code></small> |
| `maxRange` `max-range` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `min` | <small><strong>Type</strong> <code>string</code></small> |
| `minRange` `min-range` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `mode` | <small><strong>Type</strong> <code>PkDatePickerMode</code></small><br><small><strong>Default</strong> <code>single</code></small> |
| `months` | <small><strong>Type</strong> <code>1 \| 2</code></small><br><small><strong>Default</strong> <code>1</code></small> |
| `name` | Name submitted with form data.<br><small><strong>Type</strong> <code>string \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `open` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `pageBy` `page-by` | <small><strong>Type</strong> <code>'months' \| 'single'</code></small><br><small><strong>Default</strong> <code>months</code></small> |
| `placeholder` | <small><strong>Type</strong> <code>string</code></small> |
| `placement` | <small><strong>Type</strong> <code>PkPopupPlacement</code></small><br><small><strong>Default</strong> <code>bottom</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `required` | Marks the control as required for form submission.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `sideOffset` `side-offset` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>4</code></small> |
| `size` | <small><strong>Type</strong> <code>PkDatePickerSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `value` | <small><strong>Type</strong> <code>string \| Date</code></small> |
| `weekdayFormat` `weekday-format` | <small><strong>Type</strong> <code>'narrow' \| 'short' \| 'long' \| undefined</code></small> |
| `width` | When `full`, the control stretches to the host width.<br><small><strong>Type</strong> <code>'full' \| undefined</code></small> |
| `withClear` `with-clear` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withInstructions` `with-instructions` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withLabel` `with-label` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `withOutsideDays` `with-outside-days` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `withWeekNumbers` `with-week-numbers` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

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
| `change` | — |
| `input` | — |
| `pk-change` | — |
| `pk-clear` | — |

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
