import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { uniqueId } from '../../a11y/focus.js';
import { formControlStyles } from '../../base/form-control.styles.js';
import { inlineMarkdownStyles } from '../../base/markdown.styles.js';
import { PkElement } from '../../base/pk-element.js';
import { createIconElement, createTranslationIconElement, asterisk, lightbulb, triangleExclamation } from '../../icons/index.js';
import { syncFieldAria } from '../../internal/field-aria.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { inlineMarkdown } from '../../utils/inline-markdown.js';
import { pkFieldStyles } from './pk-field.styles.js';

/**
 * Form field shell — label, instructions, errors, warning, and tip around a slotted control.
 *
 * Mirrors Plugin Kit React `FieldLayout`. Use for schema-driven forms; controls may
 * also expose their own `label` / `instructions` for standalone usage.
 *
 * @slot label - Field label
 * @slot instructions - Help text below the label (property values support inline Markdown)
 * @slot hint - Alias for `instructions`
 * @slot header-end - Extra header actions (React `headerEnd`)
 * @slot errors - Custom error content (property values support inline Markdown)
 * @slot warning - Warning message (property values support inline Markdown)
 * @slot tip - Informational tip below the control (property values support inline Markdown)
 * @slot - Field control (`pk-input`, `pk-select`, etc.)
 *
 * @csspart header - Field header row
 * @csspart header-end - Trailing header actions
 * @csspart form-control - Root wrapper
 * @csspart label - Label element
 * @csspart control - Control slot wrapper
 * @csspart instructions - Instructions region
 * @csspart errors - Errors list
 * @csspart warning - Warning region
 * @csspart tip - Tip region
 */
@customElement('pk-field')
export class PkField extends PkElement {
    static override styles = [formControlStyles, inlineMarkdownStyles, pkFieldStyles];

    private readonly hasSlotController = new HasSlotController(
        this,
        'label',
        'instructions',
        'hint',
        'header-end',
        'warning',
        'tip',
        'errors',
    );

    private readonly baseId = uniqueId('pk-field');

    @property()
    label = '';

    @property()
    instructions = '';

    @property({ type: Boolean, reflect: true })
    required = false;

    /** Shows the translatable-field icon beside the label. */
    @property({ type: Boolean, reflect: true })
    translatable = false;

    @property()
    warning = '';

    @property()
    tip = '';

    @property({ attribute: false })
    errors: string[] = [];

    /** Associates the label with a control id in the light DOM. */
    @property({ reflect: true })
    for = '';

    @query('slot:not([name])')
    private controlSlot!: HTMLSlotElement;

    override connectedCallback(): void {
        super.connectedCallback();

        const legacyHint = this.getAttribute('hint');

        if (legacyHint && !this.instructions) {
            this.instructions = legacyHint;
        }
    }

    override updated(changed: PropertyValues): void {
        super.updated(changed);

        if (
            changed.has('label')
            || changed.has('instructions')
            || changed.has('errors')
            || changed.has('warning')
            || changed.has('tip')
            || changed.has('required')
            || changed.has('for')
        ) {
            this.syncControlAria();
        }
    }

    private get labelId(): string {
        return `${this.baseId}-label`;
    }

    private get instructionsId(): string {
        return `${this.baseId}-instructions`;
    }

    private get errorsId(): string {
        return `${this.baseId}-errors`;
    }

    private get warningId(): string {
        return `${this.baseId}-warning`;
    }

    private get tipId(): string {
        return `${this.baseId}-tip`;
    }

    private get controlId(): string {
        return this.for || `${this.baseId}-control`;
    }

    private hasLabel(): boolean {
        return Boolean(this.label) || this.hasSlotController.test('label');
    }

    private hasInstructions(): boolean {
        return Boolean(this.instructions)
            || this.hasSlotController.test('instructions')
            || this.hasSlotController.test('hint');
    }

    private hasHeaderEnd(): boolean {
        return this.hasSlotController.test('header-end');
    }

    private hasErrors(): boolean {
        return this.errors.length > 0 || this.hasSlotController.test('errors');
    }

    private hasWarning(): boolean {
        return Boolean(this.warning) || this.hasSlotController.test('warning');
    }

    private hasTip(): boolean {
        return Boolean(this.tip) || this.hasSlotController.test('tip');
    }

    private getControlElement(): HTMLElement | null {
        const [control] = this.controlSlot?.assignedElements({ flatten: true }) ?? [];

        if (control instanceof HTMLElement) {
            return control;
        }

        if (this.for) {
            const root = this.getRootNode() as Document | ShadowRoot;
            return root.getElementById(this.for);
        }

        return null;
    }

