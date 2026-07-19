import { default as React } from 'react';
import { PkRadio } from '@verbb/plugin-kit-web/components/radio-group/pk-radio.js';
import { PkRadioGroup, PkRadioGroupOrientation } from '@verbb/plugin-kit-web/components/radio-group/pk-radio-group.js';
declare const PkRadioGroupElement: import('@lit/react').ReactWebComponent<PkRadioGroup, {
    onPkChange: string;
    onInput: string;
    onChange: string;
}>;
declare const PkRadioElement: import('@lit/react').ReactWebComponent<PkRadio, {
    onPkRadioSelect: string;
}>;
type PkRadioGroupElementProps = React.ComponentProps<typeof PkRadioGroupElement>;
type PkRadioElementProps = React.ComponentProps<typeof PkRadioElement>;
/** React facade over `<pk-radio-group>`. Behavior and styles live in the web component. */
export declare const RadioGroup: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkRadioGroup>, "defaultValue" | "onChange" | "onInput" | "form" | "input" | "label" | "value" | "orientation" | "firstUpdated" | "updated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "instructions" | "required" | "name" | "invalid" | "onPkChange" | "assumeInteractionOn" | "validators" | "customError" | "valueHasChanged" | "hasInteracted" | "formResetCallback" | "formDisabledCallback" | "formStateRestoreCallback" | "labels" | "validity" | "willValidate" | "validationMessage" | "getForm" | "checkValidity" | "reportValidity" | "resetValidity" | "setCustomValidity"> & {
    onPkChange?: ((e: Event) => void) | undefined;
    onInput?: ((e: Event) => void) | undefined;
    onChange?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkRadioGroup, keyof HTMLElement>> & React.RefAttributes<PkRadioGroup>, "ref"> & React.RefAttributes<PkRadioGroup>>;
export declare const Radio: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkRadio>, "value" | "updated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "required" | "invalid" | "checked" | "onPkRadioSelect" | "forceDisabled" | "focusControl"> & {
    onPkRadioSelect?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkRadio, keyof HTMLElement>> & React.RefAttributes<PkRadio>, "ref"> & React.RefAttributes<PkRadio>>;
export { PkRadioGroupElement, PkRadioElement };
export type RadioGroupProps = PkRadioGroupElementProps;
export type RadioProps = PkRadioElementProps;
export type { PkRadioGroupOrientation };
//# sourceMappingURL=RadioGroup.d.ts.map