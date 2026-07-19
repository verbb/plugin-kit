import { PkElement } from '../../base/pk-element.js';
export type PkInputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
/**
 * Icon, text, or button content alongside an input-group control.
 *
 * Place after the control in the DOM; use `align` to position visually.
 *
 * @slot - Addon content
 *
 * @csspart base - Addon container
 */
export declare class PkInputGroupAddon extends PkElement {
    static styles: import('lit').CSSResult;
    align: PkInputGroupAddonAlign;
    private handleClick;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group-addon': PkInputGroupAddon;
    }
}
//# sourceMappingURL=pk-input-group-addon.d.ts.map