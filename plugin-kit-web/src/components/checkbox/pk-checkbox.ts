import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
import { renderCheckboxCheckIcon, renderCheckboxIndeterminateIcon } from '../../icons/checkbox-indicators.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { RequiredValidator } from '../../validators/index.js';
import { pkCheckboxStyles } from './pk-checkbox.styles.js';

/**
 * –aligned checkbox control.
 *
 * @slot - Checkbox label text
 * @slot hint - Descriptive hint (or use the `hint` attribute)
 *
 * @csspart base - Root label element
 * @csspart input - Native checkbox input
 * @csspart control - Visual checkbox box
 * @csspart label - Label text container
 * @csspart hint - Hint text container
 * @csspart checked-icon - Checked state icon
 * @csspart indeterminate-icon - Indeterminate state icon
 */
@customElement('pk-checkbox')
export class PkCheckbox extends PkFormAssociatedElement {
    static override shadowRootOptions: ShadowRootInit = {
        mode: 'open',
        delegatesFocus: true,
    };

    static override styles = pkCheckboxStyles;

    static override get validators() {
        return [...super.validators, RequiredValidator({ validationProperty: 'checked' })];
    }

    override assumeInteractionOn = ['change'];

    private readonly hasSlotController = new HasSlotController(this, 'hint');

    @property({ type: Boolean, reflect: true })
    checked = false;

    @property({ type: Boolean, reflect: true })
    indeterminate = false;

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property()
    checkboxValue = 'on';

    @property({ attribute: 'default-checked', type: Boolean })
    defaultChecked = false;

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    /** Descriptive hint — use the `hint` slot for HTML content. */
    @property()
    hint = '';

    /** Only required for SSR when slotting a hint. */
    @property({ type: Boolean, attribute: 'with-hint' })
    withHint = false;

    @query('.input')
    override input!: HTMLInputElement;

    @state()
    private hasDefaultSlotContent = false;

    protected override get validationTarget(): HTMLElement {
        return this.input;
    }

    protected override syncFormValue(): void {
        this.setFormValue(this.checked ? this.checkboxValue : null, this.checked ? 'on' : 'off');
    }

    protected override resetToDefaultValue(): void {
        this.checked = this.defaultChecked;
        this.indeterminate = false;
    }

    protected override restoreFormState(state: string | File | FormData | null): void {
        if (state === 'on' || state === this.checkboxValue) {
            this.checked = true;
        } else {
            this.checked = false;
        }
    }

    override updated(changed: PropertyValues): void {
        if (!this.input) {
            super.updated(changed);
            return;
        }

        if (changed.has('indeterminate') || changed.has('checked')) {
            this.input.indeterminate = this.indeterminate;
            this.input.checked = this.checked;
        }

        super.updated(changed);
    }

    private defaultSlotChanged(event: Event): void {
        const slot = event.target as HTMLSlotElement;
        this.hasDefaultSlotContent = slot.assignedNodes({ flatten: true }).some((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent?.trim();
            }

            return node.nodeType === Node.ELEMENT_NODE;
        });
    }

    private handleChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.checked = input.checked;
        this.indeterminate = false;

        this.dispatchEvent(new CustomEvent('pk-change', {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    override render() {
        const hasLabel = this.hasDefaultSlotContent;
        const hasHint = Boolean(this.hint) || this.hasSlotController.test('hint', this.withHint);

        return html`
            <label
                part="base"
                class=${classMap({
                    root: true,
                    'root--with-hint': hasHint,
                })}
            >
                <input
                    part="input"
                    class="input"
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    name=${this.name ?? nothing}
                    value=${this.checkboxValue}
                    aria-labelledby=${hasLabel ? 'label' : nothing}
                    aria-describedby=${hasHint ? 'hint' : nothing}
                    aria-label=${!hasLabel ? (this.ariaLabel ?? nothing) : nothing}
                    aria-invalid=${this.invalid ? 'true' : nothing}
                    @change=${this.handleChange}
                />
                <span part="control" class="control">
                    <span part="checked-icon" class="icon-check">${renderCheckboxCheckIcon()}</span>
                    <span part="indeterminate-icon" class="icon-indeterminate">${renderCheckboxIndeterminateIcon()}</span>
                </span>
                ${hasLabel || hasHint
                    ? html`
                        <span class="text">
                            ${hasLabel
                                ? html`
                                    <span part="label" class="label" id="label">
                                        <slot @slotchange=${this.defaultSlotChanged}></slot>
                                    </span>
                                `
                                : html`<slot @slotchange=${this.defaultSlotChanged} hidden></slot>`}
                            ${hasHint
                                ? html`
                                    <span part="hint" class="hint" id="hint">
                                        <slot name="hint">${this.hint}</slot>
                                    </span>
                                `
                                : nothing}
                        </span>
                    `
                    : html`<slot @slotchange=${this.defaultSlotChanged} hidden></slot>`}
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-checkbox': PkCheckbox;
    }
}
