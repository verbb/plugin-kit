import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkButtonGroupSeparatorStyles } from './pk-button-group-separator.styles.js';

export type PkButtonGroupSeparatorOrientation = 'horizontal' | 'vertical';

/**
 * Vertical separator for button groups.
 *
 * @csspart base - Separator element
 */
@customElement('pk-button-group-separator')
export class PkButtonGroupSeparator extends PkElement {
    static override styles = pkButtonGroupSeparatorStyles;

    @property({ reflect: true })
    orientation: PkButtonGroupSeparatorOrientation = 'vertical';

    override render() {
        return html`
            <div
                part="base"
                class="separator pk-btn-group__separator"
                role="separator"
                aria-orientation=${this.orientation}
                data-orientation=${this.orientation}
            ></div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-button-group-separator': PkButtonGroupSeparator;
    }
}
