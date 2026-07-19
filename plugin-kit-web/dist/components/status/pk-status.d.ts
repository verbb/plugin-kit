import { PkElement } from '../../base/pk-element.js';
export type PkStatusVariant = 'all' | 'on' | 'live' | 'active' | 'enabled' | 'off' | 'suspended' | 'expired' | 'warning' | 'pending' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'turquoise' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'light' | 'gray' | 'grey' | 'white' | 'black' | 'disabled' | 'inactive';
/**
 * Compact semantic status indicator dot.
 *
 * @csspart base - Status dot element
 */
export declare class PkStatus extends PkElement {
    static styles: import('lit').CSSResult;
    status: PkStatusVariant;
    ariaLabel: string | null;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-status': PkStatus;
    }
}
//# sourceMappingURL=pk-status.d.ts.map