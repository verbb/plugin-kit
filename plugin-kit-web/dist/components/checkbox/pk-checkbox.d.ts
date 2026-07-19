import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
/**
 * –aligned checkbox control.
 *
 * @slot - Checkbox label text
 * @slot hint - Descriptive hint (or use the `hint` attribute)
 *
 * @csspart base - Root label element
 * @csspart input - Native checkbox input
 * @csspart control - Visual checkbox box
 * @csspart label - Label text container
 * @csspart hint - Hint text container
 * @csspart checked-icon - Checked state icon
 * @csspart indeterminate-icon - Indeterminate state icon
 */
export declare class PkCheckbox extends PkFormAssociatedElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    invalid: boolean;
    checkboxValue: string;
    defaultChecked: boolean;
    ariaLabel: string | null;
    /** Descriptive hint — use the `hint` slot for HTML content. */
    hint: string;
    /** Only required for SSR when slotting a hint. */
    withHint: boolean;
    input: HTMLInputElement;
    private hasDefaultSlotContent;
    protected get validationTarget(): HTMLElement;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    updated(changed: PropertyValues): void;
    private defaultSlotChanged;
    private handleChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-checkbox': PkCheckbox;
    }
}
//# sourceMappingURL=pk-checkbox.d.ts.map