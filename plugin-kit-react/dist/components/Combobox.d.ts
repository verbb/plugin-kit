import { default as React } from 'react';
import { PkCombobox, PkComboboxAsyncOption, PkComboboxFetchHandler, PkComboboxFilter, PkComboboxSize } from '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
declare const PkComboboxElement: import('@lit/react').ReactWebComponent<PkCombobox, {
    onPkChange: string;
    onPkClear: string;
    onPkCreate: string;
    onInput: string;
    onChange: string;
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
    onPkOpenChange: string;
}>;
type PkComboboxElementProps = React.ComponentProps<typeof PkComboboxElement>;
/** React facade over `<pk-combobox>`. Behavior and styles live in the web component. */
export declare const Combobox: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkCombobox>, "defaultValue" | "onChange" | "onInput" | "form" | "show" | "hide" | "open" | "input" | "label" | "filter" | "values" | "value" | "firstUpdated" | "updated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "instructions" | "required" | "name" | "size" | "placeholder" | "invalid" | "onPkShow" | "onPkAfterShow" | "onPkHide" | "onPkAfterHide" | "onPkOpenChange" | "placement" | "sideOffset" | "multiple" | "onPkChange" | "assumeInteractionOn" | "validators" | "customError" | "valueHasChanged" | "hasInteracted" | "formResetCallback" | "formDisabledCallback" | "formStateRestoreCallback" | "labels" | "validity" | "willValidate" | "validationMessage" | "getForm" | "checkValidity" | "reportValidity" | "resetValidity" | "setCustomValidity" | "onPkClear" | "withClear" | "width" | "clearable" | "defaultValues" | "loopFocus" | "onPkCreate" | "allowCreate" | "allowCustomValue" | "autoHighlight" | "popupMode" | "searchPlaceholder" | "emptyMessage" | "async" | "loadingMessage" | "startTypingMessage" | "fetchOptions"> & {
    onPkChange?: ((e: Event) => void) | undefined;
    onPkClear?: ((e: Event) => void) | undefined;
    onPkCreate?: ((e: Event) => void) | undefined;
    onInput?: ((e: Event) => void) | undefined;
    onChange?: ((e: Event) => void) | undefined;
    onPkShow?: ((e: Event) => void) | undefined;
    onPkAfterShow?: ((e: Event) => void) | undefined;
    onPkHide?: ((e: Event) => void) | undefined;
    onPkAfterHide?: ((e: Event) => void) | undefined;
    onPkOpenChange?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkCombobox, keyof HTMLElement>> & React.RefAttributes<PkCombobox>, "ref"> & React.RefAttributes<PkCombobox>>;
export { PkComboboxElement };
export type ComboboxProps = PkComboboxElementProps;
export type { PkComboboxAsyncOption, PkComboboxFetchHandler, PkComboboxFilter, PkComboboxSize };
//# sourceMappingURL=Combobox.d.ts.map