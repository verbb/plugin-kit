import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkDropdownLabelStyles } from './pk-dropdown-label.styles.js';

/** Non-interactive group label inside `pk-dropdown-menu`. */
@customElement('pk-dropdown-label')
export class PkDropdownLabel extends PkElement {
    static override styles = pkDropdownLabelStyles;

    override connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'presentation');
    }

    override render() {
        return html`
            <div part="label" class="label">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-dropdown-label': PkDropdownLabel;
    }
}
