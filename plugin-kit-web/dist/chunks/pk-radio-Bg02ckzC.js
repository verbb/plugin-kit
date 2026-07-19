import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { css, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { customElement, property, query, state } from "lit/decorators.js";
//#region src/components/radio-group/pk-radio.styles.ts
var pkRadioStyles = css`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        :host([disabled]) {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .item {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            user-select: none;
            position: relative;
            margin: 0;
        }

        :host([disabled]) .item {
            cursor: not-allowed;
        }

        .item--with-label {
            gap: 0.5rem;
        }

        .control {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1rem;
            height: 1rem;
            border: 1px solid var(--pk-color-slate-400);
            border-radius: 9999px;
            background: var(--pk-color-white);
            transition: border-color 0.12s ease, box-shadow 0.12s ease;
        }

        .item:focus-visible .control,
        :host([data-focus-visible]) .control {
            border-color: var(--pk-color-sky-600);
            box-shadow: 0 0 0 1px var(--pk-color-sky-600), 0 0 4px 0 hsl(from var(--pk-color-sky-600) h s l / 0.7);
        }

        :host([invalid]) .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]:focus-visible) .control,
        :host([invalid][data-focus-visible]) .control {
            box-shadow: 0 0 0 1px var(--pk-color-rose-600), 0 0 4px 0 hsl(from var(--pk-color-rose-600) h s l / 0.7);
        }

        :host([checked]) .control {
            background: var(--pk-color-gray-50);
            color: #1f2933;
        }

        .indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            color: currentcolor;
        }

        .indicator-dot {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 9999px;
            background: currentcolor;
            transition: opacity 0.12s ease, transform 0.12s ease;
        }

        :host(:not([checked])) .indicator-dot {
            opacity: 0;
            transform: scale(0);
        }

        .input {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
            opacity: 0;
            appearance: none;
        }

        .label {
            line-height: var(--pk-line-height);
            /* Match checkbox / form-control labels (gray-700). */
            color: var(--pk-color-gray-700);
        }

        .label.is-empty {
            display: none;
        }
    }
`;
//#endregion
//#region src/components/radio-group/pk-radio.ts
var PkRadio = class PkRadio extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.checked = false;
		this.disabled = false;
		this.invalid = false;
		this.required = false;
		this.tabIndex = -1;
		this.ariaLabel = null;
		this.forceDisabled = false;
		this.hasDefaultSlotContent = false;
	}
	static {
		this.styles = pkRadioStyles;
	}
	updated(changed) {
		if (this.input && changed.has("checked")) this.input.checked = this.checked;
		if (this.input && changed.has("tabIndex")) this.input.tabIndex = this.tabIndex;
	}
	focusControl(options) {
		this.input.focus(options);
	}
	defaultSlotChanged(event) {
		const slot = event.target;
		this.hasDefaultSlotContent = slot.assignedNodes({ flatten: true }).some((node) => {
			if (node.nodeType === Node.TEXT_NODE) return node.textContent?.trim();
			return node.nodeType === Node.ELEMENT_NODE;
		});
	}
	handleChange(event) {
		event.stopPropagation();
		const input = event.target;
		if (this.disabled || this.forceDisabled || !input.checked) return;
		this.dispatchEvent(new CustomEvent("pk-radio-select", {
			detail: { value: this.value },
			bubbles: true,
			composed: true
		}));
	}
	render() {
		const isDisabled = this.disabled || this.forceDisabled;
		return html`
            <label
                part="base"
                class=${classMap({
			item: true,
			"pk-radio-group__item": true,
			"item--with-label": this.hasDefaultSlotContent
		})}
                data-state=${this.checked ? "checked" : nothing}
                ?data-disabled=${isDisabled}
                aria-disabled=${isDisabled ? "true" : nothing}
            >
                <span part="control" class="control pk-radio-group__control">
                    <span part="indicator" class="indicator pk-radio-group__indicator">
                        <span class="indicator-dot pk-radio-group__indicator-dot"></span>
                    </span>
                </span>
                <input
                    part="input"
                    class="input"
                    type="radio"
                    .checked=${this.checked}
                    ?disabled=${isDisabled}
                    ?required=${this.required}
                    value=${this.value}
                    tabindex=${this.tabIndex}
                    aria-label=${this.ariaLabel ?? nothing}
                    aria-invalid=${this.invalid ? "true" : nothing}
                    aria-checked=${this.checked ? "true" : "false"}
                    @change=${this.handleChange}
                />
                <span
                    class=${classMap({
			label: true,
			"is-empty": !this.hasDefaultSlotContent
		})}
                >
                    <slot @slotchange=${this.defaultSlotChanged}></slot>
                </span>
            </label>
        `;
	}
};
__decorate([property()], PkRadio.prototype, "value", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkRadio.prototype, "checked", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkRadio.prototype, "disabled", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkRadio.prototype, "invalid", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkRadio.prototype, "required", void 0);
__decorate([property({ type: Number })], PkRadio.prototype, "tabIndex", void 0);
__decorate([property({ attribute: "aria-label" })], PkRadio.prototype, "ariaLabel", void 0);
__decorate([property({
	type: Boolean,
	attribute: false
})], PkRadio.prototype, "forceDisabled", void 0);
__decorate([query(".input")], PkRadio.prototype, "input", void 0);
__decorate([state()], PkRadio.prototype, "hasDefaultSlotContent", void 0);
PkRadio = __decorate([customElement("pk-radio")], PkRadio);
//#endregion
export { PkRadio as t };

//# sourceMappingURL=pk-radio-Bg02ckzC.js.map