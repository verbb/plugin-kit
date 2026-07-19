import { default as React } from 'react';
import { PkInput, PkInputSize } from '@verbb/plugin-kit-web/components/input/pk-input.js';
declare const PkInputElement: import('@lit/react').ReactWebComponent<PkInput, {
    onInput: string;
    onChange: string;
    onPkClear: string;
    onFocus: string;
    onBlur: string;
}>;
type PkInputElementProps = React.ComponentProps<typeof PkInputElement>;
/** React facade over `<pk-input>`. Behavior and styles live in the web component. */
export declare const Input: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkInput>, "defaultValue" | "onFocus" | "onBlur" | "onChange" | "onInput" | "form" | "input" | "label" | "select" | "pattern" | "value" | "firstUpdated" | "updated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "instructions" | "required" | "step" | "name" | "type" | "size" | "placeholder" | "readonly" | "invalid" | "autocomplete" | "min" | "max" | "assumeInteractionOn" | "validators" | "customError" | "valueHasChanged" | "hasInteracted" | "formResetCallback" | "formDisabledCallback" | "formStateRestoreCallback" | "labels" | "validity" | "willValidate" | "validationMessage" | "getForm" | "checkValidity" | "reportValidity" | "resetValidity" | "setCustomValidity" | "fitCell" | "onPkClear" | "withClear" | "withLabel" | "withInstructions" | "mono" | "minlength" | "maxlength"> & {
    onInput?: ((e: Event) => void) | undefined;
    onChange?: ((e: Event) => void) | undefined;
    onPkClear?: ((e: Event) => void) | undefined;
    onFocus?: ((e: Event) => void) | undefined;
    onBlur?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkInput, keyof HTMLElement>> & React.RefAttributes<PkInput>, "ref"> & React.RefAttributes<PkInput>>;
export type InputProps = PkInputElementProps;
export type { PkInputSize };
//# sourceMappingURL=Input.d.ts.map