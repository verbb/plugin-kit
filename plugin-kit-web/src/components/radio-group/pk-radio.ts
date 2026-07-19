import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { PkElement } from '../../base/pk-element.js';
import { pkRadioStyles } from './pk-radio.styles.js';

/**
 * Radio button — use inside `pk-radio-group`.
 *
 * @slot - Visible label text
 *
 * @csspart base - Root label element
 * @csspart input - Native radio input
 * @csspart control - Visual radio circle
 * @csspart indicator - Indicator container
 */
@customElement('pk-radio')
export class PkRadio extends PkElement {
    static override styles = pkRadioStyles;

    @property()
    value = '';

    @property({ type: Boolean, reflect: true })
    checked = false;

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    invalid = false;

    @property({ type: Boolean, reflect: true })
    required = false;

    @property({ type: Number })
    tabIndex = -1;

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    /** Set by `pk-radio-group` when the group is disabled. */
    @property({ type: Boolean, attribute: false })
    forceDisabled = false;

    @query('.input')
    private input!: HTMLInputElement;

    @state()
    private hasDefaultSlotContent = false;

    override updated(changed: PropertyValues): void {
        if (this.input && changed.has('checked')) {
            this.input.checked = this.checked;
        }

        if (this.input && changed.has('tabIndex')) {
            this.input.tabIndex = this.tabIndex;
        }
    }

    focusControl(options?: FocusOptions): void {
        this.input.focus(options);
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
        event.stopPropagation();
        const input = event.target as HTMLInputElement;

        if (this.disabled || this.forceDisabled || !input.checked) {
            return;
        }

        this.dispatchEvent(new CustomEvent('pk-radio-select', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    override render() {
        const isDisabled = this.disabled || this.forceDisabled;

        return html`
            <label
                part="base"
                class=${classMap({
                    item: true,
                    'pk-radio-group__item': true,
                    'item--with-label': this.hasDefaultSlotContent,
                })}
                data-state=${this.checked ? 'checked' : nothing}
                ?data-disabled=${isDisabled}
                aria-disabled=${isDisabled ? 'true' : nothing}
            >
                <span part="control" class="control pk-radio-group__control">
                    <span part="indicator" class="indicator pk-radio-group__indicator">
                        <span class="indicator-dot pk-radio-group__indicator-dot"></span>
                    </span>
                </span>
                <input
                    part="input"
                    class="input"
                    type="radio"
                    .checked=${this.checked}
                    ?disabled=${isDisabled}
                    ?required=${this.required}
                    value=${this.value}
                    tabindex=${this.tabIndex}
                    aria-label=${this.ariaLabel ?? nothing}
                    aria-invalid=${this.invalid ? 'true' : nothing}
                    aria-checked=${this.checked ? 'true' : 'false'}
                    @change=${this.handleChange}
                />
                <span
                    class=${classMap({
                        label: true,
                        'is-empty': !this.hasDefaultSlotContent,
                    })}
                >
                    <slot @slotchange=${this.defaultSlotChanged}></slot>
                </span>
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-radio': PkRadio;
    }
}
