import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';

import { formControlStyles } from '../../base/form-control.styles.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { uniqueId } from '../../a11y/focus.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { syncStandaloneControlAria } from '../../internal/control-aria.js';
import { hasInstructionContent, readLegacyInstructions } from '../../internal/field-labels.js';
import { MirrorValidator, RequiredValidator } from '../../validators/index.js';
import { pkTextareaStyles } from './pk-textarea.styles.js';

export type PkTextareaSize = 'default' | 'sm';

/**
 * Multiline text field —  API, Craft visuals.
 *
 * @slot label
 * @slot instructions
 * @slot hint - Alias for `instructions`
 *
 * @csspart form-control - Wrapper
 * @csspart label - Label
 * @csspart instructions - Instructions
 * @csspart textarea - Native textarea
 */
@customElement('pk-textarea')
export class PkTextarea extends PkFormAssociatedElement {
    static override styles = [formControlStyles, pkTextareaStyles];

    static override get validators() {
        return [...super.validators, MirrorValidator(), RequiredValidator()];
    }

    override assumeInteractionOn = ['blur', 'input'];

    private readonly hasSlotController = new HasSlotController(this, 'instructions', 'hint', 'label');

    private readonly controlId = uniqueId('pk-textarea');

    @query('textarea')
    override input!: HTMLTextAreaElement;

    @property()
    placeholder = '';

    private _value: string | null = null;

    get value(): string {
        if (this.valueHasChanged) {
            return this._value ?? '';
        }

        return this._value ?? this.defaultValue ?? '';
    }

    @state()
    set value(val: string | null) {
        const next = val ?? '';

        if (this._value === next) {
            return;
        }

        this.valueHasChanged = true;
        this._value = next;
    }

    @property({ attribute: 'value', reflect: true })
    defaultValue: string | null = null;

    @property({ reflect: true })
    size: PkTextareaSize = 'default';

    @property()
    label = '';

    @property()
    instructions = '';

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    /** Flush + fill parent cell (editable tables). */
    @property({ type: Boolean, reflect: true, attribute: 'fit-cell' })
    fitCell = false;

    /** Native `rows` — use `1` in table cells so intrinsic height doesn't overflow. */
    @property({ type: Number })
    rows?: number;

    @property({ type: Number, attribute: 'max-length' })
    maxlength?: number;

    @property({ attribute: 'with-label', type: Boolean })
    withLabel = false;

    @property({ attribute: 'with-instructions', type: Boolean })
    withInstructions = false;

    override connectedCallback(): void {
        this.instructions = readLegacyInstructions(this, this.instructions);

        if (this.hasAttribute('with-hint')) {
            this.withInstructions = true;
        }

        super.connectedCallback();
    }

    protected override syncFormValue(): void {
        this.setValue(this.value || '');
    }

    protected override resetToDefaultValue(): void {
        this.valueHasChanged = false;
        this._value = null;
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (typeof state === 'string') {
            this.value = state;
        }
    }

    override formResetCallback(): void {
        this.valueHasChanged = false;
        this._value = null;

        if (this.input) {
            this.input.value = this.defaultValue ?? '';
        }

        super.formResetCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('value') || changed.has('defaultValue')) {
            this.setState('blank', !this.value);
        }

        super.updated(changed);
    }

    protected override syncStandaloneAria(): void {
        if (!this.input) {
            return;
        }

        const hasLabel = this.hasLabelContent();
        const hasInstructions = this.hasInstructionsContent();

        syncStandaloneControlAria({
            control: this.input,
            labelId: `${this.controlId}-label`,
            instructionsId: `${this.controlId}-instructions`,
            hasLabel,
            hasInstructions,
            required: this.required,
            invalid: this.invalid || !this.internals.validity.valid,
        });
    }

    private hasLabelContent(): boolean {
        return Boolean(this.label) || this.hasSlotController.test('label', this.withLabel);
    }

    private hasInstructionsContent(): boolean {
        return hasInstructionContent(
            (name, flag) => this.hasSlotController.test(name, flag),
            this.instructions,
            this.withInstructions,
        );
    }

    focus(options?: FocusOptions): void {
        this.input?.focus(options);
    }

    blur(): void {
        this.input?.blur();
    }

    private handleInput(): void {
        this.value = this.input.value;
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }

    private handleChange(event: Event): void {
        this.value = this.input.value;
        event.stopPropagation();
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    override render() {
        const hasLabel = this.hasLabelContent();
        const hasInstructions = this.hasInstructionsContent();

        return html`
            <div part="form-control" class="form-control">
                ${hasLabel
                    ? html`
                        <label
                            part="label"
                            class="form-control__label"
                            id=${`${this.controlId}-label`}
                            for=${`${this.controlId}-control`}
                        >
                            <slot name="label">${this.label}</slot>
                        </label>
                    `
                    : nothing}

                ${hasInstructions
                    ? html`
                        <p
                            part="instructions"
                            class="form-control__instructions"
                            id=${`${this.controlId}-instructions`}
                        >
                            <slot name="instructions">${this.instructions}</slot>
                            <slot name="hint"></slot>
                        </p>
                    `
                    : nothing}

                <textarea
                    part="textarea"
                    class="textarea"
                    id=${hasLabel ? `${this.controlId}-control` : nothing}
                    rows=${ifDefined(this.fitCell ? (this.rows ?? 1) : this.rows)}
                    .value=${live(this.value)}
                    placeholder=${this.placeholder || nothing}
                    maxlength=${ifDefined(this.maxlength)}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                    @focus=${() => this.dispatchEvent(new Event('focus', { bubbles: true, composed: true }))}
                    @blur=${() => this.dispatchEvent(new Event('blur', { bubbles: true, composed: true }))}
                ></textarea>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-textarea': PkTextarea;
    }
}
