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

`mode="multiple"` (or the `multiple` prop) lets users toggle several individual dates. The panel stays open while selecting, the control shows a count summary, and the value is a comma-separated, sorted list of ISO dates.

<ComponentPreview src="./examples/date-picker-multiple.preview.tsx" />

## Date and Time

Compose `DatePicker` with `TimePicker` side by side; combine the values in your app code.

<ComponentPreview src="./examples/date-picker-date-time.preview.tsx" />
