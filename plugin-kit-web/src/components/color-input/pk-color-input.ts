import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { MirrorValidator, RequiredValidator } from '../../validators/index.js';
import { pkColorInputStyles } from './pk-color-input.styles.js';

/** Public scale is xs / sm / default / lg (`xl` aliases `lg` for compatibility). */
export type PkColorInputSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';

const DEFAULT_COLOR = '#000000';

function sanitizeHex(value: string): string {
    return String(value || '')
        .replace(/^#/, '')
        .replace(/[^0-9a-fA-F]/g, '')
        .slice(0, 6)
        .toLowerCase();
}

function isCompleteHex(value: string): boolean {
    return value.length === 3 || value.length === 6;
}

function expandShortHex(value: string): string {
    if (value.length !== 3) {
        return value;
    }

    return value.split('').map((char) => `${char}${char}`).join('');
}

function toPickerValue(hex: string): string {
    if (hex.length === 6) {
        return `#${hex}`;
    }

    if (hex.length === 3) {
        return `#${expandShortHex(hex)}`;
    }

    return DEFAULT_COLOR;
}

/**
 * Color input — swatch picker + hex text field (Craft ColorInput parity).
 * Form-associated; submits `#rrggbb` or empty string.
 *
 * @csspart swatch - Swatch container
 * @csspart input - Hex text input
 */
@customElement('pk-color-input')
export class PkColorInput extends PkFormAssociatedElement {
    static override styles = pkColorInputStyles;

    static override get validators() {
        return [...super.validators, MirrorValidator(), RequiredValidator()];
    }

    override assumeInteractionOn = ['blur', 'input'];

    @property({ reflect: true })
    size: PkColorInputSize = 'default';

    @property({ type: Boolean, reflect: true, attribute: 'fit-cell' })
    fitCell = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property()
    value = '';

    @property({ attribute: 'default-value' })
    defaultValue = '';

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    @query('.hex-input')
    override input!: HTMLInputElement;

    @state()
    private hexValue = '';

    override connectedCallback(): void {
        super.connectedCallback();
        this.syncHexFromValue();
    }

    protected override willUpdate(changed: PropertyValues): void {
        if (changed.has('value')) {
            this.syncHexFromValue();
        }

        super.willUpdate(changed);
    }

    private syncHexFromValue(): void {
        this.hexValue = sanitizeHex(this.value);
    }

    protected override get validationTarget(): HTMLElement {
        return this.input;
    }

    protected override syncFormValue(): void {
        const submitted = this.hexValue ? `#${this.hexValue}` : '';
        this.setFormValue(submitted, submitted);
    }

    protected override resetToDefaultValue(): void {
        this.value = this.defaultValue;
        this.hexValue = sanitizeHex(this.defaultValue);
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (typeof state === 'string') {
            this.value = state;
            this.hexValue = sanitizeHex(state);
        }
    }

    private emitChange(): void {
        const next = this.hexValue ? `#${this.hexValue}` : '';
        this.value = next;

        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { value: next },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private handleHexInput(event: Event): void {
        const nextHex = sanitizeHex((event.target as HTMLInputElement).value);
        this.hexValue = nextHex;
        this.emitChange();
    }

    private handlePickerChange(event: Event): void {
        const nextHex = sanitizeHex((event.target as HTMLInputElement).value);
        this.hexValue = nextHex;
        this.emitChange();
    }

    override render() {
        const previewColor = toPickerValue(this.hexValue);
        const isTransparent = !isCompleteHex(this.hexValue);

        return html`
            <div class="root">
                <div part="swatch" class="swatch">
                    <div
                        class=${classMap({
                            'swatch-preview': true,
                            'is-transparent': isTransparent,
                        })}
                        style=${isTransparent ? nothing : `background-color: ${previewColor}`}
                    ></div>
                    <input
                        part="picker"
                        class="swatch-picker"
                        type="color"
                        .value=${previewColor}
                        ?disabled=${this.disabled}
                        aria-label="Color picker"
                        @input=${this.handlePickerChange}
                    />
                </div>
                <span class="hash" aria-hidden="true">#</span>
                <input
                    part="input"
                    class="hex-input"
                    type="text"
                    inputmode="text"
                    autocomplete="off"
                    maxlength="6"
                    .value=${this.hexValue}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    aria-label=${this.ariaLabel ?? nothing}
                    aria-invalid=${this.invalid ? 'true' : nothing}
                    @input=${this.handleHexInput}
                />
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-color-input': PkColorInput;
    }
}
