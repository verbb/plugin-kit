import { customElement } from 'lit/decorators.js';

import { PkTabBase } from './pk-tab-base.js';
import { pkTabStyles } from './pk-tab.styles.js';

/**
 * Tab trigger — use inside `pk-tabs` with `slot="nav"`.
 *
 * @slot - Tab label
 * @slot icon - Optional leading content (icon, logo, etc.)
 * @slot status - Optional trailing content (status dot, badge, etc.)
 *
 * @csspart trigger - Tab button
 * @csspart icon - Icon slot wrapper (hidden when empty)
 * @csspart label - Label slot wrapper
 * @csspart status - Status slot wrapper (hidden when empty)
 */
@customElement('pk-tab')
export class PkTab extends PkTabBase {
    static override styles = pkTabStyles;

    override render() {
        return this.renderTrigger('trigger pk-tabs__trigger');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-tab': PkTab;
    }
}
