import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkInputGroupTextStyles } from './pk-input-group-text.styles.js';

/**
 * Muted label text inside an input-group addon.
 *
 * @slot - Text content
 *
 * @csspart base - Text container
 */
@customElement('pk-input-group-text')
export class PkInputGroupText extends PkElement {
    static override styles = pkInputGroupTextStyles;

    override render() {
        return html`
            <span part="base" class="text">
                <slot></slot>
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group-text': PkInputGroupText;
    }
}
