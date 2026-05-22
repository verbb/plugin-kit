import { ComponentProps } from 'react';
import { VariantProps } from 'class-variance-authority';
declare const textareaVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare function Textarea({ className, size, ...props }: ComponentProps<'textarea'> & VariantProps<typeof textareaVariants>): import("react/jsx-runtime").JSX.Element;
export { Textarea };
//# sourceMappingURL=Textarea.d.ts.map