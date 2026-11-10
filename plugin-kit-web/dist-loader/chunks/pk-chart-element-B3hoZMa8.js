import { a as e, c as n, g as i, h as b, o as e$1, p as A, s as r, t as o } from "./lit-DDs3j8Nc.js";
import { c as __decorate, l as PkElement } from "./pk-base-Dlxhq-0r.js";
import "./pk-spinner-DY7BqdmH.js";
import "./pk-state-panel-C6LQPYNf.js";
import { S as plugin_tooltip, a as observeChartTheme, h as Chart, l as valueLabelPlugin, o as readEnvironment, r as crosshairPlugin, s as resolveColumns } from "./shared-B5LmQVDq.js";
//#region src/events/pk-chart.ts
/** Emitted when a point, bar, segment or stage is clicked, or chosen with Enter or Space. */
var PkPointSelectEvent = class extends Event {
	constructor(detail) {
		super("pk-point-select", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
		this.detail = detail;
	}
};
/** Emitted when a legend item hides or shows its series. */
var PkLegendToggleEvent = class extends Event {
	constructor(detail) {
		super("pk-legend-toggle", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
		this.detail = detail;
	}
};
//#endregion
//#region src/components/chart/styles.ts
/** Styles shared by the line, bar, donut and funnel chart elements. */
var pkChartStyles = i`
    @layer pk-component {
        :host {
            display: block;
            min-width: 0;
            color: var(--pk-chart-text);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-sm);
            line-height: var(--pk-line-height);
            --_pk-chart-height: var(--pk-chart-height, 240px);
        }

        :host([hidden]) {
            display: none;
        }

        [hidden] {
            display: none !important;
        }

        .base {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px 12px;
            align-items: center;
        }

        .legend {
            display: flex;
            flex: 1 1 auto;
            flex-wrap: wrap;
            gap: 4px 14px;
            min-width: 0;
        }

        .legend-item {
            all: unset;
            display: inline-flex;
            gap: 6px;
            align-items: center;
            padding: 2px 1px;
            border-radius: var(--pk-radius-sm);
            color: var(--pk-chart-text-secondary);
            font-size: 12px;
            cursor: pointer;
        }

        .legend-item:focus-visible,
        .toggle button:focus-visible,
        .plot:focus-visible {
            outline: none;
            box-shadow: var(--pk-shadow-focus);
        }

        .legend-item[aria-pressed='false'] .legend-label {
            text-decoration: line-through;
            text-decoration-color: var(--pk-chart-text-muted);
        }

        .key {
            flex: none;
            width: 10px;
            height: 10px;
            border-radius: 2px;
            background: var(--_key-color);
        }

        .key.line,
        .key.dash {
            width: 14px;
            height: 0;
            border-radius: 0;
            border-top: 2px solid var(--_key-color);
            background: none;
        }

        .key.dash {
            border-top-style: dashed;
        }

        [aria-pressed='false'] > .key {
            background: transparent;
            box-shadow: inset 0 0 0 1.5px var(--_key-color);
        }

        [aria-pressed='false'] > .key.line,
        [aria-pressed='false'] > .key.dash {
            box-shadow: none;
            opacity: 0.4;
        }

        .toggle {
            display: inline-flex;
            margin-inline-start: auto;
            padding: 2px;
            border-radius: var(--pk-radius-lg);
            background: var(--pk-chart-toggle-background);
        }

        .toggle button {
            all: unset;
            padding: 2px 10px;
            border-radius: var(--pk-radius-md);
            color: var(--pk-chart-text-secondary);
            font-size: 12px;
            cursor: pointer;
        }

        .toggle button[aria-pressed='true'] {
            background: var(--pk-chart-surface);
            color: var(--pk-chart-text);
            box-shadow: 0 0 0 1px var(--pk-chart-border);
        }

        .body {
            position: relative;
            min-width: 0;
        }

        .plot {
            position: relative;
            height: var(--_pk-chart-height);
            border-radius: var(--pk-radius-md);
            transition: opacity 0.2s;
        }

        .plot.html-plot {
            height: auto;
        }

        .base.refreshing .plot {
            opacity: 0.45;
        }

        canvas {
            display: block;
        }

        .overlay {
            position: absolute;
            inset: 0;
            display: grid;
            place-items: center;
            text-align: center;
            pointer-events: none;
        }

        .tooltip {
            position: absolute;
            z-index: 3;
            top: 0;
            left: 0;
            min-width: 150px;
            max-width: 280px;
            padding: 8px 10px;
            border-radius: var(--pk-radius-lg);
            background: var(--pk-chart-tooltip-background);
            box-shadow: var(--pk-chart-tooltip-shadow);
            color: var(--pk-chart-text);
            font-size: 12px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.12s;
        }

        .tooltip.visible {
            opacity: 1;
        }

        .tooltip-title {
            margin-bottom: 6px;
            font-weight: 600;
        }

        .tooltip-row {
            display: grid;
            grid-template-columns: 14px minmax(0, 1fr) auto;
            gap: 4px 8px;
            align-items: center;
            padding: 1px 0;
        }

        .tooltip-row.plain {
            grid-template-columns: minmax(0, 1fr) auto;
        }

        .tooltip-label {
            color: var(--pk-chart-text-secondary);
            overflow-wrap: anywhere;
        }

        .tooltip-value {
            font-weight: 600;
            font-variant-numeric: tabular-nums;
            text-align: end;
            white-space: nowrap;
        }

        .tooltip-row .change {
            grid-column: 2 / -1;
            justify-self: start;
        }

        .tooltip-footer {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-top: 6px;
            padding-top: 6px;
            border-top: 1px solid var(--pk-chart-grid);
        }

        .tooltip-footer b {
            font-variant-numeric: tabular-nums;
        }

        .change {
            display: inline-flex;
            gap: 3px;
            align-items: center;
            padding: 0 6px;
            border-radius: 999px;
            background: var(--pk-chart-toggle-background);
            color: var(--pk-chart-text-secondary);
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
        }

        .change.good {
            background: var(--pk-chart-positive-background);
            color: var(--pk-chart-positive);
        }

        .change.bad {
            background: var(--pk-chart-negative-background);
            color: var(--pk-chart-negative);
        }

        .change svg {
            width: 8px;
            height: 8px;
            fill: currentColor;
        }

        .table-wrap {
            max-height: calc(var(--_pk-chart-height) + 48px);
            overflow: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: var(--pk-font-size-sm);
        }

        th,
        td {
            padding: 6px 10px;
            border-bottom: 1px solid var(--pk-chart-grid);
            text-align: start;
            white-space: nowrap;
        }

        thead th {
            position: sticky;
            top: 0;
            background: var(--pk-chart-table-head-background);
            color: var(--pk-chart-text-secondary);
            font-size: 12px;
            font-weight: 600;
        }

        tbody th {
            font-weight: 400;
        }

        .numeric {
            font-variant-numeric: tabular-nums;
            text-align: end;
        }

        .sr-only,
        caption {
            position: absolute !important;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
            border: 0;
        }

        pk-state-panel {
            --pk-state-panel-min-height: var(--_pk-chart-height);
        }

        /* Default state messages are fallback content in this shadow root, so reset their margins here. */
        pk-state-panel p {
            margin: 0;
        }

        /* The spinner stands on its own; the tinted icon box is for static state icons. */
        pk-state-panel.loading {
            --pk-state-panel-icon-background: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
            .plot,
            .tooltip {
                transition: none;
            }
        }
    }
`;
//#endregion
//#region src/components/chart/pk-chart-element.ts
Chart.register(plugin_tooltip);
var PRESENTATION_PROPERTIES = /* @__PURE__ */ new Set([
	"label",
	"state",
	"view",
	"tableToggle",
	"legend",
	"hiddenKeys",
	"emptyHeading",
	"emptyMessage",
	"errorHeading",
	"errorMessage",
	"loadingLabel",
	"chartLabel",
	"tableLabel",
	"viewLabel",
	"seriesLabel",
	"tableAvailableLabel",
	"totalLabel",
	"description"
]);
var ARROW_UP = "<svg viewBox=\"0 0 8 8\" aria-hidden=\"true\"><path d=\"M4 1l3.5 5.5h-7z\"/></svg>";
var ARROW_DOWN = "<svg viewBox=\"0 0 8 8\" aria-hidden=\"true\"><path d=\"M4 7L.5 1.5h7z\"/></svg>";
function deepMerge(base, extra) {
	const out = { ...base };
	for (const [key, value] of Object.entries(extra)) {
		const current = out[key];
		out[key] = value && typeof value === "object" && !Array.isArray(value) && current && typeof current === "object" && !Array.isArray(current) ? deepMerge(current, value) : value;
	}
	return out;
}
var datasetMeta = (dataset) => dataset;
/** Build a change pill (arrow plus signed text) as DOM, for tooltips. */
function changeElement(change) {
	const pill = document.createElement("span");
	pill.className = `change ${change.tone}`;
	if (change.direction) pill.insertAdjacentHTML("afterbegin", change.direction > 0 ? ARROW_UP : ARROW_DOWN);
	pill.append(document.createTextNode(change.text));
	return pill;
}
/**
* Shared behaviour for the Chart.js-backed chart elements: data preparation, theming
* from `--pk-chart-*` tokens, the HTML tooltip, legend, keyboard navigation, the data
* table (always present for screen readers, visible in table view) and the
* loading, empty and error states.
*
* @slot empty - Replaces the empty-state message.
* @slot error - Replaces the error-state message.
* @slot state-actions - Buttons shown in the error state, such as a retry action.
*
* @event pk-point-select - A point, bar, segment or stage was clicked or chosen with Enter. Detail: `{ index, row, series, value }`.
* @event pk-legend-toggle - A legend item hid or showed its series. Detail: `{ key, label, hidden }`.
* @event pk-view-change - The chart/table toggle changed the view. Detail: `{ view }`.
*
* @csspart base - Outer wrapper.
* @csspart toolbar - Legend and chart/table toggle row.
* @csspart legend - Legend group.
* @csspart body - Plot, table and state wrapper.
* @csspart plot - Chart drawing area.
* @csspart tooltip - Hover and keyboard tooltip.
* @csspart table - Data table wrapper.
* @csspart state - Loading, empty or error state panel.
*
* @cssproperty --pk-chart-height - Height of the drawing area. Defaults to 240px.
*
* @dependency pk-state-panel
* @dependency pk-spinner
*/
var PkChartElement = class extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.data = null;
		this.label = "";
		this.state = "";
		this.view = "chart";
		this.tableToggle = false;
		this.legend = "auto";
		this.locale = "";
		this.emptyHeading = "No data for this period";
		this.emptyMessage = "";
		this.errorHeading = "This chart couldn't be loaded";
		this.errorMessage = "";
		this.loadingLabel = "Loading chart";
		this.chartLabel = "Chart";
		this.tableLabel = "Table";
		this.viewLabel = "Show as";
		this.seriesLabel = "Series";
		this.description = "";
		this.tableAvailableLabel = "Data is available as a table.";
		this.totalLabel = "Total";
		this.hiddenKeys = /* @__PURE__ */ new Set();
		this.chart = null;
		this.activeIndex = -1;
		this.needsBuild = true;
		this.animateNext = true;
		this.hasAnimated = false;
		this.spokenTooltip = "";
	}
	static {
		this.styles = pkChartStyles;
	}
	buildLegend(_env, _data) {
		return [];
	}
	/** Derive element-specific fields from the data (folding, normalising, conversion rates). */
	prepare(data) {
		return data;
	}
	/** Content centred over the plot, such as a donut total. */
	renderOverlay() {
		return A;
	}
	/**
	* Whether the element draws its plot as HTML from `renderPlot()` instead of a Chart.js
	* canvas, as the funnel's `tracks` shape does. The table view, states and description
	* still come from this class; canvas tooltips and keyboard point navigation don't apply.
	*/
	get htmlPlot() {
		return false;
	}
	/** The plot's content when `htmlPlot` is true. */
	renderPlot() {
		return A;
	}
	/** Content after the plot, such as a side legend or funnel stage labels. */
	renderSupplement(_legend) {
		return A;
	}
	/** Where the legend renders: the toolbar above the plot, or the element's own supplement. */
	get legendInToolbar() {
		return true;
	}
	connectedCallback() {
		super.connectedCallback();
		this.needsBuild = true;
		if (this.hasUpdated) this.requestUpdate();
		this.stopThemeObserver = observeChartTheme(() => {
			this.animateNext = false;
			this.needsBuild = true;
			this.requestUpdate();
		});
	}
	disconnectedCallback() {
		this.stopThemeObserver?.();
		this.destroyChart();
		super.disconnectedCallback();
	}
	/** The live Chart.js instance is internal; use attributes and events instead. */
	get mode() {
		if (this.state === "error") return "error";
		if (this.state === "empty") return "empty";
		if (!Boolean(this.resolved && this.resolved.rows.length)) return this.state === "loading" ? "loading" : "empty";
		return "ready";
	}
	willUpdate(changed) {
		if ([...changed.keys()].some((key) => !PRESENTATION_PROPERTIES.has(key)) || !this.resolved && this.data) {
			this.resolved = this.data && Array.isArray(this.data.rows) && Array.isArray(this.data.cols) ? this.prepare({
				...this.data,
				cols: resolveColumns(this.data.cols)
			}) : void 0;
			this.needsBuild = true;
		}
		if (changed.has("data") && this.resolved && this.hiddenKeys.size) {
			const keys = this.legendKeys(this.resolved);
			const kept = [...this.hiddenKeys].filter((key) => keys.has(key));
			if (kept.length !== this.hiddenKeys.size) this.hiddenKeys = new Set(kept);
		}
		if (this.isConnected) this.env = readEnvironment(this, this.locale);
	}
	updated() {
		if (this.mode !== "ready" || this.htmlPlot) {
			this.destroyChart();
			return;
		}
		if (this.needsBuild || !this.chart) this.buildChart();
	}
	destroyChart() {
		this.chart?.destroy();
		this.chart = null;
		this.activeIndex = -1;
		this.tooltipElement?.classList.remove("visible");
	}
	buildChart() {
		if (!this.canvas || !this.resolved || !this.isConnected) return;
		const env = this.env ?? readEnvironment(this, this.locale);
		const animate = this.animateNext && !this.hasAnimated && !env.reducedMotion;
		const config = this.buildConfig(env, this.resolved);
		config.options = deepMerge({
			responsive: true,
			maintainAspectRatio: false,
			locale: env.locale,
			animation: animate ? {
				duration: 500,
				easing: "easeOutQuart"
			} : false,
			transitions: { active: { animation: { duration: 0 } } },
			interaction: {
				mode: "index",
				intersect: false
			},
			layout: { padding: { top: 6 } },
			plugins: { tooltip: {
				enabled: false,
				external: ({ tooltip }) => {
					this.drawTooltip(tooltip);
				}
			} },
			onClick: (event, elements) => {
				const { x, y } = event;
				const hit = x === null || y === null ? void 0 : elements.find((item) => item.element.inRange(x, y, true)) ?? [...elements].sort((a, b) => Math.hypot(a.element.x - x, a.element.y - y) - Math.hypot(b.element.x - x, b.element.y - y))[0];
				this.selectPoint(hit ? [hit] : elements);
			},
			onHover: (event, elements) => {
				const target = event.native?.target;
				if (target) target.style.cursor = elements.length ? "pointer" : "default";
			}
		}, config.options ?? {});
		config.plugins = [
			crosshairPlugin,
			valueLabelPlugin,
			...config.plugins ?? []
		];
		this.destroyChart();
		this.chart = new Chart(this.canvas, config);
		this.applyHidden(false);
		this.needsBuild = false;
		this.animateNext = true;
		this.hasAnimated = true;
	}
	/** Sync dataset visibility with the hidden legend keys. */
	applyHidden(update) {
		const chart = this.chart;
		if (!chart) return;
		chart.data.datasets.forEach((dataset, index) => {
			chart.setDatasetVisibility(index, !this.hiddenKeys.has(datasetMeta(dataset).pkKey));
		});
		if (update) chart.update();
	}
	/** Keys a legend item can hide for this data. Series ids plus the comparison key by default. */
	legendKeys(data) {
		return /* @__PURE__ */ new Set([...data.cols.slice(1).map((col) => col.id), "__comparison"]);
	}
	/** True when hiding a series changes the drawing itself (e.g. 100% stacks renormalise). */
	get rebuildOnLegendToggle() {
		return false;
	}
	/** Event detail for a selected point. Subclasses map folded or derived points back to data. */
	pointDetail(datasetIndex, index) {
		const dataset = this.chart?.data.datasets[datasetIndex];
		if (!dataset || !this.resolved) return null;
		const meta = datasetMeta(dataset);
		return {
			index,
			row: this.resolved.rows[index] ?? null,
			series: meta.pkKey,
			value: meta.pkRaw ? meta.pkRaw[index] : dataset.data[index]
		};
	}
	toggleLegend(item) {
		const hidden = new Set(this.hiddenKeys);
		const willHide = !hidden.has(item.key);
		if (willHide) hidden.add(item.key);
		else hidden.delete(item.key);
		this.hiddenKeys = hidden;
		if (this.rebuildOnLegendToggle) {
			this.animateNext = false;
			this.needsBuild = true;
		} else this.applyHidden(true);
		this.dispatchEvent(new PkLegendToggleEvent({
			key: item.key,
			label: item.label,
			hidden: willHide
		}));
	}
	setView(view) {
		if (view === this.view) return;
		this.view = view;
		this.dispatchEvent(new CustomEvent("pk-view-change", {
			detail: { view },
			bubbles: true,
			composed: true
		}));
	}
	drawTooltip(tooltip) {
		const box = this.tooltipElement;
		if (!box || !this.env || !this.resolved) return;
		const model = tooltip.opacity === 0 || !tooltip.dataPoints?.length ? null : this.buildTooltip(tooltip.dataPoints, this.env, this.resolved);
		if (!model) {
			box.classList.remove("visible");
			return;
		}
		const title = document.createElement("div");
		title.className = "tooltip-title";
		title.textContent = model.title;
		const children = [title];
		const spoken = [model.title];
		for (const row of model.rows) {
			const line = document.createElement("div");
			line.className = row.shape ? "tooltip-row" : "tooltip-row plain";
			if (row.shape) line.append(this.keyElement(row.shape, row.color ?? ""));
			const label = document.createElement("span");
			label.className = "tooltip-label";
			label.textContent = row.label;
			const value = document.createElement("span");
			value.className = "tooltip-value";
			value.textContent = row.value;
			line.append(label, value);
			if (row.change) line.append(document.createElement("span"), changeElement(row.change));
			children.push(line);
			spoken.push(`${row.label} ${row.value}${row.change ? `, ${row.change.text}` : ""}`);
		}
		if (model.footer) {
			const footer = document.createElement("div");
			footer.className = "tooltip-footer";
			const name = document.createElement("span");
			name.textContent = model.footer[0];
			const total = document.createElement("b");
			total.textContent = model.footer[1];
			footer.append(name, total);
			children.push(footer);
			spoken.push(model.footer.join(" "));
		}
		box.replaceChildren(...children);
		this.spokenTooltip = spoken.join(". ");
		box.classList.add("visible");
		const plot = this.plot;
		const width = box.offsetWidth;
		const height = box.offsetHeight;
		const gap = 14;
		let x = this.env.rtl ? tooltip.caretX - gap - width : tooltip.caretX + gap;
		if (x + width > plot.clientWidth) x = tooltip.caretX - gap - width;
		if (x < 0) x = Math.min(plot.clientWidth - width, tooltip.caretX + gap);
		const y = Math.max(0, Math.min(plot.clientHeight - height, tooltip.caretY - height / 2));
		box.style.transform = `translate(${Math.max(0, x)}px, ${y}px)`;
	}
	keyElement(shape, color) {
		const key = document.createElement("span");
		key.className = shape === "rect" ? "key" : `key ${shape}`;
		key.style.setProperty("--_key-color", color);
		return key;
	}
	pointCount() {
		return this.chart?.data.labels?.length ?? 0;
	}
	activeElementsAt(index) {
		const chart = this.chart;
		if (!chart) return [];
		return chart.data.datasets.map((_dataset, datasetIndex) => ({
			datasetIndex,
			index
		})).filter((item) => chart.isDatasetVisible(item.datasetIndex) && chart.data.datasets[item.datasetIndex].data[index] != null);
	}
	handleKeydown(event) {
		const count = this.pointCount();
		if (!count || !this.chart) return;
		const rtl = this.env?.rtl ?? false;
		const forward = rtl ? "ArrowLeft" : "ArrowRight";
		const back = rtl ? "ArrowRight" : "ArrowLeft";
		let index = this.activeIndex;
		switch (event.key) {
			case forward:
			case "ArrowDown":
				index = index < 0 ? 0 : Math.min(count - 1, index + 1);
				break;
			case back:
			case "ArrowUp":
				index = index < 0 ? count - 1 : Math.max(0, index - 1);
				break;
			case "Home":
				index = 0;
				break;
			case "End":
				index = count - 1;
				break;
			case "Escape":
				this.clearActive();
				return;
			case "Enter":
			case " ":
				if (index >= 0) {
					event.preventDefault();
					this.selectPoint(this.activeElementsAt(index));
				}
				return;
			default: return;
		}
		event.preventDefault();
		this.setActive(index);
	}
	setActive(index) {
		const chart = this.chart;
		const elements = this.activeElementsAt(index);
		this.activeIndex = index;
		if (!chart || !elements.length) {
			if (chart) {
				chart.setActiveElements([]);
				chart.tooltip?.setActiveElements([], {
					x: 0,
					y: 0
				});
				chart.update("none");
			}
			return;
		}
		const point = chart.getDatasetMeta(elements[0].datasetIndex).data[index];
		chart.setActiveElements(elements);
		chart.tooltip?.setActiveElements(elements, {
			x: point.x,
			y: point.y
		});
		chart.update("none");
		if (this.liveRegion) this.liveRegion.textContent = this.spokenTooltip;
	}
	clearActive() {
		if (!this.chart) return;
		this.activeIndex = -1;
		this.chart.setActiveElements([]);
		this.chart.tooltip?.setActiveElements([], {
			x: 0,
			y: 0
		});
		this.chart.update("none");
	}
	selectPoint(elements) {
		const first = elements[0];
		const detail = first ? this.pointDetail(first.datasetIndex, first.index) : null;
		if (detail) this.dispatchEvent(new PkPointSelectEvent(detail));
	}
	renderLegend(items, className = "legend") {
		if (!items.length) return A;
		return b`
            <div class=${className} part="legend" role="group" aria-label=${this.seriesLabel}>
                ${items.map((item) => b`
                    <button
                        type="button"
                        class="legend-item"
                        aria-pressed=${this.hiddenKeys.has(item.key) ? "false" : "true"}
                        @click=${() => this.toggleLegend(item)}
                    >
                        <span
                            class=${e({
			key: true,
			line: item.shape === "line",
			dash: item.shape === "dash"
		})}
                            style=${o({ "--_key-color": item.color })}
                        ></span>
                        <span class="legend-label">${item.label}</span>
                        ${item.value ? b`<span class="legend-value">${item.value}</span>` : A}
                        ${item.share ? b`<span class="legend-share">${item.share}</span>` : A}
                    </button>
                `)}
            </div>
        `;
	}
	renderTable() {
		if (!this.env || !this.resolved) return A;
		const model = this.buildTable(this.env, this.resolved);
		return b`
            <table>
                <caption>${this.label}</caption>
                <thead>
                    <tr>
                        ${model.head.map((cell) => b`<th scope="col" class=${cell.numeric ? "numeric" : ""}>${cell.text}</th>`)}
                    </tr>
                </thead>
                <tbody>
                    ${model.rows.map((row) => b`
                        <tr>
                            ${row.map((cell, index) => index === 0 ? b`<th scope="row">${cell}</th>` : b`<td class=${model.head[index]?.numeric ? "numeric" : ""}>${cell}</td>`)}
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
	}
	renderState(mode) {
		if (mode === "loading") return b`
                <pk-state-panel class="loading" part="state" size="sm" heading=${this.loadingLabel}>
                    <pk-spinner slot="icon" size="xs"></pk-spinner>
                </pk-state-panel>
            `;
		const error = mode === "error";
		const message = error ? this.errorMessage : this.emptyMessage;
		return b`
            <pk-state-panel
                part="state"
                size="sm"
                variant=${error ? "error" : "empty"}
                heading=${error ? this.errorHeading : this.emptyHeading}
                announce=${error ? "polite" : "off"}
            >
                <slot name=${mode}>${message ? b`<p>${message}</p>` : A}</slot>
                ${error ? b`<slot name="state-actions" slot="actions"></slot>` : A}
            </pk-state-panel>
        `;
	}
	render() {
		const mode = this.mode;
		const ready = mode === "ready";
		const table = this.view === "table";
		const legend = ready && this.env && this.resolved && this.legend !== "none" ? this.buildLegend(this.env, this.resolved) : [];
		const toolbarLegend = this.legendInToolbar && !table ? legend : [];
		const showToolbar = ready && (toolbarLegend.length > 0 || this.tableToggle);
		return b`
            <div
                part="base"
                class=${e({
			base: true,
			refreshing: ready && this.state === "loading"
		})}
                aria-busy=${this.state === "loading" ? "true" : "false"}
            >
                ${showToolbar ? b`
                    <div class="toolbar" part="toolbar">
                        ${this.renderLegend(toolbarLegend)}
                        ${this.tableToggle ? b`
                            <div class="toggle" role="group" aria-label=${this.viewLabel}>
                                <button type="button" aria-pressed=${table ? "false" : "true"} @click=${() => this.setView("chart")}>${this.chartLabel}</button>
                                <button type="button" aria-pressed=${table ? "true" : "false"} @click=${() => this.setView("table")}>${this.tableLabel}</button>
                            </div>
                        ` : A}
                    </div>
                ` : A}
                <div class="body" part="body">
                    <div
                        class=${e({
			plot: true,
			"html-plot": this.htmlPlot
		})}
                        part="plot"
                        role="img"
                        aria-roledescription="chart"
                        aria-label=${`${this.label}. ${this.tableAvailableLabel}`}
                        aria-describedby=${this.description ? "description" : A}
                        tabindex=${ready && !table && !this.htmlPlot ? "0" : "-1"}
                        ?hidden=${!ready || table}
                        @keydown=${this.handleKeydown}
                        @blur=${this.clearActive}
                    >
                        ${this.htmlPlot ? ready ? this.renderPlot() : A : b`
                            <canvas aria-hidden="true"></canvas>
                            <div class="overlay" aria-hidden="true">${ready ? this.renderOverlay() : A}</div>
                            <div class="tooltip" part="tooltip" aria-hidden="true"></div>
                        `}
                    </div>
                    ${ready && !table ? this.renderSupplement(legend) : A}
                    <div class=${table ? "table-wrap" : "table-wrap sr-only"} part="table" ?hidden=${!ready}>
                        ${ready ? this.renderTable() : A}
                    </div>
                    ${ready ? A : this.renderState(mode)}
                </div>
                ${this.description ? b`<p id="description" class="sr-only">${this.description}</p>` : A}
                <div class="live sr-only" aria-live="polite"></div>
            </div>
        `;
	}
};
__decorate([n({ type: Object })], PkChartElement.prototype, "data", void 0);
__decorate([n()], PkChartElement.prototype, "label", void 0);
__decorate([n({ reflect: true })], PkChartElement.prototype, "state", void 0);
__decorate([n({ reflect: true })], PkChartElement.prototype, "view", void 0);
__decorate([n({
	type: Boolean,
	attribute: "table-toggle",
	reflect: true
})], PkChartElement.prototype, "tableToggle", void 0);
__decorate([n()], PkChartElement.prototype, "legend", void 0);
__decorate([n()], PkChartElement.prototype, "locale", void 0);
__decorate([n({ attribute: "empty-heading" })], PkChartElement.prototype, "emptyHeading", void 0);
__decorate([n({ attribute: "empty-message" })], PkChartElement.prototype, "emptyMessage", void 0);
__decorate([n({ attribute: "error-heading" })], PkChartElement.prototype, "errorHeading", void 0);
__decorate([n({ attribute: "error-message" })], PkChartElement.prototype, "errorMessage", void 0);
__decorate([n({ attribute: "loading-label" })], PkChartElement.prototype, "loadingLabel", void 0);
__decorate([n({ attribute: "chart-label" })], PkChartElement.prototype, "chartLabel", void 0);
__decorate([n({ attribute: "table-label" })], PkChartElement.prototype, "tableLabel", void 0);
__decorate([n({ attribute: "view-label" })], PkChartElement.prototype, "viewLabel", void 0);
__decorate([n({ attribute: "series-label" })], PkChartElement.prototype, "seriesLabel", void 0);
__decorate([n()], PkChartElement.prototype, "description", void 0);
__decorate([n({ attribute: "table-available-label" })], PkChartElement.prototype, "tableAvailableLabel", void 0);
__decorate([n({ attribute: "total-label" })], PkChartElement.prototype, "totalLabel", void 0);
__decorate([r()], PkChartElement.prototype, "hiddenKeys", void 0);
__decorate([e$1("canvas")], PkChartElement.prototype, "canvas", void 0);
__decorate([e$1(".plot")], PkChartElement.prototype, "plot", void 0);
__decorate([e$1(".tooltip")], PkChartElement.prototype, "tooltipElement", void 0);
__decorate([e$1(".live")], PkChartElement.prototype, "liveRegion", void 0);
//#endregion
export { datasetMeta as n, pkChartStyles as r, PkChartElement as t };
