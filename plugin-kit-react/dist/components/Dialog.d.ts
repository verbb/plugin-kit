import { default as React } from 'react';
import { PkDialog } from '@verbb/plugin-kit-web/components/dialog/pk-dialog.js';
declare const PkDialogElement: import('@lit/react').ReactWebComponent<PkDialog, {
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
    onPkOpenChange: string;
}>;
type PkDialogElementProps = React.ComponentProps<typeof PkDialogElement>;
/** React facade over `<pk-dialog>`. Behavior and styles live in the web component. */
export declare const Dialog: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkDialog>, "show" | "hide" | "open" | "label" | "firstUpdated" | "updated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "size" | "onPkShow" | "onPkAfterShow" | "onPkHide" | "onPkAfterHide" | "onPkOpenChange" | "description" | "disablePointerDismissal" | "withoutHeader" | "withoutBodyPadding" | "closeDialog" | "requestClose" | "forceOverlayReset"> & {
    onPkShow?: ((e: Event) => void) | undefined;
    onPkAfterShow?: ((e: Event) => void) | undefined;
    onPkHide?: ((e: Event) => void) | undefined;
    onPkAfterHide?: ((e: Event) => void) | undefined;
    onPkOpenChange?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkDialog, keyof HTMLElement>> & React.RefAttributes<PkDialog>, "ref"> & React.RefAttributes<PkDialog>>;
export { PkDialogElement };
export type DialogProps = PkDialogElementProps;
//# sourceMappingURL=Dialog.d.ts.map