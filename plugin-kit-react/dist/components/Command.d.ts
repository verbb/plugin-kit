import { default as React, ComponentProps } from 'react';
import { Command as CommandPrimitive, useCommandState } from 'cmdk';
import { Dialog } from '.';
declare function Command({ className, ...props }: ComponentProps<typeof CommandPrimitive>): import("react/jsx-runtime").JSX.Element;
declare function CommandDialog({ title, description, children, showCloseButton, ...props }: ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    showCloseButton?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function CommandInput({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>): import("react/jsx-runtime").JSX.Element;
declare const CommandList: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    label?: string;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function CommandEmpty({ ...props }: ComponentProps<typeof CommandPrimitive.Empty>): import("react/jsx-runtime").JSX.Element;
declare function CommandGroup({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare function CommandSeparator({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare function CommandItem({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function CommandShortcut({ className, ...props }: ComponentProps<'span'>): import("react/jsx-runtime").JSX.Element;
export { Command, CommandDialog, useCommandState, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
//# sourceMappingURL=Command.d.ts.map