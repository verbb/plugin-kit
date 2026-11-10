# Charts

Charts show how a figure changes over time or how a total divides up: form submissions by day, recovered revenue against the previous fortnight, visitors by country or how many abandoned carts make it to an order. Plugin Kit has four chart components that share one data shape, one set of formatting rules and the same tooltip, legend, table, keyboard and state behaviour:

- `LineChart` for trends over a date or category axis, with an optional area fill and a dashed previous period.
- `BarChart` for comparing categories, vertically or horizontally, grouped or stacked.
- `DonutChart` for the parts of a single total.
- `FunnelChart` for ordered stages where each stage is a subset of the one before.

A [Sparkline](/vue/components/sparkline) shows a compact trend inside a table cell or a plugin's own summary tile, and a [Meter](/vue/components/meter) shows one value within a range.

## Importing the Charts

The chart components draw with [Chart.js](https://www.chartjs.org/), which Plugin Kit bundles. Import the components you use from `@verbb/plugin-kit-vue/components`:

```ts
import { BarChart, DonutChart, FunnelChart, LineChart, Meter, Sparkline } from '@verbb/plugin-kit-vue/components';
```

Each component loads only its own web component and the Chart.js pieces it draws with, so a page with one line chart doesn't carry the bar or donut code. With a bundler that drops unused exports, a page that imports none of the charts never loads Chart.js. The [Meter](/vue/components/meter) is drawn entirely in CSS and loads no chart library at all.

The charts are configured entirely through props, data and events. There is deliberately no way to pass raw Chart.js options or plugins, or to reach the Chart.js instance, so every chart keeps the same accessibility, theming and formatting behaviour. If a chart needs something this page doesn't cover, ask for it as a chart option rather than working around the element.

## Providing Data

Every chart takes its figures from the `data` prop: an object with a `cols` array that describes each column and a `rows` array of values. The first column is the axis that the other columns are plotted against, such as a date or a form name. Each further column is a series. A row starts with its axis key and then has one value per series, in column order.

The example below plots daily form submissions for the last fortnight. The `date` column holds bucket keys such as `2026-10-23`, and the `submissions` column holds a count for each day.

<ComponentPreview src="./examples/chart-line.preview.vue.ts" />

Bind `data` to an object with `:data`, such as a `ref` filled from a request.

Use `null` for a missing value. A line chart leaves a gap at that point rather than drawing a zero, and the tooltip and table show an en dash.

The `label` prop names the chart for assistive technology and captions its data table. Every chart needs one, even when a visible heading sits above it. Describe what is plotted, such as "Form submissions by day", rather than the chart type.

### Updating Data

Assign a new object to the bound value whenever the figures change. The chart redraws when `data` is replaced, not when the existing object is modified, so build a new object rather than pushing rows onto the old one. Here, each button replaces the data with another site's submissions:

<ComponentPreview src="./examples/chart-update.preview.vue.ts" />

A chart animates in on its first draw only. Later updates, such as a new date range or figures that refresh on a live dashboard, redraw in place without replaying the entry animation. When the visitor prefers reduced motion, charts never animate. Series hidden from the legend stay hidden across updates, as long as the new data still has a series with the same id. While a request is in progress, set [`state="loading"`](#loading-empty-and-error-states) to dim the current chart.

### Data Reference

The `data` object accepts these fields. The types are exported as `ChartData`, `ChartColumn` and `ChartRow` from `@verbb/plugin-kit-vue`, along with the `PkPointSelectDetail` and `PkLegendToggleDetail` event details.

| Field | Type | Description |
| --- | --- | --- |
| `cols` | `ChartColumn[]` | Required. The axis column first, then one column per series. Donut and funnel charts take exactly two: a category or stage column and a value column. |
| `rows` | `ChartRow[]` | Required. Arrays that start with the axis key and continue with one value per series, in the same order as `cols`. Donut and funnel rows are `[label, value]`. |
| `comparisonRows` | `ChartRow[]` | Line charts only. The previous period, one row per entry in `rows`, matched by position. The first cell is the previous period's own key. See [Comparing with a Previous Period](#comparing-with-a-previous-period). |
| `comparisonLabel` | `string` | Names the previous period in the legend, tooltip and data table, such as "Previous 30 days". |
| `currentLabel` | `string` | Names the current period in a line chart's legend when there is a single series and a previous period, such as "Last 30 days". |
| `firstNote` | `string` | Funnel charts only. A short caption under the first stage, such as the value at risk. It appears in the default `steps` shape. |

Each entry in `cols` is a `ChartColumn`:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Required. A stable identifier for the column. Events and legend keys refer to series by this id. |
| `label` | `string` | Required. The column's name in the legend, tooltip and data table header. |
| `type` | `'number' \| 'money' \| 'percent' \| 'duration' \| 'date' \| 'category'` | How values are read and formatted. The first column defaults to `category` and value columns to `number`. See [Column Types](#column-types). |
| `currency` | `string` | An ISO 4217 code for `money` columns. Defaults to `USD`. |
| `decimals` | `number` | Fixed fraction digits for `number` and `money` values in tooltips and tables. |
| `bucket` | `'hour' \| 'day' \| 'week' \| 'month' \| 'year'` | The period each `date` key represents. Defaults to `day`. |
| `color` | `number` | Pins the series to colour slot 1 to 8. |
| `positive` | `'up' \| 'down' \| 'none'` | Which direction of change counts as an improvement when a line chart compares periods. Defaults to `up`. |

Series without a `color` take the lowest free slot in column order, after the pinned slots are reserved. Pin a slot when a series can be filtered out, so that the series that remain keep their colours. The [series line chart](#line-and-area-charts) pins its spam series to slot 8, which is red by default.

### Column Types

Each column's `type` decides how its values are read and displayed. Charts format values twice: compactly for axis ticks, and in full for tooltips, the data table and screen-reader text. Formatting uses the browser's `Intl` APIs in the chart's [locale](#locale-and-right-to-left-layouts).

| Type | Value | Axis Ticks | Tooltips and Tables |
| --- | --- | --- | --- |
| `number` | A number | Up to one decimal place; 10,000 and above are compacted, such as `12.5K` | Up to two decimal places, so `41.357` shows as `41.36` and whole numbers stay whole; `decimals` fixes the count exactly |
| `money` | An amount in whole currency units, such as `148.57` | Compact currency, such as `$12.5K` | The currency's own minor units, such as `$12,480.00`, or `decimals` when set |
| `percent` | A ratio from 0 to 1, so `0.42` is 42% | Whole percentages | Up to one decimal place |
| `duration` | A number of seconds | Narrow units, without seconds once there are hours | Narrow units, such as `4m 12s` or `1h 2m 5s` |
| `date` | A bucket key, read according to `bucket` | Short dates | Full dates |
| `category` | Any text | The text as supplied | The text as supplied |

The first column defaults to `category` and every value column to `number`. Set a `type` on value columns that hold money, percentages or durations.

Date keys in `YYYY`, `YYYY-MM` and `YYYY-MM-DD` form are read as local calendar dates. A `2026-11-05` bucket is always shown as 5 November, whatever the visitor's time zone, so the server can send the same keys it groups by. A four-digit integer such as `2026` is read as a year. Other date strings and millisecond timestamps are parsed with `Date`. The `bucket` decides how a key is displayed, shown here in `en-US`:

| Bucket | Example Key | Axis Ticks | Tooltips and Tables |
| --- | --- | --- | --- |
| `hour` | `2026-11-05T14:00:00` | `2 PM` | `Thu, Nov 5, 2:00 PM` |
| `day` | `2026-11-02` | `Nov 2` | `Mon, Nov 2, 2026` |
| `week` | `2026-11-02`, the first day of the week | `Nov 2` | `Nov 2 – 8, 2026` |
| `month` | `2026-11` | `Nov` | `November 2026` |
| `year` | `2026` | `2026` | `2026` |

Durations and week buckets work well together. This chart plots the average time to complete a job application form each week. A duration axis steps in whole units, such as every minute, rather than at awkward intervals of seconds.

<ComponentPreview src="./examples/chart-line-duration.preview.vue.ts" />

All the series in a chart share one value axis, and its ticks use the first series' type. Plot series with the same unit together.

### Formatting Values Elsewhere

The chart formatters are available from `@verbb/plugin-kit-core/utils/format`, so a plugin page can format the figures around a chart the same way. A column definition doubles as the format spec.

```js
import { createFormatter, formatChange, formatValue } from '@verbb/plugin-kit-core/utils/format';

const revenue = { type: 'money', currency: 'USD' };

formatValue(12480, revenue, { locale: 'en-US' });                   // '$12,480.00'
formatValue(12480, revenue, { locale: 'en-US', context: 'axis' });  // '$12.5K'

// Reuse one formatter when formatting many values.
const formatDay = createFormatter({ type: 'date', bucket: 'day' }, { locale: 'en-AU' });
formatDay('2026-11-05');                                            // 'Thu, 5 Nov 2026'

formatChange(12480, 10576, revenue, { locale: 'en-US' });
// { text: '+18%', direction: 1, tone: 'good' }
```

| Function | Returns | Description |
| --- | --- | --- |
| `createFormatter(spec, options)` | `(value) => string` | A reusable formatter for one spec. Prefer it when formatting many values, such as every cell in a column. |
| `formatValue(value, spec, options)` | `string` | Formats a single value. |
| `formatChange(current, previous, spec, options)` | `{ text, direction, tone }` or `null` | Describes the change between two values. `direction` is `1`, `-1` or `0`, and `tone` is `good`, `bad` or `neutral`. Returns `null` when either value is missing, or for a relative change from zero. |
| `formatDuration(seconds, locale, context)` | `string` | Formats seconds with narrow units, such as `26h 30m`. |
| `parseBucketDate(value)` | `Date` or `null` | Reads a bucket key, timestamp or `Date` as a local date. |

The `spec` is any object with the column formatting fields: `type`, `currency`, `decimals` and `bucket`. The `options` for `createFormatter` and `formatValue` are `context` (`full` by default, or `axis` for compact tick labels), `locale` and `emptyLabel`, the text for a missing value (an en dash by default). The `options` for `formatChange` are `mode`, `positive`, `locale` and `pointsLabel`. `mode` is `relative` for a percentage change (the default) or `absolute` for the difference, which is given in percentage points for `percent` values and labelled with `pointsLabel` (`pts` by default). `positive` is `up`, `down` or `none`, as on a column. The [Sparkline](/vue/components/sparkline#building-a-stat-tile) page uses these functions to build a summary tile.

## Line and Area Charts

`LineChart` draws one line per series. Hover the chart, or focus it and use the arrow keys, to see a single tooltip listing every series at that point. A thin vertical crosshair marks the position.

With more than one series, a legend appears above the chart. In this example the `spam` column pins colour slot 8 so that it always appears in the same colour, even when the other series are filtered out of the data.

<ComponentPreview src="./examples/chart-line-series.preview.vue.ts" />

Lines are smooth by default, using monotone curves that never overshoot the data, so a smoothed line never suggests a peak or dip that didn't happen. Set `curve="linear"` for straight segments between points, which reads better for dense data or values that change in steps. Add `area` to fill beneath each line with a fading wash of its colour. An area suits a single series where the volume matters as much as the shape; with several overlapping series, plain lines are easier to tell apart. These two charts plot the same page views, first with the default smooth curve and then with `curve="linear"`:

<ComponentPreview src="./examples/chart-line-curve.preview.vue.ts" />

### Axis Titles and Range

The axes are usually clear from the `label` and the formatted ticks. Add `x-label` or `y-label` when they aren't, such as to name a unit or say what a date represents. `x-label` titles the horizontal axis and `y-label` the vertical one.

The value axis starts at zero, or below it when the data has negative values, and ends just above the largest value. Set `min` and `max` to fix the range instead, so that a rate always reads against the full 0 to 100% and several charts on one page share a scale. Values are in the column's own units, so a percentage axis from 0 to 100% is `:min="0"` and `:max="1"`. Bind numeric props with `:` so they reach the element as numbers.

<ComponentPreview src="./examples/chart-line-axes.preview.vue.ts" />

## Comparing with a Previous Period

A line chart can draw the previous period as a dashed line, so a reader can see whether recovered revenue is ahead of last fortnight's on each day. Add `comparisonRows` to the data, with one row per entry in `rows`, matched by position: the first comparison row is drawn under the first current row, and so on. The first cell of each comparison row is the previous period's own key, and the rest are its values for each series.

```vue
<script setup lang="ts">
import type { ChartData } from '@verbb/plugin-kit-vue';

const revenue: ChartData = {
    cols: [
        { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
        { id: 'revenue', label: 'Recovered revenue', type: 'money', currency: 'USD' },
    ],
    currentLabel: 'Last 14 days',
    comparisonLabel: 'Previous 14 days',
    rows: [['2026-10-23', 612.4], ['2026-10-24', 388] /* … */],
    comparisonRows: [['2026-10-09', 540.2], ['2026-10-10', 301.6] /* … */],
};
</script>

<template>
    <LineChart label="Recovered revenue by day" area :data="revenue" />
</template>
```

Send the same number of comparison rows as current rows, and line them up the way readers will compare them. For daily data, starting both periods on the same weekday keeps weekends aligned, as the 14-day periods in these examples do.

`comparisonLabel` names the previous period in the legend and the data table. With a single series, `currentLabel` names the current period's legend item; without it, the legend uses the column label.

<ComponentPreview src="./examples/chart-line-comparison.preview.vue.ts" />

The tooltip shows each value, the change against the previous period and the previous value with its own date. When a comparison row repeats the current key instead of carrying its own, the tooltip names it with `comparisonLabel`. The change is a percentage with an arrow, coloured as an improvement or a decline according to the column's `positive` direction. Set `positive: 'down'` for metrics where less is better, such as time to complete a form or carts left unrecovered, and `positive: 'none'` to keep every change neutral. The arrow and sign accompany the colour, so the meaning never depends on colour alone.

With one series, the previous period is a neutral grey dashed line. With several, each series' previous period is dashed in a translucent version of that series' colour so the pairs stay identifiable, and a single legend item shows or hides all of them. Each series' tooltip row carries its own change.

<ComponentPreview src="./examples/chart-line-comparison-series.preview.vue.ts" />

The data table adds the previous period's dates and values as extra columns. Only line charts draw a previous period. Bar, donut and funnel charts ignore `comparisonRows`.

## Bar Charts

`BarChart` compares values across categories. With one series, the chart needs no legend: the heading or `label` names what is plotted.

<ComponentPreview src="./examples/chart-bar.preview.vue.ts" />

### Horizontal Bars and Value Labels

Set `orientation="horizontal"` when category names are long or there are many of them, such as a ranked list of forms. `value-labels` prints each bar's full value at its end, which removes the need for a value axis, so horizontal charts hide it. Value labels suit single-series ranked bars; on grouped or stacked bars they crowd each other.

<ComponentPreview src="./examples/chart-bar-horizontal.preview.vue.ts" />

Set `--pk-chart-height` to give horizontal bars enough room. Bars are capped at 24px thick, and a short chart with many categories squeezes them thinner.

### Grouped and Stacked Bars

With several series, bars sit side by side in each category. This suits comparing the series within a category, such as how many orders each email in a recovery sequence produced.

<ComponentPreview src="./examples/chart-bar-grouped.preview.vue.ts" />

Set `stacked="normal"` when the series add up to a meaningful total, such as the reasons carts weren't emailed each week. Each stack shows the total as its height, and the tooltip adds a **Total** row for the visible series. The data table gains a total column too. Stacked segments are separated by a thin gap in the surface colour, and only the outermost segment is rounded.

<ComponentPreview src="./examples/chart-bar-stacked.preview.vue.ts" />

Set `stacked="percent"` to compare proportions rather than totals. The chart converts each category to 100%, so a traffic source with a few hundred visits can be compared with one that has thousands. The tooltip and data table show each share alongside the underlying value. Hiding a series from the legend shares each category out among the series that remain, so the bars still reach 100%.

<ComponentPreview src="./examples/chart-bar-percent.preview.vue.ts" />

### Bar Axis Titles and Range

Bar charts take the same `x-label`, `y-label`, `min` and `max` props as line charts. `x-label` always titles the horizontal axis, so on a horizontal bar chart it names the values and `y-label` names the categories. `min` and `max` fix the value axis, whichever way the bars run. A 100% stack always runs from 0 to 100%, so it ignores both.

<ComponentPreview src="./examples/chart-bar-axes.preview.vue.ts" />

## Donut Charts

`DonutChart` shows the parts of a single total. Its `cols` are a category column and a value column, and each row is one segment. The legend sits beside the donut and lists each segment's value and share of the whole. The centre shows the total of the visible segments, labelled with the value column's label.

A donut reads best with a handful of segments, so `max-segments` (6 by default, and at least 2) limits how many are drawn. When there are more rows, the chart keeps the first rows and folds the remainder into a single **Other** segment, drawn in the neutral `--pk-chart-other` colour. Sort the rows from largest to smallest so that the smallest segments are the ones folded. The data table still lists every row.

In this example, nine countries arrive and the donut draws five plus **Other**. Switch to the table to see all nine.

<ComponentPreview src="./examples/chart-donut.preview.vue.ts" />

Lower `max-segments` to draw fewer segments, and set `other-label` to name the folded segment in your own words. Here the donut keeps three countries and folds the other six into **Other countries**:

<ComponentPreview src="./examples/chart-donut-segments.preview.vue.ts" />

The legend items show and hide their segments, and the centre total and tooltip shares follow the visible segments. A hidden segment stays hidden when new data arrives with the same category, even if the order changes. The tooltip's share row is labelled with `share-label`. Negative values are drawn as zero. When the chart is narrower than about 440px, the legend moves below the donut. `--pk-chart-height` sets the donut's diameter.

## Funnel Charts

`FunnelChart` shows ordered stages where each stage is a subset of the one before, such as abandoned carts that were emailed, opened, clicked and recovered. Its `cols` are a stage column and a value column, and each row is one stage, in order.

Stages use a single-hue ramp from `--pk-chart-ordinal-1` to `--pk-chart-ordinal-4` that darkens toward the outcome. The four tokens are spread across however many stages there are.

The default `shape="steps"` draws a column per stage. Beneath each column are the stage's name, its value and its share of the previous step. The first stage has no previous step, so it shows the data's `firstNote` instead, such as the value at risk. `firstNote` is plain text, so format any figure in it before passing it in.

<ComponentPreview src="./examples/chart-funnel.preview.vue.ts" />

`shape="centered"` draws centred horizontal bars, with each stage's value and its share of the first step beside it. This gives the familiar funnel outline and leaves more room for long stage names, such as the pages of a multi-page form. The centred shape doesn't show `firstNote`.

The tooltip and data table show both shares for every stage after the first. Set `of-previous-label` and `of-first-label` to word them for your stages. This form funnel uses "of the previous page" and "of people who started"; switch to the table to see both columns.

<ComponentPreview src="./examples/chart-funnel-centered.preview.vue.ts" />

A funnel has no legend.

## Legend

`legend="auto"`, the default, shows a legend whenever a chart has more than one series, or a line chart has a previous period. Donut charts always list their segments beside the donut, and funnels never have a legend.

Each legend item is a toggle button. Selecting one hides its series and strikes through the label; selecting it again brings the series back. Hidden series also leave the tooltip, stacked totals and the donut's centre total. The data table always lists every series. Each toggle emits a [legend toggle event](#events). Hidden series stay hidden when `data` is replaced, as long as the new data still has a series with the same id; a series that disappears is forgotten.

Set `legend="none"` to remove the legend, for example when nearby text already names the series. Readers then can't hide series, so make sure the colours are explained somewhere:

<ComponentPreview src="./examples/chart-legend-none.preview.vue.ts" />

## Tooltips

Hovering a chart, or moving through it with the keyboard, shows one tooltip for the position. Line and bar charts list every visible series there, with a coloured key matching the legend. A line chart with a previous period adds the change and the previous value, and a stacked bar chart adds a total. Donut tooltips show the segment's value and share, and funnel tooltips show the stage's value and its shares of the previous and first steps. Values use the same full formatting as the data table.

The tooltip stays inside the chart, flipping to the other side of the pointer near an edge, and follows the reading direction in right-to-left layouts. Style its surface with the `tooltip` CSS part and the `--pk-chart-tooltip-*` tokens.

## Table View and Accessibility

A canvas drawing is invisible to screen readers, so every chart also renders its data as an HTML table. In chart view the table is visually hidden, and the plot's accessible name tells screen-reader users it is there: it reads the `label` followed by "Data is available as a table." The table's caption is the `label`, and its cells use the same full formatting as the tooltip.

Add `table-toggle` to show a **Chart** / **Table** switch above the chart, so anyone can read the exact figures. Set `view="table"` to start in table view. A long table scrolls within a little more than the chart's height, with its header row kept in view.

<ComponentPreview src="./examples/chart-table-view.preview.vue.ts" />

### Describing the Takeaway

A data table gives the exact figures, but not what they mean. Set `description` to a sentence or two that states the chart's key point, such as whether a figure rose or fell and where it peaked. Screen readers announce it as the plot's description, after its name. It isn't shown on screen, so write it to stand alone, and update it when the data changes.

<ComponentPreview src="./examples/chart-description.preview.vue.ts" />

### Keyboard

The plot is a single tab stop. Once it has focus:

- **Left** and **Right** (or **Up** and **Down**) move between points, bars, segments or stages. In right-to-left layouts, Left and Right follow the reading direction.
- **Home** and **End** jump to the first and last point.
- **Enter** or **Space** selects the active point, as a click would (see [Events](#events)).
- **Escape** clears the active point.

The tooltip follows the keyboard, and a polite live region reads its contents as the active point changes. Tooltip text is always inserted as text, so labels from your data are never interpreted as HTML. Animations are turned off when the visitor prefers reduced motion.

### Translating Chart Text

Every piece of text a chart supplies itself has a prop, so plugins can pass translated strings:

| Prop | Default | Used for |
| --- | --- | --- |
| `chart-label` | Chart | The view switch's chart button |
| `table-label` | Table | The view switch's table button |
| `view-label` | Show as | The view switch's accessible name |
| `series-label` | Series | The legend's accessible name |
| `table-available-label` | Data is available as a table. | Appended to the plot's accessible name |
| `total-label` | Total | Stacked bar totals |
| `loading-label` | Loading chart | The loading state |
| `empty-heading` | No data for this period | The empty state heading |
| `error-heading` | This chart couldn't be loaded | The error state heading |
| `other-label` | Other | The folded donut segment |
| `share-label` | Share | The donut tooltip and table |
| `of-previous-label` | of previous step | Funnel shares of the previous stage |
| `of-first-label` | of first step | Funnel shares of the first stage |

`empty-message` and `error-message` add an explanation under the empty and error headings; neither has a default. The [locale example](#locale-and-right-to-left-layouts) translates the view switch.

## Loading, Empty and Error States

Charts usually load their figures after the page renders. Set `state="loading"` while a request is in progress, and `state=""` once it finishes. Before the first data arrives, the chart shows a spinner with the `loading-label`. Once a chart has rows, `loading` keeps the existing chart in place at reduced opacity while new figures load, so the layout doesn't jump when the date range changes. Clear `state` when the new `data` is assigned. This chart loads after a short delay; select **Refresh** to see the refreshing state.

<ComponentPreview src="./examples/chart-loading.preview.vue.ts" />

A chart with no rows shows an empty state instead of a blank plot. Set `empty-heading` and `empty-message` to explain what will appear and when, or put your own content in the `empty` slot, as the first chart below does. Set `state="empty"` to show the empty state even when rows exist, such as when the rows are all zero and your plugin treats that as nothing to report.

Set `state="error"` when the figures couldn't be loaded. The error panel replaces the chart and is announced to screen readers. Explain the problem with `error-message`, or replace the message with the `error` slot. Put a `Button` in the `state-actions` slot so the reader can try again without reloading the page. In the second chart below, **Try Again** loads the figures.

<ComponentPreview src="./examples/chart-empty-error.preview.vue.ts" />

The states use a small [State Panel](/vue/components/state-panel), at the same height as the chart, so swapping between states doesn't shift the page.

## Events

Charts emit three events, handled with `@pk-point-select`, `@pk-legend-toggle` and `@pk-view-change`. The events bubble and cross shadow DOM boundaries, so a listener on a container element also receives them.

`@pk-point-select` runs when a point, bar, segment or stage is clicked, or chosen with **Enter** or **Space**. Use it to drill down, such as opening the submissions for the selected day. The event's `detail` has:

- `index`, the position of the row in `data.rows`.
- `row`, that row from `data.rows`. It is `null` for a donut's folded **Other** segment, which doesn't correspond to one row.
- `series`, the id of the selected series' column. Donut and funnel charts report their value column's id.
- `value`, the raw value at that point. For 100% stacked bars this is the underlying value rather than the share, and for **Other** it is the folded total.

With several series, a click reports the series nearest the pointer in `series` and `value`. From the keyboard, Enter reports the first visible series at the focused position. Every series' value is in `row`.

`@pk-legend-toggle` runs when a legend item hides or shows its series. Its `detail` has the item's `key`, its `label` and whether it is now `hidden`. The key is the series' column id, `__comparison` for a line chart's previous period, or the segment's category for a donut.

`@pk-view-change` runs when the reader uses the chart and table switch. Its `detail.view` is `chart` or `table`. Changing the `view` prop doesn't emit it.

Try each event in this chart: click a point, toggle a legend item and switch to the table.

<ComponentPreview src="./examples/chart-events.preview.vue.ts" />

## Size and Theming

Charts fill the width of their container. Set `--pk-chart-height` to change the height of the drawing area, which is 240px by default. The legend, view switch and funnel stage labels sit outside that height, and the empty, error and loading states match it.

<ComponentPreview src="./examples/chart-height.preview.vue.ts" />

Charts take every colour from `--pk-chart-*` tokens in Plugin Kit's tokens stylesheet. Canvas drawing can't use CSS variables directly, so each chart reads the tokens from its own computed style when it draws. That means you can set a token on a chart, or on any element that contains it, to change the charts inside:

<ComponentPreview src="./examples/chart-theming.preview.vue.ts" />

To restyle every chart, such as for a dark theme, redefine the tokens where your theme defines its other custom properties. Charts redraw when the `class`, `style`, `data-theme`, `dir` or `lang` attribute changes on the `<html>` element, and when the preferred colour scheme or reduced-motion setting changes, so a theme switch on the document applies without reloading. A token change made anywhere else applies the next time the chart draws, such as when its `data` changes.

| Tokens | Used for |
| --- | --- |
| `--pk-chart-series-1` to `--pk-chart-series-8` | Series colours in slot order, also used by sparklines and donut segments |
| `--pk-chart-other` | The folded **Other** donut segment |
| `--pk-chart-comparison` | A single series' previous-period line and its legend key |
| `--pk-chart-ordinal-1` to `--pk-chart-ordinal-4` | Funnel stages, lightest first |
| `--pk-chart-surface` | The background behind the chart, used for gaps between stacked segments, point outlines and the meter track |
| `--pk-chart-text` | Values, the tooltip and table text, and the donut total |
| `--pk-chart-text-secondary` | Legend labels, tooltip labels, value labels and funnel stage names |
| `--pk-chart-text-muted` | Axis ticks, axis titles, funnel shares and secondary text |
| `--pk-chart-grid` | Value grid lines, table row dividers and the tooltip's total divider |
| `--pk-chart-axis` | The category axis line |
| `--pk-chart-crosshair` | The vertical hover line on line charts |
| `--pk-chart-border` | The outline of the selected button in the chart and table switch |
| `--pk-chart-tooltip-background` | Tooltip background |
| `--pk-chart-tooltip-shadow` | Tooltip shadow |
| `--pk-chart-toggle-background` | The chart and table switch, and neutral change pills in tooltips |
| `--pk-chart-table-head-background` | The data table's header row |
| `--pk-chart-positive`, `--pk-chart-positive-background` | Changes in the improving direction |
| `--pk-chart-negative`, `--pk-chart-negative-background` | Changes in the declining direction |
| `--pk-chart-meter-ok`, `--pk-chart-meter-warning`, `--pk-chart-meter-danger` | [Meter](/vue/components/meter) fills in and outside the expected range |

The default series order is chosen so that neighbouring colours stay distinguishable for the common forms of colour-vision deficiency, and each colour has at least 3:1 contrast against a white surface. Check both properties again if you replace the series colours. With more than eight series, the colours repeat; consider whether a table or several smaller charts would read better.

The CSS parts listed in the [API](#api) style the surrounding layout, such as the toolbar or table, without affecting the canvas drawing.

## Locale and Right-to-Left Layouts

Numbers, currencies, percentages and dates follow the chart's `locale`, a BCP 47 tag such as `de-DE`. Without one, charts use Craft's control panel locale, then the `lang` attribute of the `<html>` element, then `en-US`. The axis key, column labels, axis titles and `firstNote` come from you, so translate them before passing them in, along with the [chart's own text](#translating-chart-text).

In a right-to-left layout, the category axis runs from right to left, the value axis moves to the right-hand side and horizontal bars grow from the right. The legend, tooltip and table follow the reading direction too. Charts read the direction from their own computed style, so a `dir="rtl"` attribute on any ancestor applies. The first chart below formats euros in German; the second is an Arabic chart in a right-to-left container, with Egyptian pounds and Arabic-Indic digits.

<ComponentPreview src="./examples/chart-locale.preview.vue.ts" />

Set the direction before the chart first renders, or on the `<html>` element. A chart notices a later change to the `<html>` element's `dir`, but not to another ancestor's, until it next redraws.

<!-- pk-api:begin -->

## API

### LineChart

#### Slots

| Name | Description |
| --- | --- |
| `empty` | Replaces the empty-state message. |
| `error` | Replaces the error-state message. |
| `state-actions` | Buttons shown in the error state, such as a retry action. |

#### Props

| Name | Description |
| --- | --- |
| `area` | Fill the area under each line with a fading wash.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `chartLabel` | Text of the chart button in the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Chart</code></small> |
| `curve` | `smooth` uses monotone curves that never overshoot the data.<br><small><strong>Type</strong> <code>PkLineChartCurve</code></small><br><small><strong>Default</strong> <code>smooth</code></small> |
| `data` | Chart data: `{ cols, rows, currentLabel?, comparisonLabel?, comparisonRows?, firstNote? }`. Accepts JSON from the `data` attribute. Assign a new object to update it.<br><small><strong>Type</strong> <code>ChartData \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `description` | Longer explanation for screen readers, ideally the chart's key takeaway.<br><small><strong>Type</strong> <code>string</code></small> |
| `emptyHeading` | Heading of the empty state.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>No data for this period</code></small> |
| `emptyMessage` | Message under the empty-state heading. The `empty` slot replaces it.<br><small><strong>Type</strong> <code>string</code></small> |
| `errorHeading` | Heading of the error state.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>"This chart couldn't be loaded"</code></small> |
| `errorMessage` | Message under the error-state heading. The `error` slot replaces it.<br><small><strong>Type</strong> <code>string</code></small> |
| `label` | Accessible name for the chart and caption for its data table.<br><small><strong>Type</strong> <code>string</code></small> |
| `legend` | `auto` shows a legend whenever there is more than one series.<br><small><strong>Type</strong> <code>PkChartLegend</code></small><br><small><strong>Default</strong> <code>auto</code></small> |
| `loadingLabel` | Text beside the spinner while the first data loads.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Loading chart</code></small> |
| `locale` | BCP 47 locale for numbers and dates. Defaults to the Craft or document locale.<br><small><strong>Type</strong> <code>string</code></small> |
| `max` | Fix the end of the value axis instead of fitting the data.<br><small><strong>Type</strong> <code>number \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `min` | Fix the start of the value axis. Defaults to zero, or below it for negative data.<br><small><strong>Type</strong> <code>number \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `seriesLabel` | Accessible name of the legend.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Series</code></small> |
| `state` | `loading` keeps an existing chart dimmed while new data loads. `empty` and `error` replace it.<br><small><strong>Type</strong> <code>PkChartState</code></small> |
| `tableAvailableLabel` | Appended to the chart's accessible name to point screen-reader users to the data table.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Data is available as a table.</code></small> |
| `tableLabel` | Text of the table button in the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Table</code></small> |
| `tableToggle` | Show the chart/table toggle.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `totalLabel` | Label for stack totals in tooltips and the table column.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Total</code></small> |
| `view` | `table` shows the data table in place of the chart.<br><small><strong>Type</strong> <code>PkChartView</code></small><br><small><strong>Default</strong> <code>chart</code></small> |
| `viewLabel` | Accessible name of the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Show as</code></small> |
| `xLabel` | Title under the horizontal axis, e.g. a unit.<br><small><strong>Type</strong> <code>string</code></small> |
| `yLabel` | Title beside the vertical axis.<br><small><strong>Type</strong> <code>string</code></small> |

#### Events

| Name | Description |
| --- | --- |
| `@pk-legend-toggle` | A legend item hid or showed its series. Detail: `{ key, label, hidden }`. |
| `@pk-point-select` | A point, bar, segment or stage was clicked or chosen with Enter. Detail: `{ index, row, series, value }`. |
| `@pk-view-change` | The chart/table toggle changed the view. Detail: `{ view }`. |

#### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-chart-height` | Height of the drawing area. Defaults to 240px. |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Outer wrapper. | `::part(base)` |
| `body` | Plot, table and state wrapper. | `::part(body)` |
| `legend` | Legend group. | `::part(legend)` |
| `plot` | Chart drawing area. | `::part(plot)` |
| `state` | Loading, empty or error state panel. | `::part(state)` |
| `table` | Data table wrapper. | `::part(table)` |
| `toolbar` | Legend and chart/table toggle row. | `::part(toolbar)` |
| `tooltip` | Hover and keyboard tooltip. | `::part(tooltip)` |

#### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-spinner` | — |
| `pk-state-panel` | — |

### BarChart

#### Slots

| Name | Description |
| --- | --- |
| `empty` | Replaces the empty-state message. |
| `error` | Replaces the error-state message. |
| `state-actions` | Buttons shown in the error state, such as a retry action. |

#### Props

| Name | Description |
| --- | --- |
| `chartLabel` | Text of the chart button in the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Chart</code></small> |
| `data` | Chart data: `{ cols, rows, currentLabel?, comparisonLabel?, comparisonRows?, firstNote? }`. Accepts JSON from the `data` attribute. Assign a new object to update it.<br><small><strong>Type</strong> <code>ChartData \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `description` | Longer explanation for screen readers, ideally the chart's key takeaway.<br><small><strong>Type</strong> <code>string</code></small> |
| `emptyHeading` | Heading of the empty state.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>No data for this period</code></small> |
| `emptyMessage` | Message under the empty-state heading. The `empty` slot replaces it.<br><small><strong>Type</strong> <code>string</code></small> |
| `errorHeading` | Heading of the error state.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>"This chart couldn't be loaded"</code></small> |
| `errorMessage` | Message under the error-state heading. The `error` slot replaces it.<br><small><strong>Type</strong> <code>string</code></small> |
| `label` | Accessible name for the chart and caption for its data table.<br><small><strong>Type</strong> <code>string</code></small> |
| `legend` | `auto` shows a legend whenever there is more than one series.<br><small><strong>Type</strong> <code>PkChartLegend</code></small><br><small><strong>Default</strong> <code>auto</code></small> |
| `loadingLabel` | Text beside the spinner while the first data loads.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Loading chart</code></small> |
| `locale` | BCP 47 locale for numbers and dates. Defaults to the Craft or document locale.<br><small><strong>Type</strong> <code>string</code></small> |
| `max` | Fix the end of the value axis instead of fitting the data. Ignored for 100% stacks.<br><small><strong>Type</strong> <code>number \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `min` | Fix the start of the value axis. Ignored for 100% stacks.<br><small><strong>Type</strong> <code>number \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `orientation` | `horizontal` lays categories down the side, which suits long labels and ranked lists.<br><small><strong>Type</strong> <code>PkBarChartOrientation</code></small><br><small><strong>Default</strong> <code>vertical</code></small> |
| `seriesLabel` | Accessible name of the legend.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Series</code></small> |
| `stacked` | Stack series: `normal` sums them, `percent` shows each as a share of its category.<br><small><strong>Type</strong> <code>PkBarChartStacked</code></small> |
| `state` | `loading` keeps an existing chart dimmed while new data loads. `empty` and `error` replace it.<br><small><strong>Type</strong> <code>PkChartState</code></small> |
| `tableAvailableLabel` | Appended to the chart's accessible name to point screen-reader users to the data table.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Data is available as a table.</code></small> |
| `tableLabel` | Text of the table button in the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Table</code></small> |
| `tableToggle` | Show the chart/table toggle.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `totalLabel` | Label for stack totals in tooltips and the table column.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Total</code></small> |
| `valueLabels` | Print each bar's value at its end. Best for single-series ranked bars.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `view` | `table` shows the data table in place of the chart.<br><small><strong>Type</strong> <code>PkChartView</code></small><br><small><strong>Default</strong> <code>chart</code></small> |
| `viewLabel` | Accessible name of the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Show as</code></small> |
| `xLabel` | Title under the horizontal axis, e.g. a unit.<br><small><strong>Type</strong> <code>string</code></small> |
| `yLabel` | Title beside the vertical axis.<br><small><strong>Type</strong> <code>string</code></small> |

#### Events

| Name | Description |
| --- | --- |
| `@pk-legend-toggle` | A legend item hid or showed its series. Detail: `{ key, label, hidden }`. |
| `@pk-point-select` | A point, bar, segment or stage was clicked or chosen with Enter. Detail: `{ index, row, series, value }`. |
| `@pk-view-change` | The chart/table toggle changed the view. Detail: `{ view }`. |

#### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-chart-height` | Height of the drawing area. Defaults to 240px. |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Outer wrapper. | `::part(base)` |
| `body` | Plot, table and state wrapper. | `::part(body)` |
| `legend` | Legend group. | `::part(legend)` |
| `plot` | Chart drawing area. | `::part(plot)` |
| `state` | Loading, empty or error state panel. | `::part(state)` |
| `table` | Data table wrapper. | `::part(table)` |
| `toolbar` | Legend and chart/table toggle row. | `::part(toolbar)` |
| `tooltip` | Hover and keyboard tooltip. | `::part(tooltip)` |

#### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-spinner` | — |
| `pk-state-panel` | — |

### DonutChart

#### Slots

| Name | Description |
| --- | --- |
| `empty` | Replaces the empty-state message. |
| `error` | Replaces the error-state message. |
| `state-actions` | Buttons shown in the error state, such as a retry action. |

#### Props

| Name | Description |
| --- | --- |
| `chartLabel` | Text of the chart button in the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Chart</code></small> |
| `data` | Chart data: `{ cols, rows, currentLabel?, comparisonLabel?, comparisonRows?, firstNote? }`. Accepts JSON from the `data` attribute. Assign a new object to update it.<br><small><strong>Type</strong> <code>ChartData \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `description` | Longer explanation for screen readers, ideally the chart's key takeaway.<br><small><strong>Type</strong> <code>string</code></small> |
| `emptyHeading` | Heading of the empty state.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>No data for this period</code></small> |
| `emptyMessage` | Message under the empty-state heading. The `empty` slot replaces it.<br><small><strong>Type</strong> <code>string</code></small> |
| `errorHeading` | Heading of the error state.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>"This chart couldn't be loaded"</code></small> |
| `errorMessage` | Message under the error-state heading. The `error` slot replaces it.<br><small><strong>Type</strong> <code>string</code></small> |
| `label` | Accessible name for the chart and caption for its data table.<br><small><strong>Type</strong> <code>string</code></small> |
| `legend` | `auto` shows a legend whenever there is more than one series.<br><small><strong>Type</strong> <code>PkChartLegend</code></small><br><small><strong>Default</strong> <code>auto</code></small> |
| `loadingLabel` | Text beside the spinner while the first data loads.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Loading chart</code></small> |
| `locale` | BCP 47 locale for numbers and dates. Defaults to the Craft or document locale.<br><small><strong>Type</strong> <code>string</code></small> |
| `maxSegments` | Most segments drawn before the tail folds into "Other".<br><small><strong>Type</strong> <code>number</code></small><br><small><strong>Default</strong> <code>6</code></small> |
| `otherLabel` | Label of the segment that collects rows beyond `max-segments`.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Other</code></small> |
| `seriesLabel` | Accessible name of the legend.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Series</code></small> |
| `shareLabel` | Label for each segment's percentage in tooltips and the table.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Share</code></small> |
| `state` | `loading` keeps an existing chart dimmed while new data loads. `empty` and `error` replace it.<br><small><strong>Type</strong> <code>PkChartState</code></small> |
| `tableAvailableLabel` | Appended to the chart's accessible name to point screen-reader users to the data table.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Data is available as a table.</code></small> |
| `tableLabel` | Text of the table button in the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Table</code></small> |
| `tableToggle` | Show the chart/table toggle.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `totalLabel` | Label for stack totals in tooltips and the table column.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Total</code></small> |
| `view` | `table` shows the data table in place of the chart.<br><small><strong>Type</strong> <code>PkChartView</code></small><br><small><strong>Default</strong> <code>chart</code></small> |
| `viewLabel` | Accessible name of the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Show as</code></small> |

#### Events

| Name | Description |
| --- | --- |
| `@pk-legend-toggle` | A legend item hid or showed its series. Detail: `{ key, label, hidden }`. |
| `@pk-point-select` | A point, bar, segment or stage was clicked or chosen with Enter. Detail: `{ index, row, series, value }`. |
| `@pk-view-change` | The chart/table toggle changed the view. Detail: `{ view }`. |

#### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-chart-height` | Height of the drawing area. Defaults to 240px. |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Outer wrapper. | `::part(base)` |
| `body` | Plot, table and state wrapper. | `::part(body)` |
| `legend` | Legend group. | `::part(legend)` |
| `plot` | Chart drawing area. | `::part(plot)` |
| `state` | Loading, empty or error state panel. | `::part(state)` |
| `table` | Data table wrapper. | `::part(table)` |
| `toolbar` | Legend and chart/table toggle row. | `::part(toolbar)` |
| `tooltip` | Hover and keyboard tooltip. | `::part(tooltip)` |

#### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-spinner` | — |
| `pk-state-panel` | — |

### FunnelChart

#### Slots

| Name | Description |
| --- | --- |
| `empty` | Replaces the empty-state message. |
| `error` | Replaces the error-state message. |
| `state-actions` | Buttons shown in the error state, such as a retry action. |

#### Props

| Name | Description |
| --- | --- |
| `chartLabel` | Text of the chart button in the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Chart</code></small> |
| `data` | Chart data: `{ cols, rows, currentLabel?, comparisonLabel?, comparisonRows?, firstNote? }`. Accepts JSON from the `data` attribute. Assign a new object to update it.<br><small><strong>Type</strong> <code>ChartData \| null</code></small><br><small><strong>Default</strong> <code>null</code></small> |
| `description` | Longer explanation for screen readers, ideally the chart's key takeaway.<br><small><strong>Type</strong> <code>string</code></small> |
| `emptyHeading` | Heading of the empty state.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>No data for this period</code></small> |
| `emptyMessage` | Message under the empty-state heading. The `empty` slot replaces it.<br><small><strong>Type</strong> <code>string</code></small> |
| `errorHeading` | Heading of the error state.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>"This chart couldn't be loaded"</code></small> |
| `errorMessage` | Message under the error-state heading. The `error` slot replaces it.<br><small><strong>Type</strong> <code>string</code></small> |
| `label` | Accessible name for the chart and caption for its data table.<br><small><strong>Type</strong> <code>string</code></small> |
| `legend` | `auto` shows a legend whenever there is more than one series.<br><small><strong>Type</strong> <code>PkChartLegend</code></small><br><small><strong>Default</strong> <code>auto</code></small> |
| `loadingLabel` | Text beside the spinner while the first data loads.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Loading chart</code></small> |
| `locale` | BCP 47 locale for numbers and dates. Defaults to the Craft or document locale.<br><small><strong>Type</strong> <code>string</code></small> |
| `ofFirstLabel` | Follows each stage's share of the first stage.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>of first step</code></small> |
| `ofPreviousLabel` | Follows each stage's conversion from the previous stage.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>of previous step</code></small> |
| `seriesLabel` | Accessible name of the legend.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Series</code></small> |
| `shape` | `steps` draws columns with stage details beneath; `centered` draws centred horizontal bars; `tracks` draws each stage's details around a tall filled track.<br><small><strong>Type</strong> <code>PkFunnelChartShape</code></small><br><small><strong>Default</strong> <code>steps</code></small> |
| `state` | `loading` keeps an existing chart dimmed while new data loads. `empty` and `error` replace it.<br><small><strong>Type</strong> <code>PkChartState</code></small> |
| `tableAvailableLabel` | Appended to the chart's accessible name to point screen-reader users to the data table.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Data is available as a table.</code></small> |
| `tableLabel` | Text of the table button in the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Table</code></small> |
| `tableToggle` | Show the chart/table toggle.<br><small><strong>Type</strong> <code>boolean</code></small><br><small><strong>Default</strong> <code>false</code></small> |
| `totalLabel` | Label for stack totals in tooltips and the table column.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Total</code></small> |
| `view` | `table` shows the data table in place of the chart.<br><small><strong>Type</strong> <code>PkChartView</code></small><br><small><strong>Default</strong> <code>chart</code></small> |
| `viewLabel` | Accessible name of the chart/table toggle.<br><small><strong>Type</strong> <code>string</code></small><br><small><strong>Default</strong> <code>Show as</code></small> |

#### Events

| Name | Description |
| --- | --- |
| `@pk-legend-toggle` | A legend item hid or showed its series. Detail: `{ key, label, hidden }`. |
| `@pk-point-select` | A point, bar, segment or stage was clicked or chosen with Enter. Detail: `{ index, row, series, value }`. |
| `@pk-view-change` | The chart/table toggle changed the view. Detail: `{ view }`. |

#### CSS Custom Properties

| Name | Description |
| --- | --- |
| `--pk-chart-height` | Height of the drawing area. Defaults to 240px. |
| `--pk-funnel-fill` | `tracks` fill colour. Defaults to `--pk-chart-ordinal-3`. |
| `--pk-funnel-track` | `tracks` track colour. Defaults to a tint of the fill. |
| `--pk-funnel-track-height` | `tracks` track height. Defaults to 56px. |

#### CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| `base` | Outer wrapper. | `::part(base)` |
| `body` | Plot, table and state wrapper. | `::part(body)` |
| `fill` | A `tracks` column's fill. The last stage's fill also has `fill-last`. | `::part(fill)` |
| `legend` | Legend group. | `::part(legend)` |
| `plot` | Chart drawing area. | `::part(plot)` |
| `stage` | One `tracks` column. | `::part(stage)` |
| `state` | Loading, empty or error state panel. | `::part(state)` |
| `table` | Data table wrapper. | `::part(table)` |
| `toolbar` | Legend and chart/table toggle row. | `::part(toolbar)` |
| `tooltip` | Hover and keyboard tooltip. | `::part(tooltip)` |
| `track` | A `tracks` column's unfilled track. | `::part(track)` |

#### Dependencies

This component registers the following elements when it loads.

| Name | Description |
| --- | --- |
| `pk-spinner` | — |
| `pk-state-panel` | — |

<!-- pk-api:end -->
