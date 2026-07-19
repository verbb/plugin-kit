import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';

/** Shared tab panel behaviour for all tab variants. */
export class PkTabPanelBase extends PkElement {
    @property()
    value = '';

    @property({ type: Boolean, reflect: true })
    hidden = true;

    @property()
    tabId?: string;

    protected renderPanel(className: string) {
        return html`
            <div
                part="content"
                class=${className}
                role="tabpanel"
                id=${this.tabId ?? nothing}
                aria-labelledby=${this.tabId ?? nothing}
                aria-hidden=${this.hidden ? 'true' : 'false'}
                tabindex=${this.hidden ? nothing : '0'}
            >
                <slot></slot>
            </div>
        `;
    }
}
