import { createContext, useContext } from 'react';
import type { VariableTransformerRegistry } from '@verbb/plugin-kit-react/components/tiptap/VariablePickerContext';

export type VariableConfig = Record<string, unknown>;

export type VariableCategoriesGetter = (
    variableConfig: VariableConfig,
    options?: { form?: unknown },
) => Record<string, Array<{ label: string; value: string }>>;

export type VariableCategoriesContextValue = {
    getVariableCategories: VariableCategoriesGetter | null;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variableTransformerRegistry?: VariableTransformerRegistry;
};

const VariableCategoriesContext = createContext<VariableCategoriesContextValue | null>(null);

export const VariableCategoriesProvider = VariableCategoriesContext.Provider;

export const useVariableCategoriesContext = (): VariableCategoriesContextValue => {
    const value = useContext(VariableCategoriesContext);
    if (value == null) {
        return { getVariableCategories: null };
    }

    return {
        getVariableCategories: value.getVariableCategories ?? null,
        variableCategoryLabels: value.variableCategoryLabels,
        variableCategoryOrder: value.variableCategoryOrder,
        variableTransformerRegistry: value.variableTransformerRegistry,
    };
};
