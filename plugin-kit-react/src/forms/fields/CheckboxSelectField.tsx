import { CheckboxSelect, type CheckboxSelectOption, type CheckboxSelectValue } from '@verbb/plugin-kit-react/components/CheckboxSelect';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

type CheckboxSelectFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        options?: CheckboxSelectOption[];
        showAllOption?: boolean;
        allLabel?: string;
        required?: boolean;
        disabled?: boolean;
    };
};

export const CheckboxSelectField = ({ form, field }: CheckboxSelectFieldProps) => {
    const { value, setValue, errors } = useEngineField(form, field.name);

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
        >
            <CheckboxSelect
                options={field.options || []}
                value={(value === undefined || value === null ? [] : value) as CheckboxSelectValue}
                onChange={(v) => { return setValue(v); }}
                showAllOption={field.showAllOption ?? false}
                allLabel={field.allLabel}
                disabled={field.disabled}
            />
        </FieldLayout>
    );
};
