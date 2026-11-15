import { n as uniqueId } from "./pk-a11y-mGj0G5AE.js";
import { _ as i, f as o, g as b, l as n, m as A, o as e, r as m, s as e$1, u as customElement } from "./lit-VNWk8W1D.js";
import { c as __decorate, l as PkElement, n as formControlStyles, t as inlineMarkdownStyles } from "./pk-base-BZ-cbOC_.js";
import { V as lightbulb, it as triangleExclamation, u as asterisk } from "./svg-C4lXkZYF.js";
import { t as createIconElement } from "./render-Cdi93GN8.js";
import { t as HasSlotController } from "./has-slot-DJv86HKx.js";
//#region src/icons/translation-icon.ts
var TRANSLATION_ICON_PATH = "M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l208 0 32 0 16 0 256 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L320 64l-16 0-32 0L64 64zm512 48c8.8 0 16 7.2 16 16l0 256c0 8.8-7.2 16-16 16l-256 0 0-288 256 0zM178.3 175.9l64 144c4.5 10.1-.1 21.9-10.2 26.4s-21.9-.1-26.4-10.2L196.8 316l-73.6 0-8.9 20.1c-4.5 10.1-16.3 14.6-26.4 10.2s-14.6-16.3-10.2-26.4l64-144c3.2-7.2 10.4-11.9 18.3-11.9s15.1 4.7 18.3 11.9zM179 276l-19-42.8L141 276l38 0zM456 164c-11 0-20 9-20 20l0 4-52 0c-11 0-20 9-20 20s9 20 20 20l72 0 35.1 0c-7.3 16.7-17.4 31.9-29.8 45l-.5-.5-14.6-14.6c-7.8-7.8-20.5-7.8-28.3 0s-7.8 20.5 0 28.3L430 298.3c-5.9 3.6-12.1 6.9-18.5 9.8l-3.6 1.6c-10.1 4.5-14.6 16.3-10.2 26.4s16.3 14.6 26.4 10.2l3.6-1.6c12-5.3 23.4-11.8 34-19.4c4.3 3 8.6 5.8 13.1 8.5l18.9 11.3c9.5 5.7 21.8 2.6 27.4-6.9s2.6-21.8-6.9-27.4l-18.9-11.3c-.9-.5-1.8-1.1-2.7-1.6c17.2-18.8 30.7-40.9 39.6-65.4L534 228l2 0c11 0 20-9 20-20s-9-20-20-20l-16 0-44 0 0-4c0-11-9-20-20-20z";
var createTranslationIconElement = () => {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("aria-hidden", "true");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("viewBox", "0 0 640 512");
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("d", TRANSLATION_ICON_PATH);
	svg.append(path);
	return svg;
};
//#endregion
//#region src/internal/field-aria.ts
/** Wires label/instructions/errors/warning/tip ids to a slotted field control. */
function syncFieldAria({ control, labelId, instructionsId, errorsId, warningId, tipId, controlId, hasLabel, hasInstructions, hasErrors, hasWarning, hasTip, hasRequired = false, invalid = false }) {
	if (!control.id) control.id = controlId;
	if (hasLabel) control.setAttribute("aria-labelledby", labelId);
	else control.removeAttribute("aria-labelledby");
	const describedBy = [
		hasInstructions ? instructionsId : "",
		hasErrors ? errorsId : "",
		hasWarning ? warningId : "",
		hasTip ? tipId : ""
	].filter(Boolean);
	if (describedBy.length > 0) control.setAttribute("aria-describedby", describedBy.join(" "));
	else control.removeAttribute("aria-describedby");
	if (hasRequired) control.setAttribute("aria-required", "true");
	else control.removeAttribute("aria-required");
	const isInvalid = Boolean(invalid || hasErrors);
	if (isInvalid) {
		control.setAttribute("aria-invalid", "true");
		control.setAttribute("aria-errormessage", errorsId);
	} else {
		control.removeAttribute("aria-invalid");
		control.removeAttribute("aria-errormessage");
	}
	syncControlInvalidState(control, isInvalid);
}
/** Prefer the Lit `invalid` property when present; otherwise toggle the attribute. */
function syncControlInvalidState(control, isInvalid) {
	if ("invalid" in control) {
		control.invalid = isInvalid;
		return;
	}
	control.toggleAttribute("invalid", isInvalid);
}
//#endregion
//#region src/utils/inline-markdown.ts
var renderer;
var loading;
var loadRenderer = () => loading ??= import("./markdown-9L5oIv1t.js").then((module) => renderer = module.renderInlineMarkdown);
var toTemplate = (html) => html ? o(html) : A;
/** Renders inline markdown for Lit templates (bold, italic, links, code). */
function inlineMarkdown(content) {
	if (!content) return A;
	if (renderer) return toTemplate(renderer(content));
	return m(loadRenderer().then((render) => toTemplate(render(content))), content);
}
//#endregion
//#region src/components/field/pk-field.styles.ts
var pkFieldStyles = i`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
        }

        .form-control__control {
            display: block;
            position: relative;
            width: 100%;
        }

        .form-control__header--with-end {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0.75rem;
        }

        .form-control__header-main {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            min-width: 0;
            flex: 1 1 auto;
        }

        .form-control__header-end {
            flex-shrink: 0;
        }

        .form-control__required {
            display: inline-flex;
            align-items: center;
            color: var(--pk-color-rose-600);
            line-height: 0;
        }

        .form-control__required svg {
            display: block;
            width: 10px;
            height: 10px;
        }

        .form-control__translatable {
            display: inline-flex;
            align-items: center;
            color: var(--pk-color-gray-550);
            line-height: 0;
        }

        .form-control__translatable svg {
            display: block;
            width: 1rem;
            height: 1rem;
            fill: currentColor;
        }

        .form-control__errors {
            margin: 0;
            padding-inline-start: 20px;
            color: var(--pk-color-error);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
            list-style: square;
        }

        .form-control__errors:empty {
            display: none;
        }

        .form-control__warning {
            display: flex;
            align-items: flex-start;
            gap: 0.25rem;
            min-width: 0;
            margin: 0;
            color: var(--pk-color-warning);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .form-control__warning:empty {
            display: none;
        }

        .form-control__warning-icon {
            display: inline-flex;
            flex-shrink: 0;
            margin-top: 0.3em;
            width: 0.75rem;
            height: 0.75rem;
            line-height: 0;
        }

        .form-control__warning-text {
            min-width: 0;
            margin: 0;
        }

        .form-control__warning-icon svg {
            display: block;
            width: 100%;
            height: 100%;
        }

        /* Craft .warning code — amber chip matching warning text. */
        .form-control__warning .pk-inline-markdown code {
            background-color: var(--pk-color-amber-100);
            border-color: var(--pk-color-amber-300);
        }

        .form-control__tip {
            display: flex;
            align-items: flex-start;
            gap: 0.25rem;
            min-width: 0;
            margin: 0;
            color: var(--pk-color-sky-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .form-control__tip:empty {
            display: none;
        }

        .form-control__tip-icon {
            display: inline-flex;
            flex-shrink: 0;
            margin-top: 0.3em;
            width: 0.75rem;
            height: 0.75rem;
            line-height: 0;
        }

        .form-control__tip-text {
            min-width: 0;
            margin: 0;
        }

        .form-control__tip-icon svg {
            display: block;
            width: 100%;
            height: 100%;
        }

        .form-control__tip-text a {
            text-decoration: underline;
        }

        /* Craft .tip code — sky/notice chip matching tip text. */
        .form-control__tip .pk-inline-markdown code {
            background-color: var(--pk-color-sky-100);
            border-color: var(--pk-color-sky-300);
        }

        /* Craft --bg-error / --border-error pattern for field errors. */
        .form-control__errors.pk-inline-markdown code {
            background-color: var(--pk-color-red-100);
            border-color: var(--pk-color-red-300);
        }
    }
`;
//#endregion
//#region src/components/field/pk-field.ts
var PkField = class PkField extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.hasSlotController = new HasSlotController(this, "label", "instructions", "hint", "header-end", "warning", "tip", "errors");
		this.baseId = uniqueId("pk-field");
		this.label = "";
		this.instructions = "";
		this.required = false;
		this.translatable = false;
		this.warning = "";
		this.tip = "";
		this.errors = [];
		this.for = "";
		this.onLabelClick = (event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;
			if (target.closest("button, a, input, select, textarea, [role=\"button\"], [role=\"link\"]")) return;
			this.focusControl();
		};
		this.onControlSlotChange = () => {
			this.syncControlAria();
			this.requestUpdate();
		};
	}
	static {
		this.styles = [
			formControlStyles,
			inlineMarkdownStyles,
			pkFieldStyles
		];
	}
	connectedCallback() {
		super.connectedCallback();
		const legacyHint = this.getAttribute("hint");
		if (legacyHint && !this.instructions) this.instructions = legacyHint;
	}
	updated(changed) {
		super.updated(changed);
		if (changed.has("label") || changed.has("instructions") || changed.has("errors") || changed.has("warning") || changed.has("tip") || changed.has("required") || changed.has("for")) this.syncControlAria();
	}
	get labelId() {
		return `${this.baseId}-label`;
	}
	get instructionsId() {
		return `${this.baseId}-instructions`;
	}
	get errorsId() {
		return `${this.baseId}-errors`;
	}
	get warningId() {
		return `${this.baseId}-warning`;
	}
	get tipId() {
		return `${this.baseId}-tip`;
	}
	get controlId() {
		return this.for || `${this.baseId}-control`;
	}
	hasLabel() {
		return Boolean(this.label) || this.hasSlotController.test("label");
	}
	hasInstructions() {
		return Boolean(this.instructions) || this.hasSlotController.test("instructions") || this.hasSlotController.test("hint");
	}
	hasHeaderEnd() {
		return this.hasSlotController.test("header-end");
	}
	hasErrors() {
		return this.errors.length > 0 || this.hasSlotController.test("errors");
	}
	hasWarning() {
		return Boolean(this.warning) || this.hasSlotController.test("warning");
	}
	hasTip() {
		return Boolean(this.tip) || this.hasSlotController.test("tip");
	}
	getControlElement() {
		const [control] = this.controlSlot?.assignedElements({ flatten: true }) ?? [];
		if (control instanceof HTMLElement) return control;
		if (this.for) return this.getRootNode().getElementById(this.for);
		return null;
	}
	focusControl() {
		const control = this.getControlElement();
		if (!control || typeof control.focus !== "function") return;
		control.focus();
	}
	syncControlAria() {
		const control = this.getControlElement();
		if (!control) return;
		syncFieldAria({
			control,
			labelId: this.labelId,
			instructionsId: this.instructionsId,
			errorsId: this.errorsId,
			warningId: this.warningId,
			tipId: this.tipId,
			controlId: this.controlId,
			hasLabel: this.hasLabel(),
			hasInstructions: this.hasInstructions(),
			hasErrors: this.hasErrors(),
			hasWarning: this.hasWarning(),
			hasTip: this.hasTip(),
			hasRequired: this.required,
			invalid: this.hasErrors()
		});
	}
	render() {
		const hasLabel = this.hasLabel();
		const hasInstructions = this.hasInstructions();
		const hasHeaderEnd = this.hasHeaderEnd();
		const hasErrors = this.hasErrors();
		const hasWarning = this.hasWarning();
		const hasTip = this.hasTip();
		const labelFor = this.for || (hasLabel ? this.controlId : A);
		return b`
            <div part="form-control" class="form-control">
                ${hasLabel || hasInstructions || hasHeaderEnd ? b`
                        <div
                            part="header"
                            class=${e({
			"form-control__header": true,
			"form-control__header--with-end": hasHeaderEnd
		})}
                        >
                            <div class="form-control__header-main">
                                ${hasLabel ? b`
                                        <label
                                            part="label"
                                            class="form-control__label"
                                            id=${this.labelId}
                                            for=${labelFor}
                                            data-error=${hasErrors ? "true" : A}
                                            @click=${this.onLabelClick}
                                        >
                                            <slot name="label">${this.label}</slot>
                                            ${this.required ? b`
                                                    <span class="sr-only">Required</span>
                                                    <span class="form-control__required" aria-hidden="true">
                                                        ${createIconElement(asterisk)}
                                                    </span>
                                                ` : A}
                                            ${this.translatable ? b`
                                                    <span class="form-control__translatable">
                                                        ${createTranslationIconElement()}
                                                        <span class="sr-only">Translatable</span>
                                                    </span>
                                                ` : A}
                                        </label>
                                    ` : A}

                                ${hasInstructions ? b`
                                        <p
                                            part="instructions"
                                            class="form-control__instructions pk-inline-markdown"
                                            id=${this.instructionsId}
                                        >
                                            <slot name="instructions">${inlineMarkdown(this.instructions)}</slot>
                                            <slot name="hint"></slot>
                                        </p>
                                    ` : A}
                            </div>

                            ${hasHeaderEnd ? b`
                                    <div part="header-end" class="form-control__header-end">
                                        <slot name="header-end"></slot>
                                    </div>
                                ` : b`<slot name="header-end" hidden></slot>`}
                        </div>
                    ` : A}

                <div part="control" class="form-control__control">
                    <slot @slotchange=${this.onControlSlotChange}></slot>
                </div>

                ${hasErrors ? b`
                        <ul part="errors" class="form-control__errors pk-inline-markdown" id=${this.errorsId}>
                            ${this.errors.map((message) => b`<li>${inlineMarkdown(message)}</li>`)}
                            <slot name="errors"></slot>
                        </ul>
                    ` : A}

                ${hasWarning ? b`
                        <div part="warning" class="form-control__warning" id=${this.warningId}>
                            <span class="form-control__warning-icon" aria-hidden="true">
                                ${createIconElement(triangleExclamation)}
                            </span>
                            <p class="form-control__warning-text pk-inline-markdown">
                                <slot name="warning">${inlineMarkdown(this.warning)}</slot>
                            </p>
                        </div>
                    ` : A}

                ${hasTip ? b`
                        <div part="tip" class="form-control__tip" id=${this.tipId}>
                            <span class="form-control__tip-icon" aria-hidden="true">
                                ${createIconElement(lightbulb)}
                            </span>
                            <p class="form-control__tip-text pk-inline-markdown">
                                <span class="sr-only">Tip: </span>
                                <slot name="tip">${inlineMarkdown(this.tip)}</slot>
                            </p>
                        </div>
                    ` : A}
            </div>
        `;
	}
};
__decorate([n()], PkField.prototype, "label", void 0);
__decorate([n()], PkField.prototype, "instructions", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkField.prototype, "required", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkField.prototype, "translatable", void 0);
__decorate([n()], PkField.prototype, "warning", void 0);
__decorate([n()], PkField.prototype, "tip", void 0);
__decorate([n({ attribute: false })], PkField.prototype, "errors", void 0);
__decorate([n({ reflect: true })], PkField.prototype, "for", void 0);
__decorate([e$1("slot:not([name])")], PkField.prototype, "controlSlot", void 0);
PkField = __decorate([customElement("pk-field")], PkField);
//#endregion
export { PkField as t };
