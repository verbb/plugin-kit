import {
    CategoryScale,
    Chart,
    Filler,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    type ChartConfiguration,
    type ScriptableContext,
    type TooltipItem,
} from 'chart.js';
import { createFormatter, formatChange } from '@verbb/plugin-kit-core/utils/format';
import { customElement, property } from '../../decorators.js';

import { PkChartElement, datasetMeta } from './pk-chart-element.js';
import {
    areaGradient,
    buildScales,
    durationStep,
    seriesColor,
    withAlpha,
    type ChartEnvironment,
    type LegendItem,
    type ResolvedChartData,
    type TableModel,
    type TooltipModel,
    type TooltipRow,
} from './shared.js';

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

export type PkLineChartCurve = 'smooth' | 'linear';

const COMPARISON_KEY = '__comparison';

/**
 * Line or area chart for one or more series over a category or date axis, with an
 * optional dashed previous period from `data.comparisonRows`.
 *
 * With one series the previous period is a neutral dashed line; with several, each
 * previous period is dashed in its own series colour so the pairs stay identifiable.
 * One tooltip lists every series at the hovered point, with the change against the
 * previous period.
 */
@customElement('pk-line-chart')
export class PkLineChart extends PkChartElement {
    /** Fill the area under each line with a fading wash. */
    @property({ type: Boolean, reflect: true })
    area = false;

    /** `smooth` uses monotone curves that never overshoot the data. */
    @property({ reflect: true })
    curve: PkLineChartCurve = 'smooth';

    /** Title under the horizontal axis, e.g. a unit. */
    @property({ attribute: 'x-label' })
    xLabel = '';

    /** Title beside the vertical axis. */
    @property({ attribute: 'y-label' })
    yLabel = '';

    /** Fix the start of the value axis. Defaults to zero, or below it for negative data. */
    @property({ type: Number })
    min: number | null = null;

    /** Fix the end of the value axis instead of fitting the data. */
    @property({ type: Number })
    max: number | null = null;

    protected override buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration {
        const { theme } = env;
        const series = data.cols.slice(1);
        const smooth = this.curve !== 'linear';
        const dense = data.rows.length > 120;
        const single = series.length === 1;
        const curve = {
            tension: smooth ? 0.35 : 0,
            cubicInterpolationMode: smooth ? 'monotone' as const : 'default' as const,
        };
        const datasets: ChartConfiguration<'line'>['data']['datasets'] = series.map((col, index) => {
            const color = seriesColor(theme, col);

            return {
                ...curve,
                label: col.label,
                data: data.rows.map((row) => row[index + 1] as number | null),
                borderColor: color,
                borderWidth: 2,
                borderJoinStyle: 'round',
                borderCapStyle: 'round',
                pointRadius: 0,
                pointHoverRadius: dense ? 3.5 : 4.5,
                pointHoverBorderWidth: 2,
                pointHoverBorderColor: theme.surface,
                pointHoverBackgroundColor: color,
                pointHitRadius: 12,
                spanGaps: false,
                fill: this.area ? 'origin' : false,
                backgroundColor: this.area
                    ? (context: ScriptableContext<'line'>) => areaGradient(color)(context as never)
                    : color,
                order: 1,
                pkKey: col.id,
                pkColumn: col,
                pkColor: color,
                pkKind: 'primary',
                pkSeriesIndex: index,
            };
        });

        if (data.comparisonRows) {
            series.forEach((col, index) => {
                const color = single ? theme.comparison : withAlpha(seriesColor(theme, col), 0.55);

                datasets.push({
                    ...curve,
                    label: `${col.label} (${data.comparisonLabel ?? ''})`,
                    data: data.comparisonRows!.map((row) => row[index + 1] as number | null),
                    borderColor: color,
                    borderDash: [5, 4],
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHoverRadius: 3.5,
                    pointHoverBackgroundColor: theme.surface,
                    pointHoverBorderColor: color,
                    pointHoverBorderWidth: 1.5,
                    pointHitRadius: 12,
                    fill: false,
                    order: 2,
                    pkKey: COMPARISON_KEY,
                    pkColumn: col,
                    pkColor: color,
                    pkKind: 'comparison',
                    pkSeriesIndex: index,
                } as never);
            });
        }

        const values = datasets.flatMap((dataset) => dataset.data).filter((value): value is number => typeof value === 'number');

        return {
            type: 'line',
            data: { labels: data.rows.map((row) => row[0] as string), datasets },
            options: {
                scales: buildScales(env, {
                    categoryFormat: createFormatter(data.cols[0], { context: 'axis', locale: env.locale }),
                    valueFormat: createFormatter(series[0], { context: 'axis', locale: env.locale }),
                    step: series[0]?.type === 'duration' && values.length ? durationStep(Math.max(...values)) : undefined,
                    xLabel: this.xLabel,
                    yLabel: this.yLabel,
                    min: this.min ?? undefined,
                    max: this.max ?? undefined,
                }),
                plugins: { pkCrosshair: { enabled: true, color: theme.crosshair } },
            },
            // Filler is attached per chart rather than registered, so it never reaches other Chart.js charts.
            plugins: [Filler],
        } as ChartConfiguration;
    }

