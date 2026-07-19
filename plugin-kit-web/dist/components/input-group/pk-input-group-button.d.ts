import { PkElement } from '../../base/pk-element.js';
export type PkInputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';
/**
 * Compact button for use inside an input-group addon.
 *
 * @slot - Button label or icon
 *
 * @csspart base - Button element
 */
export declare class PkInputGroupButton extends PkElement {
    static styles: import('lit').CSSResult;
    variant: string;
    size: PkInputGroupButtonSize;
    disabled: boolean;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group-button': PkInputGroupButton;
    }
}
//# sourceMappingURL=pk-input-group-button.d.ts.map