import { css, html, nothing, type TemplateResult } from 'lit';
import { ArcElement, Chart, DoughnutController, type ChartConfiguration, type TooltipItem } from 'chart.js';
import { createFormatter } from '@verbb/plugin-kit-core/utils/format';
import { customElement, property } from '../../decorators.js';

import type { PkPointSelectDetail } from '../../events/pk-chart.js';
import { PkChartElement } from './pk-chart-element.js';
import {
    withAlpha,
    type ChartEnvironment,
    type LegendItem,
    type ResolvedChartData,
    type TableModel,
    type TooltipModel,
} from './shared.js';
import { pkChartStyles } from './styles.js';

Chart.register(DoughnutController, ArcElement);

type Segment = { label: string; value: number; other: boolean };

type DonutData = ResolvedChartData & { segments: Segment[] };

const toNumber = (value: unknown): number => (typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : 0);

/**
 * Donut chart for part-to-whole at a glance. `cols` are `[category, value]`; each row
 * is one segment.
 *
 * Above `max-segments` the smallest tail folds into one "Other" segment, so the chart
 * never needs a ninth colour; the data table still lists every row. The centre shows
 * the total of the visible segments and the legend lists each value and share.
 */
@customElement('pk-donut-chart')
export class PkDonutChart extends PkChartElement {
    static override styles = [
        pkChartStyles,
        css`
            @layer pk-component {
                .body {
                    display: grid;
                    grid-template-columns: minmax(0, var(--_pk-chart-height)) minmax(0, 1fr);
                    gap: 8px 20px;
                    align-items: center;
                    container-type: inline-size;
                }

                .table-wrap:not(.sr-only),
                pk-state-panel {
                    grid-column: 1 / -1;
                }

                .side-legend {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    min-width: 0;
                }

                .side-legend .legend-item {
                    display: grid;
                    grid-template-columns: 10px minmax(0, 1fr) auto auto;
                    gap: 8px;
                    width: 100%;
                    padding: 4px 2px;
                    box-sizing: border-box;
                }

                .side-legend .legend-label {
                    color: var(--pk-chart-text);
                    overflow-wrap: anywhere;
                }

                .legend-value {
                    color: var(--pk-chart-text);
                    font-weight: 600;
                    font-variant-numeric: tabular-nums;
                }

                .legend-share {
                    min-width: 3.2em;
                    color: var(--pk-chart-text-muted);
                    font-variant-numeric: tabular-nums;
                    text-align: end;
                }

                .total {
                    display: block;
                    color: var(--pk-chart-text);
                    font-size: 20px;
                    font-weight: 600;
                    line-height: 1.15;
                }

                .total-label {
                    color: var(--pk-chart-text-muted);
                    font-size: 11px;
                }

                @container (max-width: 440px) {
                    .body {
                        grid-template-columns: minmax(0, 1fr);
                    }

                    .plot {
                        justify-self: center;
                        width: 100%;
                        max-width: var(--_pk-chart-height);
                    }
                }
            }
        `,
    ];

    /** Most segments drawn before the tail folds into "Other". */
    @property({ type: Number, attribute: 'max-segments' })
    maxSegments = 6;

    /** Label of the segment that collects rows beyond `max-segments`. */
    @property({ attribute: 'other-label' })
    otherLabel = 'Other';

    /** Label for each segment's percentage in tooltips and the table. */
    @property({ attribute: 'share-label' })
    shareLabel = 'Share';

    protected override get legendInToolbar(): boolean {
        return false;
    }

    private get segments(): Segment[] {
        return (this.resolved as DonutData | undefined)?.segments ?? [];
    }

    protected override prepare(data: ResolvedChartData): ResolvedChartData {
        const max = Math.max(2, this.maxSegments || 6);
        const segments = data.rows.map((row) => ({ label: String(row[0] ?? ''), value: toNumber(row[1]), other: false }));
        const folded = segments.length <= max
            ? segments
            : [
                ...segments.slice(0, max - 1),
                { label: this.otherLabel, value: segments.slice(max - 1).reduce((sum, segment) => sum + segment.value, 0), other: true },
            ];

        return { ...data, segments: folded } as DonutData;
    }

    private colors(env: ChartEnvironment): string[] {
        return this.segments.map((segment, index) => (segment.other ? env.theme.other : env.theme.series[index % env.theme.series.length]));
    }

    /** Hidden state follows the category, so a refresh that reorders segments keeps it. */
    private visibleTotal(): number {
        return this.segments.reduce((sum, segment) => sum + (this.hiddenKeys.has(segment.label) ? 0 : segment.value), 0);
    }

