import { n as resolveHostLocale } from "./host-date-Df90G3ns.js";
//#region src/components/chart/shared.ts
/** Pinned slots are reserved first; unpinned series take the lowest free slot. */
function resolveColumns(cols) {
	const used = new Set(cols.slice(1).map((col) => col.color).filter((slot) => Boolean(slot)));
	let next = 1;
	return cols.map((col, index) => {
		if (index === 0) return {
			...col,
			slot: 0
		};
		const valueCol = {
			...col,
			type: col.type ?? "number"
		};
		if (col.color) return {
			...valueCol,
			slot: col.color
		};
		while (used.has(next)) next++;
		used.add(next);
		return {
			...valueCol,
			slot: next
		};
	});
}
function seriesColor(theme, col) {
	return theme.series[(col.slot - 1) % theme.series.length];
}
/** Canvas cannot resolve `var()`; read the computed tokens from the element instead. */
function readChartTheme(element) {
	const style = getComputedStyle(element);
	const token = (name) => style.getPropertyValue(name).trim();
	return {
		series: [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8
		].map((slot) => token(`--pk-chart-series-${slot}`) || "#2563eb"),
		ordinal: [
			1,
			2,
			3,
			4
		].map((step) => token(`--pk-chart-ordinal-${step}`) || "#2563eb"),
		other: token("--pk-chart-other") || "#9ca3af",
		comparison: token("--pk-chart-comparison") || "#8b95a1",
		surface: token("--pk-chart-surface") || "#fff",
		text: token("--pk-chart-text") || "#1f2933",
		secondary: token("--pk-chart-text-secondary") || "#515f6c",
		muted: token("--pk-chart-text-muted") || "#606d7b",
		grid: token("--pk-chart-grid") || "#e4ebf3",
		axis: token("--pk-chart-axis") || "#cdd6e0",
		crosshair: token("--pk-chart-crosshair") || "#9aa5b1",
		font: token("--pk-font-family") || "system-ui, sans-serif"
	};
}
function prefersReducedMotion() {
	return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function readEnvironment(element, locale) {
	return {
		locale: locale || resolveHostLocale(),
		rtl: getComputedStyle(element).direction === "rtl",
		reducedMotion: prefersReducedMotion(),
		theme: readChartTheme(element)
	};
}
var probe = null;
/** Apply an alpha to any CSS colour the canvas understands (hex, rgb(), hsl()). */
function withAlpha(color, alpha) {
	probe ??= document.createElement("canvas").getContext("2d");
	if (!probe) return color;
	probe.fillStyle = "#000";
	probe.fillStyle = color;
	const normalised = String(probe.fillStyle);
	let channels;
	if (normalised.startsWith("#")) channels = [
		1,
		3,
		5
	].map((start) => parseInt(normalised.slice(start, start + 2), 16));
	else channels = (normalised.match(/[\d.]+/g) ?? [
		"0",
		"0",
		"0"
	]).slice(0, 3).map(Number);
	return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`;
}
/** Vertical fade from the series colour to transparent, used for area washes. */
function areaGradient(color, top = .2) {
	return (context) => {
		const area = context.chart.chartArea;
		if (!area) return withAlpha(color, top / 2);
		const gradient = context.chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
		gradient.addColorStop(0, withAlpha(color, top));
		gradient.addColorStop(1, withAlpha(color, 0));
		return gradient;
	};
}
/** Vertical hairline at the active index, drawn beneath the series. */
var crosshairPlugin = {
	id: "pkCrosshair",
	beforeDatasetsDraw(chart, _args, options) {
		if (!options?.enabled) return;
		const active = chart.getActiveElements();
		if (!active.length) return;
		const x = Math.round(active[0].element.x) + .5;
		const { top, bottom } = chart.chartArea;
		const { ctx } = chart;
		ctx.save();
		ctx.strokeStyle = options.color ?? "#9aa5b1";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x, top);
		ctx.lineTo(x, bottom);
		ctx.stroke();
		ctx.restore();
	}
};
/** Selective value labels at the end of each bar, in text colour (never the series colour). */
var valueLabelPlugin = {
	id: "pkValueLabels",
	afterDatasetsDraw(chart, _args, options) {
		if (!options?.enabled || !options.format) return;
		const { ctx } = chart;
		ctx.save();
		ctx.font = `500 11px ${options.font ?? "system-ui"}`;
		ctx.fillStyle = options.color ?? "#515f6c";
		chart.data.datasets.forEach((_dataset, datasetIndex) => {
			if (!chart.isDatasetVisible(datasetIndex)) return;
			chart.getDatasetMeta(datasetIndex).data.forEach((element, index) => {
				const text = options.format(datasetIndex, index);
				if (!text) return;
				if (options.horizontal) {
					ctx.textBaseline = "middle";
					ctx.textAlign = options.rtl ? "right" : "left";
					ctx.fillText(text, element.x + (options.rtl ? -6 : 6), element.y);
				} else {
					ctx.textBaseline = "bottom";
					ctx.textAlign = "center";
					ctx.fillText(text, element.x, element.y - 4);
				}
			});
		});
		ctx.restore();
	}
};
/** Category plus linear value scales with recessive hairline grid, mirrored for RTL. */
function buildScales(env, options) {
	const { theme } = env;
	const category = {
		type: "category",
		stacked: Boolean(options.stacked),
		display: !options.hideCategory,
		reverse: false,
		position: void 0,
		grid: { display: false },
		border: {
			display: true,
			color: theme.axis
		},
		ticks: {
			color: theme.muted,
			maxRotation: 0,
			autoSkip: options.indexAxis !== "y",
			autoSkipPadding: 18,
			padding: 6,
			font: {
				size: 11,
				family: theme.font
			},
			callback(value) {
				return options.categoryFormat(this.getLabelForValue(Number(value)));
			}
		}
	};
	const value = {
		type: "linear",
		stacked: Boolean(options.stacked),
		display: !options.hideValue,
		beginAtZero: true,
		min: options.min,
		max: options.max,
		reverse: false,
		position: void 0,
		grid: {
			color: theme.grid,
			drawTicks: false
		},
		border: { display: false },
		ticks: {
			color: theme.muted,
			padding: 8,
			maxTicksLimit: options.step ? void 0 : 5,
			stepSize: options.step,
			font: {
				size: 11,
				family: theme.font
			},
			callback: (tick) => options.valueFormat(Number(tick))
		}
	};
	const title = (text) => ({
		display: Boolean(text),
		text: text ?? "",
		color: theme.muted,
		font: {
			size: 11,
			family: theme.font
		}
	});
	let scales;
	if ((options.indexAxis ?? "x") === "x") {
		category.reverse = env.rtl;
		value.position = env.rtl ? "right" : "left";
		scales = {
			x: category,
			y: value
		};
	} else {
		value.reverse = env.rtl;
		category.position = env.rtl ? "right" : "left";
		category.ticks.color = theme.secondary;
		category.border = {
			display: false,
			color: theme.axis
		};
		scales = {
			x: value,
			y: category
		};
	}
	return {
		x: {
			...scales.x,
			title: title(options.xLabel)
		},
		y: {
			...scales.y,
			title: title(options.yLabel)
		}
	};
}
/** Whole-unit tick steps for duration axes, so labels read 1m, 2m, 3m rather than 50s, 1m 40s. */
function durationStep(max) {
	return [
		1,
		5,
		10,
		15,
		30,
		60,
		120,
		300,
		600,
		900,
		1800,
		3600,
		7200,
		10800,
		21600,
		43200,
		86400
	].find((step) => max / step <= 5) ?? 86400;
}
var themeListeners = /* @__PURE__ */ new Set();
var themeObserver = null;
var themeFrame = 0;
function notifyThemeListeners() {
	cancelAnimationFrame(themeFrame);
	themeFrame = requestAnimationFrame(() => themeListeners.forEach((listener) => listener()));
}
/**
* One shared watcher for theme, direction, language and motion changes on the document.
* Charts redraw from tokens when any of these change.
*/
function observeChartTheme(listener) {
	if (!themeObserver && typeof MutationObserver === "function") {
		themeObserver = new MutationObserver(notifyThemeListeners);
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: [
				"class",
				"data-theme",
				"dir",
				"lang"
			]
		});
		if (typeof matchMedia === "function") {
			matchMedia("(prefers-color-scheme: dark)").addEventListener("change", notifyThemeListeners);
			matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", notifyThemeListeners);
		}
	}
	themeListeners.add(listener);
	return () => {
		themeListeners.delete(listener);
	};
}
//#endregion
export { observeChartTheme as a, seriesColor as c, durationStep as i, valueLabelPlugin as l, buildScales as n, readEnvironment as o, crosshairPlugin as r, resolveColumns as s, areaGradient as t, withAlpha as u };

//# sourceMappingURL=shared-CZaI81TK.js.map