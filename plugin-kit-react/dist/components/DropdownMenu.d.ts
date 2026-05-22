import { ComponentProps } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { VariantProps } from 'class-variance-authority';
declare const dropdownMenuItemVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
    variant?: "default" | "destructive" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare const dropdownMenuLabelVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type DropdownMenuSize = VariantProps<typeof dropdownMenuItemVariants>['size'];
declare function DropdownMenu({ size, children, ...props }: ComponentProps<typeof MenuPrimitive.Root> & {
    size?: DropdownMenuSize;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuPortal({ container, ...props }: ComponentProps<typeof MenuPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuTrigger({ size, ...props }: ComponentProps<typeof MenuPrimitive.Trigger> & {
    size?: DropdownMenuSize;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuContent({ align, alignOffset, side, sideOffset, className, portalClassName, portalContainer, ...props }: MenuPrimitive.Popup.Props & Pick<MenuPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'> & {
    portalClassName?: string;
    portalContainer?: HTMLElement | ShadowRoot | null;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuLabel({ className, inset, size, ...props }: ComponentProps<typeof MenuPrimitive.GroupLabel> & VariantProps<typeof dropdownMenuLabelVariants> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuItem({ className, inset, size, variant, ...props }: ComponentProps<typeof MenuPrimitive.Item> & VariantProps<typeof dropdownMenuItemVariants> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSub({ ...props }: ComponentProps<typeof MenuPrimitive.SubmenuRoot>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, size, ...props }: ComponentProps<typeof MenuPrimitive.SubmenuTrigger> & {
    inset?: boolean;
    size?: DropdownMenuSize;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSubContent({ align, alignOffset, side, sideOffset, className, ...props }: ComponentProps<typeof DropdownMenuContent>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }: MenuPrimitive.CheckboxItem.Props & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuRadioGroup({ ...props }: ComponentProps<typeof MenuPrimitive.RadioGroup>): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuRadioItem({ className, children, inset, ...props }: MenuPrimitive.RadioItem.Props & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props): import("react/jsx-runtime").JSX.Element;
declare function DropdownMenuShortcut({ className, ...props }: ComponentProps<'span'>): import("react/jsx-runtime").JSX.Element;
export { DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, };
//# sourceMappingURL=DropdownMenu.d.ts.map