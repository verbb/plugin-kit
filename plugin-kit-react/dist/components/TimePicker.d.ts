import { default as React } from 'react';
import { PkTimePicker } from '@verbb/plugin-kit-web/components/time-picker/pk-time-picker.js';
declare const PkTimePickerElement: import('@lit/react').ReactWebComponent<PkTimePicker, {
    onPkChange: string;
    onPkClear: string;
    onInput: string;
    onChange: string;
}>;
type PkTimePickerElementProps = React.ComponentProps<typeof PkTimePickerElement>;
/** React facade over `<pk-time-picker>`. Behavior and styles live in the web component. */
export declare const TimePicker: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkTimePicker>, "defaultValue" | "onChange" | "onInput" | "form" | "show" | "hide" | "open" | "input" | "values" | "value" | "firstUpdated" | "updated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "required" | "name" | "size" | "placeholder" | "invalid" | "placement" | "sideOffset" | "multiple" | "onPkChange" | "assumeInteractionOn" | "validators" | "customError" | "valueHasChanged" | "hasInteracted" | "formResetCallback" | "formDisabledCallback" | "formStateRestoreCallback" | "labels" | "validity" | "willValidate" | "validationMessage" | "getForm" | "checkValidity" | "reportValidity" | "resetValidity" | "setCustomValidity" | "onPkClear" | "withClear" | "width" | "clearable" | "defaultValues" | "loopFocus"> & {
    onPkChange?: ((e: Event) => void) | undefined;
    onPkClear?: ((e: Event) => void) | undefined;
    onInput?: ((e: Event) => void) | undefined;
    onChange?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkTimePicker, keyof HTMLElement>> & React.RefAttributes<PkTimePicker>, "ref"> & React.RefAttributes<PkTimePicker>>;
export { PkTimePickerElement };
export type TimePickerProps = PkTimePickerElementProps;
//# sourceMappingURL=TimePicker.d.ts.map