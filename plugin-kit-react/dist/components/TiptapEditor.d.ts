import { ReactNode } from 'react';
import { Editor as TiptapEditorInstance } from '@tiptap/core';
import { LinkOptions, LinkOptionsInput } from './tiptap/LinkDropdown';
import { VariableOption, VariableCategories } from './tiptap/VariableDropdown';
import { VariableTransformerRegistry, VariableConfigureSectionProps, VariableTagLabelResolver } from './tiptap/VariablePickerContext';
export type { LinkOptions, LinkOptionsInput, VariableOption, VariableCategories, };
type TiptapEditorProps = {
    value?: unknown;
    onChange?: (value: unknown) => void;
    placeholder?: string;
    buttons?: string[];
    tableOptions?: Array<{
        rows?: number;
        cols?: number;
        withHeaderRow?: boolean;
    }>;
    linkOptions?: LinkOptionsInput;
    linkSelectorStorageKeyPrefix?: string;
    variableCategories?: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variableTransformerRegistry?: VariableTransformerRegistry;
    variablePickerTriggerCharacters?: string[];
    renderVariableConfigureSection?: (props: VariableConfigureSectionProps) => ReactNode;
    resolveVariableTagLabel?: VariableTagLabelResolver;
    toolbarContent?: (params: {
        editor: TiptapEditorInstance | null;
        variableCategories: VariableCategories;
        variableCategoryLabels?: Record<string, string>;
        variableCategoryOrder?: string[];
        variablePickerOpen: boolean;
        onVariablePickerOpenChange: (open: boolean) => void;
    }) => ReactNode;
    rows?: number;
    className?: string;
    isInvalid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    invalidContentMessage?: string;
    [key: string]: unknown;
};
export declare const TiptapEditor: ({ value, onChange, buttons, tableOptions, linkOptions, linkSelectorStorageKeyPrefix, variableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry, variablePickerTriggerCharacters, renderVariableConfigureSection, resolveVariableTagLabel, toolbarContent, rows, className, isInvalid, disabled, readOnly, invalidContentMessage, ...props }: TiptapEditorProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TiptapEditor.d.ts.map