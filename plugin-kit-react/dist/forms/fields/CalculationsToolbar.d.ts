import { Editor } from '@tiptap/core';
import { VariableCategories } from '../../components/tiptap/VariableDropdown';
type CalculationsToolbarProps = {
    editor: Editor | null | undefined;
    variableCategories: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variablePickerOpen: boolean;
    onVariablePickerOpenChange: (open: boolean) => void;
    guideOpen: boolean;
    onGuideOpenChange: (open: boolean) => void;
    validating: boolean;
    onValidate: () => void;
};
export declare const CalculationsToolbar: ({ editor, variableCategories, variableCategoryLabels, variableCategoryOrder, variablePickerOpen, onVariablePickerOpenChange, guideOpen, onGuideOpenChange, validating, onValidate, }: CalculationsToolbarProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CalculationsToolbar.d.ts.map