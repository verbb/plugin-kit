import { css, html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import {
    BarController,
    BarElement,
    CategoryScale,
    Chart,
    LinearScale,
    type ChartConfiguration,
    type TooltipItem,
} from 'chart.js';
import { createFormatter, type ValueFormatter } from '@verbb/plugin-kit-core/utils/format';
import { customElement, property } from '../../decorators.js';

import { PkChartElement } from './pk-chart-element.js';
import {
    withAlpha,
    type ChartEnvironment,
    type ResolvedChartData,
    type TableModel,
    type TooltipModel,
    type TooltipRow,
} from './shared.js';
import { pkChartStyles } from './styles.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

export type PkFunnelChartShape = 'steps' | 'centered' | 'tracks';

type Stage = { label: string; value: number; ofPrevious: number; ofFirst: number };

type FunnelData = ResolvedChartData & { stages: Stage[] };

type StageNote = NonNullable<ResolvedChartData['notes']>[number];

const toNumber = (value: unknown): number => (typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : 0);

/**
 * Funnel built from bars, with no funnel plugin. `cols` are `[stage, value]` and each
 * row is one stage in order.
 *
 * Stages are ordered, so they use the single-hue `--pk-chart-ordinal-*` ramp that
 * darkens toward the outcome. `steps` (the default) draws columns with each stage's
 * count and its share of the previous step beneath; `centered` draws centred bars
 * with the share of the first step beside each. `tracks` draws HTML columns: each stage's
 * label and count above a tall track filled to its share of the first stage, with a caption
 * beneath. Captions come from `notes` in the data, or default as in `steps`.
 *
 * @csspart stage - One `tracks` column.
 * @csspart track - A `tracks` column's unfilled track.
 * @csspart fill - A `tracks` column's fill. The last stage's fill also has `fill-last`.
 * @cssproperty --pk-funnel-fill - `tracks` fill colour. Defaults to `--pk-chart-ordinal-3`.
 * @cssproperty --pk-funnel-track - `tracks` track colour. Defaults to a tint of the fill.
 * @cssproperty --pk-funnel-track-height - `tracks` track height. Defaults to 56px.
 */
@customElement('pk-funnel-chart')
export class PkFunnelChart extends PkChartElement {
    static override styles = [
        pkChartStyles,
        css`
            @layer pk-component {
                .stages {
                    display: grid;
                    grid-template-columns: repeat(var(--_stage-count), minmax(0, 1fr));
                    margin-top: 4px;
                    container-type: inline-size;
                }

                .stage {
                    display: flex;
                    flex-direction: column;
                    gap: 1px;
                    align-items: center;
                    min-width: 0;
                    padding: 6px 2px 0;
                    text-align: center;
                }

                .stage-label {
                    max-width: 100%;
                    color: var(--pk-chart-text-secondary);
                    font-size: 12px;
                    line-height: 1.3;
                    overflow-wrap: break-word;
                    hyphens: auto;
                }

                .stage-value {
                    font-size: 16px;
                    font-weight: 600;
                    font-variant-numeric: tabular-nums;
                }

                .stage-rate {
                    color: var(--pk-chart-text-muted);
                    font-size: 11px;
                }

                .stage-rate b {
                    color: var(--pk-chart-text);
                    font-weight: 600;
                }

                @container (max-width: 300px) {
                    .stage-label {
                        font-size: 11px;
                    }

                    .stage-value {
                        font-size: 14px;
                    }
                }

                .tracks-wrap {
                    container-type: inline-size;
                }

                .tracks {
                    display: grid;
                    grid-template-columns: repeat(var(--_stage-count), minmax(0, 1fr));
                    gap: 16px 14px;
                }

                .track-stage {
                    display: grid;
                    align-content: start;
                    gap: 6px;
                    min-width: 0;
                }

                .track-label {
                    color: var(--pk-chart-text-muted);
                    font-size: 12px;
                    font-weight: 600;
                    line-height: 1.3;
                    overflow-wrap: break-word;
                }

                .track-value {
                    color: var(--pk-chart-text);
                    font-size: 22px;
                    font-weight: 700;
                    line-height: 1.2;
                    font-variant-numeric: tabular-nums;
                }

                .track {
                    position: relative;
                    height: var(--pk-funnel-track-height, 56px);
                    overflow: hidden;
                    border-radius: 6px;
                    background: var(--pk-funnel-track, color-mix(in srgb, var(--pk-funnel-fill, var(--pk-chart-ordinal-3)) 12%, var(--pk-chart-surface)));
                }

                .fill {
                    position: absolute;
                    inset: auto 0 0;
                    border-radius: 6px 6px 0 0;
                    background: var(--pk-funnel-fill, var(--pk-chart-ordinal-3));
                }

                .track-note {
                    color: var(--pk-chart-text-secondary);
                    font-size: 12px;
                }

                .track-note b {
                    color: var(--pk-chart-text);
                    font-weight: 600;
                }

                @container (max-width: 520px) {
                    .tracks {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
            }
        `,
    ];

    /**
     * `steps` draws columns with stage details beneath; `centered` draws centred horizontal
     * bars; `tracks` draws each stage's details around a tall filled track.
     */
    @property({ reflect: true })
    shape: PkFunnelChartShape = 'steps';

    /** Follows each stage's conversion from the previous stage. */
    @property({ attribute: 'of-previous-label' })
    ofPreviousLabel = 'of previous step';

    /** Follows each stage's share of the first stage. */
    @property({ attribute: 'of-first-label' })
    ofFirstLabel = 'of first step';

    protected override get htmlPlot(): boolean {
        return this.shape === 'tracks';
    }

    private get stages(): Stage[] {
        return (this.resolved as FunnelData | undefined)?.stages ?? [];
    }

    protected override prepare(data: ResolvedChartData): ResolvedChartData {
        const values = data.rows.map((row) => toNumber(row[1]));
        const first = values[0] ?? 0;
        const stages = data.rows.map((row, index) => ({
            label: String(row[0] ?? ''),
            value: values[index],
            ofPrevious: index === 0 ? 1 : (values[index - 1] ? values[index] / values[index - 1] : 0),
            ofFirst: first ? values[index] / first : 0,
        }));

        return { ...data, stages } as FunnelData;
    }

    /** Spread the four ordinal tokens across however many stages there are. */
    private colors(env: ChartEnvironment): string[] {
        const count = this.stages.length;
        const ramp = env.theme.ordinal;

        return this.stages.map((_stage, index) => ramp[count <= 1 ? ramp.length - 1 : Math.round((index * (ramp.length - 1)) / (count - 1))]);
    }

    protected override buildConfig(env: ChartEnvironment, data: ResolvedChartData): ChartConfiguration {
        const { theme } = env;
        const colors = this.colors(env);
        // Non-monotonic data (a later stage larger) must not clip.
        const max = Math.max(1, ...this.stages.map((stage) => stage.value));
        const value = createFormatter(data.cols[1], { locale: env.locale });
        const share = createFormatter({ type: 'percent' }, { locale: env.locale });
        const base = {
            backgroundColor: colors,
            hoverBackgroundColor: colors.map((color) => withAlpha(color, 0.82)),
            borderRadius: 4,
            pkKey: data.cols[1].id,
            pkColumn: data.cols[1],
            pkColor: colors[0],
            pkRaw: this.stages.map((stage) => stage.value),
        };

        if (this.shape === 'centered') {
            return {
                type: 'bar',
                data: {
                    labels: this.stages.map((stage) => stage.label),
                    datasets: [{
                        ...base,
                        data: this.stages.map((stage) => [-stage.value / 2, stage.value / 2]),
                        borderSkipped: false,
                        barPercentage: 0.84,
                        categoryPercentage: 1,
                    } as never],
                },
                options: {
                    indexAxis: 'y',
                    interaction: { mode: 'index', intersect: false, axis: 'y' },
                    layout: { padding: { [env.rtl ? 'left' : 'right']: 108 } },
                    scales: {
                        x: { display: false, min: -max / 2, max: max / 2, reverse: env.rtl },
                        y: {
                            position: env.rtl ? 'right' : 'left',
                            grid: { display: false },
                            border: { display: false },
                            ticks: { color: theme.secondary, font: { size: 12, family: theme.font } },
                        },
                    },
                    plugins: {
                        pkValueLabels: {
                            enabled: true,
                            horizontal: true,
                            rtl: env.rtl,
                            color: theme.secondary,
                            font: theme.font,
                            format: (_datasetIndex: number, index: number) => {
                                const stage = this.stages[index];

                                return stage ? `${value(stage.value)} · ${share(stage.ofFirst)}` : '';
                            },
                        },
                    },
                },
            } as ChartConfiguration;
        }

        return {
            type: 'bar',
            data: {
                labels: this.stages.map((stage) => stage.label),
                datasets: [{
                    ...base,
                    data: this.stages.map((stage) => stage.value),
                    borderSkipped: 'start',
                    barPercentage: 0.62,
                    categoryPercentage: 1,
                    maxBarThickness: 72,
                } as never],
            },
            options: {
                layout: { padding: 0 },
                scales: {
                    x: { display: false, reverse: env.rtl },
                    y: { display: false, beginAtZero: true, max },
                },
            },
        } as ChartConfiguration;
    }

    /** A stage's caption: its note from the data, else `firstNote` or the share of the previous stage. */
    private renderNote(index: number, share: ValueFormatter): TemplateResult | string {
        const note: StageNote | undefined = this.resolved?.notes?.[index];

        if (typeof note === 'string') {
            return note;
        }

        if (note) {
            return html`<b>${share(note.rate)}</b> ${note.text}`;
        }

        if (!index) {
            return this.resolved?.firstNote ?? ' ';
        }

        return html`<b>${share(this.stages[index].ofPrevious)}</b> ${this.ofPreviousLabel}`;
    }

    protected override renderPlot(): TemplateResult | typeof nothing {
        if (!this.env || !this.resolved) {
            return nothing;
        }

        const value = createFormatter(this.resolved.cols[1], { locale: this.env.locale });
        const share = createFormatter({ type: 'percent' }, { locale: this.env.locale });
        const max = Math.max(1, ...this.stages.map((stage) => stage.value));
        const last = this.stages.length - 1;

        // The plot is role="img" with the table as its text alternative, so these are presentational.
        return html`
            <div class="tracks-wrap" aria-hidden="true">
                <div class="tracks" style=${styleMap({ '--_stage-count': String(this.stages.length) })}>
                    ${this.stages.map((stage, index) => html`
                        <div class="track-stage" part="stage">
                            <span class="track-label">${stage.label}</span>
                            <span class="track-value">${value(stage.value)}</span>
                            <div class="track" part="track">
                                <span
                                    class=${index === last ? 'fill fill-last' : 'fill'}
                                    part=${index === last ? 'fill fill-last' : 'fill'}
                                    style=${styleMap({ height: `${(stage.value / max) * 100}%` })}
                                ></span>
                            </div>
                            <span class="track-note">${this.renderNote(index, share)}</span>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    protected override renderSupplement(): TemplateResult | typeof nothing {
        if (this.shape !== 'steps' || !this.env || !this.resolved) {
            return nothing;
        }

        const value = createFormatter(this.resolved.cols[1], { locale: this.env.locale });
        const share = createFormatter({ type: 'percent' }, { locale: this.env.locale });

        // Category bands are equal-width with no axes, so an equal-column grid lines up under each bar.
        return html`
            <div class="stages" aria-hidden="true" style=${styleMap({ '--_stage-count': String(this.stages.length) })}>
                ${this.stages.map((stage, index) => html`
                    <div class="stage">
                        <span class="stage-label">${stage.label}</span>
                        <span class="stage-value">${value(stage.value)}</span>
                        <span class="stage-rate">${this.renderNote(index, share)}</span>
                    </div>
                `)}
            </div>
        `;
    }

    protected override buildTooltip(points: TooltipItem<never>[], env: ChartEnvironment, data: ResolvedChartData): TooltipModel | null {
        const index = points[0].dataIndex;
        const stage = this.stages[index];

        if (!stage) {
            return null;
        }

        const share = createFormatter({ type: 'percent' }, { locale: env.locale });
        const rows: TooltipRow[] = [{
            shape: 'rect',
            color: this.colors(env)[index],
            label: data.cols[1].label,
            value: createFormatter(data.cols[1], { locale: env.locale })(stage.value),
        }];

        if (index) {
            rows.push(
                { label: this.ofPreviousLabel, value: share(stage.ofPrevious) },
                { label: this.ofFirstLabel, value: share(stage.ofFirst) },
            );
        }

        return { title: stage.label, rows };
    }

    protected override buildTable(env: ChartEnvironment, data: ResolvedChartData): TableModel {
        const value = createFormatter(data.cols[1], { locale: env.locale });
        const share = createFormatter({ type: 'percent' }, { locale: env.locale });

        return {
            head: [
                { text: data.cols[0].label },
                { text: data.cols[1].label, numeric: true },
                { text: this.ofPreviousLabel, numeric: true },
                { text: this.ofFirstLabel, numeric: true },
            ],
            rows: this.stages.map((stage, index) => [
                stage.label,
                value(stage.value),
                index ? share(stage.ofPrevious) : '–',
                share(stage.ofFirst),
            ]),
        };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-funnel-chart': PkFunnelChart;
    }
}
