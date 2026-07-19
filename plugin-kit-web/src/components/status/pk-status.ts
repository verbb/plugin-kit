import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkStatusStyles } from './pk-status.styles.js';

export type PkStatusVariant =
    | 'all' | 'on' | 'live' | 'active' | 'enabled' | 'off' | 'suspended' | 'expired'
    | 'warning' | 'pending' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green'
    | 'emerald' | 'teal' | 'turquoise' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet'
    | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'light' | 'gray' | 'grey' | 'white'
    | 'black' | 'disabled' | 'inactive';

/**
 * Compact semantic status indicator dot.
 *
 * @csspart base - Status dot element
 */
@customElement('pk-status')
export class PkStatus extends PkElement {
    static override styles = pkStatusStyles;

    @property({ reflect: true })
    status: PkStatusVariant = 'on';

    @property({ attribute: 'aria-label' })
    ariaLabel: string | null = null;

    override render() {
        return html`
            <span
                part="base"
                class="status"
                role="status"
                aria-label=${this.ariaLabel ?? nothing}
            ></span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-status': PkStatus;
    }
}
