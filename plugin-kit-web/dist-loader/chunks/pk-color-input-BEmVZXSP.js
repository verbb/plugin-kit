import { c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement } from "./pk-base-BlxAYXJD.js";
import { t as MirrorValidator } from "./mirror-validator-DEz3BsbN.js";
import { t as RequiredValidator } from "./required-validator-DXqqPVeW.js";
//#region src/components/color-input/pk-color-input.styles.ts
/**
* Size scale matches pk-input (xs / sm / default / lg). Metrics are shifted so
* former `lg` (2.125rem / ~34px) is default — aligned with base input chrome.
* `xl` is kept as a deprecated alias of `lg`.
*/
var pkColorInputStyles = i`
    @layer pk-component {
        :host {
            display: inline-block;
            position: relative;
            /* Former lg min-width — default now matches input default chrome. */
            min-width: 6.75rem;
            font-family: var(--pk-font-family);
            vertical-align: middle;
        }

        :host([size='xs']) {
            min-width: 5.5rem;
        }

        :host([size='sm']) {
            min-width: 6.125rem;
        }

        :host([size='lg']),
        :host([size='xl']) {
            min-width: 7.375rem;
        }

        :host([fit-cell]) {
            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            height: 100%;
        }

        :host([fit-cell]) .root {
            display: block;
            width: 100%;
            height: 100%;
        }

        .root {
            position: relative;
            display: inline-block;
            width: 100%;
        }

        .swatch {
            position: absolute;
            top: 50%;
            left: 0.5rem;
            z-index: 2;
            width: 1.25rem;
            height: 1.25rem;
            transform: translateY(-50%);
            border-radius: var(--pk-radius-sm);
        }

        :host([size='xs']) .swatch {
            left: 0.375rem;
            width: 1rem;
            height: 1rem;
        }

        :host([size='sm']) .swatch {
            left: 0.375rem;
            width: 1.25rem;
            height: 1.25rem;
        }

        :host([size='lg']) .swatch,
        :host([size='xl']) .swatch {
            left: 0.5rem;
            width: 1.5rem;
            height: 1.5rem;
        }

        :host([fit-cell]) .swatch {
            left: 0.5rem;
            width: 1rem;
            height: 1rem;
        }

        .swatch-preview {
            position: absolute;
            inset: 0;
            border-radius: inherit;
            box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.15);
        }

        .swatch-preview.is-transparent {
            background-color: #fff;
            background-image:
                linear-gradient(45deg, #d1d5db 25%, transparent 25%),
                linear-gradient(-45deg, #d1d5db 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #d1d5db 75%),
                linear-gradient(-45deg, transparent 75%, #d1d5db 75%);
            background-size: 8px 8px;
            background-position: 0 0, 0 4px, 4px -4px, -4px 0;
        }

        .swatch-picker {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            border: 0;
            opacity: 0;
            cursor: pointer;
            appearance: none;
        }

        .swatch-picker:disabled {
            cursor: not-allowed;
        }

        .hash {
            position: absolute;
            top: 50%;
            left: 2.125rem;
            z-index: 1;
            transform: translateY(-50%);
            color: var(--pk-color-gray-300);
            font-family: var(--pk-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: var(--pk-font-size-mono, 0.9em);
            line-height: var(--pk-line-height-mono, 1.5);
            pointer-events: none;
            user-select: none;
        }

        :host([size='xs']) .hash {
            left: 1.625rem;
        }

        :host([size='sm']) .hash {
            left: 2rem;
        }

        :host([size='lg']) .hash,
        :host([size='xl']) .hash {
            left: 2.5rem;
        }

        :host([fit-cell]) .hash {
            left: 1.75rem;
        }

        .hex-input {
            display: block;
            width: 100%;
            /* Former lg — matches pk-input default chrome (~34px). */
            height: 2.125rem;
            margin: 0;
            padding-inline: 3rem 0.75rem;
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius);
            background: var(--pk-input-bg);
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: var(--pk-font-size-mono, 0.9em);
            line-height: var(--pk-line-height-mono, 1.5);
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease;
        }

        :host([size='xs']) .hex-input {
            height: 1.625rem;
            padding-inline: 2.25rem 0.625rem;
        }

        :host([size='sm']) .hex-input {
            height: 1.875rem;
            padding-inline: 2.75rem 0.75rem;
        }

        :host([size='lg']) .hex-input,
        :host([size='xl']) .hex-input {
            height: 2.375rem;
            padding-inline: 3.25rem 0.875rem;
        }

        :host([fit-cell]) .hex-input {
            width: 100%;
            max-width: 100%;
            height: 100%;
            padding-inline: 2.25rem 0.5rem;
            border: 0;
            border-radius: 0;
            background: transparent;
        }

        .hex-input:focus,
        .hex-input:focus-visible {
            border-color: var(--pk-color-sky-600);
            box-shadow: var(--pk-input-focus-shadow);
        }

        :host([invalid]) .hex-input:focus,
        :host([invalid]) .hex-input:focus-visible {
            border-color: var(--pk-color-rose-600);
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        :host([fit-cell]:not([invalid])) .hex-input:focus,
        :host([fit-cell]:not([invalid])) .hex-input:focus-visible {
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-200);
        }

        :host([fit-cell][invalid]) .hex-input,
        :host([fit-cell][invalid]) .hex-input:focus,
        :host([fit-cell][invalid]) .hex-input:focus-visible {
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }

        .hex-input:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        :host([invalid]) .hex-input {
            border-color: var(--pk-color-rose-600);
        }

        :host([disabled]) .swatch {
            opacity: 0.5;
        }
    }
`;
//#endregion
//#region src/components/color-input/pk-color-input.ts
var DEFAULT_COLOR = "#000000";
function sanitizeHex(value) {
	return String(value || "").replace(/^#/, "").replace(/[^0-9a-fA-F]/g, "").slice(0, 6).toLowerCase();
}
function isCompleteHex(value) {
	return value.length === 3 || value.length === 6;
}
function expandShortHex(value) {
	if (value.length !== 3) return value;
	return value.split("").map((char) => `${char}${char}`).join("");
}
function toPickerValue(hex) {
	if (hex.length === 6) return `#${hex}`;
	if (hex.length === 3) return `#${expandShortHex(hex)}`;
	return DEFAULT_COLOR;
}
var PkColorInput = class PkColorInput extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["blur", "input"];
		this.size = "default";
		this.fitCell = false;
		this.invalid = false;
		this.value = "";
		this.defaultValue = "";
		this.ariaLabel = null;
		this.hexValue = "";
	}
	static {
		this.styles = pkColorInputStyles;
	}
	static get validators() {
		return [
			...super.validators,
			MirrorValidator(),
			RequiredValidator()
		];
	}
	connectedCallback() {
		super.connectedCallback();
		this.syncHexFromValue();
	}
	willUpdate(changed) {
		if (changed.has("value")) this.syncHexFromValue();
		super.willUpdate(changed);
	}
	syncHexFromValue() {
		this.hexValue = sanitizeHex(this.value);
	}
	get validationTarget() {
		return this.input;
	}
	syncFormValue() {
		const submitted = this.hexValue ? `#${this.hexValue}` : "";
		this.setFormValue(submitted, submitted);
	}
	resetToDefaultValue() {
		this.value = this.defaultValue;
		this.hexValue = sanitizeHex(this.defaultValue);
	}
	restoreFormState(state) {
		if (typeof state === "string") {
			this.value = state;
			this.hexValue = sanitizeHex(state);
		}
	}
	emitChange() {
		const next = this.hexValue ? `#${this.hexValue}` : "";
		this.value = next;
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { value: next },
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	handleHexInput(event) {
		const nextHex = sanitizeHex(event.target.value);
		this.hexValue = nextHex;
		this.emitChange();
	}
	handlePickerChange(event) {
		const nextHex = sanitizeHex(event.target.value);
		this.hexValue = nextHex;
		this.emitChange();
	}
	render() {
		const previewColor = toPickerValue(this.hexValue);
		const isTransparent = !isCompleteHex(this.hexValue);
		return b`
            <div class="root">
                <div part="swatch" class="swatch">
                    <div
                        class=${e({
			"swatch-preview": true,
			"is-transparent": isTransparent
		})}
                        style=${isTransparent ? A : `background-color: ${previewColor}`}
                    ></div>
                    <input
                        part="picker"
                        class="swatch-picker"
                        type="color"
                        .value=${previewColor}
                        ?disabled=${this.disabled}
                        aria-label="Color picker"
                        @input=${this.handlePickerChange}
                    />
                </div>
                <span class="hash" aria-hidden="true">#</span>
                <input
                    part="input"
                    class="hex-input"
                    type="text"
                    inputmode="text"
                    autocomplete="off"
                    maxlength="6"
                    .value=${this.hexValue}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    aria-label=${this.ariaLabel ?? A}
                    aria-invalid=${this.invalid ? "true" : A}
                    @input=${this.handleHexInput}
                />
            </div>
        `;
	}
};
__decorate([n({ reflect: true })], PkColorInput.prototype, "size", void 0);
__decorate([n({
	type: Boolean,
	reflect: true,
	attribute: "fit-cell"
})], PkColorInput.prototype, "fitCell", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkColorInput.prototype, "invalid", void 0);
__decorate([n()], PkColorInput.prototype, "value", void 0);
__decorate([n({ attribute: "default-value" })], PkColorInput.prototype, "defaultValue", void 0);
__decorate([n({ attribute: "aria-label" })], PkColorInput.prototype, "ariaLabel", void 0);
__decorate([e$1(".hex-input")], PkColorInput.prototype, "input", void 0);
__decorate([r()], PkColorInput.prototype, "hexValue", void 0);
PkColorInput = __decorate([t("pk-color-input")], PkColorInput);
//#endregion
export { PkColorInput as t };
