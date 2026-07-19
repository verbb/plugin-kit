import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkInputGroupButtonStyles } from './pk-input-group-button.styles.js';

export type PkInputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';

/**
 * Compact button for use inside an input-group addon.
 *
 * @slot - Button label or icon
 *
 * @csspart base - Button element
 */
@customElement('pk-input-group-button')
export class PkInputGroupButton extends PkElement {
    static override styles = pkInputGroupButtonStyles;

    @property({ reflect: true })
    variant = 'none';

    @property({ reflect: true })
    size: PkInputGroupButtonSize = 'xs';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    override render() {
        return html`
            <pk-button
                part="base"
                variant=${this.variant}
                size=${this.size === 'icon-xs' || this.size === 'icon-sm' ? 'xs' : 'xs'}
                ?disabled=${this.disabled}
            >
                <slot></slot>
            </pk-button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group-button': PkInputGroupButton;
    }
}
