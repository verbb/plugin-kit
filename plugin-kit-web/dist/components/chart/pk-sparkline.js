import { i as customElement, n as PkElement, t as __decorate } from "../../chunks/decorate-Br_PE9pq.js";
import { n as query, t as property } from "../../chunks/decorators-BkErmuYK.js";
import { a as observeChartTheme, o as readEnvironment, t as areaGradient } from "../../chunks/shared-CZaI81TK.js";
import { css, html } from "lit";
import { CategoryScale, Chart, Filler, LineController, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { createFormatter } from "@verbb/plugin-kit-core/utils/format";
//#region src/components/chart/pk-sparkline.ts
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip);
/** Accepts a JSON array or a comma-separated list. */
var listConverter = { fromAttribute(value) {
	if (!value) return [];
	const trimmed = value.trim();
	if (trimmed.startsWith("[")) try {
		return JSON.parse(trimmed);
	} catch {
		return [];
	}
	return trimmed.split(",").map((item) => item.trim());
} };
var toNumbers = (values) => values.map((value) => {
	const number = value === null || value === "" ? NaN : Number(value);
	return Number.isFinite(number) ? number : null;
});
var PkSparkline = class PkSparkline extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.values = [];
		this.dates = [];
		this.bucket = "day";
		this.format = "number";
		this.currency = "";
		this.color = 1;
		this.label = "";
		this.locale = "";
		this.toLabel = "to";
		this.highLabel = "high";
		this.lowLabel = "low";
		this.chart = null;
		this.animateNext = true;
		this.hasAnimated = false;
	}
	static {
		this.styles = css`
        @layer pk-component {
            :host {
                position: relative;
                display: block;
                min-width: 60px;
                height: var(--pk-sparkline-height, 32px);
            }

            .base {
                position: relative;
                width: 100%;
                height: 100%;
            }

            canvas {
                display: block;
            }

            .tooltip {
                position: absolute;
                z-index: 3;
                top: 0;
                left: 0;
                padding: 3px 7px;
                border-radius: var(--pk-radius-md);
                background: var(--pk-chart-tooltip-background);
                box-shadow: var(--pk-chart-tooltip-shadow);
                color: var(--pk-chart-text);
                font: 600 11px/1.3 var(--pk-font-family);
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
            }

            .tooltip.visible {
                opacity: 1;
            }

            .tooltip span {
                margin-inline-start: 6px;
                color: var(--pk-chart-text-muted);
                font-weight: 400;
            }
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.hasUpdated) this.requestUpdate();
		this.stopThemeObserver = observeChartTheme(() => {
			this.animateNext = false;
			this.build();
		});
	}
	disconnectedCallback() {
		this.stopThemeObserver?.();
		this.chart?.destroy();
		this.chart = null;
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.size && [...changed.keys()].some((key) => key !== "label")) this.build();
		else if (!this.chart) this.build();
	}
	summary(values) {
		const present = values.filter((value) => value !== null);
		if (!present.length) return this.label;
		const env = readEnvironment(this, this.locale);
		const format = createFormatter({
			type: this.format,
			currency: this.currency || void 0
		}, { locale: env.locale });
		return `${this.label}: ${format(present[0])} ${this.toLabel} ${format(present[present.length - 1])}, ${this.highLabel} ${format(Math.max(...present))}, ${this.lowLabel} ${format(Math.min(...present))}`;
	}
	build() {
		this.chart?.destroy();
		this.chart = null;
		const values = toNumbers(this.values);
		if (!this.canvas || !this.isConnected || !values.length) return;
		const env = readEnvironment(this, this.locale);
		const color = env.theme.series[(Math.max(1, this.color) - 1) % env.theme.series.length];
		const format = createFormatter({
			type: this.format,
			currency: this.currency || void 0
		}, { locale: env.locale });
		const dateFormat = createFormatter({
			type: "date",
			bucket: this.bucket
		}, {
			context: "axis",
			locale: env.locale
		});
		const present = values.filter((value) => value !== null);
		if (!present.length) return;
		const low = Math.min(...present);
		const high = Math.max(...present);
		const pad = (high - low) * .08 || Math.abs(high) * .08 || 1;
		const last = values.length - 1;
		const animate = this.animateNext && !this.hasAnimated && !env.reducedMotion;
		this.chart = new Chart(this.canvas, {
			type: "line",
			data: {
				labels: values.map((_value, index) => index),
				datasets: [{
					data: values,
					borderColor: color,
					borderWidth: 1.5,
					tension: .3,
					cubicInterpolationMode: "monotone",
					fill: "origin",
					backgroundColor: (context) => areaGradient(color, .18)(context),
					pointRadius: (context) => context.dataIndex === last ? 2.5 : 0,
					pointBackgroundColor: color,
					pointBorderWidth: 0,
					pointHoverRadius: 3,
					pointHitRadius: 8
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: animate ? { duration: 450 } : false,
				transitions: { active: { animation: { duration: 0 } } },
				layout: { padding: {
					top: 3,
					bottom: 1,
					left: 3,
					right: 3
				} },
				interaction: {
					mode: "index",
					intersect: false
				},
				scales: {
					x: {
						display: false,
						reverse: env.rtl
					},
					y: {
						display: false,
						min: low - pad,
						max: high + pad
					}
				},
				plugins: { tooltip: {
					enabled: false,
					external: ({ tooltip }) => this.drawTooltip(tooltip, values, format, dateFormat)
				} }
			},
			plugins: [Filler]
		});
		this.animateNext = true;
		this.hasAnimated = true;
	}
	drawTooltip(tooltip, values, format, dateFormat) {
		const box = this.tooltipElement;
		if (!box) return;
		if (tooltip.opacity === 0 || !tooltip.dataPoints?.length) {
			box.classList.remove("visible");
			return;
		}
		const index = tooltip.dataPoints[0].dataIndex;
		box.replaceChildren(document.createTextNode(format(values[index])));
		if (this.dates[index] !== void 0) {
			const date = document.createElement("span");
			date.textContent = dateFormat(this.dates[index]);
			box.append(date);
		}
		box.classList.add("visible");
		const width = box.offsetWidth;
		const x = Math.max(0, Math.min(this.clientWidth - width, tooltip.caretX - width / 2));
		box.style.transform = `translate(${x}px, ${-box.offsetHeight - 4}px)`;
	}
	render() {
		return html`
            <div class="base" part="base" role="img" aria-label=${this.summary(toNumbers(this.values))}>
                <canvas aria-hidden="true"></canvas>
                <div class="tooltip" part="tooltip" aria-hidden="true"></div>
            </div>
        `;
	}
};
__decorate([property({ converter: listConverter })], PkSparkline.prototype, "values", void 0);
__decorate([property({ converter: listConverter })], PkSparkline.prototype, "dates", void 0);
__decorate([property()], PkSparkline.prototype, "bucket", void 0);
__decorate([property()], PkSparkline.prototype, "format", void 0);
__decorate([property()], PkSparkline.prototype, "currency", void 0);
__decorate([property({ type: Number })], PkSparkline.prototype, "color", void 0);
__decorate([property()], PkSparkline.prototype, "label", void 0);
__decorate([property()], PkSparkline.prototype, "locale", void 0);
__decorate([property({ attribute: "to-label" })], PkSparkline.prototype, "toLabel", void 0);
__decorate([property({ attribute: "high-label" })], PkSparkline.prototype, "highLabel", void 0);
__decorate([property({ attribute: "low-label" })], PkSparkline.prototype, "lowLabel", void 0);
__decorate([query("canvas")], PkSparkline.prototype, "canvas", void 0);
__decorate([query(".tooltip")], PkSparkline.prototype, "tooltipElement", void 0);
PkSparkline = __decorate([customElement("pk-sparkline")], PkSparkline);
//#endregion
export { PkSparkline };

//# sourceMappingURL=pk-sparkline.js.map