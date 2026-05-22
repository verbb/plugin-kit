import { default as React } from 'react';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './Button.jsx';
declare const menuTriggerVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
    split?: "split" | "none" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type MenuButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type MenuButtonSize = VariantProps<typeof menuTriggerVariants>['size'];
type MenuMainAction = {
    label?: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end' | 'overlay';
    iconClassName?: string;
    labelClassName?: string;
    onClick?: () => void;
};
type MenuActionItem = {
    label: React.ReactNode;
    icon?: React.ReactNode;
    variant?: 'default' | 'destructive';
    onClick?: () => void;
};
type MenuSeparatorItem = {
    type: 'separator';
};
type MenuItem = MenuActionItem | MenuSeparatorItem;
type MenuButtonProps = React.ComponentProps<'div'> & {
    mainAction?: MenuMainAction;
    menuItems?: MenuItem[];
    variant?: MenuButtonVariant;
    size?: MenuButtonSize;
    loading?: boolean;
    disabled?: boolean;
    defaultOpen?: boolean;
    modal?: boolean;
};
export declare const MenuButton: ({ mainAction, menuItems, variant, size, loading, disabled, className, defaultOpen, modal, ...props }: MenuButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MenuButton.d.ts.map