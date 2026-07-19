import { PkTabBase } from './pk-tab-base.js';
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
export declare class PkTab extends PkTabBase {
    static styles: import('lit').CSSResult;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-tab': PkTab;
    }
}
//# sourceMappingURL=pk-tab.d.ts.map