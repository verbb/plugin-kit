import React from 'react';
import type { VariableCategories, VariableOption } from './VariableDropdown';

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

export type VariableConfigureSectionProps = {
    tokenValue: string;
    variableOption: VariableOption | null;
    onPendingTokenChange?: (tokenValue: string) => void;
    configureResetKey?: string;
    /** Synchronously updated ref for custom configure-section state. */
    configureStateRef?: React.MutableRefObject<Record<string, unknown> | null>;
    /** Called before save to flush custom configure-section state into the pending token. */
    prepareSaveRef?: React.MutableRefObject<(() => void) | null>;
    /** Read the latest pending token value (may differ from tokenValue while configuring). */
    getPendingTokenValue?: () => string;
};

export type VariableTagLabelResolver = (props: {
    tokenValue: string;
    variableOption: VariableOption | null;
    defaultLabel: string;
    storedLabel?: string;
}) => string;

export type VariablePickerContextValue = {
    variableCategories: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    variableTransformerRegistry?: VariableTransformerRegistry;
    renderVariableConfigureSection?: (props: VariableConfigureSectionProps) => React.ReactNode;
    resolveVariableTagLabel?: VariableTagLabelResolver;
};

const VariablePickerContext = React.createContext<VariablePickerContextValue | null>(null);

export function VariablePickerProvider({
    variableCategories,
    variableCategoryLabels,
    variableCategoryOrder,
    variableTransformerRegistry,
    renderVariableConfigureSection,
    resolveVariableTagLabel,
    children,
}: VariablePickerContextValue & { children: React.ReactNode }) {
    const value = React.useMemo(
        () => {
            return ({
                variableCategories: variableCategories ?? {},
                variableCategoryLabels,
                variableCategoryOrder,
                variableTransformerRegistry: variableTransformerRegistry ?? {},
                renderVariableConfigureSection,
                resolveVariableTagLabel,
            });
        },
        [variableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry, renderVariableConfigureSection, resolveVariableTagLabel],
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
