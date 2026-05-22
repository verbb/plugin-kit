import { ComponentProps, ReactNode } from 'react';
import { Label } from '../components';
import { Slot } from '../components/Slot';
type FieldContextValue = {
    id: string;
    name: string;
    errors: string[];
};
declare const InlineFieldErrorVisibilityContext: import('react').Context<boolean>;
declare const useFieldContext: () => FieldContextValue;
type FieldRootProps = ComponentProps<'div'> & {
    name: string;
    errors?: string[];
};
declare const FieldRoot: ({ name, errors, className, ...props }: FieldRootProps) => import("react/jsx-runtime").JSX.Element;
declare const FieldHeader: ({ className, ...props }: ComponentProps<"div">) => import("react/jsx-runtime").JSX.Element;
declare const FieldLabel: ({ className, ...props }: ComponentProps<typeof Label>) => import("react/jsx-runtime").JSX.Element;
declare const FieldInstructions: ({ className, children, ...props }: ComponentProps<"p">) => import("react/jsx-runtime").JSX.Element;
type FieldControlProps = Omit<ComponentProps<typeof Slot>, 'className'> & {
    className?: string;
};
declare const FieldControl: ({ className, ...props }: FieldControlProps) => import("react/jsx-runtime").JSX.Element;
declare const FieldErrors: ({ className, ...props }: ComponentProps<"ul">) => import("react/jsx-runtime").JSX.Element | null;
type FieldLayoutProps = ComponentProps<'div'> & {
    name: string;
    label?: string;
    instructions?: string;
    headerEnd?: ReactNode;
    required?: boolean;
    warning?: string;
    errors?: string[];
    withControl?: boolean;
    showInlineErrors?: boolean;
};
declare const FieldLayout: ({ name, label, instructions, headerEnd, required, warning, errors, withControl, showInlineErrors, className, children, ...props }: FieldLayoutProps) => import("react/jsx-runtime").JSX.Element;
export { FieldRoot, FieldHeader, FieldLabel, FieldInstructions, FieldControl, FieldErrors, FieldLayout, InlineFieldErrorVisibilityContext, useFieldContext, };
//# sourceMappingURL=Field.d.ts.map