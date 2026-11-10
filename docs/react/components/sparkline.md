# Sparkline

A sparkline is a small line with no axes that shows the shape of a trend at a glance, such as each form's submissions over the last fortnight in a table row. It is sized to sit inside a table cell or beside a figure, such as in a plugin's own [summary tile](#building-a-stat-tile). When readers need to compare exact values or read dates from an axis, use a [line chart](/react/components/chart#line-and-area-charts) instead.

Import `Sparkline` from `@verbb/plugin-kit-react/components`:

```ts
import { Sparkline } from '@verbb/plugin-kit-react/components';
```

Sparklines draw with Chart.js, like the full [charts](/react/components/chart), so their formatting and colours match.

## Values and Labels

Supply the figures in `values`, oldest first. Pass `values` an array of numbers. Set `label` to describe what the line shows, including the period, such as "Contact Us submissions, last 14 days".

<ComponentPreview src="./examples/sparkline-basic.preview.tsx" />

The line fills the width of its container, with a fading wash beneath it, and the most recent value is marked with a dot. Its vertical scale fits the lowest and highest values rather than starting at zero, so modest changes are still visible. That makes the sparkline good for showing direction and shape, but not for judging the size of a change; show the figure itself nearby when it matters.

A value that isn't a number, such as an empty entry in the list, leaves a gap in the line. Assign a new array to redraw with new figures; like the full charts, a sparkline animates in on its first draw only.

Set `format` to `number` (the default), `money`, `percent` or `duration`, and `currency` for money values. These follow the same rules as [chart column types](/react/components/chart#column-types): percentages are ratios from 0 to 1 and durations are seconds. Set `color` to a series colour slot from 1 to 8 so that a sparkline matches the series it summarises elsewhere on the page.

## Dates in the Tooltip

Hovering a sparkline shows the value at that point. Add `dates`, a list of bucket keys in the same order as `values`, to show the date beside it as well. Pass `dates` an array too. `bucket` sets how those keys are read and displayed: `hour`, `day` (the default), `week`, `month` or `year`. The last sparkline above uses week buckets, so its tooltip shows the week's start date.

When several sparklines cover the same days, as in this table of forms, pass each row its values and the shared date keys:

<ComponentPreview src="./examples/sparkline-table.preview.tsx" />

## Accessibility

A sparkline is exposed as a single image. Its accessible name starts with the `label` and summarises the line: the first and last values, then the highest and lowest. A screen reader announces the first sparkline in the table above as "Contact Us submissions, last 14 days: 88 to 99, high 121, low 37".

The tooltip is a visual aid only, and sparklines don't take keyboard focus. If readers need individual values, provide them in a table or a full chart. Translate the words in the summary with `toLabel`, `highLabel` and `lowLabel`.

Values and dates follow `locale`, a BCP 47 tag such as `de-DE`. Without one, the sparkline uses Craft's control panel locale, then the `lang` attribute of the `<html>` element, then `en-US`. In right-to-left layouts, the line runs from right to left.

## Size and Colour

Set `--pk-sparkline-height` to change the height, which is 32px by default. The sparkline is at least 60px wide and otherwise fills its container, so give a table column a width when the sparklines should line up.

Colours come from the `--pk-chart-series-*` tokens. The tooltip uses `--pk-chart-tooltip-background`, `--pk-chart-tooltip-shadow`, `--pk-chart-text` and `--pk-chart-text-muted`. See [Size and Theming](/react/components/chart#size-and-theming) for how charts pick up token changes.

## Building a Stat Tile

Overview pages often lead with a few headline figures, each with its change against the previous period and a small trend. Plugin Kit doesn't include a tile component, because each plugin lays these out differently, but it supplies the pieces: the formatters from `@verbb/plugin-kit-core/utils/format` and the sparkline.

The tile below belongs to the plugin, with its own markup and styles. `formatValue` formats the headline figure. `formatChange` compares it with the previous period and returns the signed text, its direction and whether the change is good, bad or neutral, which the tile uses to choose its colours from the chart tokens. It returns `null` when there's nothing to compare, so the tile hides its pill. A sparkline under the figure shows the last fortnight.

<ComponentPreview src="./examples/sparkline-tile.preview.tsx" />

The arrow is hidden from screen readers because the signed text already says which way the figure moved, and it keeps the change from relying on colour alone. Pass a `locale` in the formatter options when the page's locale isn't the browser's, and see [Formatting Values Elsewhere](/react/components/chart#formatting-values-elsewhere) for every option.

<!-- pk-api:begin -->

## API

### Props

| Name | Description |
| --- | --- |
| `bucket` | Date bucket of `dates`, for the hover label.<br><small><strong>Type</strong> <code>DateBucket</code></small><br><small><strong>Default</strong> <code>day</code></small> |
| `color` | Colour slot 1–8.<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>1</code></small> |
| `currency` | ISO 4217 currency code when `format="money"`.<br><small><strong>Type</strong> <code>string</code></small> |
| `dates` | Optional bucket keys matching `values`, shown in the hover tooltip.<br><small><strong>Type</strong> <code>unknown[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |
| `format` | How values are formatted in the hover label and accessible summary.<br><small><strong>Type</strong> <code>FormatType</code></small><br><small><strong>Default</strong> <code>number</code></small> |
| `highLabel` | Precedes the highest value in the accessible summary.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>high</code></small> |
| `label` | Accessible name, e.g. "Submissions, last 14 days".<br><small><strong>Type</strong> <code>string</code></small> |
| `locale` | BCP 47 locale for values and dates. Defaults to the Craft or document locale.<br><small><strong>Type</strong> <code>string</code></small> |
| `lowLabel` | Precedes the lowest value in the accessible summary.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>low</code></small> |
| `toLabel` | Joins the first and last values in the accessible summary.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>to</code></small> |
| `values` | Values in order, oldest first.<br><small><strong>Type</strong> <code>unknown[]</code></small><br><small><strong>Default</strong> <code>[]</code></small> |

### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-sparkline-height` | Height of the line. Defaults to 32px. |

### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Drawing area. | `::part(base)` |
| `tooltip` | Hover value. | `::part(tooltip)` |

<!-- pk-api:end -->
