import { ReactNode } from 'react';
import { VariableCategories } from './tiptap/VariableDropdown';
import { VariableConfigureSectionProps, VariableTransformerRegistry, VariableTagLabelResolver } from './tiptap/VariablePickerContext';
export declare const TiptapInput: ({ value, onChange, className, isInvalid, disabled, readOnly, variableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry, variablePickerTriggerCharacters, renderVariableConfigureSection, resolveVariableTagLabel, ...props }: {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    isInvalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    variableCategories?: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variableTransformerRegistry?: VariableTransformerRegistry;
    variablePickerTriggerCharacters?: string[];
    renderVariableConfigureSection?: (props: VariableConfigureSectionProps) => ReactNode;
    resolveVariableTagLabel?: VariableTagLabelResolver;
    [key: string]: unknown;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TiptapInput.d.ts.map