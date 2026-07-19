import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkToggleStyles } from './pk-toggle.styles.js';

export type PkToggleVariant = 'default' | 'outline';
export type PkToggleSize = 'default' | 'sm' | 'lg';

/**
 * Two-state toggle button.
 *
 * @slot - Button label or icon content
 *
 * @csspart base - Toggle button element
 */
@customElement('pk-toggle')
export class PkToggle extends PkElement {
    static override shadowRootOptions: ShadowRootInit = {
        mode: 'open',
        delegatesFocus: true,
    };

    static override styles = pkToggleStyles;

    @property({ type: Boolean, reflect: true })
    pressed = false;

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ reflect: true })
    variant: PkToggleVariant = 'default';

    @property({ reflect: true })
    size: PkToggleSize = 'default';

    @property({ attribute: 'data-value' })
    value = '';

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    private handleClick(): void {
        if (this.disabled || this.closest('pk-toggle-group')) {
            return;
        }

        this.pressed = !this.pressed;

        this.dispatchEvent(new CustomEvent('pk-pressed-change', {
            detail: { pressed: this.pressed },
            bubbles: true,
            composed: true,
        }));

        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    override render() {
        return html`
            <button
                part="base"
                class="button"
                type="button"
                ?disabled=${this.disabled}
                aria-pressed=${this.pressed ? 'true' : 'false'}
                aria-label=${this.ariaLabel ?? nothing}
                data-state=${this.pressed ? 'on' : 'off'}
                @click=${this.handleClick}
            >
                <slot></slot>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-toggle': PkToggle;
    }
}
