import { default as React } from 'react';
import { PkTextarea, PkTextareaSize } from '@verbb/plugin-kit-web/components/textarea/pk-textarea.js';
declare const PkTextareaElement: import('@lit/react').ReactWebComponent<PkTextarea, {
    onInput: string;
    onChange: string;
    onFocus: string;
    onBlur: string;
}>;
type PkTextareaElementProps = React.ComponentProps<typeof PkTextareaElement>;
/** React facade over `<pk-textarea>`. Behavior and styles live in the web component. */
export declare const Textarea: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkTextarea>, "defaultValue" | "onFocus" | "onBlur" | "onChange" | "onInput" | "form" | "input" | "label" | "value" | "firstUpdated" | "updated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "instructions" | "required" | "name" | "size" | "placeholder" | "readonly" | "invalid" | "rows" | "assumeInteractionOn" | "validators" | "customError" | "valueHasChanged" | "hasInteracted" | "formResetCallback" | "formDisabledCallback" | "formStateRestoreCallback" | "labels" | "validity" | "willValidate" | "validationMessage" | "getForm" | "checkValidity" | "reportValidity" | "resetValidity" | "setCustomValidity" | "fitCell" | "withLabel" | "withInstructions" | "maxlength"> & {
    onInput?: ((e: Event) => void) | undefined;
    onChange?: ((e: Event) => void) | undefined;
    onFocus?: ((e: Event) => void) | undefined;
    onBlur?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkTextarea, keyof HTMLElement>> & React.RefAttributes<PkTextarea>, "ref"> & React.RefAttributes<PkTextarea>>;
export type TextareaProps = PkTextareaElementProps;
export type { PkTextareaSize };
//# sourceMappingURL=Textarea.d.ts.map