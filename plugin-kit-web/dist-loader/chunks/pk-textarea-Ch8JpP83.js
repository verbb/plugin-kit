import { n as uniqueId } from "./pk-a11y-Cx5RZvhu.js";
import { c as r, f as A, l as n, m as i, n as l, p as b, r as o, s as e, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, n as formControlStyles, o as syncStandaloneControlAria } from "./pk-base-BlxAYXJD.js";
import { t as MirrorValidator } from "./mirror-validator-DEz3BsbN.js";
import { t as RequiredValidator } from "./required-validator-DXqqPVeW.js";
import { t as HasSlotController } from "./has-slot-BZDcCpf9.js";
import { n as readLegacyInstructions, t as hasInstructionContent } from "./field-labels-Vo3wHq49.js";
//#region src/components/textarea/pk-textarea.styles.ts
var pkTextareaStyles = i`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .textarea {
            display: block;
            width: 100%;
            min-height: 5rem;
            margin: 0;
            padding: 7px 10px;
            border: var(--pk-input-border);
            border-radius: var(--pk-textarea-border-radius, var(--pk-radius-md));
            background: var(--pk-input-bg);
            background-clip: padding-box;
            /* Craft CP body / field value text. */
            color: var(--pk-color-gray-700);
            font: inherit;
            line-height: 1.4;
            resize: vertical;
            appearance: none;
            box-sizing: border-box;
            outline: none;
            transition: border-color 0.12s ease, box-shadow 0.12s ease;
        }

        .textarea::placeholder {
            color: var(--pk-input-placeholder-color, var(--pk-color-gray-400));
        }

        /* Craft: focus is box-shadow only — do not also flip border-color (double ring). */
        :host(:not([invalid]):not(:state(user-invalid))) .textarea:focus,
        :host(:not([invalid]):not(:state(user-invalid))) .textarea:focus-visible,
        :host([data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .textarea {
            box-shadow: var(--pk-input-focus-shadow);
        }

        .textarea:disabled {
            cursor: not-allowed;
            opacity: 0.5;
            background: var(--pk-color-gray-50);
        }

        :host([invalid]) .textarea,
        :host(:state(user-invalid)) .textarea {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) .textarea:focus,
        :host([invalid]) .textarea:focus-visible,
        :host([invalid][data-state='focus-visible']) .textarea,
        :host(:state(user-invalid)) .textarea:focus,
        :host(:state(user-invalid)) .textarea:focus-visible {
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        /* Editable-table cells (v1): flush into the row and fill cell height.
         * Chain height through form-control — percentage on .textarea alone
         * doesn't resolve when the wrapper sizes to content (rows / min-height). */
        :host([fit-cell]),
        :host([data-editable-table-input]) {
            display: block;
            height: 100%;
            min-height: 100%;
            box-sizing: border-box;
            overflow: hidden;
        }

        :host([fit-cell]) .form-control,
        :host([data-editable-table-input]) .form-control {
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: 100%;
        }

        :host([fit-cell]) .textarea,
        :host([data-editable-table-input]) .textarea {
            flex: 1 1 auto;
            border: none;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            height: 100%;
            min-height: 0;
            max-height: 100%;
            /* Match text-cell inset (v1 py-1.5 / px-2). 0.5rem block padding +
             * line-height 1.4 overflows the 34px et cell and shows a scrollbar
             * even for empty / single-line notes. */
            padding: 0.375rem 0.5rem;
            line-height: 1.25;
            overflow-x: hidden;
            overflow-y: auto;
            resize: none;
        }

        :host([fit-cell]:not([invalid]):not(:state(user-invalid))) .textarea:focus,
        :host([fit-cell]:not([invalid]):not(:state(user-invalid))) .textarea:focus-visible,
        :host([fit-cell][data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .textarea,
        :host([data-editable-table-input]:not([invalid]):not(:state(user-invalid))) .textarea:focus,
        :host([data-editable-table-input]:not([invalid]):not(:state(user-invalid))) .textarea:focus-visible,
        :host([data-editable-table-input][data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .textarea {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-200);
        }

        :host([fit-cell][invalid]) .textarea,
        :host([fit-cell]:state(user-invalid)) .textarea,
        :host([fit-cell][invalid]) .textarea:focus,
        :host([fit-cell][invalid]) .textarea:focus-visible,
        :host([fit-cell]:state(user-invalid)) .textarea:focus,
        :host([fit-cell]:state(user-invalid)) .textarea:focus-visible,
        :host([data-editable-table-input][invalid]) .textarea,
        :host([data-editable-table-input]:state(user-invalid)) .textarea,
        :host([data-editable-table-input][invalid]) .textarea:focus,
        :host([data-editable-table-input][invalid]) .textarea:focus-visible,
        :host([data-editable-table-input]:state(user-invalid)) .textarea:focus,
        :host([data-editable-table-input]:state(user-invalid)) .textarea:focus-visible {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }
    }
`;
//#endregion
//#region src/components/textarea/pk-textarea.ts
var PkTextarea = class PkTextarea extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["blur", "input"];
		this.hasSlotController = new HasSlotController(this, "instructions", "hint", "label");
		this.controlId = uniqueId("pk-textarea");
		this.placeholder = "";
		this._value = null;
		this.defaultValue = null;
		this.size = "default";
		this.label = "";
		this.instructions = "";
		this.readonly = false;
		this.invalid = false;
		this.fitCell = false;
		this.withLabel = false;
		this.withInstructions = false;
	}
	static {
		this.styles = [formControlStyles, pkTextareaStyles];
	}
	static get validators() {
		return [
			...super.validators,
			MirrorValidator(),
			RequiredValidator()
		];
	}
	get value() {
		if (this.valueHasChanged) return this._value ?? "";
		return this._value ?? this.defaultValue ?? "";
	}
	set value(val) {
		const next = val ?? "";
		if (this._value === next) return;
		this.valueHasChanged = true;
		this._value = next;
	}
	connectedCallback() {
		this.instructions = readLegacyInstructions(this, this.instructions);
		if (this.hasAttribute("with-hint")) this.withInstructions = true;
		super.connectedCallback();
	}
	syncFormValue() {
		this.setValue(this.value || "");
	}
	resetToDefaultValue() {
		this.valueHasChanged = false;
		this._value = null;
	}
	restoreFormState(state) {
		if (typeof state === "string") this.value = state;
	}
	formResetCallback() {
		this.valueHasChanged = false;
		this._value = null;
		if (this.input) this.input.value = this.defaultValue ?? "";
		super.formResetCallback();
	}
	updated(changed) {
		if (changed.has("value") || changed.has("defaultValue")) this.setState("blank", !this.value);
		super.updated(changed);
	}
	syncStandaloneAria() {
		if (!this.input) return;
		const hasLabel = this.hasLabelContent();
		const hasInstructions = this.hasInstructionsContent();
		syncStandaloneControlAria({
			control: this.input,
			labelId: `${this.controlId}-label`,
			instructionsId: `${this.controlId}-instructions`,
			hasLabel,
			hasInstructions,
			required: this.required,
			invalid: this.invalid || !this.internals.validity.valid
		});
	}
	hasLabelContent() {
		return Boolean(this.label) || this.hasSlotController.test("label", this.withLabel);
	}
	hasInstructionsContent() {
		return hasInstructionContent((name, flag) => this.hasSlotController.test(name, flag), this.instructions, this.withInstructions);
	}
	focus(options) {
		this.input?.focus(options);
	}
	blur() {
		this.input?.blur();
	}
	handleInput() {
		this.value = this.input.value;
		this.dispatchEvent(new Event("input", {
			bubbles: true,
			composed: true
		}));
	}
	handleChange(event) {
		this.value = this.input.value;
		event.stopPropagation();
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	render() {
		const hasLabel = this.hasLabelContent();
		const hasInstructions = this.hasInstructionsContent();
		return b`
            <div part="form-control" class="form-control">
                ${hasLabel ? b`
                        <label
                            part="label"
                            class="form-control__label"
                            id=${`${this.controlId}-label`}
                            for=${`${this.controlId}-control`}
                        >
                            <slot name="label">${this.label}</slot>
                        </label>
                    ` : A}

                ${hasInstructions ? b`
                        <p
                            part="instructions"
                            class="form-control__instructions"
                            id=${`${this.controlId}-instructions`}
                        >
                            <slot name="instructions">${this.instructions}</slot>
                            <slot name="hint"></slot>
                        </p>
                    ` : A}

                <textarea
                    part="textarea"
                    class="textarea"
                    id=${hasLabel ? `${this.controlId}-control` : A}
                    rows=${o(this.fitCell ? this.rows ?? 1 : this.rows)}
                    .value=${l(this.value)}
                    placeholder=${this.placeholder || A}
                    maxlength=${o(this.maxlength)}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                    @focus=${() => this.dispatchEvent(new Event("focus", {
			bubbles: true,
			composed: true
		}))}
                    @blur=${() => this.dispatchEvent(new Event("blur", {
			bubbles: true,
			composed: true
		}))}
                ></textarea>
            </div>
        `;
	}
};
__decorate([e("textarea")], PkTextarea.prototype, "input", void 0);
__decorate([n()], PkTextarea.prototype, "placeholder", void 0);
__decorate([r()], PkTextarea.prototype, "value", null);
__decorate([n({
	attribute: "value",
	reflect: true
})], PkTextarea.prototype, "defaultValue", void 0);
__decorate([n({ reflect: true })], PkTextarea.prototype, "size", void 0);
__decorate([n()], PkTextarea.prototype, "label", void 0);
__decorate([n()], PkTextarea.prototype, "instructions", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkTextarea.prototype, "readonly", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkTextarea.prototype, "invalid", void 0);
__decorate([n({
	type: Boolean,
	reflect: true,
	attribute: "fit-cell"
})], PkTextarea.prototype, "fitCell", void 0);
__decorate([n({ type: Number })], PkTextarea.prototype, "rows", void 0);
__decorate([n({
	type: Number,
	attribute: "max-length"
})], PkTextarea.prototype, "maxlength", void 0);
__decorate([n({
	attribute: "with-label",
	type: Boolean
})], PkTextarea.prototype, "withLabel", void 0);
__decorate([n({
	attribute: "with-instructions",
	type: Boolean
})], PkTextarea.prototype, "withInstructions", void 0);
PkTextarea = __decorate([t("pk-textarea")], PkTextarea);
//#endregion
export { PkTextarea as t };
