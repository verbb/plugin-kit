import { c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, r as checkboxControlStyles } from "./pk-base-BlxAYXJD.js";
import { t as RequiredValidator } from "./required-validator-0XwZtX9k.js";
import { t as HasSlotController } from "./has-slot-BGJeJdHr.js";
//#region src/icons/checkbox-indicators.ts
/** Craft checkbox tick — matches plugin-kit-react Checkbox.tsx */
function renderCheckboxCheckIcon() {
	return b`
        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" viewBox="0 0 640 640">
            <path
                fill="currentColor"
                d="M557.5 192L534.9 214.6L278.9 470.6C266.4 483.1 246.1 483.1 233.6 470.6L105.6 342.6L83 320L128.3 274.7C129.6 276 172.3 318.7 256.3 402.7L489.7 169.3L512.3 146.7L557.6 192z"
            />
        </svg>
    `;
}
/** Craft checkbox indeterminate mark — matches plugin-kit-react Checkbox.tsx */
function renderCheckboxIndeterminateIcon() {
	return b`
        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" viewBox="0 0 640 640">
            <path fill="currentColor" d="M96 352V288H544V352H96z" />
        </svg>
    `;
}
var pkCheckboxStyles = [checkboxControlStyles, i`
    @layer pk-component {
        :host {
            display: inline-flex;
            vertical-align: middle;
            /* Hit target is the content-sized .root label (Craft checkbox-select), not the host. */
            cursor: default;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        :host([disabled]) {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .root {
            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: flex-start;
            gap: var(--pk-control-label-gap);
            /* Content-sized like Craft's <label> beside the checkbox — not full-row. */
            width: fit-content;
            max-width: 100%;
            margin: 0;
            min-height: 0;
            cursor: pointer;
            user-select: none;
            position: relative;
        }

        :host([disabled]) .root {
            cursor: not-allowed;
        }

        .root--with-hint {
            align-items: flex-start;
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

        .text {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            min-width: 0;
        }

        .label {
            line-height: max(1rem, var(--pk-checkbox-size));
            /* Match form-control / Craft body labels (gray-700), not gray-900. */
            color: var(--pk-color-gray-700);
            cursor: pointer;
        }

        :host([disabled]) .label {
            cursor: not-allowed;
        }

        :host(.all-option) .label {
            font-weight: 700;
        }

        .hint {
            margin: 0;
            color: var(--pk-color-gray-500);
            font-size: var(--pk-font-size-sm);
            line-height: var(--pk-line-height);
        }

        .hint:empty {
            display: none;
        }
    }
`];
//#endregion
//#region src/components/checkbox/pk-checkbox.ts
var PkCheckbox = class PkCheckbox extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["change"];
		this.hasSlotController = new HasSlotController(this, "hint");
		this.checked = false;
		this.indeterminate = false;
		this.disabled = false;
		this.invalid = false;
		this.checkboxValue = "on";
		this.defaultChecked = false;
		this.ariaLabel = null;
		this.hint = "";
		this.withHint = false;
		this.hasDefaultSlotContent = false;
	}
	static {
		this.shadowRootOptions = {
			mode: "open",
			delegatesFocus: true
		};
	}
	static {
		this.styles = pkCheckboxStyles;
	}
	static get validators() {
		return [...super.validators, RequiredValidator({ validationProperty: "checked" })];
	}
	get validationTarget() {
		return this.input;
	}
	syncFormValue() {
		this.setFormValue(this.checked ? this.checkboxValue : null, this.checked ? "on" : "off");
	}
	resetToDefaultValue() {
		this.checked = this.defaultChecked;
		this.indeterminate = false;
	}
	restoreFormState(state) {
		if (state === "on" || state === this.checkboxValue) this.checked = true;
		else this.checked = false;
	}
	updated(changed) {
		if (!this.input) {
			super.updated(changed);
			return;
		}
		if (changed.has("indeterminate") || changed.has("checked")) {
			this.input.indeterminate = this.indeterminate;
			this.input.checked = this.checked;
		}
		super.updated(changed);
	}
	defaultSlotChanged(event) {
		const slot = event.target;
		this.hasDefaultSlotContent = slot.assignedNodes({ flatten: true }).some((node) => {
			if (node.nodeType === Node.TEXT_NODE) return node.textContent?.trim();
			return node.nodeType === Node.ELEMENT_NODE;
		});
	}
	handleChange(event) {
		const input = event.target;
		this.checked = input.checked;
		this.indeterminate = false;
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { checked: this.checked },
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
	render() {
		const hasLabel = this.hasDefaultSlotContent;
		const hasHint = Boolean(this.hint) || this.hasSlotController.test("hint", this.withHint);
		return b`
            <label
                part="base"
                class=${e({
			root: true,
			"root--with-hint": hasHint
		})}
            >
                <input
                    part="input"
                    class="input"
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    name=${this.name ?? A}
                    value=${this.checkboxValue}
                    aria-labelledby=${hasLabel ? "label" : A}
                    aria-describedby=${hasHint ? "hint" : A}
                    aria-label=${!hasLabel ? this.ariaLabel ?? A : A}
                    aria-invalid=${this.invalid ? "true" : A}
                    @change=${this.handleChange}
                />
                <span part="control" class="control">
                    <span part="checked-icon" class="icon-check">${renderCheckboxCheckIcon()}</span>
                    <span part="indeterminate-icon" class="icon-indeterminate">${renderCheckboxIndeterminateIcon()}</span>
                </span>
                ${hasLabel || hasHint ? b`
                        <span class="text">
                            ${hasLabel ? b`
                                    <span part="label" class="label" id="label">
                                        <slot @slotchange=${this.defaultSlotChanged}></slot>
                                    </span>
                                ` : b`<slot @slotchange=${this.defaultSlotChanged} hidden></slot>`}
                            ${hasHint ? b`
                                    <span part="hint" class="hint" id="hint">
                                        <slot name="hint">${this.hint}</slot>
                                    </span>
                                ` : A}
                        </span>
                    ` : b`<slot @slotchange=${this.defaultSlotChanged} hidden></slot>`}
            </label>
        `;
	}
};
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCheckbox.prototype, "checked", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCheckbox.prototype, "indeterminate", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCheckbox.prototype, "disabled", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCheckbox.prototype, "invalid", void 0);
__decorate([n()], PkCheckbox.prototype, "checkboxValue", void 0);
__decorate([n({
	attribute: "default-checked",
	type: Boolean
})], PkCheckbox.prototype, "defaultChecked", void 0);
__decorate([n({ attribute: "aria-label" })], PkCheckbox.prototype, "ariaLabel", void 0);
__decorate([n()], PkCheckbox.prototype, "hint", void 0);
__decorate([n({
	type: Boolean,
	attribute: "with-hint"
})], PkCheckbox.prototype, "withHint", void 0);
__decorate([e$1(".input")], PkCheckbox.prototype, "input", void 0);
__decorate([r()], PkCheckbox.prototype, "hasDefaultSlotContent", void 0);
PkCheckbox = __decorate([t("pk-checkbox")], PkCheckbox);
//#endregion
export { PkCheckbox as t };
