import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
/** Public scale is xs / sm / default / lg (`xl` aliases `lg` for compatibility). */
export type PkColorInputSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
/**
 * Color input — swatch picker + hex text field (Craft ColorInput parity).
 * Form-associated; submits `#rrggbb` or empty string.
 *
 * @csspart swatch - Swatch container
 * @csspart input - Hex text input
 */
export declare class PkColorInput extends PkFormAssociatedElement {
    static styles: import('lit').CSSResult;
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    size: PkColorInputSize;
    fitCell: boolean;
    readonly: boolean;
    invalid: boolean;
    value: string;
    defaultValue: string;
    ariaLabel: string | null;
    input: HTMLInputElement;
    private hexValue;
    connectedCallback(): void;
    protected willUpdate(changed: PropertyValues): void;
    private syncHexFromValue;
    protected get validationTarget(): HTMLElement;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    private emitChange;
    private handleHexInput;
    private handlePickerChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-color-input': PkColorInput;
    }
}
//# sourceMappingURL=pk-color-input.d.ts.map