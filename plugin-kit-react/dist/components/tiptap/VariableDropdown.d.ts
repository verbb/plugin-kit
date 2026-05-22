import { Editor } from '@tiptap/core';
export type VariableOption = {
    label: string;
    value?: string;
    children?: VariableOption[];
    /** Optional display bucket for first-level grouping (e.g. page headings). */
    pageLabel?: string;
    /** For child items: selector | format | value. Used by variableSerialization. */
    group?: string;
    /** Supported transform value types for this variable (e.g. text, number, date, url). */
    transformValueTypes?: string[];
};
export type VariableCategories = {
    [key: string]: VariableOption[] | undefined;
};
export declare function formatVariableCategoryLabel(key: string, labels?: Record<string, string> | null): string;
type VariableDropdownProps = {
    editor: Editor | null | undefined;
    variableCategories: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    title?: string;
    buttonLabel?: string;
    buttonVariant?: 'default' | 'primary' | 'secondary' | 'dashed' | 'outline' | 'transparent' | 'link' | 'none';
    buttonSize?: 'default' | 'none' | 'xs' | 'sm' | 'lg' | 'xl';
    buttonClassName?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerMode?: 'toolbar' | 'input';
};
export declare function VariableDropdown({ editor, variableCategories, variableCategoryLabels, variableCategoryOrder, title, buttonLabel, buttonVariant, buttonSize, buttonClassName, open, onOpenChange, triggerMode, }: VariableDropdownProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=VariableDropdown.d.ts.map