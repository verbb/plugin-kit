import { c as r, f as A, i as e, l as n, m as i, p as b, s as e$1, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, n as formControlStyles } from "../../chunks/pk-base-BlxAYXJD.js";
import { t as RequiredValidator } from "../../chunks/required-validator-0XwZtX9k.js";
import { t as HasSlotController } from "../../chunks/has-slot-BGJeJdHr.js";
import { n as readLegacyInstructions, t as hasInstructionContent } from "../../chunks/field-labels-D3lKQ2nq.js";
//#region src/components/radio-group/pk-radio-group.styles.ts
var pkRadioGroupStyles = i`
    @layer pk-component {
        :host {
            display: block;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .group {
            display: grid;
            gap: 0.375rem;
        }

        .group--horizontal {
            grid-auto-flow: column;
            grid-auto-columns: max-content;
            align-items: center;
        }
    }
`;
//#endregion
//#region src/components/radio-group/pk-radio-group.ts
var PkRadioGroup = class PkRadioGroup extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["change"];
		this.hasSlotController = new HasSlotController(this, "instructions", "hint", "label");
		this._value = null;
		this.defaultValue = "";
		this.orientation = "vertical";
		this.invalid = false;
		this.label = "";
		this.instructions = "";
		this.ariaLabel = null;
		this.items = [];
		this.syncItems = () => {
			this.items = this.getAllRadios();
			this.applySelection();
		};
		this.handleRadioClick = (event) => {
			const clickedRadio = event.target.closest("pk-radio");
			if (!clickedRadio || clickedRadio.disabled || clickedRadio.forceDisabled || this.disabled) return;
			const oldValue = this.value;
			this.value = clickedRadio.value;
			this.applySelection();
			if (this.value !== oldValue) this.emitValueChange();
		};
		this.handleKeyDown = (event) => {
			if (![
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight",
				" ",
				"Home",
				"End"
			].includes(event.key) || this.disabled) return;
			const radios = this.getEnabledItems();
			if (radios.length === 0) return;
			event.preventDefault();
			const oldValue = this.value;
			const checkedRadio = radios.find((radio) => radio.checked) ?? radios[0];
			let index = radios.indexOf(checkedRadio);
			if (event.key === " ") {} else if (event.key === "Home") index = 0;
			else if (event.key === "End") index = radios.length - 1;
			else {
				const increment = ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
				index += increment;
				if (index < 0) index = radios.length - 1;
				if (index >= radios.length) index = 0;
			}
			this.value = radios[index].value;
			this.applySelection();
			radios[index].focusControl();
			if (this.value !== oldValue) this.emitValueChange();
		};
	}
	static {
		this.shadowRootOptions = {
			mode: "open",
			delegatesFocus: true
		};
	}
	static {
		this.styles = [formControlStyles, pkRadioGroupStyles];
	}
	static get validators() {
		return [...super.validators, RequiredValidator()];
	}
	get value() {
		if (this.valueHasChanged) return this._value ?? "";
		return this._value ?? this.defaultValue ?? "";
	}
	set value(val) {
		this._value = val == null ? null : String(val);
		this.valueHasChanged = true;
	}
	syncFormValue() {
		this.setFormValue(this.value || null);
	}
	resetToDefaultValue() {
		this._value = null;
		this.applySelection();
	}
	restoreFormState(state) {
		if (typeof state === "string") {
			this.value = state;
			this.applySelection();
		}
	}
	get validationTarget() {
		return this.getAllRadios().find((item) => !item.disabled) ?? this.getAllRadios()[0];
	}
	connectedCallback() {
		this.instructions = readLegacyInstructions(this, this.instructions);
		super.connectedCallback();
		this.addEventListener("keydown", this.handleKeyDown);
		this.addEventListener("click", this.handleRadioClick);
	}
	disconnectedCallback() {
		this.removeEventListener("keydown", this.handleKeyDown);
		this.removeEventListener("click", this.handleRadioClick);
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("value") || changed.has("disabled") || changed.has("invalid") || changed.has("name")) this.applySelection();
		super.updated(changed);
	}
	formResetCallback() {
		this._value = null;
		super.formResetCallback();
		this.applySelection();
	}
	focus(options) {
		if (this.disabled) return;
		const radios = this.getEnabledItems();
		(radios.find((radio) => radio.checked) ?? radios[0])?.focusControl(options);
	}
	getAllRadios() {
		return [...this.querySelectorAll("pk-radio")];
	}
	getEnabledItems() {
		return this.items.filter((item) => !item.disabled && !this.disabled);
	}
	applySelection() {
		const radios = this.getAllRadios();
		this.items = radios;
		const enabled = this.getEnabledItems();
		const checkedRadio = enabled.find((item) => item.value === this.value);
		for (const item of radios) {
			const checked = item.value === this.value;
			const itemDisabled = item.hasAttribute("disabled") || item.disabled && !item.forceDisabled;
			item.checked = checked;
			item.disabled = this.disabled || itemDisabled;
			item.invalid = this.invalid;
			item.required = this.required;
			item.forceDisabled = this.disabled;
		}
		if (this.disabled) {
			for (const item of radios) item.tabIndex = -1;
			return;
		}
		if (checkedRadio) for (const item of enabled) item.tabIndex = item.checked ? 0 : -1;
		else if (enabled.length > 0) enabled.forEach((item, index) => {
			item.tabIndex = index === 0 ? 0 : -1;
		});
		for (const item of radios.filter((radio) => radio.disabled)) item.tabIndex = -1;
	}
	emitValueChange() {
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { value: this.value },
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
		const hasLabelSlot = this.hasSlotController.test("label");
		const hasInstructions = hasInstructionContent((name, flag) => this.hasSlotController.test(name, flag), this.instructions);
		const hasLabel = Boolean(this.label) || hasLabelSlot;
		return b`
            <div part="form-control" class="form-control">
                ${hasLabel ? b`
                        <div part="label" class="form-control__label" id="label">
                            <slot name="label">${this.label}</slot>
                        </div>
                    ` : A}

                ${hasInstructions ? b`
                        <div part="instructions" class="form-control__instructions" id="instructions">
                            <slot name="instructions">${this.instructions}</slot>
                            <slot name="hint"></slot>
                        </div>
                    ` : A}

                <div
                    part="radios"
                    class=${e({
			group: true,
			"pk-radio-group": true,
			"group--horizontal": this.orientation === "horizontal",
			"pk-radio-group--horizontal": this.orientation === "horizontal"
		})}
                    role="radiogroup"
                    aria-labelledby=${hasLabel ? "label" : A}
                    aria-label=${!hasLabel ? this.ariaLabel ?? A : A}
                    aria-describedby=${hasInstructions ? "instructions" : A}
                    aria-invalid=${this.invalid ? "true" : A}
                    aria-required=${this.required ? "true" : A}
                >
                    <slot @slotchange=${this.syncItems}></slot>
                </div>
            </div>
        `;
	}
};
__decorate([n({
	attribute: "value",
	reflect: true
})], PkRadioGroup.prototype, "defaultValue", void 0);
__decorate([n({ reflect: true })], PkRadioGroup.prototype, "orientation", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkRadioGroup.prototype, "invalid", void 0);
__decorate([n()], PkRadioGroup.prototype, "label", void 0);
__decorate([n()], PkRadioGroup.prototype, "instructions", void 0);
__decorate([n({ attribute: "aria-label" })], PkRadioGroup.prototype, "ariaLabel", void 0);
__decorate([e$1("slot:not([name])")], PkRadioGroup.prototype, "defaultSlot", void 0);
__decorate([r()], PkRadioGroup.prototype, "items", void 0);
PkRadioGroup = __decorate([t("pk-radio-group")], PkRadioGroup);
//#endregion
export { PkRadioGroup };
