import { PkElement } from '../../base/pk-element.js';
export type PkButtonGroupSeparatorOrientation = 'horizontal' | 'vertical';
/**
 * Vertical separator for button groups.
 *
 * @csspart base - Separator element
 */
export declare class PkButtonGroupSeparator extends PkElement {
    static styles: import('lit').CSSResult;
    orientation: PkButtonGroupSeparatorOrientation;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-button-group-separator': PkButtonGroupSeparator;
    }
}
//# sourceMappingURL=pk-button-group-separator.d.ts.map