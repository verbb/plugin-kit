import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { HasSlotController } from '../../internal/has-slot.js';

/** Shared tab trigger behaviour for all tab variants. */
export class PkTabBase extends PkElement {
    @property()
    value = '';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    selected = false;

    @property({ type: Number, attribute: 'focus-index' })
    focusIndex = -1;

    @property()
    panelId?: string;

    /*
     * The icon and status lanes collapse when empty. CSS can't tell (`:has(::slotted(*))` isn't supported, which
     * drops the whole rule), so the lanes are marked filled from their slots instead.
     */
    private readonly laneSlots = new HasSlotController(this, 'icon', 'status');

    focusControl(): void {
        this.shadowRoot?.querySelector<HTMLButtonElement>('.trigger')?.focus();
    }

    protected handleClick(): void {
        if (this.disabled) {
            return;
        }

        this.dispatchEvent(new CustomEvent('pk-tab-select', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    protected handleKeyDown(event: KeyboardEvent): void {
        this.dispatchEvent(new CustomEvent('pk-tab-keydown', {
            detail: { event, value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    protected renderTrigger(className: string) {
        return html`
            <button
                part="trigger"
                type="button"
                class=${className}
                role="tab"
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled ? 'true' : nothing}
                aria-selected=${this.selected ? 'true' : 'false'}
                tabindex=${this.focusIndex}
                aria-controls=${this.panelId ?? nothing}
                @click=${this.handleClick}
                @keydown=${this.handleKeyDown}
            >
                <span part="icon" class=${this.laneSlots.test('icon') ? 'icon is-filled' : 'icon'}>
                    <slot name="icon"></slot>
                </span>
                <span part="label" class="label">
                    <slot></slot>
                </span>
                <span part="status" class=${this.laneSlots.test('status') ? 'status is-filled' : 'status'}>
                    <slot name="status"></slot>
                </span>
            </button>
        `;
    }
}
