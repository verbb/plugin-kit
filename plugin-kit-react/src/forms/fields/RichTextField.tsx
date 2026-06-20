import { useMemo } from 'react';
import { LinkOptionsInput, TiptapEditor } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import type { VariableConfig } from '../contexts/VariableCategoriesContext';
import { useEngineField } from '../useEngineField';
import { useVariableCategoriesContext } from '../contexts/VariableCategoriesContext';

type RichTextFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        buttons?: string[];
        variableConfig?: VariableConfig;
        required?: boolean;
        disabled?: boolean;
        rows?: number;
        linkOptions?: LinkOptionsInput;
        linkSelectorStorageKeyPrefix?: string;
        translatable?: boolean;
    };
};

export const RichTextField = ({ form, field }: RichTextFieldProps) => {
    const { value, setValue, errors } = useEngineField(form, field.name);
    const buttons = field.buttons ?? ['bold', 'italic'];
    const {
        getVariableCategories,
        variableCategoryLabels,
        variableCategoryOrder,
        variableTransformerRegistry,
        renderVariableConfigureSection,
        resolveVariableTagLabel,
    } = useVariableCategoriesContext();
    const { variableConfig } = field;

    const variableCategories = useMemo(() => {
        if (!variableConfig || !getVariableCategories) {
            return undefined;
        }
        return getVariableCategories(variableConfig, { form });
    }, [variableConfig, form, getVariableCategories]);

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            translatable={field.translatable}
            errors={errors}
            withControl={false}
        >
            <TiptapEditor
                value={value ?? ''}
                onChange={setValue}
                placeholder={field.placeholder}
                rows={field.rows}
                buttons={buttons}
                {...(variableCategories && { variableCategories })}
                {...(variableCategoryLabels && { variableCategoryLabels })}
                {...(variableCategoryOrder && { variableCategoryOrder })}
                {...(variableTransformerRegistry && { variableTransformerRegistry })}
                {...(renderVariableConfigureSection && { renderVariableConfigureSection })}
                {...(resolveVariableTagLabel && { resolveVariableTagLabel })}
                {...(field.linkOptions && { linkOptions: field.linkOptions })}
                {...(field.linkSelectorStorageKeyPrefix && { linkSelectorStorageKeyPrefix: field.linkSelectorStorageKeyPrefix })}
                disabled={field.disabled}
                isInvalid={errors.length > 0}
            />
        </FieldLayout>
    );
};
