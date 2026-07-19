import { n as createTranslationIconElement, t as icons_exports } from "./icons-BR8JcQj2.js";
import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { t as HasSlotController } from "./has-slot-8BvCt_qo.js";
import { t as formControlStyles } from "./form-control.styles-BQdimE5o.js";
import { t as createIconElement } from "./render-Dvc3MHQR.js";
import { i as uniqueId } from "./focus-aa5dlv8k.js";
import { css, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { customElement, property, query } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { renderInlineMarkdown } from "@verbb/plugin-kit-core";
//#region src/base/markdown.styles.ts
/** Shared inline markdown styling for field instructions, errors, and warnings. */
var inlineMarkdownStyles = css`
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
/** Renders inline markdown for Lit templates (bold, italic, links, code). */
function inlineMarkdown(content) {
	if (!content) return nothing;
	const html = renderInlineMarkdown(content);
	if (!html) return nothing;
	return unsafeHTML(html);
}
//#endregion
//#region src/components/field/pk-field.styles.ts
var pkFieldStyles = css`
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
		const labelFor = this.for || (hasLabel ? this.controlId : nothing);
		return html`
            <div part="form-control" class="form-control">
                ${hasLabel || hasInstructions || hasHeaderEnd ? html`
                        <div
                            part="header"
                            class=${classMap({
			"form-control__header": true,
			"form-control__header--with-end": hasHeaderEnd
		})}
                        >
                            <div class="form-control__header-main">
                                ${hasLabel ? html`
                                        <label
                                            part="label"
                                            class="form-control__label"
                                            id=${this.labelId}
                                            for=${labelFor}
                                            data-error=${hasErrors ? "true" : nothing}
                                            @click=${this.onLabelClick}
                                        >
                                            <slot name="label">${this.label}</slot>
                                            ${this.required ? html`
                                                    <span class="sr-only">Required</span>
                                                    <span class="form-control__required" aria-hidden="true">
                                                        ${createIconElement(icons_exports.asterisk)}
                                                    </span>
                                                ` : nothing}
                                            ${this.translatable ? html`
                                                    <span class="form-control__translatable" title="Translatable">
                                                        ${createTranslationIconElement()}
                                                        <span class="sr-only">Translatable</span>
                                                    </span>
                                                ` : nothing}
                                        </label>
                                    ` : nothing}

                                ${hasInstructions ? html`
                                        <p
                                            part="instructions"
                                            class="form-control__instructions pk-inline-markdown"
                                            id=${this.instructionsId}
                                        >
                                            <slot name="instructions">${inlineMarkdown(this.instructions)}</slot>
                                            <slot name="hint"></slot>
                                        </p>
                                    ` : nothing}
                            </div>

                            ${hasHeaderEnd ? html`
                                    <div part="header-end" class="form-control__header-end">
                                        <slot name="header-end"></slot>
                                    </div>
                                ` : html`<slot name="header-end" hidden></slot>`}
                        </div>
                    ` : nothing}

                <div part="control" class="form-control__control">
                    <slot @slotchange=${this.onControlSlotChange}></slot>
                </div>

                ${hasErrors ? html`
                        <ul part="errors" class="form-control__errors pk-inline-markdown" id=${this.errorsId}>
                            ${this.errors.map((message) => html`<li>${inlineMarkdown(message)}</li>`)}
                            <slot name="errors"></slot>
                        </ul>
                    ` : nothing}

                ${hasWarning ? html`
                        <div part="warning" class="form-control__warning" id=${this.warningId}>
                            <span class="form-control__warning-icon" aria-hidden="true">
                                ${createIconElement(icons_exports.triangleExclamation)}
                            </span>
                            <p class="form-control__warning-text pk-inline-markdown">
                                <slot name="warning">${inlineMarkdown(this.warning)}</slot>
                            </p>
                        </div>
                    ` : nothing}

                ${hasTip ? html`
                        <div part="tip" class="form-control__tip" id=${this.tipId}>
                            <span class="form-control__tip-icon" aria-hidden="true">
                                ${createIconElement(icons_exports.lightbulb)}
                            </span>
                            <p class="form-control__tip-text pk-inline-markdown">
                                <span class="sr-only">Tip: </span>
                                <slot name="tip">${inlineMarkdown(this.tip)}</slot>
                            </p>
                        </div>
                    ` : nothing}
            </div>
        `;
	}
};
__decorate([property()], PkField.prototype, "label", void 0);
__decorate([property()], PkField.prototype, "instructions", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkField.prototype, "required", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkField.prototype, "translatable", void 0);
__decorate([property()], PkField.prototype, "warning", void 0);
__decorate([property()], PkField.prototype, "tip", void 0);
__decorate([property({ attribute: false })], PkField.prototype, "errors", void 0);
__decorate([property({ reflect: true })], PkField.prototype, "for", void 0);
__decorate([query("slot:not([name])")], PkField.prototype, "controlSlot", void 0);
PkField = __decorate([customElement("pk-field")], PkField);
//#endregion
export { PkField as t };

//# sourceMappingURL=pk-field-Buy_AtYF.js.map