import { useMemo } from 'react';
import { TiptapInput } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import type { VariableConfig } from '../contexts/VariableCategoriesContext';
import { useEngineField } from '../useEngineField';
import type { VariableCategories } from '@verbb/plugin-kit-react/components/tiptap/VariableDropdown';
import { useVariableCategoriesContext } from '../contexts/VariableCategoriesContext';

type VariablePickerFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        variableConfig?: VariableConfig;
        variableCategories?: VariableCategories;
        variablePickerTriggerCharacters?: string[];
    };
};

export const VariablePickerField = ({ form, field }: VariablePickerFieldProps) => {
    const { value, setValue, errors } = useEngineField(form, field.name);
    const {
        getVariableCategories,
        variableCategoryLabels,
        variableCategoryOrder,
        variableTransformerRegistry,
    } = useVariableCategoriesContext();
    const { variableCategories, variableConfig } = field;

    const resolvedVariableCategories = useMemo(() => {
        if (variableCategories) {
            return variableCategories;
        }

        if (!variableConfig || !getVariableCategories) {
            return undefined;
        }

        return getVariableCategories(variableConfig, { form });
    }, [variableCategories, variableConfig, form, getVariableCategories]);

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
            withControl={false}
        >
            <TiptapInput
                value={String(value ?? '')}
                onChange={setValue}
                placeholder={field.placeholder}
                className=""
                disabled={field.disabled}
                isInvalid={errors.length > 0}
                variableCategories={resolvedVariableCategories}
                variableCategoryLabels={variableCategoryLabels}
                variableCategoryOrder={variableCategoryOrder}
                variableTransformerRegistry={variableTransformerRegistry}
                variablePickerTriggerCharacters={field.variablePickerTriggerCharacters}
            />
        </FieldLayout>
    );
};
