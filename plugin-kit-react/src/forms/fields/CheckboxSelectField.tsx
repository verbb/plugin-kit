import {
    CheckboxSelect,
    type PkCheckboxSelectOption,
    type PkCheckboxSelectValue,
} from '../../components/CheckboxSelect.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type CheckboxSelectFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        options?: PkCheckboxSelectOption[];
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
                value={(value === undefined || value === null ? [] : value) as PkCheckboxSelectValue}
                onChange={setValue}
                showAllOption={field.showAllOption ?? false}
                allLabel={field.allLabel}
                disabled={field.disabled}
            />
        </FieldLayout>
    );
};
