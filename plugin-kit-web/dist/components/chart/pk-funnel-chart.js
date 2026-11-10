import { i as customElement, t as __decorate } from "../../chunks/decorate-Br_PE9pq.js";
import { t as property } from "../../chunks/decorators-BkErmuYK.js";
import { r as pkChartStyles, t as PkChartElement } from "../../chunks/pk-chart-element-C6SgC5pf.js";
import { u as withAlpha } from "../../chunks/shared-CZaI81TK.js";
import { css, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from "chart.js";
import { createFormatter } from "@verbb/plugin-kit-core/utils/format";
//#region src/components/chart/pk-funnel-chart.ts
Chart.register(BarController, BarElement, CategoryScale, LinearScale);
var toNumber = (value) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
var PkFunnelChart = class PkFunnelChart extends PkChartElement {
	constructor(..._args) {
		super(..._args);
		this.shape = "steps";
		this.ofPreviousLabel = "of previous step";
		this.ofFirstLabel = "of first step";
	}
	static {
		this.styles = [pkChartStyles, css`
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
        `];
	}
	get htmlPlot() {
		return this.shape === "tracks";
	}
	get stages() {
		return this.resolved?.stages ?? [];
	}
	prepare(data) {
		const values = data.rows.map((row) => toNumber(row[1]));
		const first = values[0] ?? 0;
		const stages = data.rows.map((row, index) => ({
			label: String(row[0] ?? ""),
			value: values[index],
			ofPrevious: index === 0 ? 1 : values[index - 1] ? values[index] / values[index - 1] : 0,
			ofFirst: first ? values[index] / first : 0
		}));
		return {
			...data,
			stages
		};
	}
	/** Spread the four ordinal tokens across however many stages there are. */
	colors(env) {
		const count = this.stages.length;
		const ramp = env.theme.ordinal;
		return this.stages.map((_stage, index) => ramp[count <= 1 ? ramp.length - 1 : Math.round(index * (ramp.length - 1) / (count - 1))]);
	}
	buildConfig(env, data) {
		const { theme } = env;
		const colors = this.colors(env);
		const max = Math.max(1, ...this.stages.map((stage) => stage.value));
		const value = createFormatter(data.cols[1], { locale: env.locale });
		const share = createFormatter({ type: "percent" }, { locale: env.locale });
		const base = {
			backgroundColor: colors,
			hoverBackgroundColor: colors.map((color) => withAlpha(color, .82)),
			borderRadius: 4,
			pkKey: data.cols[1].id,
			pkColumn: data.cols[1],
			pkColor: colors[0],
			pkRaw: this.stages.map((stage) => stage.value)
		};
		if (this.shape === "centered") return {
			type: "bar",
			data: {
				labels: this.stages.map((stage) => stage.label),
				datasets: [{
					...base,
					data: this.stages.map((stage) => [-stage.value / 2, stage.value / 2]),
					borderSkipped: false,
					barPercentage: .84,
					categoryPercentage: 1
				}]
			},
			options: {
				indexAxis: "y",
				interaction: {
					mode: "index",
					intersect: false,
					axis: "y"
				},
				layout: { padding: { [env.rtl ? "left" : "right"]: 108 } },
				scales: {
					x: {
						display: false,
						min: -max / 2,
						max: max / 2,
						reverse: env.rtl
					},
					y: {
						position: env.rtl ? "right" : "left",
						grid: { display: false },
						border: { display: false },
						ticks: {
							color: theme.secondary,
							font: {
								size: 12,
								family: theme.font
							}
						}
					}
				},
				plugins: { pkValueLabels: {
					enabled: true,
					horizontal: true,
					rtl: env.rtl,
					color: theme.secondary,
					font: theme.font,
					format: (_datasetIndex, index) => {
						const stage = this.stages[index];
						return stage ? `${value(stage.value)} · ${share(stage.ofFirst)}` : "";
					}
				} }
			}
		};
		return {
			type: "bar",
			data: {
				labels: this.stages.map((stage) => stage.label),
				datasets: [{
					...base,
					data: this.stages.map((stage) => stage.value),
					borderSkipped: "start",
					barPercentage: .62,
					categoryPercentage: 1,
					maxBarThickness: 72
				}]
			},
			options: {
				layout: { padding: 0 },
				scales: {
					x: {
						display: false,
						reverse: env.rtl
					},
					y: {
						display: false,
						beginAtZero: true,
						max
					}
				}
			}
		};
	}
	/** A stage's caption: its note from the data, else `firstNote` or the share of the previous stage. */
	renderNote(index, share) {
		const note = this.resolved?.notes?.[index];
		if (typeof note === "string") return note;
		if (note) return html`<b>${share(note.rate)}</b> ${note.text}`;
		if (!index) return this.resolved?.firstNote ?? "\xA0";
		return html`<b>${share(this.stages[index].ofPrevious)}</b> ${this.ofPreviousLabel}`;
	}
	renderPlot() {
		if (!this.env || !this.resolved) return nothing;
		const value = createFormatter(this.resolved.cols[1], { locale: this.env.locale });
		const share = createFormatter({ type: "percent" }, { locale: this.env.locale });
		const max = Math.max(1, ...this.stages.map((stage) => stage.value));
		const last = this.stages.length - 1;
		return html`
            <div class="tracks-wrap" aria-hidden="true">
                <div class="tracks" style=${styleMap({ "--_stage-count": String(this.stages.length) })}>
                    ${this.stages.map((stage, index) => html`
                        <div class="track-stage" part="stage">
                            <span class="track-label">${stage.label}</span>
                            <span class="track-value">${value(stage.value)}</span>
                            <div class="track" part="track">
                                <span
                                    class=${index === last ? "fill fill-last" : "fill"}
                                    part=${index === last ? "fill fill-last" : "fill"}
                                    style=${styleMap({ height: `${stage.value / max * 100}%` })}
                                ></span>
                            </div>
                            <span class="track-note">${this.renderNote(index, share)}</span>
                        </div>
                    `)}
                </div>
            </div>
        `;
	}
	renderSupplement() {
		if (this.shape !== "steps" || !this.env || !this.resolved) return nothing;
		const value = createFormatter(this.resolved.cols[1], { locale: this.env.locale });
		const share = createFormatter({ type: "percent" }, { locale: this.env.locale });
		return html`
            <div class="stages" aria-hidden="true" style=${styleMap({ "--_stage-count": String(this.stages.length) })}>
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
	buildTooltip(points, env, data) {
		const index = points[0].dataIndex;
		const stage = this.stages[index];
		if (!stage) return null;
		const share = createFormatter({ type: "percent" }, { locale: env.locale });
		const rows = [{
			shape: "rect",
			color: this.colors(env)[index],
			label: data.cols[1].label,
			value: createFormatter(data.cols[1], { locale: env.locale })(stage.value)
		}];
		if (index) rows.push({
			label: this.ofPreviousLabel,
			value: share(stage.ofPrevious)
		}, {
			label: this.ofFirstLabel,
			value: share(stage.ofFirst)
		});
		return {
			title: stage.label,
			rows
		};
	}
	buildTable(env, data) {
		const value = createFormatter(data.cols[1], { locale: env.locale });
		const share = createFormatter({ type: "percent" }, { locale: env.locale });
		return {
			head: [
				{ text: data.cols[0].label },
				{
					text: data.cols[1].label,
					numeric: true
				},
				{
					text: this.ofPreviousLabel,
					numeric: true
				},
				{
					text: this.ofFirstLabel,
					numeric: true
				}
			],
			rows: this.stages.map((stage, index) => [
				stage.label,
				value(stage.value),
				index ? share(stage.ofPrevious) : "–",
				share(stage.ofFirst)
			])
		};
	}
};
__decorate([property({ reflect: true })], PkFunnelChart.prototype, "shape", void 0);
__decorate([property({ attribute: "of-previous-label" })], PkFunnelChart.prototype, "ofPreviousLabel", void 0);
__decorate([property({ attribute: "of-first-label" })], PkFunnelChart.prototype, "ofFirstLabel", void 0);
PkFunnelChart = __decorate([customElement("pk-funnel-chart")], PkFunnelChart);
//#endregion
export { PkFunnelChart };

//# sourceMappingURL=pk-funnel-chart.js.map