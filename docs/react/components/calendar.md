# Calendar

Calendars present single-date or range selection in a compact month view.

## Single Date

Use single mode when the interface needs one chosen day with minimal extra UI.

<ComponentPreview src="./examples/calendar-single.preview.tsx" />

## Disabled Days

Disabled ranges are useful for unavailable dates.

<ComponentPreview src="./examples/calendar-disabled.preview.tsx" />

## Date Ranges

Range mode works well for reporting, booking, and filtering flows where a start and end date belong together.

<ComponentPreview src="./examples/calendar-range.preview.tsx" />

## Dropdown Captions

Dropdown month and year captions help when users need to move quickly across larger time spans.

<ComponentPreview src="./examples/calendar-dropdown-captions.preview.tsx" />

## Two-Month Display

`months="2"` shows two months side by side — useful for ranges and booking-style UIs.

<ComponentPreview src="./examples/calendar-dual-month.preview.tsx" />

## Week Numbers

`withWeekNumbers` adds an ISO 8601 week column.

<ComponentPreview src="./examples/calendar-week-numbers.preview.tsx" />

## View Stepper

Click the month/year title to step between day, month, and year views.

<ComponentPreview src="./examples/calendar-view-stepper.preview.tsx" />

## Days of Week

`disabledDaysOfWeek` takes space-separated weekday names (`sun`, `mon`, …).

<ComponentPreview src="./examples/calendar-disabled-days-of-week.preview.tsx" />
