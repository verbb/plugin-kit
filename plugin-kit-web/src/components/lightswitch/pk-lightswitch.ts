import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { formControlStyles } from '../../base/form-control.styles.js';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { hasInstructionContent, readLegacyInstructions } from '../../internal/field-labels.js';
import { MirrorValidator, RequiredValidator } from '../../validators/index.js';
import { pkLightswitchStyles } from './pk-lightswitch.styles.js';

const CHECK_ICON = html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true">
        <path fill="currentColor" d="M557.5 192L534.9 214.6L278.9 470.6C266.4 483.1 246.1 483.1 233.6 470.6L105.6 342.6L83 320L128.3 274.7C129.6 276 172.3 318.7 256.3 402.7L489.7 169.3L512.3 146.7L557.6 192z" />
    </svg>
`;

export type PkLightswitchSize = 'default' | 'sm' | 'xs' | 'xxs';

/**
 * Craft lightswitch —  switch API (`role="switch"`), form-associated.
 *
 * @slot - Switch label
 * @slot instructions - Instructions text (or use `instructions` attribute)
 * @slot hint - Alias for `instructions`
 *
 * @csspart base - Root wrapper
 * @csspart switch - Switch button
 * @csspart thumb - Thumb element
 * @csspart label - Label text
 * @csspart instructions - Instructions text
 * @csspart input - Hidden checkbox input
 */
@customElement('pk-lightswitch')
export class PkLightswitch extends PkFormAssociatedElement {
    static override shadowRootOptions: ShadowRootInit = {
        mode: 'open',
        delegatesFocus: true,
    };

    static override styles = [formControlStyles, pkLightswitchStyles];

    static override get validators() {
        return [...super.validators, MirrorValidator(), RequiredValidator({ validationProperty: 'checked' })];
    }

    override assumeInteractionOn = ['change'];

    private readonly hasSlotController = new HasSlotController(this, 'instructions', 'hint');

    @property({ type: Boolean, reflect: true })
    checked = false;

    @property({ attribute: 'default-checked', type: Boolean })
    defaultChecked = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property({ reflect: true })
    size: PkLightswitchSize = 'default';

    @property()
    value = 'on';

    @property()
    label = '';

    @property()
    instructions = '';

    @query('.input')
    override input!: HTMLInputElement;

    @query('[part="switch"]')
    private switchElement!: HTMLButtonElement;

    override connectedCallback(): void {
        this.instructions = readLegacyInstructions(this, this.instructions);
        super.connectedCallback();
    }

    protected override get validationTarget(): HTMLElement {
        return this.input;
    }

    protected override syncFormValue(): void {
        this.setFormValue(this.checked ? this.value : null, this.checked ? 'on' : 'off');
    }

    protected override resetToDefaultValue(): void {
        this.checked = this.defaultChecked;
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (state === 'on' || state === this.value) {
            this.checked = true;
        } else {
            this.checked = false;
        }
    }

    override updated(changed: PropertyValues): void {
        if (this.input && changed.has('checked')) {
            this.input.checked = this.checked;
        }

        super.updated(changed);
    }

    click(): void {
        this.switchElement?.click();
    }

    override focus(options?: FocusOptions): void {
        this.switchElement?.focus(options);
    }

    override blur(): void {
        this.switchElement?.blur();
    }

    private toggle(): void {
        if (this.disabled) {
            return;
        }

        this.checked = !this.checked;
        this.emitCheckedChange();
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const isRtl = this.matches(':dir(rtl)');

        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this.toggle();
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.checked = isRtl;
            this.emitCheckedChange();
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.checked = !isRtl;
            this.emitCheckedChange();
        }
    }

    private emitCheckedChange(): void {
        this.hasInteracted = true;

        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    private handleLabelClick(event: Event): void {
        if (this.disabled || event.target === this.switchElement) {
            return;
        }

        this.toggle();
    }

    private hasLabelContent(): boolean {
        if (this.label) {
            return true;
        }

        const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;

        if (!slot) {
            return false;
        }

        return slot.assignedNodes({ flatten: true }).some((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return Boolean(node.textContent?.trim());
            }

            return node.nodeType === Node.ELEMENT_NODE;
        });
    }

    override render() {
        const hasInstructions = hasInstructionContent(
            (name, flag) => this.hasSlotController.test(name, flag),
            this.instructions,
        );
        const hasLabel = this.hasLabelContent();

        return html`
            <div part="base" class="base">
                <button
                    part="switch"
                    class="switch"
                    type="button"
                    role="switch"
                    ?disabled=${this.disabled}
                    aria-checked=${this.checked ? 'true' : 'false'}
                    aria-invalid=${this.invalid ? 'true' : nothing}
                    aria-describedby=${hasInstructions ? 'instructions' : nothing}
                    aria-labelledby=${hasLabel ? 'label' : nothing}
                    @click=${this.toggle}
                    @keydown=${this.handleKeyDown}
                >
                    <span part="thumb" class="thumb">${CHECK_ICON}</span>
                </button>
                <input
                    part="input"
                    class="input"
                    type="checkbox"
                    tabindex="-1"
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    value=${this.value}
                    aria-invalid=${this.invalid ? 'true' : nothing}
                    @change=${(event: Event) => event.stopPropagation()}
                />
                ${hasLabel || hasInstructions
                    ? html`
                        <div class="content" @click=${this.handleLabelClick}>
                            ${hasLabel
                                ? html`
                                    <span part="label" class="label" id="label">
                                        <slot></slot>${this.label}
                                    </span>
                                `
                                : nothing}
                            ${hasInstructions
                                ? html`
                                    <span part="instructions" class="instructions form-control__instructions" id="instructions">
                                        <slot name="instructions">${this.instructions}</slot>
                                        <slot name="hint"></slot>
                                    </span>
                                `
                                : nothing}
                        </div>
                    `
                    : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-lightswitch': PkLightswitch;
    }
}