    protected override legendKeys(): Set<string> {
        return new Set(this.segments.map((segment) => segment.label));
    }

    protected override pointDetail(_datasetIndex: number, index: number): PkPointSelectDetail | null {
        const segment = this.segments[index];

        if (!segment || !this.resolved) {
            return null;
        }

        return {
            index,
            row: segment.other ? null : this.resolved.rows[index] ?? null,
            series: this.resolved.cols[1]?.id ?? '',
            value: segment.value,
        };
    }

    protected override buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration {
        const colors = this.colors(env);

        return {
            type: 'doughnut',
            data: {
                labels: this.segments.map((segment) => segment.label),
                datasets: [{
                    data: this.segments.map((segment) => segment.value),
                    backgroundColor: colors,
                    hoverBackgroundColor: colors.map((color) => withAlpha(color, 0.85)),
                    borderColor: env.theme.surface,
                    borderWidth: 2,
                    borderRadius: 2,
                    hoverOffset: 4,
                    pkKey: data.cols[1].id,
                    pkColumn: data.cols[1],
                    pkColor: colors[0],
                } as never],
            },
            options: {
                cutout: '68%',
                layout: { padding: 6 },
                interaction: { mode: 'nearest', intersect: true },
            },
        } as ChartConfiguration;
    }

    protected override applyHidden(update: boolean): void {
        const chart = this.chart;

        if (!chart) {
            return;
        }

        this.segments.forEach((segment, index) => {
            if (chart.getDataVisibility(index) === this.hiddenKeys.has(segment.label)) {
                chart.toggleDataVisibility(index);
            }
        });

        if (update) {
            chart.update();
        }
    }

    protected override pointCount(): number {
        return this.segments.length;
    }

    protected override activeElementsAt(index: number): { datasetIndex: number; index: number }[] {
        return this.chart?.getDataVisibility(index) ? [{ datasetIndex: 0, index }] : [];
    }

    protected override buildLegend(env: ChartEnvironment, data: ResolvedChartData): LegendItem[] {
        const colors = this.colors(env);
        const total = this.segments.reduce((sum, segment) => sum + segment.value, 0);
        const value = createFormatter(data.cols[1], { locale: env.locale });
        const share = createFormatter({ type: 'percent' }, { context: 'axis', locale: env.locale });

        return this.segments.map((segment, index) => ({
            key: segment.label,
            label: segment.label,
            color: colors[index],
            shape: 'rect',
            value: value(segment.value),
            share: share(total ? segment.value / total : 0),
        }));
    }

    protected override renderSupplement(legend: LegendItem[]): TemplateResult | typeof nothing {
        return this.renderLegend(legend, 'side-legend');
    }

    protected override renderOverlay(): TemplateResult | typeof nothing {
        const data = this.resolved;

        if (!data || !this.env) {
            return nothing;
        }

        const column = data.cols[1];

        return html`
            <div>
                <span class="total">${createFormatter(column, { context: 'axis', locale: this.env.locale })(this.visibleTotal())}</span>
                <span class="total-label">${column.label}</span>
            </div>
        `;
    }

    protected override buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null {
        const index = points[0].dataIndex;
        const segment = this.segments[index];
        const total = this.visibleTotal();

        if (!segment) {
            return null;
        }

        return {
            title: segment.label,
            rows: [
                {
                    shape: 'rect',
                    color: this.colors(env)[index],
                    label: data.cols[1].label,
                    value: createFormatter(data.cols[1], { locale: env.locale })(segment.value),
                },
                {
                    label: this.shareLabel,
                    value: createFormatter({ type: 'percent' }, { locale: env.locale })(total ? segment.value / total : 0),
                },
            ],
        };
    }

    protected override buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel {
        const total = data.rows.reduce((sum, row) => sum + toNumber(row[1]), 0);
        const value = createFormatter(data.cols[1], { locale: env.locale });
        const share = createFormatter({ type: 'percent' }, { locale: env.locale });
        const category = createFormatter(data.cols[0], { locale: env.locale });

        return {
            head: [{ text: data.cols[0].label }, { text: data.cols[1].label, numeric: true }, { text: this.shareLabel, numeric: true }],
            rows: data.rows.map((row) => [category(row[0]), value(row[1]), share(total ? toNumber(row[1]) / total : 0)]),
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-donut-chart': PkDonutChart;
    }
}
