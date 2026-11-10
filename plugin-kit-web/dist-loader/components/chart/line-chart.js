import { c as n, l as customElement } from "../../chunks/lit-6rz1jOzS.js";
import { c as __decorate } from "../../chunks/pk-base-BZKcPYjM.js";
import { n as formatChange, t as createFormatter } from "../../chunks/format-gF_xvdEf.js";
import { _ as LineController, b as PointElement, c as seriesColor, h as Chart, i as durationStep, m as CategoryScale, n as buildScales, t as areaGradient, u as withAlpha, v as LineElement, x as index, y as LinearScale } from "../../chunks/shared-B5LmQVDq.js";
import { n as datasetMeta, t as PkChartElement } from "../../chunks/pk-chart-element-CdC-eINz.js";
//#region src/components/chart/pk-line-chart.ts
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);
var COMPARISON_KEY = "__comparison";
var PkLineChart = class PkLineChart extends PkChartElement {
	constructor(..._args) {
		super(..._args);
		this.area = false;
		this.curve = "smooth";
		this.xLabel = "";
		this.yLabel = "";
		this.min = null;
		this.max = null;
	}
	buildConfig(env, data) {
		const { theme } = env;
		const series = data.cols.slice(1);
		const smooth = this.curve !== "linear";
		const dense = data.rows.length > 120;
		const single = series.length === 1;
		const curve = {
			tension: smooth ? .35 : 0,
			cubicInterpolationMode: smooth ? "monotone" : "default"
		};
		const datasets = series.map((col, index) => {
			const color = seriesColor(theme, col);
			return {
				...curve,
				label: col.label,
				data: data.rows.map((row) => row[index + 1]),
				borderColor: color,
				borderWidth: 2,
				borderJoinStyle: "round",
				borderCapStyle: "round",
				pointRadius: 0,
				pointHoverRadius: dense ? 3.5 : 4.5,
				pointHoverBorderWidth: 2,
				pointHoverBorderColor: theme.surface,
				pointHoverBackgroundColor: color,
				pointHitRadius: 12,
				spanGaps: false,
				fill: this.area ? "origin" : false,
				backgroundColor: this.area ? (context) => areaGradient(color)(context) : color,
				order: 1,
				pkKey: col.id,
				pkColumn: col,
				pkColor: color,
				pkKind: "primary",
				pkSeriesIndex: index
			};
		});
		if (data.comparisonRows) series.forEach((col, index) => {
			const color = single ? theme.comparison : withAlpha(seriesColor(theme, col), .55);
			datasets.push({
				...curve,
				label: `${col.label} (${data.comparisonLabel ?? ""})`,
				data: data.comparisonRows.map((row) => row[index + 1]),
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
				pkKind: "comparison",
				pkSeriesIndex: index
			});
		});
		const values = datasets.flatMap((dataset) => dataset.data).filter((value) => typeof value === "number");
		return {
			type: "line",
			data: {
				labels: data.rows.map((row) => row[0]),
				datasets
			},
			options: {
				scales: buildScales(env, {
					categoryFormat: createFormatter(data.cols[0], {
						context: "axis",
						locale: env.locale
					}),
					valueFormat: createFormatter(series[0], {
						context: "axis",
						locale: env.locale
					}),
					step: series[0]?.type === "duration" && values.length ? durationStep(Math.max(...values)) : void 0,
					xLabel: this.xLabel,
					yLabel: this.yLabel,
					min: this.min ?? void 0,
					max: this.max ?? void 0
				}),
				plugins: { pkCrosshair: {
					enabled: true,
					color: theme.crosshair
				} }
			},
			plugins: [index]
		};
	}
	buildLegend(env, data) {
		const series = data.cols.slice(1);
		const single = series.length === 1;
		if (single && !data.comparisonRows) return [];
		const items = series.map((col) => ({
			key: col.id,
			label: single && data.currentLabel ? data.currentLabel : col.label,
			color: seriesColor(env.theme, col),
			shape: "line"
		}));
		if (data.comparisonRows) items.push({
			key: COMPARISON_KEY,
			label: data.comparisonLabel ?? "",
			color: env.theme.comparison,
			shape: "dash"
		});
		return items;
	}
	buildTooltip(points, env, data) {
		const chart = this.chart;
		if (!chart) return null;
		const index = points[0].dataIndex;
		const xFull = createFormatter(data.cols[0], { locale: env.locale });
		const showComparison = Boolean(data.comparisonRows) && !this.hiddenKeys.has(COMPARISON_KEY);
		const rows = [];
		const previousRow = data.comparisonRows?.[index];
		chart.data.datasets.forEach((dataset, datasetIndex) => {
			const meta = datasetMeta(dataset);
			if (meta.pkKind !== "primary" || !chart.isDatasetVisible(datasetIndex)) return;
			const value = dataset.data[index];
			const previous = showComparison && previousRow ? previousRow[(meta.pkSeriesIndex ?? 0) + 1] : null;
			rows.push({
				shape: "line",
				color: meta.pkColor,
				label: meta.pkColumn.label,
				value: createFormatter(meta.pkColumn, { locale: env.locale })(value),
				change: showComparison ? formatChange(value, previous, meta.pkColumn, {
					locale: env.locale,
					positive: meta.pkColumn.positive ?? "up"
				}) : null
			});
		});
		if (showComparison && previousRow) {
			const previousKey = previousRow[0];
			const previousLabel = previousKey !== void 0 && previousKey !== data.rows[index]?.[0] ? xFull(previousKey) : data.comparisonLabel ?? "";
			chart.data.datasets.forEach((dataset, datasetIndex) => {
				const meta = datasetMeta(dataset);
				if (meta.pkKind !== "comparison" || !chart.isDatasetVisible(datasetIndex)) return;
				rows.push({
					shape: "dash",
					color: meta.pkColor,
					label: data.cols.length > 2 ? `${meta.pkColumn.label} · ${previousLabel}` : previousLabel,
					value: createFormatter(meta.pkColumn, { locale: env.locale })(dataset.data[index])
				});
			});
		}
		return rows.length ? {
			title: xFull(data.rows[index]?.[0]),
			rows
		} : null;
	}
	buildTable(env, data) {
		const series = data.cols.slice(1);
		const xFull = createFormatter(data.cols[0], { locale: env.locale });
		const formats = series.map((col) => createFormatter(col, { locale: env.locale }));
		const head = [{ text: data.cols[0].label }, ...series.map((col) => ({
			text: col.label,
			numeric: true
		}))];
		const comparison = data.comparisonRows;
		if (comparison) head.push({
			text: data.comparisonLabel ?? "",
			numeric: false
		}, ...series.map((col) => ({
			text: `${col.label} (${data.comparisonLabel ?? ""})`,
			numeric: true
		})));
		return {
			head,
			rows: data.rows.map((row, index) => {
				const cells = [xFull(row[0]), ...series.map((_col, s) => formats[s](row[s + 1]))];
				const previous = comparison?.[index];
				if (previous) cells.push(xFull(previous[0]), ...series.map((_col, s) => formats[s](previous[s + 1])));
				return cells;
			})
		};
	}
};
__decorate([n({
	type: Boolean,
	reflect: true
})], PkLineChart.prototype, "area", void 0);
__decorate([n({ reflect: true })], PkLineChart.prototype, "curve", void 0);
__decorate([n({ attribute: "x-label" })], PkLineChart.prototype, "xLabel", void 0);
__decorate([n({ attribute: "y-label" })], PkLineChart.prototype, "yLabel", void 0);
__decorate([n({ type: Number })], PkLineChart.prototype, "min", void 0);
__decorate([n({ type: Number })], PkLineChart.prototype, "max", void 0);
PkLineChart = __decorate([customElement("pk-line-chart")], PkLineChart);
//#endregion
export { PkLineChart };
