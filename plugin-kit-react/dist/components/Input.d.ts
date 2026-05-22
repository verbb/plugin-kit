import { ComponentProps } from 'react';
import { VariantProps } from 'class-variance-authority';
declare const inputVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
    width?: "xs" | "sm" | "lg" | "xl" | "full" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare function Input({ className, type, size, width, ...props }: Omit<ComponentProps<'input'>, 'size'> & VariantProps<typeof inputVariants>): import("react/jsx-runtime").JSX.Element;
export { Input };
//# sourceMappingURL=Input.d.ts.map