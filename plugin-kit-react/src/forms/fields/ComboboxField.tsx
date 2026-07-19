import {
    ComboboxInput,
    type ComboboxFetchOptions,
    type ComboboxInputOption,
    type ComboboxInputProps,
} from '../../components/ComboboxInput.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type ComboboxFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        emptyMessage?: string;
        options?: ComboboxInputOption[];
        fetchOptions?: ComboboxFetchOptions;
        multiple?: boolean;
        required?: boolean;
        disabled?: boolean;
        width?: 'full';
    };
};

export const ComboboxField = ({ form, field }: ComboboxFieldProps) => {
    const {
        value, setValue, setTouched, errors,
    } = useEngineField(form, field.name);

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
        >
            <ComboboxInput
                options={field.options}
                fetchOptions={field.fetchOptions}
                multiple={field.multiple}
                value={value as ComboboxInputProps['value']}
                onValueChange={(nextValue) => {
                    setValue(nextValue);
                    setTouched();
                }}
                disabled={field.disabled}
                placeholder={field.placeholder}
                emptyMessage={field.emptyMessage}
                isInvalid={errors.length > 0}
                width={field.width}
            />
        </FieldLayout>
    );
};
