import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkButtonGroupTextStyles } from './pk-button-group-text.styles.js';

/**
 * Prefix text span for URL / compound button groups.
 *
 * @slot - Prefix text content
 *
 * @csspart base - Text container
 */
@customElement('pk-button-group-text')
export class PkButtonGroupText extends PkElement {
    static override styles = pkButtonGroupTextStyles;

    override render() {
        return html`
            <span part="base" class="text pk-btn-group__text">
                <slot></slot>
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-button-group-text': PkButtonGroupText;
    }
}
