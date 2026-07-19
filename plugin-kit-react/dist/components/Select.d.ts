import { default as React } from 'react';
import { PkOption } from '@verbb/plugin-kit-web/components/select/pk-option.js';
import { PkOptionGroup } from '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import { PkSelect, PkSelectSize } from '@verbb/plugin-kit-web/components/select/pk-select.js';
declare const PkSelectElement: import('@lit/react').ReactWebComponent<PkSelect, {
    onPkChange: string;
    onPkClear: string;
    onInput: string;
    onChange: string;
    onFocusOut: string;
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
    onPkOpenChange: string;
}>;
declare const PkOptionElement: import('@lit/react').ReactWebComponent<PkOption, {
    onPkOptionSelect: string;
    onPkOptionHighlight: string;
}>;
export declare const PkOptionGroupElement: import('@lit/react').ReactWebComponent<PkOptionGroup, {}>;
type PkSelectElementProps = React.ComponentProps<typeof PkSelectElement>;
type PkOptionElementProps = React.ComponentProps<typeof PkOptionElement>;
/** React facades over the `<pk-select>` family. Behavior and styles live in the web components. */
export declare const Select: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkSelect>, "defaultValue" | "onChange" | "onInput" | "form" | "show" | "hide" | "open" | "input" | "values" | "value" | "firstUpdated" | "updated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "required" | "name" | "size" | "placeholder" | "invalid" | "onPkShow" | "onPkAfterShow" | "onPkHide" | "onPkAfterHide" | "onPkOpenChange" | "placement" | "sideOffset" | "multiple" | "onPkChange" | "assumeInteractionOn" | "validators" | "customError" | "valueHasChanged" | "hasInteracted" | "formResetCallback" | "formDisabledCallback" | "formStateRestoreCallback" | "labels" | "validity" | "willValidate" | "validationMessage" | "getForm" | "checkValidity" | "reportValidity" | "resetValidity" | "setCustomValidity" | "onPkClear" | "withClear" | "width" | "clearable" | "defaultValues" | "loopFocus" | "onFocusOut"> & {
    onPkChange?: ((e: Event) => void) | undefined;
    onPkClear?: ((e: Event) => void) | undefined;
    onInput?: ((e: Event) => void) | undefined;
    onChange?: ((e: Event) => void) | undefined;
    onFocusOut?: ((e: Event) => void) | undefined;
    onPkShow?: ((e: Event) => void) | undefined;
    onPkAfterShow?: ((e: Event) => void) | undefined;
    onPkHide?: ((e: Event) => void) | undefined;
    onPkAfterHide?: ((e: Event) => void) | undefined;
    onPkOpenChange?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkSelect, keyof HTMLElement>> & React.RefAttributes<PkSelect>, "ref"> & React.RefAttributes<PkSelect>>;
export declare const Option: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkOption>, "label" | "value" | "firstUpdated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "focusControl" | "onPkOptionSelect" | "onPkOptionHighlight" | "selected" | "highlighted" | "focusIndex" | "optionId" | "matchQuery" | "getLabel" | "getSearchText" | "getStartElements"> & {
    onPkOptionSelect?: ((e: Event) => void) | undefined;
    onPkOptionHighlight?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkOption, keyof HTMLElement>> & React.RefAttributes<PkOption>, "ref"> & React.RefAttributes<PkOption>>;
export declare const OptionGroup: import('@lit/react').ReactWebComponent<PkOptionGroup, {}>;
export { PkSelectElement, PkOptionElement };
export type SelectProps = PkSelectElementProps;
export type OptionProps = PkOptionElementProps;
export type OptionGroupProps = React.ComponentProps<typeof PkOptionGroupElement>;
export type { PkSelectSize };
//# sourceMappingURL=Select.d.ts.map