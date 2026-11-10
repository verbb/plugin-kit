import { c as n, h as i, l as customElement, m as b, p as A } from "../../chunks/lit-6rz1jOzS.js";
import { c as __decorate } from "../../chunks/pk-base-BZKcPYjM.js";
import { t as createFormatter } from "../../chunks/format-gF_xvdEf.js";
import { d as ArcElement, g as DoughnutController, h as Chart, u as withAlpha } from "../../chunks/shared-B5LmQVDq.js";
import { r as pkChartStyles, t as PkChartElement } from "../../chunks/pk-chart-element-CdC-eINz.js";
//#region src/components/chart/pk-donut-chart.ts
Chart.register(DoughnutController, ArcElement);
var toNumber = (value) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
var PkDonutChart = class PkDonutChart extends PkChartElement {
	constructor(..._args) {
		super(..._args);
		this.maxSegments = 6;
		this.otherLabel = "Other";
		this.shareLabel = "Share";
	}
	static {
		this.styles = [pkChartStyles, i`
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
        `];
	}
	get legendInToolbar() {
		return false;
	}
	get segments() {
		return this.resolved?.segments ?? [];
	}
	prepare(data) {
		const max = Math.max(2, this.maxSegments || 6);
		const segments = data.rows.map((row) => ({
			label: String(row[0] ?? ""),
			value: toNumber(row[1]),
			other: false
		}));
		const folded = segments.length <= max ? segments : [...segments.slice(0, max - 1), {
			label: this.otherLabel,
			value: segments.slice(max - 1).reduce((sum, segment) => sum + segment.value, 0),
			other: true
		}];
		return {
			...data,
			segments: folded
		};
	}
	colors(env) {
		return this.segments.map((segment, index) => segment.other ? env.theme.other : env.theme.series[index % env.theme.series.length]);
	}
	/** Hidden state follows the category, so a refresh that reorders segments keeps it. */
	visibleTotal() {
		return this.segments.reduce((sum, segment) => sum + (this.hiddenKeys.has(segment.label) ? 0 : segment.value), 0);
	}
	legendKeys() {
		return new Set(this.segments.map((segment) => segment.label));
	}
	pointDetail(_datasetIndex, index) {
		const segment = this.segments[index];
		if (!segment || !this.resolved) return null;
		return {
			index,
			row: segment.other ? null : this.resolved.rows[index] ?? null,
			series: this.resolved.cols[1]?.id ?? "",
			value: segment.value
		};
	}
	buildConfig(env, data) {
		const colors = this.colors(env);
		return {
			type: "doughnut",
			data: {
				labels: this.segments.map((segment) => segment.label),
				datasets: [{
					data: this.segments.map((segment) => segment.value),
					backgroundColor: colors,
					hoverBackgroundColor: colors.map((color) => withAlpha(color, .85)),
					borderColor: env.theme.surface,
					borderWidth: 2,
					borderRadius: 2,
					hoverOffset: 4,
					pkKey: data.cols[1].id,
					pkColumn: data.cols[1],
					pkColor: colors[0]
				}]
			},
			options: {
				cutout: "68%",
				layout: { padding: 6 },
				interaction: {
					mode: "nearest",
					intersect: true
				}
			}
		};
	}
	applyHidden(update) {
		const chart = this.chart;
		if (!chart) return;
		this.segments.forEach((segment, index) => {
			if (chart.getDataVisibility(index) === this.hiddenKeys.has(segment.label)) chart.toggleDataVisibility(index);
		});
		if (update) chart.update();
	}
	pointCount() {
		return this.segments.length;
	}
	activeElementsAt(index) {
		return this.chart?.getDataVisibility(index) ? [{
			datasetIndex: 0,
			index
		}] : [];
	}
	buildLegend(env, data) {
		const colors = this.colors(env);
		const total = this.segments.reduce((sum, segment) => sum + segment.value, 0);
		const value = createFormatter(data.cols[1], { locale: env.locale });
		const share = createFormatter({ type: "percent" }, {
			context: "axis",
			locale: env.locale
		});
		return this.segments.map((segment, index) => ({
			key: segment.label,
			label: segment.label,
			color: colors[index],
			shape: "rect",
			value: value(segment.value),
			share: share(total ? segment.value / total : 0)
		}));
	}
	renderSupplement(legend) {
		return this.renderLegend(legend, "side-legend");
	}
	renderOverlay() {
		const data = this.resolved;
		if (!data || !this.env) return A;
		const column = data.cols[1];
		return b`
            <div>
                <span class="total">${createFormatter(column, {
			context: "axis",
			locale: this.env.locale
		})(this.visibleTotal())}</span>
                <span class="total-label">${column.label}</span>
            </div>
        `;
	}
	buildTooltip(points, env, data) {
		const index = points[0].dataIndex;
		const segment = this.segments[index];
		const total = this.visibleTotal();
		if (!segment) return null;
		return {
			title: segment.label,
			rows: [{
				shape: "rect",
				color: this.colors(env)[index],
				label: data.cols[1].label,
				value: createFormatter(data.cols[1], { locale: env.locale })(segment.value)
			}, {
				label: this.shareLabel,
				value: createFormatter({ type: "percent" }, { locale: env.locale })(total ? segment.value / total : 0)
			}]
		};
	}
	buildTable(env, data) {
		const total = data.rows.reduce((sum, row) => sum + toNumber(row[1]), 0);
		const value = createFormatter(data.cols[1], { locale: env.locale });
		const share = createFormatter({ type: "percent" }, { locale: env.locale });
		const category = createFormatter(data.cols[0], { locale: env.locale });
		return {
			head: [
				{ text: data.cols[0].label },
				{
					text: data.cols[1].label,
					numeric: true
				},
				{
					text: this.shareLabel,
					numeric: true
				}
			],
			rows: data.rows.map((row) => [
				category(row[0]),
				value(row[1]),
				share(total ? toNumber(row[1]) / total : 0)
			])
		};
	}
};
__decorate([n({
	type: Number,
	attribute: "max-segments"
})], PkDonutChart.prototype, "maxSegments", void 0);
__decorate([n({ attribute: "other-label" })], PkDonutChart.prototype, "otherLabel", void 0);
__decorate([n({ attribute: "share-label" })], PkDonutChart.prototype, "shareLabel", void 0);
PkDonutChart = __decorate([customElement("pk-donut-chart")], PkDonutChart);
//#endregion
export { PkDonutChart };