    private focusControl(): void {
        const control = this.getControlElement();

        if (!control || typeof control.focus !== 'function') {
            return;
        }

        control.focus();
    }

    private onLabelClick = (event: MouseEvent): void => {
        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        if (target.closest('button, a, input, select, textarea, [role="button"], [role="link"]')) {
            return;
        }

        this.focusControl();
    };

    private syncControlAria(): void {
        const control = this.getControlElement();

        if (!control) {
            return;
        }

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
            invalid: this.hasErrors(),
        });
    }

    private onControlSlotChange = (): void => {
        this.syncControlAria();
        this.requestUpdate();
    };

    override render() {
        const hasLabel = this.hasLabel();
        const hasInstructions = this.hasInstructions();
        const hasHeaderEnd = this.hasHeaderEnd();
        const hasErrors = this.hasErrors();
        const hasWarning = this.hasWarning();
        const hasTip = this.hasTip();
        const labelFor = this.for || (hasLabel ? this.controlId : nothing);

        return html`
            <div part="form-control" class="form-control">
                ${hasLabel || hasInstructions || hasHeaderEnd
                    ? html`
                        <div
                            part="header"
                            class=${classMap({
                                'form-control__header': true,
                                'form-control__header--with-end': hasHeaderEnd,
                            })}
                        >
                            <div class="form-control__header-main">
                                ${hasLabel
                                    ? html`
                                        <label
                                            part="label"
                                            class="form-control__label"
                                            id=${this.labelId}
                                            for=${labelFor}
                                            data-error=${hasErrors ? 'true' : nothing}
                                            @click=${this.onLabelClick}
                                        >
                                            <slot name="label">${this.label}</slot>
                                            ${this.required
                                                ? html`
                                                    <span class="sr-only">Required</span>
                                                    <span class="form-control__required" aria-hidden="true">
                                                        ${createIconElement(asterisk)}
                                                    </span>
                                                `
                                                : nothing}
                                            ${this.translatable
                                                ? html`
                                                    <span class="form-control__translatable" title="Translatable">
                                                        ${createTranslationIconElement()}
                                                        <span class="sr-only">Translatable</span>
                                                    </span>
                                                `
                                                : nothing}
                                        </label>
                                    `
                                    : nothing}

                                ${hasInstructions
                                    ? html`
                                        <p
                                            part="instructions"
                                            class="form-control__instructions pk-inline-markdown"
                                            id=${this.instructionsId}
                                        >
                                            <slot name="instructions">${inlineMarkdown(this.instructions)}</slot>
                                            <slot name="hint"></slot>
                                        </p>
                                    `
                                    : nothing}
                            </div>

                            ${hasHeaderEnd
                                ? html`
                                    <div part="header-end" class="form-control__header-end">
                                        <slot name="header-end"></slot>
                                    </div>
                                `
                                : html`<slot name="header-end" hidden></slot>`}
                        </div>
                    `
                    : nothing}

                <div part="control" class="form-control__control">
                    <slot @slotchange=${this.onControlSlotChange}></slot>
                </div>

                ${hasErrors
                    ? html`
                        <ul part="errors" class="form-control__errors pk-inline-markdown" id=${this.errorsId}>
                            ${this.errors.map((message) => html`<li>${inlineMarkdown(message)}</li>`)}
                            <slot name="errors"></slot>
                        </ul>
                    `
                    : nothing}

                ${hasWarning
                    ? html`
                        <div part="warning" class="form-control__warning" id=${this.warningId}>
                            <span class="form-control__warning-icon" aria-hidden="true">
                                ${createIconElement(triangleExclamation)}
                            </span>
                            <p class="form-control__warning-text pk-inline-markdown">
                                <slot name="warning">${inlineMarkdown(this.warning)}</slot>
                            </p>
                        </div>
                    `
                    : nothing}

                ${hasTip
                    ? html`
                        <div part="tip" class="form-control__tip" id=${this.tipId}>
                            <span class="form-control__tip-icon" aria-hidden="true">
                                ${createIconElement(lightbulb)}
                            </span>
                            <p class="form-control__tip-text pk-inline-markdown">
                                <span class="sr-only">Tip: </span>
                                <slot name="tip">${inlineMarkdown(this.tip)}</slot>
                            </p>
                        </div>
                    `
                    : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-field': PkField;
    }
}
