import { default as React } from 'react';
import { VariableCategories } from './VariableDropdown';
export type VariableTransformerParam = {
    name: string;
    type: string;
    label: string;
    required: boolean;
    default?: string | number | boolean | null;
    placeholder?: string;
    options?: Array<{
        value: string;
        label: string;
        group?: string;
    }>;
    showWhen?: {
        param: string;
        equals: string;
    };
};
export type VariableTransformerDefinition = {
    id: string;
    label: string;
    description: string;
    params: VariableTransformerParam[];
    appliesTo?: string[];
};
export type VariableTransformerRegistry = Record<string, VariableTransformerDefinition[]>;
export type VariablePickerContextValue = {
    variableCategories: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variableTransformerRegistry?: VariableTransformerRegistry;
};
export declare function VariablePickerProvider({ variableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry, children, }: VariablePickerContextValue & {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useVariablePickerContext(): VariablePickerContextValue | null;
//# sourceMappingURL=VariablePickerContext.d.ts.map