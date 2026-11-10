import { c as n, h as i, l as customElement, m as b, p as A, t as o, u as o$1 } from "../../chunks/lit-6rz1jOzS.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BZKcPYjM.js";
import { t as createFormatter } from "../../chunks/format-gF_xvdEf.js";
import { n as resolveHostLocale } from "../../chunks/host-date-Df90G3ns.js";
//#region src/components/chart/pk-meter.ts
var WARNING_ICON = "<svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><path d=\"M10 2l8.5 15h-17zm-.9 5v5h1.8V7zm0 6.5v1.8h1.8v-1.8z\"/></svg>";
var PkMeter = class PkMeter extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.value = 0;
		this.min = 0;
		this.max = 1;
		this.low = null;
		this.high = null;
		this.optimum = null;
		this.format = "number";
		this.currency = "";
		this.label = "";
		this.showValue = false;
		this.locale = "";
		this.warningLabel = "outside the expected range";
		this.dangerLabel = "well outside the expected range";
	}
	static {
		this.styles = i`
        @layer pk-component {
            :host {
                display: block;
                min-width: 80px;
                font-family: var(--pk-font-family);
            }

            .base {
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .track {
                flex: 1;
                height: 6px;
                overflow: hidden;
                border-radius: 3px;
                background: color-mix(in srgb, var(--_meter-color) 16%, var(--pk-chart-surface));
            }

            .fill {
                display: block;
                height: 100%;
                border-radius: 3px;
                background: var(--_meter-color);
            }

            .value {
                display: inline-flex;
                gap: 4px;
                align-items: center;
                justify-content: flex-end;
                min-width: 4.2em;
                color: var(--pk-chart-text);
                font-size: 12px;
                font-variant-numeric: tabular-nums;
            }

            .value svg {
                width: 11px;
                height: 11px;
                fill: var(--_meter-color);
            }

            .ok {
                --_meter-color: var(--pk-chart-meter-ok);
            }

            .warning {
                --_meter-color: var(--pk-chart-meter-warning);
            }

            .danger {
                --_meter-color: var(--pk-chart-meter-danger);
            }
        }
    `;
	}
	/** Regions as in HTML `<meter>`: below `low`, between, above `high`, ranked by distance from the optimum's region. */
	get tone() {
		if (this.low === null && this.high === null) return "ok";
		const low = this.low ?? this.min;
		const high = this.high ?? this.max;
		const optimum = this.optimum ?? (this.min + this.max) / 2;
		const region = (value) => value < low ? 0 : value > high ? 2 : 1;
		return [
			"ok",
			"warning",
			"danger"
		][Math.abs(region(this.clamped) - region(optimum))];
	}
	get clamped() {
		return Math.min(this.max, Math.max(this.min, Number(this.value) || 0));
	}
	render() {
		const tone = this.tone;
		const value = this.clamped;
		const range = this.max - this.min || 1;
		const text = createFormatter({
			type: this.format,
			currency: this.currency || void 0
		}, { locale: this.locale || resolveHostLocale() })(value);
		const status = tone === "warning" ? `, ${this.warningLabel}` : tone === "danger" ? `, ${this.dangerLabel}` : "";
		return b`
            <div
                class="base ${tone}"
                part="base"
                role="meter"
                aria-label=${this.label}
                aria-valuemin=${this.min}
                aria-valuemax=${this.max}
                aria-valuenow=${value}
                aria-valuetext=${`${text}${status}`}
            >
                <span class="track" part="track"><span class="fill" part="fill" style=${o({ width: `${(value - this.min) / range * 100}%` })}></span></span>
                ${this.showValue || tone !== "ok" ? b`
                    <span class="value" part="value" aria-hidden="true">
                        ${tone === "ok" ? A : o$1(WARNING_ICON)}${this.showValue ? text : A}
                    </span>
                ` : A}
            </div>
        `;
	}
};
__decorate([n({ type: Number })], PkMeter.prototype, "value", void 0);
__decorate([n({ type: Number })], PkMeter.prototype, "min", void 0);
__decorate([n({ type: Number })], PkMeter.prototype, "max", void 0);
__decorate([n({ type: Number })], PkMeter.prototype, "low", void 0);
__decorate([n({ type: Number })], PkMeter.prototype, "high", void 0);
__decorate([n({ type: Number })], PkMeter.prototype, "optimum", void 0);
__decorate([n()], PkMeter.prototype, "format", void 0);
__decorate([n()], PkMeter.prototype, "currency", void 0);
__decorate([n()], PkMeter.prototype, "label", void 0);
__decorate([n({
	type: Boolean,
	attribute: "show-value",
	reflect: true
})], PkMeter.prototype, "showValue", void 0);
__decorate([n()], PkMeter.prototype, "locale", void 0);
__decorate([n({ attribute: "warning-label" })], PkMeter.prototype, "warningLabel", void 0);
__decorate([n({ attribute: "danger-label" })], PkMeter.prototype, "dangerLabel", void 0);
PkMeter = __decorate([customElement("pk-meter")], PkMeter);
//#endregion
export { PkMeter };
