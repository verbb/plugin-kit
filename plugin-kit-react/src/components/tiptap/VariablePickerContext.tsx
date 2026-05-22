import React from 'react';
import type { VariableCategories } from './VariableDropdown';

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

const VariablePickerContext = React.createContext<VariablePickerContextValue | null>(null);

export function VariablePickerProvider({
    variableCategories,
    variableCategoryLabels,
    variableCategoryOrder,
    variableTransformerRegistry,
    children,
}: VariablePickerContextValue & { children: React.ReactNode }) {
    const value = React.useMemo(
        () => {
            return ({
                variableCategories: variableCategories ?? {},
                variableCategoryLabels,
                variableCategoryOrder,
                variableTransformerRegistry: variableTransformerRegistry ?? {}
            });
        },
        [variableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry],
    );
    return (
        <VariablePickerContext.Provider value={value}>
            {children}
        </VariablePickerContext.Provider>
    );
}

export function useVariablePickerContext(): VariablePickerContextValue | null {
    return React.useContext(VariablePickerContext);
}
