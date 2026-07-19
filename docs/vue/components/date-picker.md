# Date Picker

Date pickers wrap a field and calendar trigger into a single input pattern for choosing one date.

## Basic Usage

Use a controlled value when the chosen date needs to stay in sync with surrounding form state.

<ComponentPreview src="./examples/date-picker-basic.preview.vue.ts" />

## States

Show required (with clear), invalid, and disabled states when the picker is used inside forms.

<ComponentPreview src="./examples/date-picker-states.preview.vue.ts" />

## Constraints

Bound selectable days with `disablePast` / `disableFuture`, weekday rules, and `min` / `max`.

<ComponentPreview src="./examples/date-picker-constraints.preview.vue.ts" />

## Range

`mode="range"` with `months="2"` for a two-month booking-style picker.

<ComponentPreview src="./examples/date-picker-range.preview.vue.ts" />

## Date and Time

Compose `DatePicker` with `TimePicker` side by side; combine the values in your app code.

<ComponentPreview src="./examples/date-picker-date-time.preview.vue.ts" />
