import { ComponentProps } from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
declare function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function DialogTrigger({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function DialogPortal({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
declare function DialogClose({ ...props }: ComponentProps<typeof DialogPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
declare function DialogOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Backdrop>): import("react/jsx-runtime").JSX.Element;
declare function DialogContent({ className, children, showCloseButton, autoFocusFirstInput, portalClassName, portalContainer, ...props }: ComponentProps<typeof DialogPrimitive.Popup> & {
    showCloseButton?: boolean;
    autoFocusFirstInput?: boolean;
    portalClassName?: string;
    portalContainer?: HTMLElement | ShadowRoot | null;
}): import("react/jsx-runtime").JSX.Element;
declare function DialogHeader({ className, showCloseButton, children, ...props }: ComponentProps<'div'> & {
    showCloseButton?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DialogFooter({ className, ...props }: ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
declare function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, };
//# sourceMappingURL=Dialog.d.ts.map