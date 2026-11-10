import { c as n, l as customElement } from "../../chunks/lit-6rz1jOzS.js";
import { c as __decorate } from "../../chunks/pk-base-BZKcPYjM.js";
import { t as createFormatter } from "../../chunks/format-gF_xvdEf.js";
import { c as seriesColor, f as BarController, h as Chart, m as CategoryScale, n as buildScales, p as BarElement, u as withAlpha, y as LinearScale } from "../../chunks/shared-B5LmQVDq.js";
import { n as datasetMeta, t as PkChartElement } from "../../chunks/pk-chart-element-CdC-eINz.js";
//#region src/components/chart/pk-bar-chart.ts
Chart.register(BarController, BarElement, CategoryScale, LinearScale);
var toNumber = (value) => typeof value === "number" && Number.isFinite(value) ? value : 0;
var PkBarChart = class PkBarChart extends PkChartElement {
	constructor(..._args) {
		super(..._args);
		this.orientation = "vertical";
		this.stacked = "";
		this.valueLabels = false;
		this.xLabel = "";
		this.yLabel = "";
		this.min = null;
		this.max = null;
	}
	get horizontal() {
		return this.orientation === "horizontal";
	}
	get rebuildOnLegendToggle() {
		return this.stackMode === "percent";
	}
	get stackMode() {
		return this.stacked === "normal" || this.stacked === "percent" ? this.stacked : "";
	}
	/** Only the last visible non-zero segment of a stack gets rounded corners. */
	isOuterSegment(context) {
		const { chart, dataIndex, datasetIndex } = context;
		const metas = chart.getSortedVisibleDatasetMetas();
		for (let k = metas.length - 1; k >= 0; k--) if (toNumber(chart.data.datasets[metas[k].index].data[dataIndex])) return metas[k].index === datasetIndex;
		return false;
	}
	buildConfig(env, data) {
		const { theme } = env;
		const series = data.cols.slice(1);
		const stack = this.stackMode;
		const percent = stack === "percent";
		const grouped = series.length > 1 && !stack;
		const totals = data.rows.map((row) => series.reduce((sum, col, index) => sum + (this.hiddenKeys.has(col.id) ? 0 : toNumber(row[index + 1])), 0));
		const horizontal = this.horizontal;
		const datasets = series.map((col, index) => {
			const color = seriesColor(theme, col);
			const raw = data.rows.map((row) => row[index + 1]);
			return {
				label: col.label,
				data: percent ? raw.map((value, row) => totals[row] ? toNumber(value) / totals[row] * 100 : 0) : raw,
				backgroundColor: color,
				hoverBackgroundColor: withAlpha(color, .82),
				maxBarThickness: 24,
				categoryPercentage: grouped ? .72 : .8,
				barPercentage: grouped ? .88 : .9,
				borderSkipped: "start",
				borderColor: theme.surface,
				borderWidth: stack ? horizontal ? { right: 2 } : { top: 2 } : 0,
				borderRadius: stack ? (context) => this.isOuterSegment(context) ? 4 : 0 : 4,
				pkKey: col.id,
				pkColumn: col,
				pkColor: color,
				pkRaw: raw
			};
		});
		const valueSpec = percent ? { type: "percent" } : series[0];
		const axisFormat = createFormatter(valueSpec, {
			context: "axis",
			locale: env.locale
		});
		const fullFormat = createFormatter(series[0], { locale: env.locale });
		return {
			type: "bar",
			data: {
				labels: data.rows.map((row) => row[0]),
				datasets
			},
			options: {
				indexAxis: horizontal ? "y" : "x",
				interaction: {
					mode: "index",
					intersect: false,
					axis: horizontal ? "y" : "x"
				},
				layout: { padding: this.valueLabels ? horizontal ? { [env.rtl ? "left" : "right"]: 64 } : { top: 18 } : {} },
				scales: buildScales(env, {
					indexAxis: horizontal ? "y" : "x",
					stacked: Boolean(stack),
					min: percent ? void 0 : this.min ?? void 0,
					max: percent ? 100 : this.max ?? void 0,
					xLabel: this.xLabel,
					yLabel: this.yLabel,
					hideValue: this.valueLabels && horizontal,
					categoryFormat: createFormatter(data.cols[0], {
						context: "axis",
						locale: env.locale
					}),
					valueFormat: percent ? (value) => axisFormat(Number(value) / 100) : axisFormat
				}),
				plugins: { pkValueLabels: {
					enabled: this.valueLabels,
					horizontal,
					rtl: env.rtl,
					color: theme.secondary,
					font: theme.font,
					format: (datasetIndex, index) => fullFormat(datasets[datasetIndex].pkRaw[index])
				} }
			}
		};
	}
	buildLegend(env, data) {
		const series = data.cols.slice(1);
		return series.length > 1 ? series.map((col) => ({
			key: col.id,
			label: col.label,
			color: seriesColor(env.theme, col),
			shape: "rect"
		})) : [];
	}
	buildTooltip(points, env, data) {
		const chart = this.chart;
		if (!chart) return null;
		const index = points[0].dataIndex;
		const percent = this.stackMode === "percent";
		const share = createFormatter({ type: "percent" }, { locale: env.locale });
		const rows = [];
		let total = 0;
		chart.data.datasets.forEach((dataset, datasetIndex) => {
			if (!chart.isDatasetVisible(datasetIndex)) return;
			const meta = datasetMeta(dataset);
			const format = createFormatter(meta.pkColumn, { locale: env.locale });
			const raw = meta.pkRaw?.[index];
			total += toNumber(raw);
			rows.push({
				shape: "rect",
				color: meta.pkColor,
				label: percent ? `${meta.pkColumn.label} (${format(raw)})` : meta.pkColumn.label,
				value: percent ? share(toNumber(dataset.data[index]) / 100) : format(raw)
			});
		});
		if (!rows.length) return null;
		const footer = this.stackMode && rows.length > 1 ? [this.totalLabel, createFormatter(data.cols[1], { locale: env.locale })(total)] : void 0;
		return {
			title: createFormatter(data.cols[0], { locale: env.locale })(data.rows[index]?.[0]),
			rows,
			footer
		};
	}
	buildTable(env, data) {
		const series = data.cols.slice(1);
		const formats = series.map((col) => createFormatter(col, { locale: env.locale }));
		const share = createFormatter({ type: "percent" }, { locale: env.locale });
		const category = createFormatter(data.cols[0], { locale: env.locale });
		const stacked = Boolean(this.stackMode);
		const percent = this.stackMode === "percent";
		const head = [{ text: data.cols[0].label }, ...series.map((col) => ({
			text: col.label,
			numeric: true
		}))];
		if (stacked) head.push({
			text: this.totalLabel,
			numeric: true
		});
		return {
			head,
			rows: data.rows.map((row) => {
				const total = series.reduce((sum, _col, index) => sum + toNumber(row[index + 1]), 0);
				const cells = [category(row[0]), ...series.map((_col, index) => percent ? `${formats[index](row[index + 1])} (${share(total ? toNumber(row[index + 1]) / total : 0)})` : formats[index](row[index + 1]))];
				if (stacked) cells.push(formats[0](total));
				return cells;
			})
		};
	}
};
__decorate([n({ reflect: true })], PkBarChart.prototype, "orientation", void 0);
__decorate([n({ reflect: true })], PkBarChart.prototype, "stacked", void 0);
__decorate([n({
	type: Boolean,
	attribute: "value-labels",
	reflect: true
})], PkBarChart.prototype, "valueLabels", void 0);
__decorate([n({ attribute: "x-label" })], PkBarChart.prototype, "xLabel", void 0);
__decorate([n({ attribute: "y-label" })], PkBarChart.prototype, "yLabel", void 0);
__decorate([n({ type: Number })], PkBarChart.prototype, "min", void 0);
__decorate([n({ type: Number })], PkBarChart.prototype, "max", void 0);
PkBarChart = __decorate([customElement("pk-bar-chart")], PkBarChart);
//#endregion
export { PkBarChart };
