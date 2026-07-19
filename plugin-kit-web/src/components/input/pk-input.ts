import { html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';

import { formControlStyles } from '../../base/form-control.styles.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { uniqueId } from '../../a11y/focus.js';
import { PkClearEvent } from '../../events/pk-clear.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { syncStandaloneControlAria } from '../../internal/control-aria.js';
import { hasInstructionContent, readLegacyInstructions } from '../../internal/field-labels.js';
import { buttonGroupBorderJoinStyles, buttonGroupCornerRadiusStyles, buttonGroupCornerRoleStyles } from '../button-group/button-group-item.styles.js';
import { MirrorValidator, RequiredValidator } from '../../validators/index.js';
import { requestAssociatedFormSubmitOnEnter } from '../../internal/implicit-form-submit.js';
import { pkInputStyles } from './pk-input.styles.js';

export type PkInputSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

/**
 * Text input —  API, Plugin Kit field visuals.
 *
 * @slot label
 * @slot instructions
 * @slot hint - Alias for `instructions`
 * @slot start - Leading adornment inside the field chrome (icon, unit, etc.)
 * @slot end - Trailing adornment inside the field chrome
 * @slot clear-icon
 *
 * @csspart form-control - Wrapper
 * @csspart label - Label
 * @csspart instructions - Instructions
 * @csspart base - Input row
 * @csspart input - Native input
 * @csspart start - Start slot container
 * @csspart end - End slot container
 * @csspart clear-button - Clear button
 */
@customElement('pk-input')
export class PkInput extends PkFormAssociatedElement {
    static override styles = [formControlStyles, buttonGroupCornerRoleStyles(), buttonGroupCornerRadiusStyles('.input', 'var(--pk-input-border-radius, var(--pk-radius-sm))'), buttonGroupBorderJoinStyles('.input'), pkInputStyles];

    static override get validators() {
        return [...super.validators, MirrorValidator(), RequiredValidator()];
    }

    override assumeInteractionOn = ['blur', 'input'];

    private readonly hasSlotController = new HasSlotController(this, 'instructions', 'hint', 'label', 'start', 'end');

    private readonly inputId = uniqueId('pk-input');

    @query('input')
    override input!: HTMLInputElement;

    @property({ reflect: true })
    type = 'text';

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
    size: PkInputSize = 'default';

    @property()
    label = '';

    @property()
    instructions = '';

    @property({ attribute: 'with-clear', type: Boolean })
    withClear = false;

    @property()
    placeholder = '';

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    /** Flush + fill parent cell (editable tables). */
    @property({ type: Boolean, reflect: true, attribute: 'fit-cell' })
    fitCell = false;

    /** Monospace typography for handle, slug, and code-like values. */
    @property({ type: Boolean, reflect: true })
    mono = false;

    @property()
    pattern?: string;

    @property({ type: Number })
    minlength?: number;

    @property({ type: Number })
    maxlength?: number;

    @property()
    min?: number | string;

    @property()
    max?: number | string;

    @property()
    step?: number | 'any';

    @property()
    autocomplete?: string;

    @property({ type: Boolean, reflect: true })
    autofocus = false;

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

        const hasLabel = Boolean(this.label) || this.hasSlotController.test('label', this.withLabel);
        const hasInstructions = hasInstructionContent(
            (name, flag) => this.hasSlotController.test(name, flag),
            this.instructions,
            this.withInstructions,
        );

        syncStandaloneControlAria({
            control: this.input,
            labelId: `${this.inputId}-label`,
            instructionsId: `${this.inputId}-instructions`,
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

    select(): void {
        this.input?.select();
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

    /**
     * Shadow native inputs do not participate in HTML implicit form submission.
     * Bridge Enter → associated form.requestSubmit() (SchemaFormEngine hidden submitter).
     */
    private handleKeyDown(event: KeyboardEvent): void {
        requestAssociatedFormSubmitOnEnter(this, event, this.type);
    }

    private handleClearClick(event: Event): void {
        event.preventDefault();

        if (this.value === '') {
            return;
        }

        this.value = '';
        this.dispatchEvent(new PkClearEvent());
        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        this.input.focus();
    }

    override render() {
        const hasLabel = this.hasLabelContent();
        const hasInstructions = this.hasInstructionsContent();
        const showClear = this.withClear && !this.disabled && !this.readonly && this.value.length > 0;
        const hasStart = this.hasSlotController.test('start');
        const hasEnd = this.hasSlotController.test('end');

        return html`
            <div part="form-control" class="form-control">
                ${hasLabel || hasInstructions
                    ? html`
                        <div part="header" class="form-control__header">
                            ${hasLabel
                                ? html`
                                    <label
                                        part="label"
                                        class="form-control__label"
                                        id=${`${this.inputId}-label`}
                                        for=${`${this.inputId}-control`}
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
                                        id=${`${this.inputId}-instructions`}
                                    >
                                        <slot name="instructions">${this.instructions}</slot>
                                        <slot name="hint"></slot>
                                    </p>
                                `
                                : nothing}
                        </div>
                    `
                    : nothing}

                <div part="base" class="form-control__input">
                    ${hasStart
                        ? html`
                            <span part="start" class="form-control__start">
                                <slot name="start"></slot>
                            </span>
                        `
                        : html`<slot name="start" hidden></slot>`}

                    <input
                        part="input"
                        class="input"
                        id=${hasLabel ? `${this.inputId}-control` : nothing}
                        type=${this.type}
                        .value=${live(this.value)}
                        placeholder=${this.placeholder || nothing}
                        pattern=${ifDefined(this.pattern)}
                        minlength=${ifDefined(this.minlength)}
                        maxlength=${ifDefined(this.maxlength)}
                        min=${ifDefined(this.min as string | undefined)}
                        max=${ifDefined(this.max as string | undefined)}
                        step=${ifDefined(this.step as string | number | undefined)}
                        autocomplete=${ifDefined(this.autocomplete)}
                        ?disabled=${this.disabled}
                        ?readonly=${this.readonly}
                        ?required=${this.required}
                        ?autofocus=${this.autofocus}
                        @input=${this.handleInput}
                        @change=${this.handleChange}
                        @keydown=${this.handleKeyDown}
                        @focus=${() => this.dispatchEvent(new Event('focus', { bubbles: true, composed: true }))}
                        @blur=${() => this.dispatchEvent(new Event('blur', { bubbles: true, composed: true }))}
                    />

                    ${showClear
                        ? html`
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
                        `
                        : nothing}

                    ${hasEnd
                        ? html`
                            <span part="end" class="form-control__end">
                                <slot name="end"></slot>
                            </span>
                        `
                        : html`<slot name="end" hidden></slot>`}
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-input': PkInput;
    }
}
