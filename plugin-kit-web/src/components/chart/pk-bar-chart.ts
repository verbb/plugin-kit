import {
    BarController,
    BarElement,
    CategoryScale,
    Chart,
    LinearScale,
    type ChartConfiguration,
    type ScriptableContext,
    type TooltipItem,
} from 'chart.js';
import { createFormatter } from '@verbb/plugin-kit-core/utils/format';
import { customElement, property } from '../../decorators.js';

import { PkChartElement, datasetMeta } from './pk-chart-element.js';
import {
    buildScales,
    seriesColor,
    withAlpha,
    type ChartEnvironment,
    type LegendItem,
    type ResolvedChartData,
    type TableModel,
    type TooltipModel,
    type TooltipRow,
} from './shared.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

export type PkBarChartOrientation = 'vertical' | 'horizontal';
export type PkBarChartStacked = '' | 'normal' | 'percent';

const toNumber = (value: unknown): number => (typeof value === 'number' && Number.isFinite(value) ? value : 0);

/**
 * Bar chart: vertical or horizontal, grouped, stacked or 100% stacked.
 *
 * Bars are capped at 24px with a rounded end. Stacked segments are separated by a
 * 2px gap in the surface colour and only the outermost segment is rounded. For
 * `stacked="percent"` the element normalises each category to 100% and the tooltip
 * and table show both the share and the underlying value.
 */
@customElement('pk-bar-chart')
export class PkBarChart extends PkChartElement {
    /** `horizontal` lays categories down the side, which suits long labels and ranked lists. */
    @property({ reflect: true })
    orientation: PkBarChartOrientation = 'vertical';

    /** Stack series: `normal` sums them, `percent` shows each as a share of its category. */
    @property({ reflect: true })
    stacked: PkBarChartStacked = '';

    /** Print each bar's value at its end. Best for single-series ranked bars. */
    @property({ type: Boolean, attribute: 'value-labels', reflect: true })
    valueLabels = false;

    /** Title under the horizontal axis, e.g. a unit. */
    @property({ attribute: 'x-label' })
    xLabel = '';

    /** Title beside the vertical axis. */
    @property({ attribute: 'y-label' })
    yLabel = '';

    /** Fix the start of the value axis. Ignored for 100% stacks. */
    @property({ type: Number })
    min: number | null = null;

    /** Fix the end of the value axis instead of fitting the data. Ignored for 100% stacks. */
    @property({ type: Number })
    max: number | null = null;

    private get horizontal(): boolean {
        return this.orientation === 'horizontal';
    }

    protected override get rebuildOnLegendToggle(): boolean {
        return this.stackMode === 'percent';
    }

    private get stackMode(): PkBarChartStacked {
        return this.stacked === 'normal' || this.stacked === 'percent' ? this.stacked : '';
    }

    /** Only the last visible non-zero segment of a stack gets rounded corners. */
    private isOuterSegment(context: ScriptableContext<'bar'>): boolean {
        const { chart, dataIndex, datasetIndex } = context;
        const metas = chart.getSortedVisibleDatasetMetas();

        for (let k = metas.length - 1; k >= 0; k--) {
            if (toNumber(chart.data.datasets[metas[k].index].data[dataIndex])) {
                return metas[k].index === datasetIndex;
            }
        }

        return false;
    }

