import { PkTabPanelBase } from './pk-tab-panel-base.js';
/**
 * Tab panel — use inside `pk-tabs` default slot.
 *
 * @slot - Panel content
 *
 * @csspart content - Panel container
 */
export declare class PkTabPanel extends PkTabPanelBase {
    static styles: import('lit').CSSResult;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-tab-panel': PkTabPanel;
    }
}
//# sourceMappingURL=pk-tab-panel.d.ts.map