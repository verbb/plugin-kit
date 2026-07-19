import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';

/** Visual separator between dropdown items. */
@customElement('pk-dropdown-separator')
export class PkDropdownSeparator extends PkElement {
    static override styles = css`
        @layer pk-component {
            :host {
                display: block;
            }

            hr {
                display: block;
                height: 1px;
                margin: 4px 0;
                border: 0;
                padding: 0;
                background: var(--pk-color-slate-200);
            }
        }
    `;

    override connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'separator');
    }

    override render() {
        return html`<hr part="base" />`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-dropdown-separator': PkDropdownSeparator;
    }
}
