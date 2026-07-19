import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { pkTabHeadingStyles } from './pk-tab-heading.styles.js';

/**
 * Non-interactive group heading inside `pk-tabs` `slot="nav"`.
 * Use between `pk-tab` triggers (especially with `variant="sidebar"`).
 *
 * @slot - Heading text
 *
 * @csspart heading - Heading container
 */
@customElement('pk-tab-heading')
export class PkTabHeading extends PkElement {
    static override styles = pkTabHeadingStyles;

    override connectedCallback(): void {
        super.connectedCallback();
        // Keep out of the tablist accessibility tree — only pk-tab triggers are tabs.
        this.setAttribute('role', 'presentation');
    }

    override render() {
        return html`
            <div part="heading" class="heading">
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-tab-heading': PkTabHeading;
    }
}
