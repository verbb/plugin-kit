import { default as React } from 'react';
import { PkPopover } from '@verbb/plugin-kit-web/components/popover/pk-popover.js';
declare const PkPopoverElement: import('@lit/react').ReactWebComponent<PkPopover, {
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
    onPkOpenChange: string;
}>;
type PkPopoverElementProps = React.ComponentProps<typeof PkPopoverElement>;
/**
 * React facade over `<pk-popover>`. Behavior and styles live in the web component.
 * Nested select/tooltip/popover `pk-open-change` is ignored — same as `Dialog`.
 */
export declare const Popover: React.ForwardRefExoticComponent<Omit<Omit<React.HTMLAttributes<PkPopover>, "anchor" | "open" | "updated" | "render" | "connectedCallback" | "createRenderRoot" | "performUpdate" | "renderOptions" | "disconnectedCallback" | "renderRoot" | "isUpdatePending" | "hasUpdated" | "addController" | "removeController" | "attributeChangedCallback" | "requestUpdate" | "updateComplete" | "for" | "onPkShow" | "onPkAfterShow" | "onPkHide" | "onPkAfterHide" | "onPkOpenChange" | "placement" | "sideOffset" | "flush" | "withArrow" | "willUpdate" | "closePopover"> & {
    onPkShow?: ((e: Event) => void) | undefined;
    onPkAfterShow?: ((e: Event) => void) | undefined;
    onPkHide?: ((e: Event) => void) | undefined;
    onPkAfterHide?: ((e: Event) => void) | undefined;
    onPkOpenChange?: ((e: Event) => void) | undefined;
} & Partial<Omit<PkPopover, keyof HTMLElement>> & React.RefAttributes<PkPopover>, "ref"> & React.RefAttributes<PkPopover>>;
export { PkPopoverElement };
export type PopoverProps = PkPopoverElementProps;
//# sourceMappingURL=Popover.d.ts.map