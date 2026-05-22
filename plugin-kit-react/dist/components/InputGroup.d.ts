import { ComponentProps } from 'react';
import { VariantProps } from 'class-variance-authority';
import { Button } from '.';
declare function InputGroup({ className, ...props }: ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
declare const inputGroupAddonVariants: (props?: ({
    align?: "inline-end" | "inline-start" | "block-start" | "block-end" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare function InputGroupAddon({ className, align, ...props }: ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>): import("react/jsx-runtime").JSX.Element;
declare const inputGroupButtonVariants: (props?: ({
    size?: "xs" | "sm" | "icon-xs" | "icon-sm" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare function InputGroupButton({ className, type, variant, size, ...props }: Omit<ComponentProps<typeof Button>, 'size' | 'type'> & VariantProps<typeof inputGroupButtonVariants> & {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function InputGroupText({ className, ...props }: ComponentProps<'span'>): import("react/jsx-runtime").JSX.Element;
declare function InputGroupInput({ className, ...props }: Omit<ComponentProps<'input'>, 'size' | 'width'>): import("react/jsx-runtime").JSX.Element;
declare function InputGroupTextarea({ className, ...props }: ComponentProps<'textarea'>): import("react/jsx-runtime").JSX.Element;
export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea, };
//# sourceMappingURL=InputGroup.d.ts.map