import { PkElement } from '../../base/pk-element.js';
export type PkSpinnerVariant = 'default' | 'primary' | 'secondary' | 'dashed' | 'outline' | 'transparent';
export type PkSpinnerSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PkSpinnerTone = 'sky' | 'emerald' | 'violet' | 'amber';
/**
 * Loading indicator — mirrors plugin-kit-ui / plugin-kit-react Spinner.
 *
 * @csspart base - The spinning ring element
 */
export declare class PkSpinner extends PkElement {
    static styles: import('lit').CSSResult[];
    variant: PkSpinnerVariant;
    size: PkSpinnerSize;
    tone?: PkSpinnerTone;
    centered: boolean;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-spinner': PkSpinner;
    }
}
//# sourceMappingURL=pk-spinner.d.ts.map