# Calendar

Calendars present single-date or range selection in a compact month view.

## Single Date

Use single mode when the interface needs one chosen day with minimal extra UI.

<ComponentPreview src="./examples/calendar-single.preview.vue.ts" />

## Disabled Days

Disabled ranges are useful for unavailable dates.

<ComponentPreview src="./examples/calendar-disabled.preview.vue.ts" />

## Date Ranges

Range mode works well for reporting, booking, and filtering flows where a start and end date belong together.

<ComponentPreview src="./examples/calendar-range.preview.vue.ts" />

## Dropdown Captions

Dropdown month and year captions help when users need to move quickly across larger time spans.

<ComponentPreview src="./examples/calendar-dropdown-captions.preview.vue.ts" />

## Two-Month Display

`months="2"` shows two months side by side — useful for ranges and booking-style UIs.

<ComponentPreview src="./examples/calendar-dual-month.preview.vue.ts" />

## Week Numbers

`withWeekNumbers` adds an ISO 8601 week column.

<ComponentPreview src="./examples/calendar-week-numbers.preview.vue.ts" />

## View Stepper

Click the month/year title to step between day, month, and year views.

<ComponentPreview src="./examples/calendar-view-stepper.preview.vue.ts" />

## Days of Week

`disabledDaysOfWeek` takes space-separated weekday names (`sun`, `mon`, …).

<ComponentPreview src="./examples/calendar-disabled-days-of-week.preview.vue.ts" />
