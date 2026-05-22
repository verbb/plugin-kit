import {
    ComboboxInput,
    type ComboboxInputOption,
    type ComboboxInputProps,
} from '@verbb/plugin-kit-react/components/ComboboxInput';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

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
        fetchOptions?: () => Promise<ComboboxInputOption[]>;
        multiple?: boolean;
        cacheKey?: string;
        cacheTtlMs?: number;
        required?: boolean;
        disabled?: boolean;
    };
};

export const ComboboxField = ({ form, field }: ComboboxFieldProps) => {
    const {
        value, setValue, setTouched, errors,
    } = useEngineField(form, field.name);
    const isInvalid = errors.length > 0;

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
                cacheKey={field.cacheKey}
                cacheTtlMs={field.cacheTtlMs}
                className="w-full"
                contentClassName={isInvalid ? 'aria-invalid:border-destructive' : undefined}
            />
        </FieldLayout>
    );
};