    protected override buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration {
        const { theme } = env;
        const series = data.cols.slice(1);
        const stack = this.stackMode;
        const percent = stack === 'percent';
        const grouped = series.length > 1 && !stack;
        // 100% stacks share out only the visible series, so hiding one renormalises the rest.
        const totals = data.rows.map((row) => series.reduce((sum, col, index) => sum + (this.hiddenKeys.has(col.id) ? 0 : toNumber(row[index + 1])), 0));
        const horizontal = this.horizontal;
        const datasets = series.map((col, index) => {
            const color = seriesColor(theme, col);
            const raw = data.rows.map((row) => row[index + 1]);

            return {
                label: col.label,
                data: percent
                    ? raw.map((value, row) => (totals[row] ? (toNumber(value) / totals[row]) * 100 : 0))
                    : raw,
                backgroundColor: color,
                hoverBackgroundColor: withAlpha(color, 0.82),
                maxBarThickness: 24,
                categoryPercentage: grouped ? 0.72 : 0.8,
                barPercentage: grouped ? 0.88 : 0.9,
                borderSkipped: 'start',
                borderColor: theme.surface,
                borderWidth: stack ? (horizontal ? { right: 2 } : { top: 2 }) : 0,
                borderRadius: stack
                    ? (context: ScriptableContext<'bar'>) => (this.isOuterSegment(context) ? 4 : 0)
                    : 4,
                pkKey: col.id,
                pkColumn: col,
                pkColor: color,
                pkRaw: raw,
            };
        });
        const valueSpec = percent ? { type: 'percent' as const } : series[0];
        const axisFormat = createFormatter(valueSpec, { context: 'axis', locale: env.locale });
        const fullFormat = createFormatter(series[0], { locale: env.locale });

        return {
            type: 'bar',
            data: { labels: data.rows.map((row) => row[0] as string), datasets },
            options: {
                indexAxis: horizontal ? 'y' : 'x',
                interaction: { mode: 'index', intersect: false, axis: horizontal ? 'y' : 'x' },
                layout: {
                    padding: this.valueLabels
                        ? (horizontal ? { [env.rtl ? 'left' : 'right']: 64 } : { top: 18 })
                        : {},
                },
                scales: buildScales(env, {
                    indexAxis: horizontal ? 'y' : 'x',
                    stacked: Boolean(stack),
                    min: percent ? undefined : this.min ?? undefined,
                    max: percent ? 100 : this.max ?? undefined,
                    xLabel: this.xLabel,
                    yLabel: this.yLabel,
                    hideValue: this.valueLabels && horizontal,
                    categoryFormat: createFormatter(data.cols[0], { context: 'axis', locale: env.locale }),
                    valueFormat: percent ? (value) => axisFormat(Number(value) / 100) : axisFormat,
                }),
                plugins: {
                    pkValueLabels: {
                        enabled: this.valueLabels,
                        horizontal,
                        rtl: env.rtl,
                        color: theme.secondary,
                        font: theme.font,
                        format: (datasetIndex: number, index: number) => fullFormat(datasets[datasetIndex].pkRaw[index]),
                    },
                },
            },
        } as ChartConfiguration;
    }

    protected override buildLegend(env: ChartEnvironment, data: ResolvedChartData): LegendItem[] {
        const series = data.cols.slice(1);

        return series.length > 1
            ? series.map((col) => ({ key: col.id, label: col.label, color: seriesColor(env.theme, col), shape: 'rect' }))
            : [];
    }

    protected override buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null {
        const chart = this.chart;

        if (!chart) {
            return null;
        }

        const index = points[0].dataIndex;
        const percent = this.stackMode === 'percent';
        const share = createFormatter({ type: 'percent' }, { locale: env.locale });
        const rows: TooltipRow[] = [];
        let total = 0;

        chart.data.datasets.forEach((dataset, datasetIndex) => {
            if (!chart.isDatasetVisible(datasetIndex)) {
                return;
            }

            const meta = datasetMeta(dataset);
            const format = createFormatter(meta.pkColumn, { locale: env.locale });
            const raw = meta.pkRaw?.[index];
            total += toNumber(raw);

            rows.push({
                shape: 'rect',
                color: meta.pkColor,
                label: percent ? `${meta.pkColumn.label} (${format(raw)})` : meta.pkColumn.label,
                value: percent ? share(toNumber(dataset.data[index]) / 100) : format(raw),
            });
        });

        if (!rows.length) {
            return null;
        }

        const footer: [string, string] | undefined = this.stackMode && rows.length > 1
            ? [this.totalLabel, createFormatter(data.cols[1], { locale: env.locale })(total)]
            : undefined;

        return {
            title: createFormatter(data.cols[0], { locale: env.locale })(data.rows[index]?.[0]),
            rows,
            footer,
        };
    }

    protected override buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel {
        const series = data.cols.slice(1);
        const formats = series.map((col) => createFormatter(col, { locale: env.locale }));
        const share = createFormatter({ type: 'percent' }, { locale: env.locale });
        const category = createFormatter(data.cols[0], { locale: env.locale });
        const stacked = Boolean(this.stackMode);
        const percent = this.stackMode === 'percent';
        const head = [{ text: data.cols[0].label }, ...series.map((col) => ({ text: col.label, numeric: true }))];

        if (stacked) {
            head.push({ text: this.totalLabel, numeric: true });
        }

        return {
            head,
            rows: data.rows.map((row) => {
                const total = series.reduce((sum, _col, index) => sum + toNumber(row[index + 1]), 0);
                const cells = [
                    category(row[0]),
                    ...series.map((_col, index) => (percent
                        ? `${formats[index](row[index + 1])} (${share(total ? toNumber(row[index + 1]) / total : 0)})`
                        : formats[index](row[index + 1]))),
                ];

                if (stacked) {
                    cells.push(formats[0](total));
                }

                return cells;
            }),
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-bar-chart': PkBarChart;
    }
}
