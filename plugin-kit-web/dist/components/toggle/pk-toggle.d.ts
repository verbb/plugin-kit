import { PkElement } from '../../base/pk-element.js';
export type PkToggleVariant = 'default' | 'outline';
export type PkToggleSize = 'default' | 'sm' | 'lg';
/**
 * Two-state toggle button.
 *
 * @slot - Button label or icon content
 *
 * @csspart base - Toggle button element
 */
export declare class PkToggle extends PkElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import('lit').CSSResult[];
    pressed: boolean;
    disabled: boolean;
    variant: PkToggleVariant;
    size: PkToggleSize;
    value: string;
    ariaLabel: string | null;
    private handleClick;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-toggle': PkToggle;
    }
}
//# sourceMappingURL=pk-toggle.d.ts.map