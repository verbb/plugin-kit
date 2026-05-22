import { ButtonHTMLAttributes, ReactElement } from 'react';
import { VariantProps } from 'class-variance-authority';
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "none" | "primary" | "secondary" | "dashed" | "outline" | "transparent" | "ghost" | null | undefined;
    size?: "default" | "none" | "xxs" | "xs" | "sm" | "icon" | "lg" | "xl" | null | undefined;
    loading?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type SpinnerVariant = 'default' | 'primary' | 'secondary' | 'dashed' | 'outline' | 'transparent';
type SpinnerSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
declare const Button: import('react').ForwardRefExoticComponent<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> & VariantProps<(props?: ({
    variant?: "link" | "default" | "none" | "primary" | "secondary" | "dashed" | "outline" | "transparent" | "ghost" | null | undefined;
    size?: "default" | "none" | "xxs" | "xs" | "sm" | "icon" | "lg" | "xl" | null | undefined;
    loading?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string> & {
    asChild?: boolean;
    render?: ReactElement;
    href?: string;
    target?: string;
    rel?: string;
    download?: string | boolean;
    spinnerSize?: SpinnerSize;
    spinnerVariant?: SpinnerVariant;
    spinnerClassName?: string;
} & import('react').RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
export { Button, buttonVariants };
//# sourceMappingURL=Button.d.ts.map