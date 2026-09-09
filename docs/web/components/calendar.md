# Calendar

Calendars present single-date or range selection in a compact month view.

## Single Date

Use single mode when the interface needs one chosen day with minimal extra UI.

<ComponentPreview src="./examples/calendar-single.preview.web.ts" />

## Disabled Days

Disabled ranges are useful for unavailable dates.

<ComponentPreview src="./examples/calendar-disabled.preview.web.ts" />

## Date Ranges

Range mode works well for reporting, booking, and filtering flows where a start and end date belong together.

<ComponentPreview src="./examples/calendar-range.preview.web.ts" />

## Dropdown Captions

Dropdown month and year captions help when users need to move quickly across larger time spans.

<ComponentPreview src="./examples/calendar-dropdown-captions.preview.web.ts" />

## Two-Month Display

`months="2"` shows two months side by side — useful for ranges and booking-style UIs.

<ComponentPreview src="./examples/calendar-dual-month.preview.web.ts" />

## Week Numbers

`with-week-numbers` adds an ISO 8601 week column.

<ComponentPreview src="./examples/calendar-week-numbers.preview.web.ts" />

## View Stepper

Click the month/year title to step between day, month, and year views.

<ComponentPreview src="./examples/calendar-view-stepper.preview.web.ts" />

## Days of Week

`disabled-days-of-week` takes space-separated weekday names (`sun`, `mon`, …).

<ComponentPreview src="./examples/calendar-disabled-days-of-week.preview.web.ts" />

<!-- pk-api:begin -->

## API

### Slots

| Name | Description |
| --- | --- |
| `previous-icon` | — |
| `next-icon` | — |
| `footer` | — |
| `day-YYYY-MM-DD` | Custom content for a specific day cell |

### Attributes & Properties

| Name | Description |
| --- | --- |
| `bordered` | When false, omits the outer frame — use inside popovers (e.g. `pk-date-picker`).<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `disabled` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disabledDatesRaw` `disabled-dates` | <small><strong>Type</strong> <code>string</code></small> |
| `disabledDaysOfWeek` `disabled-days-of-week` | <small><strong>Type</strong> <code>string</code></small> |
| `disableFuture` `disable-future` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `disablePast` `disable-past` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `firstDayOfWeek` `first-day-of-week` | <small><strong>Type</strong> <code>PkCalendarFirstDayOfWeek</code></small><br><small><strong>Default</strong> <code>auto</code></small> |
| `focusedDate` `focused-date` | <small><strong>Type</strong> <code>string</code></small> |
| `locale` | <small><strong>Type</strong> <code>string</code></small> |
| `max` | <small><strong>Type</strong> <code>string</code></small> |
| `maxRange` `max-range` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `min` | <small><strong>Type</strong> <code>string</code></small> |
| `minRange` `min-range` | <small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `mode` | <small><strong>Type</strong> <code>PkCalendarMode</code></small><br><small><strong>Default</strong> <code>single</code></small> |
| `months` | <small><strong>Type</strong> <code>1 \| 2</code></small><br><small><strong>Default</strong> <code>1</code></small> |
| `pageBy` `page-by` | <small><strong>Type</strong> <code>PkCalendarPageBy</code></small><br><small><strong>Default</strong> <code>months</code></small> |
| `readonly` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `size` | <small><strong>Type</strong> <code>PkCalendarSize</code></small><br><small><strong>Default</strong> <code>default</code></small> |
| `today` | <small><strong>Type</strong> <code>string</code></small> |
| `value` | <small><strong>Type</strong> <code>string</code></small> |
| `view` | <small><strong>Type</strong> <code>PkCalendarView</code></small><br><small><strong>Default</strong> <code>days</code></small> |
| `weekdayFormat` `weekday-format` | <small><strong>Type</strong> <code>'narrow' \| 'short' \| 'long'</code></small><br><small><strong>Default</strong> <code>narrow</code></small> |
| `withOutsideDays` `with-outside-days` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>true</code></small> |
| `withWeekNumbers` `with-week-numbers` | <small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |

### Events

| Name | Description |
| --- | --- |
| `change` | User commits a new value |
| `input` | Value changes during interaction |
| `pk-focus-day` | Focused day changed; `detail.date` |
| `pk-view-change` | View changed; `detail.view`, `detail.date` |

<!-- pk-api:end -->
