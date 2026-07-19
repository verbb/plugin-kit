import { customElement } from 'lit/decorators.js';

import { PkTabPanelBase } from './pk-tab-panel-base.js';
import { pkTabPanelStyles } from './pk-tab-panel.styles.js';

/**
 * Tab panel — use inside `pk-tabs` default slot.
 *
 * @slot - Panel content
 *
 * @csspart content - Panel container
 */
@customElement('pk-tab-panel')
export class PkTabPanel extends PkTabPanelBase {
    static override styles = pkTabPanelStyles;

    override render() {
        return this.renderPanel('content pk-tabs__content');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-tab-panel': PkTabPanel;
    }
}
