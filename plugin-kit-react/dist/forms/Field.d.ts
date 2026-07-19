import { default as React, ReactNode } from 'react';
export type FieldLayoutProps = {
    name: string;
    label?: string;
    instructions?: string;
    warning?: string;
    tip?: string;
    required?: boolean;
    translatable?: boolean;
    errors?: string[];
    headerEnd?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
};
/**
 * Schema-form field shell. Delegates label / instructions / errors / warning / tip /
 * required / translatable rendering to the `<pk-field>` web component, so there is no
 * Tailwind or per-framework styling in this facade — only tokens + shadow-DOM CSS.
 *
 * Do not force `width: auto` on unlabeled shells here — composite controls (conditions
 * tables, etc.) need full width. FieldWrap clusters shrink nested hosts via
 * `[data-pk-field-wrap-controls] pk-field` in `style.css`.
 */
export declare const FieldLayout: ({ name, label, instructions, warning, tip, required, translatable, errors, headerEnd, className, style, children, }: FieldLayoutProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Field.d.ts.map