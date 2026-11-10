# Meter

A meter shows one value within a known range as a short horizontal bar, such as a form's completion rate or how much of a monthly email quota has been used. It is compact enough for table cells, and it can flag values that fall outside an expected range. Use a [bar chart](/web/components/chart#bar-charts) instead when readers need to compare several values on a shared scale.

The meter is drawn with CSS alone and loads no chart library, so a table with a meter in every row stays light. Import its own module rather than the chart family when a page only needs meters:

```js
import '@verbb/plugin-kit-web/components/chart/pk-meter.js';
```

## Values and Ranges

Set `value` along with `min` and `max`, which default to 0 and 1. The default range suits ratios: a completion rate of `0.82` fills 82% of the bar. For counts, set `max` to the limit, such as a quota of 10,000 emails. Values outside the range are drawn at the nearest end.

Set `label` to name what is measured, and `show-value` to print the formatted value beside the bar. `format` is `number` by default, and also accepts `money`, `percent` and `duration`, as in [chart columns](/web/components/chart#column-types); set `currency` for money values. Set `format="percent"` for ratios, so that `0.82` reads as 82% rather than 0.82.

<ComponentPreview src="./examples/meter-basic.preview.web.ts" />

## Expected Ranges

`low`, `high` and `optimum` work as they do on the HTML `<meter>` element. `low` and `high` divide the range into three regions: below `low`, between the two, and above `high`. `optimum` says which region is best. A value in the same region as the optimum is shown in the accent colour. A value one region away is a warning, and a value two regions away, at the opposite end, is a danger.

For a completion rate, set `low="0.4"`, `high="0.6"` and `optimum="1"`: above 60% is in the expected range, 40% to 60% is a warning, and below 40% is a danger. A spam rate works the other way round. With `low="0.05"`, `high="0.15"` and `optimum="0"`, anything under 5% is expected, 5% to 15% is a warning and above 15% is a danger. This spam meter also sets `max="0.25"`, so that small rates are still visible. As with `<meter>`, a value exactly at `low` or `high` belongs to the middle region.

<ComponentPreview src="./examples/meter-ranges.preview.web.ts" />

Without `low` or `high`, every value is in the expected range. When you set only one of them, the other defaults to the end of the range. Without `optimum`, the midpoint of the range is treated as best.

Screen readers hear "outside the expected range" or "well outside the expected range" after a value that isn't in the expected range. A warning symbol also appears beside the bar, with or without the printed value, so the state never depends on colour alone. Translate those phrases with `warning-label` and `danger-label`.

## Accessibility

The meter has the `meter` role, with its `label` as the accessible name and the formatted value, plus any warning, as its spoken value. The printed value is hidden from assistive technology so it isn't read twice. Give each meter in a table a label that names its row, such as "Contact Us completion rate", because a screen reader may reach the meter without the row heading.

Values follow `locale`, a BCP 47 tag such as `de-DE`. Without one, the meter uses Craft's control panel locale, then the `lang` attribute of the `<html>` element, then `en-US`.

## Styling

The fill colour comes from `--pk-chart-meter-ok`, `--pk-chart-meter-warning` or `--pk-chart-meter-danger`, and the track is a pale mix of the same colour with `--pk-chart-surface`. The printed value uses `--pk-chart-text`. The meter is at least 80px wide and otherwise fills its container. Use the CSS parts in the [API](#api) to change the track height or the value's width.

<!-- pk-api:begin -->

## API

### Attributes & Properties

| Name | Description |
| --- | --- |
| `currency` | ISO 4217 currency code when `format="money"`.<br><small><strong>Type</strong> <code>string</code></small> |
| `dangerLabel` `danger-label` | Appended to the accessible value two regions from the optimum.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>well outside the expected range</code></small> |
| `format` | How the value is formatted for display and screen readers.<br><small><strong>Type</strong> <code>FormatType</code></small><br><small><strong>Default</strong> <code>number</code></small> |
| `high` | Values above this are in the high region.<br><small><strong>Type</strong> <code>number \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `label` | Accessible name, e.g. "Contact Us completion rate".<br><small><strong>Type</strong> <code>string</code></small> |
| `locale` | BCP 47 locale for the value. Defaults to the Craft or document locale.<br><small><strong>Type</strong> <code>string</code></small> |
| `low` | Values below this are in the low region.<br><small><strong>Type</strong> <code>number \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `max` | End of the range. The default suits ratios such as `0.64` with `format="percent"`.<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>1</code></small> |
| `min` | Start of the range.<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `optimum` | The best value. Its region is shown in the accent colour; one region away is a warning, two is danger.<br><small><strong>Type</strong> <code>number \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `showValue` `show-value` | Print the formatted value beside the bar.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `value` | Current value, clamped to `min`–`max`.<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>0</code></small> |
| `warningLabel` `warning-label` | Appended to the accessible value one region from the optimum.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>outside the expected range</code></small> |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Meter row. | `::part(base)` |
| `fill` | Filled portion. | `::part(fill)` |
| `track` | Unfilled track. | `::part(track)` |
| `value` | Formatted value. | `::part(value)` |

<!-- pk-api:end -->
