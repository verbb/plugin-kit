import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { t as HostAriaMirror } from "./control-aria-B2QMq4ji.js";
import { property } from "lit/decorators.js";
//#region src/events/pk-invalid.ts
/** Fired when a form control fails constraint validation — mirrors  `pk-invalid`. */
var PkInvalidEvent = class extends Event {
	constructor() {
		super("pk-invalid", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
	}
};
//#endregion
//#region src/validators/custom-error-validator.ts
function CustomErrorValidator() {
	return {
		observedAttributes: ["custom-error"],
		checkValidity(element) {
			const result = {
				message: "",
				isValid: true,
				invalidKeys: []
			};
			if (element.customError) {
				result.message = element.customError;
				result.isValid = false;
				result.invalidKeys.push("customError");
			}
			return result;
		}
	};
}
//#endregion
//#region src/base/pk-form-associated-element.ts
/**
* Form-associated custom element base —  `FormAssociatedElement` pattern.
*/
var PkFormAssociatedElement = class extends PkElement {
	static {
		this.formAssociated = true;
	}
	static get validators() {
		return [CustomErrorValidator()];
	}
	static get observedAttributes() {
		const attrs = new Set(super.observedAttributes ?? []);
		for (const validator of this.validators) for (const attr of validator.observedAttributes ?? []) attrs.add(attr);
		return [...attrs];
	}
	constructor() {
		super();
		this.internals = this.attachInternals();
		this.assumeInteractionOn = ["input"];
		this.validators = [];
		this.name = null;
		this.disabled = false;
		this.required = false;
		this.customError = null;
		this.valueHasChanged = false;
		this.hasInteracted = false;
		this.emittedEvents = [];
		this.emitInvalid = (event) => {
			if (event.target !== this) return;
			this.hasInteracted = true;
			this.dispatchEvent(new PkInvalidEvent());
		};
		this.handleInteraction = (event) => {
			if (!this.emittedEvents.includes(event.type)) this.emittedEvents.push(event.type);
			if (this.emittedEvents.length >= this.assumeInteractionOn.length) {
				this.hasInteracted = true;
				this.updateValidity();
			}
		};
		this.addEventListener("invalid", this.emitInvalid);
	}
	connectedCallback() {
		super.connectedCallback();
		for (const eventName of this.assumeInteractionOn) this.addEventListener(eventName, this.handleInteraction);
		this.updateValidity();
	}
	disconnectedCallback() {
		this.hostAriaMirror?.disconnect();
		this.hostAriaMirror = void 0;
		for (const eventName of this.assumeInteractionOn) this.removeEventListener(eventName, this.handleInteraction);
		this.removeEventListener("invalid", this.emitInvalid);
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("customError")) this.setCustomValidity(this.customError ?? "");
		if (changed.has("disabled")) this.setState("disabled", Boolean(this.disabled));
		if (changed.has("value") || changed.has("disabled") || changed.has("required") || changed.has("name")) this.syncFormValue();
		this.updateValidity();
		super.updated(changed);
		this.syncHostAriaMirror();
	}
	firstUpdated(_changed) {
		super.firstUpdated(_changed);
		this.connectHostAriaMirror();
	}
	/** Focusable native control that receives mirrored field-shell ARIA. */
	getAriaMirrorTarget() {
		return this.input ?? null;
	}
	/** Standalone label/instructions wiring when no external field shell is present. */
	syncStandaloneAria() {}
	connectHostAriaMirror() {
		this.hostAriaMirror?.disconnect();
		this.hostAriaMirror = new HostAriaMirror(this, () => this.getAriaMirrorTarget(), () => this.syncStandaloneAria());
		this.hostAriaMirror.connect();
	}
	syncHostAriaMirror() {
		this.hostAriaMirror?.sync();
	}
	formResetCallback() {
		this.resetValidity();
		this.hasInteracted = false;
		this.valueHasChanged = false;
		this.emittedEvents = [];
		this.resetToDefaultValue();
		this.syncFormValue();
		this.updateValidity();
	}
	formDisabledCallback(isDisabled) {
		this.disabled = isDisabled;
		this.updateValidity();
	}
	formStateRestoreCallback(state, _reason) {
		this.restoreFormState(state);
		this.syncFormValue();
		this.updateValidity();
	}
	set form(value) {
		if (value) this.setAttribute("form", value);
		else this.removeAttribute("form");
	}
	get form() {
		return this.internals.form;
	}
	get labels() {
		return this.internals.labels;
	}
	get validity() {
		return this.internals.validity;
	}
	get willValidate() {
		return this.internals.willValidate;
	}
	get validationMessage() {
		return this.internals.validationMessage;
	}
	getForm() {
		return this.internals.form;
	}
	checkValidity() {
		this.updateValidity();
		return this.internals.checkValidity();
	}
	reportValidity() {
		this.updateValidity();
		this.hasInteracted = true;
		return this.internals.reportValidity();
	}
	resetValidity() {
		this.setCustomValidity("");
		this.internals.setValidity({});
		this.syncCustomStates();
	}
	setCustomValidity(message) {
		if (!message) {
			this.customError = null;
			this.internals.setValidity({});
			this.syncCustomStates();
			return;
		}
		this.customError = message;
		const anchor = this.validationTarget;
		if (anchor instanceof HTMLElement) this.internals.setValidity({ customError: true }, message, anchor);
		else this.internals.setValidity({ customError: true }, message);
		this.syncCustomStates();
	}
	get validationTarget() {
		return this.input;
	}
	get allValidators() {
		return [...this.constructor.validators ?? [], ...this.validators ?? []];
	}
	setFormValue(value, state) {
		this.internals.setFormValue(value, state ?? value);
	}
	setValue(value, state) {
		this.setFormValue(value, state ?? value);
	}
	updateValidity() {
		if (this.disabled || this.hasAttribute("disabled") || !this.willValidate) {
			this.internals.setValidity({});
			this.syncCustomStates();
			return;
		}
		const validators = this.allValidators;
		if (!validators.length) return;
		const flags = { customError: Boolean(this.customError) };
		let finalMessage = "";
		const anchor = this.validationTarget;
		for (const validator of validators) {
			const { isValid, message, invalidKeys } = validator.checkValidity(this);
			if (isValid) continue;
			if (!finalMessage) finalMessage = message;
			for (const key of invalidKeys) flags[key] = true;
		}
		if (!finalMessage) finalMessage = this.validationMessage;
		if (anchor instanceof HTMLElement) this.internals.setValidity(flags, finalMessage, anchor);
		else this.internals.setValidity(flags, finalMessage);
		this.syncCustomStates();
	}
	syncCustomStates() {
		const isValid = this.internals.validity.valid;
		this.setState("required", this.required);
		this.setState("optional", !this.required);
		this.setState("invalid", !isValid);
		this.setState("valid", isValid);
		this.setState("user-invalid", !isValid && this.hasInteracted);
		this.setState("user-valid", isValid && this.hasInteracted);
	}
	setState(name, active) {
		const states = this.internals.states;
		if (!states) return;
		if (active) states.add(name);
		else states.delete(name);
	}
	syncFormValue() {}
	resetToDefaultValue() {}
	restoreFormState(_state) {}
};
__decorate([property({ reflect: true })], PkFormAssociatedElement.prototype, "name", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkFormAssociatedElement.prototype, "disabled", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkFormAssociatedElement.prototype, "required", void 0);
__decorate([property({
	attribute: "custom-error",
	reflect: true
})], PkFormAssociatedElement.prototype, "customError", void 0);
__decorate([property({
	attribute: false,
	state: true
})], PkFormAssociatedElement.prototype, "valueHasChanged", void 0);
__decorate([property({
	attribute: false,
	state: true
})], PkFormAssociatedElement.prototype, "hasInteracted", void 0);
//#endregion
export { CustomErrorValidator as n, PkInvalidEvent as r, PkFormAssociatedElement as t };

//# sourceMappingURL=pk-form-associated-element-DmZKgNPL.js.map