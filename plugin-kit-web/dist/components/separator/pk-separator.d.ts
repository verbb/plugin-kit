import { PropertyValues } from 'lit';
import { PkElement } from '../../base/pk-element.js';
export type PkSeparatorOrientation = 'horizontal' | 'vertical';
/**
 * Visual divider between related content.
 *
 * Default rhythm uses an inner `.line` (not `:host` margin) so outer resets
 * like Tailwind preflight cannot zero the spacing.
 *
 * @csspart base - Painted rule (inner line)
 */
export declare class PkSeparator extends PkElement {
    static styles: import('lit').CSSResult;
    orientation: PkSeparatorOrientation;
    connectedCallback(): void;
    updated(changed: PropertyValues): void;
    private syncAriaOrientation;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-separator': PkSeparator;
    }
}
//# sourceMappingURL=pk-separator.d.ts.map