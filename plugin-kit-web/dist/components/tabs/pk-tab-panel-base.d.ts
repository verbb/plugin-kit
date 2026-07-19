import { PkElement } from '../../base/pk-element.js';
/** Shared tab panel behaviour for all tab variants. */
export declare class PkTabPanelBase extends PkElement {
    value: string;
    hidden: boolean;
    tabId?: string;
    protected renderPanel(className: string): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=pk-tab-panel-base.d.ts.map