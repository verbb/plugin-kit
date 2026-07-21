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
