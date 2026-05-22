import { VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
declare const spinnerVariants: (props?: ({
    variant?: "default" | "primary" | "secondary" | "dashed" | "outline" | "transparent" | null | undefined;
    size?: "xxs" | "xs" | "sm" | "lg" | "xl" | "md" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare function Spinner({ className, variant, size, ...props }: ComponentProps<'div'> & VariantProps<typeof spinnerVariants>): import("react/jsx-runtime").JSX.Element;
export { Spinner };
//# sourceMappingURL=Spinner.d.ts.map