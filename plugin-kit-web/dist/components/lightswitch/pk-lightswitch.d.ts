import { PropertyValues } from 'lit';
import { PkFormAssociatedElement } from '../../base/pk-form-associated-element.js';
export type PkLightswitchSize = 'default' | 'sm' | 'xs' | 'xxs';
/**
 * Craft lightswitch —  switch API (`role="switch"`), form-associated.
 *
 * @slot - Switch label
 * @slot instructions - Instructions text (or use `instructions` attribute)
 * @slot hint - Alias for `instructions`
 *
 * @csspart base - Root wrapper
 * @csspart switch - Switch button
 * @csspart thumb - Thumb element
 * @csspart label - Label text
 * @csspart instructions - Instructions text
 * @csspart input - Hidden checkbox input
 */
export declare class PkLightswitch extends PkFormAssociatedElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import('lit').CSSResult[];
    static get validators(): import('../../index.js').PkValidator[];
    assumeInteractionOn: string[];
    private readonly hasSlotController;
    checked: boolean;
    defaultChecked: boolean;
    invalid: boolean;
    size: PkLightswitchSize;
    value: string;
    label: string;
    instructions: string;
    input: HTMLInputElement;
    private switchElement;
    connectedCallback(): void;
    protected get validationTarget(): HTMLElement;
    protected syncFormValue(): void;
    protected resetToDefaultValue(): void;
    protected restoreFormState(state: string | File | FormData | null): void;
    updated(changed: PropertyValues): void;
    click(): void;
    focus(options?: FocusOptions): void;
    blur(): void;
    private toggle;
    private handleKeyDown;
    private emitCheckedChange;
    private handleLabelClick;
    private hasLabelContent;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-lightswitch': PkLightswitch;
    }
}
//# sourceMappingURL=pk-lightswitch.d.ts.map