import { VariableTransformerRegistry, VariableConfigureSectionProps, VariableTagLabelResolver } from '../../components/tiptap/VariablePickerContext';
export type VariableConfig = Record<string, unknown>;
export type VariableCategoriesGetter = (variableConfig: VariableConfig, options?: {
    form?: unknown;
}) => Record<string, Array<{
    label: string;
    value: string;
}>>;
export type VariableCategoriesContextValue = {
    getVariableCategories: VariableCategoriesGetter | null;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variableTransformerRegistry?: VariableTransformerRegistry;
    renderVariableConfigureSection?: (props: VariableConfigureSectionProps) => React.ReactNode;
    resolveVariableTagLabel?: VariableTagLabelResolver;
};
export declare const VariableCategoriesProvider: import('react').Provider<VariableCategoriesContextValue | null>;
export declare const useVariableCategoriesContext: () => VariableCategoriesContextValue;
//# sourceMappingURL=VariableCategoriesContext.d.ts.map