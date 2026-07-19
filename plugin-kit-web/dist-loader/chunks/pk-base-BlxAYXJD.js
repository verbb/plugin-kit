import { d as i$1, h as r, l as n, m as i } from "./lit-Dnn7gEi2.js";
//#region src/base/styles.ts
var sharedStyleSheets = /* @__PURE__ */ new Map();
/**
* Share constructable stylesheets across component instances ( pattern).
* Falls back to an injected `<style>` tag when adoptedStyleSheets aren't supported.
*/
function adoptStyles(shadowRoot, styleResults, cacheKey) {
	const cssText = styleResults.flatMap((result) => Array.isArray(result) ? result : [result]).map((result) => {
		if ("cssText" in result && typeof result.cssText === "string") return result.cssText;
		return r(result).cssText;
	}).join("\n");
	if (!("adoptedStyleSheets" in Document.prototype) || typeof CSSStyleSheet === "undefined") {
		const styleKey = cacheKey ?? String(styleResults.length);
		if (!shadowRoot.querySelector(`style[data-pk-adopted-styles="${styleKey}"]`)) {
			const style = document.createElement("style");
			style.dataset.pkAdoptedStyles = styleKey;
			style.textContent = cssText;
			shadowRoot.prepend(style);
		}
		return;
	}
	const key = cacheKey ?? cssText;
	let sheet = sharedStyleSheets.get(key);
	if (!sheet) {
		sheet = new CSSStyleSheet();
		sheet.replaceSync(cssText);
		sharedStyleSheets.set(key, sheet);
	}
	shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
}
var hostDisplayInlineBlock = i`
    @layer pk-component {
        :host {
            display: inline-block;
            vertical-align: middle;
        }
    }
`;
i`
    .pk-focus-ring:focus {
        outline: none;
    }

    .pk-focus-ring:focus-visible {
        box-shadow: var(--pk-shadow-focus);
    }
`;
//#endregion
//#region src/base/shadow-reset.styles.ts
/**
* Shadow-root baseline — box model + inherited typography inside every pk-* component.
* Applied via PkElement.createRenderRoot(); does not replace per-component styles.
*/
var shadowResetStyles = i`
    @layer pk-reset {
        :host {
            box-sizing: border-box;
        }

        :host *,
        :host *::before,
        :host *::after {
            box-sizing: border-box;
        }

        :host(:not([hidden])) {
            /* Prevent UA / CP margin on unstyled custom element hosts in light DOM. */
            margin: 0;
        }
    }
`;
//#endregion
//#region src/base/pk-element.ts
/**
* Base class for Plugin Kit web components.
* Open shadow root; Lit adopts constructable stylesheets where supported.
*
* `performUpdate` is wrapped so a single control failure degrades inline instead of
* taking down the whole CP surface (React error boundaries do not see Lit throws).
*/
var PkElement = class extends i$1 {
	constructor(..._args) {
		super(..._args);
		this.pkRenderFailed = false;
	}
	static {
		this.shadowRootOptions = {
			mode: "open",
			delegatesFocus: true
		};
	}
	connectedCallback() {
		super.connectedCallback();
		if (!this.hasAttribute("data-pk")) this.setAttribute("data-pk", "");
	}
	createRenderRoot() {
		const root = super.createRenderRoot();
		adoptStyles(root, [shadowResetStyles], "pk-shadow-reset");
		return root;
	}
	performUpdate() {
		if (this.pkRenderFailed) return;
		try {
			const result = super.performUpdate();
			if (result instanceof Promise) result.catch((error) => {
				this.handleRenderFailure(error);
			});
		} catch (error) {
			this.handleRenderFailure(error);
		}
	}
	handleRenderFailure(error) {
		const err = error instanceof Error ? error : new Error(String(error));
		this.pkRenderFailed = true;
		this.dispatchEvent(new CustomEvent("pk-error", {
			detail: {
				tagName: this.localName || this.tagName.toLowerCase(),
				message: err.message,
				stack: err.stack
			},
			bubbles: true,
			composed: true
		}));
		try {
			const root = this.renderRoot;
			if (root) {
				root.textContent = "";
				const shell = document.createElement("div");
				shell.setAttribute("part", "error");
				shell.setAttribute("role", "alert");
				shell.textContent = "This control failed to load.";
				root.appendChild(shell);
			}
		} catch {}
	}
};
//#endregion
//#region \0@oxc-project+runtime@0.127.0/helpers/decorate.js
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}
//#endregion
//#region src/base/icon.styles.ts
/** Shared icon sizing for slotted SVGs inside shadow DOM. */
var iconStyles = i`
    @layer pk-component {
        slot[name='start']::slotted(svg),
        slot[name='end']::slotted(svg) {
            display: block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
            pointer-events: none;
            vertical-align: middle;
            overflow: visible;
        }
    }
`;
//#endregion
//#region src/internal/control-aria.ts
/** ARIA attributes mirrored from a field shell host onto the focusable native control. */
var MIRRORED_ARIA_ATTRIBUTES = [
	"aria-labelledby",
	"aria-describedby",
	"aria-invalid",
	"aria-errormessage",
	"aria-required",
	"aria-label"
];
/** True when a parent `pk-field` (or similar) has wired external field chrome. */
function hasExternalFieldAria(host) {
	return host.hasAttribute("aria-labelledby") || host.hasAttribute("aria-describedby") || host.hasAttribute("aria-errormessage");
}
/** Copy mirrored ARIA attributes from `source` onto `target`. */
function mirrorAriaAttributes(source, target) {
	for (const name of MIRRORED_ARIA_ATTRIBUTES) {
		const value = source.getAttribute(name);
		if (value !== null) target.setAttribute(name, value);
		else target.removeAttribute(name);
	}
}
/** Wire label/instructions/required/invalid for standalone controls ( internal layout). */
function syncStandaloneControlAria({ control, labelId, instructionsId, hasLabel, hasInstructions, required = false, invalid = false }) {
	if (hasLabel && labelId) control.setAttribute("aria-labelledby", labelId);
	else control.removeAttribute("aria-labelledby");
	if (hasInstructions && instructionsId) control.setAttribute("aria-describedby", instructionsId);
	else control.removeAttribute("aria-describedby");
	if (required) control.setAttribute("aria-required", "true");
	else control.removeAttribute("aria-required");
	if (invalid) control.setAttribute("aria-invalid", "true");
	else control.removeAttribute("aria-invalid");
	control.removeAttribute("aria-errormessage");
}
/** Observes host ARIA attribute changes and mirrors them to a focusable inner control. */
var HostAriaMirror = class {
	constructor(host, getTarget, onSync) {
		this.host = host;
		this.getTarget = getTarget;
		this.onSync = onSync;
	}
	connect() {
		this.sync();
		this.observer = new MutationObserver(() => {
			this.sync();
		});
		this.observer.observe(this.host, {
			attributes: true,
			attributeFilter: [...MIRRORED_ARIA_ATTRIBUTES]
		});
	}
	disconnect() {
		this.observer?.disconnect();
		this.observer = void 0;
	}
	sync() {
		if (!hasExternalFieldAria(this.host)) {
			this.onSync?.();
			return;
		}
		const target = this.getTarget();
		if (!target) return;
		mirrorAriaAttributes(this.host, target);
	}
};
//#endregion
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
__decorate([n({ reflect: true })], PkFormAssociatedElement.prototype, "name", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkFormAssociatedElement.prototype, "disabled", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkFormAssociatedElement.prototype, "required", void 0);
__decorate([n({
	attribute: "custom-error",
	reflect: true
})], PkFormAssociatedElement.prototype, "customError", void 0);
__decorate([n({
	attribute: false,
	state: true
})], PkFormAssociatedElement.prototype, "valueHasChanged", void 0);
__decorate([n({
	attribute: false,
	state: true
})], PkFormAssociatedElement.prototype, "hasInteracted", void 0);
//#endregion
//#region src/base/checkbox-control.styles.ts
/** Shared checkbox/radio control box — Craft tokens, border-box sizing. */
var checkboxControlStyles = i`
    @layer pk-component {
        .control {
            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            position: relative;
            box-sizing: border-box;
            width: var(--pk-checkbox-size);
            height: var(--pk-checkbox-size);
            border: 1px solid var(--pk-checkbox-border-color, #c0cbd9);
            border-radius: var(--pk-radius-sm);
            background: var(--pk-color-white);
            cursor: pointer;
            transition: border-color 0.12s ease, box-shadow 0.12s ease;
        }

        :host([disabled]) .control {
            cursor: not-allowed;
        }

        .input:focus-visible + .control {
            border-color: var(--pk-color-sky-600);
            box-shadow: 0 0 0 1px var(--pk-color-sky-600), 0 0 4px 0 hsl(from var(--pk-color-sky-600) h s l / 0.7);
        }

        :host([invalid]) .control,
        .input[aria-invalid='true'] + .control {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) .input:focus-visible + .control,
        .input[aria-invalid='true']:focus-visible + .control {
            border-color: var(--pk-color-rose-600);
            box-shadow: 0 0 0 1px var(--pk-color-rose-600), 0 0 4px 0 hsl(from var(--pk-color-rose-600) h s l / 0.7);
        }

        .indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--pk-color-gray-900);
        }

        .icon-check,
        .icon-indeterminate {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
        }

        .icon-check svg {
            width: 14px;
            height: 14px;
            transform: translateY(1px) scale(1.2);
        }

        .icon-indeterminate svg {
            width: 12px;
            height: 12px;
        }

        :host([checked]) .icon-check,
        .input:checked + .control .icon-check {
            opacity: 1;
        }

        :host([indeterminate]) .icon-check,
        .input:indeterminate + .control .icon-check {
            opacity: 0;
        }

        :host([indeterminate]) .icon-indeterminate,
        .input:indeterminate + .control .icon-indeterminate {
            opacity: 1;
        }
    }
`;
//#endregion
//#region src/base/form-control.styles.ts
/** Shared label/instructions layout for form controls — Craft tokens,  structure. */
var formControlStyles = i`
    @layer pk-component {
        .form-control {
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
            width: 100%;
        }

        .form-control__header {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            min-width: 0;
        }

        .form-control__label {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            margin: 0;
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            font-weight: 700;
            line-height: var(--pk-line-height);
        }

        .form-control__instructions,
        .form-control__hint {
            margin: 0;
            color: var(--pk-color-gray-500);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .form-control__instructions:empty,
        .form-control__hint:empty {
            display: none;
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .form-control__input {
            display: flex;
            align-items: stretch;
            position: relative;
            width: 100%;
        }

        .form-control__start,
        .form-control__end {
            display: inline-flex;
            align-items: center;
            flex-shrink: 0;
        }

        .form-control__start {
            margin-inline-end: 6px;
        }

        .form-control__end {
            margin-inline-start: 6px;
        }

        .icon-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: var(--pk-color-gray-500);
            cursor: pointer;
            line-height: 0;
        }

        .icon-button:focus-visible {
            outline: none;
            box-shadow: var(--pk-shadow-focus);
            border-radius: var(--pk-radius-sm);
        }

        .icon-button:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;
//#endregion
//#region src/base/markdown.styles.ts
/** Shared inline markdown styling for field instructions, errors, and warnings. */
var inlineMarkdownStyles = i`
    @layer pk-component {
        .pk-inline-markdown a {
            color: var(--pk-color-blue-500);
            text-decoration: none;
        }

        .pk-inline-markdown a:hover {
            text-decoration: underline;
        }

        /* Craft p code — gray chip; tip/warning/error override bg/border on pk-field. */
        .pk-inline-markdown code {
            /* Craft --border-hairline ≈ gray-800 @ 10%. */
            border: 1px solid color-mix(in srgb, var(--pk-color-gray-800) 10%, transparent);
            border-radius: var(--pk-radius-sm);
            background: var(--pk-color-gray-100);
            padding-block: 0.0625em;
            padding-inline: 0.25em;
            font-family: var(--pk-font-family-mono, ui-monospace, monospace);
            /* v1 field help/errors used [&_code]:text-[0.85em] — tighter than --pk-font-size-mono (0.9em). */
            font-size: var(--pk-inline-markdown-code-font-size, 0.85em);
            line-height: var(--pk-line-height-mono, 1.5);
            /* Inherit tip/warning/error/instructions text color (Craft parity). */
            color: inherit;
        }
    }
`;
//#endregion
export { HostAriaMirror as a, __decorate as c, PkFormAssociatedElement as i, PkElement as l, formControlStyles as n, syncStandaloneControlAria as o, checkboxControlStyles as r, iconStyles as s, inlineMarkdownStyles as t, hostDisplayInlineBlock as u };
