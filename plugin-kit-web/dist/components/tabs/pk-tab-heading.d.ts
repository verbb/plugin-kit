import { PkElement } from '../../base/pk-element.js';
/**
 * Non-interactive group heading inside `pk-tabs` `slot="nav"`.
 * Use between `pk-tab` triggers (especially with `variant="sidebar"`).
 *
 * @slot - Heading text
 *
 * @csspart heading - Heading container
 */
export declare class PkTabHeading extends PkElement {
    static styles: import('lit').CSSResult;
    connectedCallback(): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-tab-heading': PkTabHeading;
    }
}
//# sourceMappingURL=pk-tab-heading.d.ts.map