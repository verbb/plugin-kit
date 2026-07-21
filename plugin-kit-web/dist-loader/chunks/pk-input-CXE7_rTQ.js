import { n as uniqueId } from "./pk-a11y-Cx5RZvhu.js";
import { c as r, f as A, l as n, m as i, n as l, p as b, r as o, s as e, u as t } from "./lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, n as formControlStyles, o as syncStandaloneControlAria } from "./pk-base-BlxAYXJD.js";
import { n as buttonGroupCornerRadiusStyles, r as buttonGroupCornerRoleStyles, t as buttonGroupBorderJoinStyles } from "./button-group-item.styles-BNc-ksl1.js";
import { t as MirrorValidator } from "./mirror-validator-DEz3BsbN.js";
import { t as RequiredValidator } from "./required-validator-DXqqPVeW.js";
import { t as HasSlotController } from "./has-slot-BZDcCpf9.js";
import { t as PkClearEvent } from "./pk-clear-BRS8vkV-.js";
import { n as readLegacyInstructions, t as hasInstructionContent } from "./field-labels-Vo3wHq49.js";
//#region src/internal/implicit-form-submit.ts
/**
* Restore HTML “implicit submission” for FACE controls with a shadow native input.
*
* Native light-DOM text inputs inside a <form> submit on Enter via the default
* submitter. Shadow inputs do not — the host must request submit on the schema
* form (never Craft’s outer #main when nested under the CP form).
*
* Prefer `pk-implicit-submit` (handled by SchemaFormEngine → handleSubmit) over
* `HTMLFormElement.requestSubmit()`, which will navigate if the wrong form is
* targeted or if preventDefault never runs.
*
* Skip types that never implicit-submit, and modified Enter.
*/
var NON_IMPLICIT_SUBMIT_INPUT_TYPES = new Set([
	"button",
	"submit",
	"reset",
	"checkbox",
	"radio",
	"file",
	"image",
	"hidden"
]);
/** Dispatched on the schema <form>; SchemaFormEngine calls handleSubmit(). */
var PK_IMPLICIT_SUBMIT_EVENT = "pk-implicit-submit";
var shouldRequestFormSubmitOnEnter = (event, inputType) => {
	if (event.key !== "Enter" || event.defaultPrevented || event.isComposing) return false;
	if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return false;
	const type = (inputType || "text").toLowerCase();
	return !NON_IMPLICIT_SUBMIT_INPUT_TYPES.has(type);
};
/**
* Resolve the form that should receive implicit submit.
* Inside pk-dialog, prefer the SchemaFormEngine form in the dialog — not Craft’s
* outer #main form (nested forms make FACE form owner ambiguous / wrong).
*/
var resolveSubmitForm = (host) => {
	const dialog = host.closest?.("pk-dialog");
	if (dialog) {
		const dialogForm = dialog.querySelector("form");
		if (dialogForm) return dialogForm;
	}
	const associated = host.form;
	if (associated && associated.id === "main") return host.closest?.("form") !== associated ? host.closest("form") : null;
	return associated;
};
/**
* Call from a shadow `<input>` keydown handler on a form-associated host.
* Returns true when submit was requested.
*/
var requestAssociatedFormSubmitOnEnter = (host, event, inputType) => {
	if (host.disabled || host.readonly) return false;
	if (!shouldRequestFormSubmitOnEnter(event, inputType)) return false;
	const form = resolveSubmitForm(host);
	if (!form || form.id === "main") return false;
	event.preventDefault();
	event.stopPropagation();
	form.dispatchEvent(new CustomEvent(PK_IMPLICIT_SUBMIT_EVENT, {
		bubbles: false,
		cancelable: true
	}));
	return true;
};
//#endregion
//#region src/components/input/pk-input.styles.ts
var pkInputStyles = i`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        :host([data-pk-group-orientation]) {
            display: flex;
            flex-direction: column;
            width: auto;
            flex: 0 1 auto;
            align-self: stretch;
        }

        :host([data-pk-group-orientation]) .form-control {
            gap: 0;
            height: 100%;
        }

        :host([data-pk-group-orientation]) .form-control__input {
            min-height: var(--pk-btn-height-default);
            height: 100%;
        }

        :host([data-pk-group-orientation]) .form-control__start,
        :host([data-pk-group-orientation]) .form-control__end {
            display: none;
        }

        :host([data-pk-group-orientation]) .form-control__input {
            width: 100%;
        }

        :host([data-pk-group-orientation]) .input {
            width: 100%;
        }

        :host([data-pk-group-orientation]) .input {
            min-height: var(--pk-btn-height-default);
            height: 100%;
        }

        :host([data-pk-group-orientation='vertical']) {
            width: 100%;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider]) .form-control__input {
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
            box-shadow: none;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .form-control__input {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
            box-shadow: none;
        }

        :host([data-pk-group-divider]) .form-control__input:focus-within,
        :host([data-pk-group-divider][data-state='focus-visible']) .form-control__input {
            box-shadow: var(--pk-input-focus-shadow);
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .form-control__input:focus-within,
        :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-state='focus-visible']) .form-control__input {
            box-shadow: var(--pk-input-focus-shadow);
        }

        /* Chrome lives on the flex shell (part=base) so slot=start/end adornments sit
         * inside the border — same visual contract as pk-input-group / v1 InputGroup.
         * Height is content-sized (v1): padding-block + --pk-input-control-line-height + border.
         */
        .form-control__input {
            align-items: center;
            gap: 6px;
            padding-inline: 8px;
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius, var(--pk-radius-sm));
            background: var(--pk-input-bg);
            background-clip: padding-box;
            box-sizing: border-box;
            transition: border-color 0.12s ease, box-shadow 0.12s ease;
        }

        .form-control__start,
        .form-control__end {
            margin: 0;
            color: var(--pk-color-gray-400);
            line-height: 0;
        }

        .form-control__start ::slotted(*),
        .form-control__end ::slotted(*) {
            display: block;
            max-width: 1.25rem;
            max-height: 1.25rem;
        }

        .input {
            display: block;
            width: 100%;
            margin: 0;
            /* v1 Input default: py-1.5 + text-sm (14px / 1.25rem lh) → 34px with border. */
            padding-block: 6px;
            padding-inline: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            /* Craft CP body / field value text. */
            color: var(--pk-color-gray-700);
            font: inherit;
            line-height: var(--pk-input-control-line-height, 1.25rem);
            appearance: none;
            box-sizing: border-box;
            outline: none;
        }

        .form-control__input .input {
            flex: 1 1 auto;
            min-width: 0;
        }

        .input::placeholder {
            color: var(--pk-input-placeholder-color, var(--pk-color-gray-400));
        }

        /*
         * Craft text:focus-visible only sets box-shadow (--focus-ring); resting border stays.
         * Do not also set border-color — --pk-input-focus-shadow already includes 0 0 0 1px,
         * so border-color + that ring reads as a double focus treatment.
         */
        :host(:not([invalid]):not(:state(user-invalid))) .form-control__input:focus-within,
        :host([data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .form-control__input {
            box-shadow: var(--pk-input-focus-shadow);
        }

        .form-control__input:has(.input:disabled) {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .input:disabled {
            cursor: not-allowed;
        }

        :host([invalid]) .form-control__input,
        :host(:state(user-invalid)) .form-control__input {
            border-color: var(--pk-color-rose-600);
        }

        /* Invalid + focus: rose ring (same token as select/combobox), not sky over rose border. */
        :host([invalid]) .form-control__input:focus-within,
        :host([invalid][data-state='focus-visible']) .form-control__input,
        :host(:state(user-invalid)) .form-control__input:focus-within {
            box-shadow: var(--pk-input-invalid-focus-shadow);
        }

        :host([size='xs']) .form-control__input {
            gap: 4px;
            padding-inline: 6px;
        }

        :host([size='xs']) .input {
            padding-block: 4px;
            font-size: 11px;
        }

        :host([size='sm']) .form-control__input {
            gap: 4px;
            padding-inline: 8px;
        }

        :host([size='sm']) .input {
            padding-block: 4px;
            font-size: 12px;
        }

        :host([size='lg']) .form-control__input {
            gap: 8px;
            padding-inline: 12px;
        }

        :host([size='lg']) .input {
            padding-block: 8px;
            font-size: var(--pk-font-size-base);
        }

        :host([size='xl']) .form-control__input {
            gap: 8px;
            padding-inline: 16px;
        }

        :host([size='xl']) .input {
            padding-block: 10px;
            font-size: 16px;
        }

        /*
         * Mono face + 0.9× optical size + line-height 1.5. The taller line-height
         * offsets the smaller face so padding + content height stays aligned with
         * stock inputs (1.25rem ≈ 1.5 × 12.6px). Scale the size's face, not
         * the parent em, so xs/sm/xl mono stay proportional.
         */
        :host([mono]) .input {
            font-family: var(--pk-input-mono-font-family);
            font-size: calc(var(--pk-font-size-base) * 0.9);
            line-height: var(--pk-input-mono-line-height, 1.5);
        }

        :host([mono][size='xs']) .input {
            font-size: calc(11px * 0.9);
        }

        :host([mono][size='sm']) .input {
            font-size: calc(12px * 0.9);
        }

        :host([mono][size='lg']) .input {
            font-size: calc(var(--pk-font-size-base) * 0.9);
        }

        :host([mono][size='xl']) .input {
            font-size: calc(16px * 0.9);
        }

        /* Editable-table cells (v1): flush into the row — no chrome border/radius.
         * Prefer reflected fit-cell (Lit property); data-editable-table-input is a legacy alias.
         * Fill host → form-control → input so the control spans the full td.
         */
        :host([fit-cell]),
        :host([data-editable-table-input]) {
            display: block;
            height: 100%;
            min-height: 100%;
            box-sizing: border-box;
        }

        :host([fit-cell]) .form-control,
        :host([data-editable-table-input]) .form-control {
            height: 100%;
            min-height: 100%;
            gap: 0;
        }

        :host([fit-cell]) .form-control__input,
        :host([data-editable-table-input]) .form-control__input {
            height: 100%;
            min-height: 100%;
            flex: 1 1 auto;
            padding-inline: 0;
            border: none;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
        }

        :host([fit-cell]) .input,
        :host([data-editable-table-input]) .input {
            height: 100%;
            min-height: 100%;
        }

        :host([fit-cell]:not([invalid]):not(:state(user-invalid))) .form-control__input:focus-within,
        :host([fit-cell][data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .form-control__input,
        :host([data-editable-table-input]:not([invalid]):not(:state(user-invalid))) .form-control__input:focus-within,
        :host([data-editable-table-input][data-state='focus-visible']:not([invalid]):not(:state(user-invalid))) .form-control__input {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-gray-200);
        }

        :host([fit-cell][invalid]) .form-control__input,
        :host([fit-cell]:state(user-invalid)) .form-control__input,
        :host([data-editable-table-input][invalid]) .form-control__input,
        :host([data-editable-table-input]:state(user-invalid)) .form-control__input {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }

        :host([fit-cell][invalid]) .form-control__input:focus-within,
        :host([fit-cell][invalid][data-state='focus-visible']) .form-control__input,
        :host([fit-cell]:state(user-invalid)) .form-control__input:focus-within,
        :host([data-editable-table-input][invalid]) .form-control__input:focus-within,
        :host([data-editable-table-input][invalid][data-state='focus-visible']) .form-control__input,
        :host([data-editable-table-input]:state(user-invalid)) .form-control__input:focus-within {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])) .form-control__input {
            border-left-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])) .form-control__input {
            border-top-width: 0;
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-divider]) .form-control__input {
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .form-control__input {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-input-border-color));
        }

        :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail]) .form-control__input {
            border-right-width: 0;
        }

        :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail]) .form-control__input {
            border-bottom-width: 0;
        }

        .clear-button {
            position: absolute;
            inset-inline-end: 6px;
            inset-block-start: 50%;
            translate: 0 -50%;
        }

        .form-control__input:has(.clear-button) .input {
            padding-inline-end: 20px;
        }
    }
`;
//#endregion
//#region src/components/input/pk-input.ts
var PkInput = class PkInput extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["blur", "input"];
		this.hasSlotController = new HasSlotController(this, "instructions", "hint", "label", "start", "end");
		this.inputId = uniqueId("pk-input");
		this.type = "text";
		this._value = null;
		this.defaultValue = null;
		this.size = "default";
		this.label = "";
		this.instructions = "";
		this.withClear = false;
		this.placeholder = "";
		this.readonly = false;
		this.invalid = false;
		this.fitCell = false;
		this.mono = false;
		this.autofocus = false;
		this.withLabel = false;
		this.withInstructions = false;
	}
	static {
		this.styles = [
			formControlStyles,
			buttonGroupCornerRoleStyles(),
			buttonGroupCornerRadiusStyles(".input", "var(--pk-input-border-radius, var(--pk-radius-sm))"),
			buttonGroupBorderJoinStyles(".input"),
			pkInputStyles
		];
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
		const hasLabel = Boolean(this.label) || this.hasSlotController.test("label", this.withLabel);
		const hasInstructions = hasInstructionContent((name, flag) => this.hasSlotController.test(name, flag), this.instructions, this.withInstructions);
		syncStandaloneControlAria({
			control: this.input,
			labelId: `${this.inputId}-label`,
			instructionsId: `${this.inputId}-instructions`,
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
	select() {
		this.input?.select();
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
	/**
	* Shadow native inputs do not participate in HTML implicit form submission.
	* Bridge Enter → associated form.requestSubmit() (SchemaFormEngine hidden submitter).
	*/
	handleKeyDown(event) {
		requestAssociatedFormSubmitOnEnter(this, event, this.type);
	}
	handleClearClick(event) {
		event.preventDefault();
		if (this.value === "") return;
		this.value = "";
		this.dispatchEvent(new PkClearEvent());
		this.dispatchEvent(new Event("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
		this.input.focus();
	}
	render() {
		const hasLabel = this.hasLabelContent();
		const hasInstructions = this.hasInstructionsContent();
		const showClear = this.withClear && !this.disabled && !this.readonly && this.value.length > 0;
		const hasStart = this.hasSlotController.test("start");
		const hasEnd = this.hasSlotController.test("end");
		return b`
            <div part="form-control" class="form-control">
                ${hasLabel || hasInstructions ? b`
                        <div part="header" class="form-control__header">
                            ${hasLabel ? b`
                                    <label
                                        part="label"
                                        class="form-control__label"
                                        id=${`${this.inputId}-label`}
                                        for=${`${this.inputId}-control`}
                                    >
                                        <slot name="label">${this.label}</slot>
                                    </label>
                                ` : A}

                            ${hasInstructions ? b`
                                    <p
                                        part="instructions"
                                        class="form-control__instructions"
                                        id=${`${this.inputId}-instructions`}
                                    >
                                        <slot name="instructions">${this.instructions}</slot>
                                        <slot name="hint"></slot>
                                    </p>
                                ` : A}
                        </div>
                    ` : A}

                <div part="base" class="form-control__input">
                    ${hasStart ? b`
                            <span part="start" class="form-control__start">
                                <slot name="start"></slot>
                            </span>
                        ` : b`<slot name="start" hidden></slot>`}

                    <input
                        part="input"
                        class="input"
                        id=${hasLabel ? `${this.inputId}-control` : A}
                        type=${this.type}
                        .value=${l(this.value)}
                        placeholder=${this.placeholder || A}
                        pattern=${o(this.pattern)}
                        minlength=${o(this.minlength)}
                        maxlength=${o(this.maxlength)}
                        min=${o(this.min)}
                        max=${o(this.max)}
                        step=${o(this.step)}
                        autocomplete=${o(this.autocomplete)}
                        ?disabled=${this.disabled}
                        ?readonly=${this.readonly}
                        ?required=${this.required}
                        ?autofocus=${this.autofocus}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                        @keydown=${this.handleKeyDown}
                        @focus=${() => this.dispatchEvent(new Event("focus", {
			bubbles: true,
			composed: true
		}))}
                        @blur=${() => this.dispatchEvent(new Event("blur", {
			bubbles: true,
			composed: true
		}))}
                    />

                    ${showClear ? b`
                            <button
                                part="clear-button"
                                class="icon-button clear-button"
                                type="button"
                                tabindex="-1"
                                aria-label="Clear"
                                @click=${this.handleClearClick}
                            >
                                <slot name="clear-icon">×</slot>
                            </button>
                        ` : A}

                    ${hasEnd ? b`
                            <span part="end" class="form-control__end">
                                <slot name="end"></slot>
                            </span>
                        ` : b`<slot name="end" hidden></slot>`}
                </div>
            </div>
        `;
	}
};
__decorate([e("input")], PkInput.prototype, "input", void 0);
__decorate([n({ reflect: true })], PkInput.prototype, "type", void 0);
__decorate([r()], PkInput.prototype, "value", null);
__decorate([n({
	attribute: "value",
	reflect: true
})], PkInput.prototype, "defaultValue", void 0);
__decorate([n({ reflect: true })], PkInput.prototype, "size", void 0);
__decorate([n()], PkInput.prototype, "label", void 0);
__decorate([n()], PkInput.prototype, "instructions", void 0);
__decorate([n({
	attribute: "with-clear",
	type: Boolean
})], PkInput.prototype, "withClear", void 0);
__decorate([n()], PkInput.prototype, "placeholder", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkInput.prototype, "readonly", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkInput.prototype, "invalid", void 0);
__decorate([n({
	type: Boolean,
	reflect: true,
	attribute: "fit-cell"
})], PkInput.prototype, "fitCell", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkInput.prototype, "mono", void 0);
__decorate([n()], PkInput.prototype, "pattern", void 0);
__decorate([n({ type: Number })], PkInput.prototype, "minlength", void 0);
__decorate([n({ type: Number })], PkInput.prototype, "maxlength", void 0);
__decorate([n()], PkInput.prototype, "min", void 0);
__decorate([n()], PkInput.prototype, "max", void 0);
__decorate([n()], PkInput.prototype, "step", void 0);
__decorate([n()], PkInput.prototype, "autocomplete", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkInput.prototype, "autofocus", void 0);
__decorate([n({
	attribute: "with-label",
	type: Boolean
})], PkInput.prototype, "withLabel", void 0);
__decorate([n({
	attribute: "with-instructions",
	type: Boolean
})], PkInput.prototype, "withInstructions", void 0);
PkInput = __decorate([t("pk-input")], PkInput);
//#endregion
export { PkInput as t };
