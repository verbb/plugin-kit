import { default as React } from 'react';
import { PkInputGroup } from '@verbb/plugin-kit-web/components/input-group/pk-input-group.js';
import { PkInputGroupAddon, PkInputGroupAddonAlign } from '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js';
import { PkInputGroupButton, PkInputGroupButtonSize } from '@verbb/plugin-kit-web/components/input-group/pk-input-group-button.js';
import { PkInputGroupInput, PkInputGroupInputSize } from '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js';
import { PkInputGroupText } from '@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js';
import { PkInputGroupTextarea } from '@verbb/plugin-kit-web/components/input-group/pk-input-group-textarea.js';
/** React facades over the `<pk-input-group>` family. Behavior and styles live in the web components. */
export declare const PkInputGroupElement: import('@lit/react').ReactWebComponent<PkInputGroup, {}>;
export declare const PkInputGroupAddonElement: import('@lit/react').ReactWebComponent<PkInputGroupAddon, {}>;
export declare const PkInputGroupButtonElement: import('@lit/react').ReactWebComponent<PkInputGroupButton, {}>;
export declare const PkInputGroupInputElement: import('@lit/react').ReactWebComponent<PkInputGroupInput, {
    onInput: string;
    onChange: string;
}>;
export declare const PkInputGroupTextElement: import('@lit/react').ReactWebComponent<PkInputGroupText, {}>;
export declare const PkInputGroupTextareaElement: import('@lit/react').ReactWebComponent<PkInputGroupTextarea, {
    onInput: string;
    onChange: string;
}>;
export declare const InputGroup: import('@lit/react').ReactWebComponent<PkInputGroup, {}>;
export declare const InputGroupAddon: import('@lit/react').ReactWebComponent<PkInputGroupAddon, {}>;
export declare const InputGroupButton: import('@lit/react').ReactWebComponent<PkInputGroupButton, {}>;
export declare const InputGroupInput: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkInputGroupInput>, "onChange" | "onInput" | "value" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "inputElement" | "type" | "size" | "placeholder" | "readonly" | "invalid" | "autocomplete"> & {
    onInput?: ((e: Event) => void) | undefined;
    onChange?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkInputGroupInput, keyof HTMLElement>> & React.RefAttributes<PkInputGroupInput>, "ref"> & React.RefAttributes<PkInputGroupInput>>;
export declare const InputGroupText: import('@lit/react').ReactWebComponent<PkInputGroupText, {}>;
export declare const InputGroupTextarea: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkInputGroupTextarea>, "onChange" | "onInput" | "value" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "disabled" | "placeholder" | "readonly" | "invalid" | "textareaElement" | "rows"> & {
    onInput?: ((e: Event) => void) | undefined;
    onChange?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkInputGroupTextarea, keyof HTMLElement>> & React.RefAttributes<PkInputGroupTextarea>, "ref"> & React.RefAttributes<PkInputGroupTextarea>>;
export type InputGroupProps = React.ComponentProps<typeof PkInputGroupElement>;
export type InputGroupAddonProps = React.ComponentProps<typeof PkInputGroupAddonElement>;
export type InputGroupButtonProps = React.ComponentProps<typeof PkInputGroupButtonElement>;
export type InputGroupInputProps = React.ComponentProps<typeof PkInputGroupInputElement>;
export type InputGroupTextProps = React.ComponentProps<typeof PkInputGroupTextElement>;
export type InputGroupTextareaProps = React.ComponentProps<typeof PkInputGroupTextareaElement>;
export type { PkInputGroupAddonAlign, PkInputGroupButtonSize, PkInputGroupInputSize };
//# sourceMappingURL=InputGroup.d.ts.map