    protected override buildLegend(env: ChartEnvironment, data: ResolvedChartData): LegendItem[] {
        const series = data.cols.slice(1);
        const single = series.length === 1;

        if (single && !data.comparisonRows) {
            return [];
        }

        const items: LegendItem[] = series.map((col) => ({
            key: col.id,
            label: single && data.currentLabel ? data.currentLabel : col.label,
            color: seriesColor(env.theme, col),
            shape: 'line',
        }));

        if (data.comparisonRows) {
            items.push({
                key: COMPARISON_KEY,
                label: data.comparisonLabel ?? '',
                color: env.theme.comparison,
                shape: 'dash',
            });
        }

        return items;
    }

    protected override buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null {
        const chart = this.chart;

        if (!chart) {
            return null;
        }

        const index = points[0].dataIndex;
        const xFull = createFormatter(data.cols[0], { locale: env.locale });
        const showComparison = Boolean(data.comparisonRows) && !this.hiddenKeys.has(COMPARISON_KEY);
        const rows: TooltipRow[] = [];
        const previousRow = data.comparisonRows?.[index];

        chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = datasetMeta(dataset);

            if (meta.pkKind !== 'primary' || !chart.isDatasetVisible(datasetIndex)) {
                return;
            }

            const value = dataset.data[index];
            const previous = showComparison && previousRow ? previousRow[(meta.pkSeriesIndex ?? 0) + 1] : null;

            rows.push({
                shape: 'line',
                color: meta.pkColor,
                label: meta.pkColumn.label,
                value: createFormatter(meta.pkColumn, { locale: env.locale })(value),
                change: showComparison
                    ? formatChange(value, previous, meta.pkColumn, { locale: env.locale, positive: meta.pkColumn.positive ?? 'up' })
                    : null,
            });
        });

        if (showComparison && previousRow) {
            const previousKey = previousRow[0];
            // Metrix-style data repeats the current key; only name the previous date when it differs.
            const previousLabel = previousKey !== undefined && previousKey !== data.rows[index]?.[0]
                ? xFull(previousKey)
                : data.comparisonLabel ?? '';

            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = datasetMeta(dataset);

                if (meta.pkKind !== 'comparison' || !chart.isDatasetVisible(datasetIndex)) {
                    return;
                }

                rows.push({
                    shape: 'dash',
                    color: meta.pkColor,
                    label: data.cols.length > 2 ? `${meta.pkColumn.label} · ${previousLabel}` : previousLabel,
                    value: createFormatter(meta.pkColumn, { locale: env.locale })(dataset.data[index]),
                });
            });
        }

        return rows.length ? { title: xFull(data.rows[index]?.[0]), rows } : null;
    }

    protected override buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel {
        const series = data.cols.slice(1);
        const xFull = createFormatter(data.cols[0], { locale: env.locale });
        const formats = series.map((col) => createFormatter(col, { locale: env.locale }));
        const head = [{ text: data.cols[0].label }, ...series.map((col) => ({ text: col.label, numeric: true }))];
        const comparison = data.comparisonRows;

        if (comparison) {
            head.push(
                { text: data.comparisonLabel ?? '', numeric: false },
                ...series.map((col) => ({ text: `${col.label} (${data.comparisonLabel ?? ''})`, numeric: true })),
            );
        }

        return {
            head,
            rows: data.rows.map((row, index) => {
                const cells = [xFull(row[0]), ...series.map((_col, s) => formats[s](row[s + 1]))];
                const previous = comparison?.[index];

                if (previous) {
                    cells.push(xFull(previous[0]), ...series.map((_col, s) => formats[s](previous[s + 1])));
                }

                return cells;
            }),
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-line-chart': PkLineChart;
    }
}
