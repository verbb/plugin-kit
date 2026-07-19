import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
export type PkRadioGroupOrientation = 'horizontal' | 'vertical';
/**
 * Radio group —  pattern: light-DOM `pk-radio` children, shared value + validation.
 *
 * @slot label - Group label
 * @slot instructions - Instructions text
 * @slot hint - Alias for `instructions`
 * @slot - `pk-radio` items
 *
 * @csspart form-control - Form control wrapper
 * @csspart label - Label text
 * @csspart radios - Radio items container
 * @csspart instructions - Instructions text
 */
export declare class PkRadioGroup extends PkFormAssociatedElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    private _value;
    get value(): string;
    set value(val: string | null);
    /** Default value — reflected as the `value` attribute. */
    defaultValue: string;
    orientation: PkRadioGroupOrientation;
    invalid: boolean;
    label: string;
    instructions: string;
    ariaLabel: string | null;
    private defaultSlot;
    private items;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    protected get validationTarget(): HTMLElement | undefined;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: PropertyValues): void;
    formResetCallback(): void;
    focus(options?: FocusOptions): void;
    private getAllRadios;
    private syncItems;
    private getEnabledItems;
    private applySelection;
    private handleRadioClick;
    private handleKeyDown;
    private emitValueChange;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-radio-group': PkRadioGroup;
    }
}
//# sourceMappingURL=pk-radio-group.d.ts.map