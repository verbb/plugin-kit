import {
    AutocompleteInput,
    type AutocompleteFetchOptions,
    type AutocompleteInputOption,
} from '../../components/AutocompleteInput.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type AutocompleteFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        emptyMessage?: string;
        options?: AutocompleteInputOption[];
        fetchOptions?: AutocompleteFetchOptions;
        required?: boolean;
        disabled?: boolean;
        showClear?: boolean;
        width?: 'full';
    };
};

/**
 * SchemaForm `$field: "autocomplete"` — freeform text with optional suggestions.
 * Use for path/alias fields where the typed value is the answer; pair `warning`
 * on the schema node for plugin-owned existence checks.
 */
export const AutocompleteField = ({ form, field }: AutocompleteFieldProps) => {
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
            <AutocompleteInput
                options={field.options}
                fetchOptions={field.fetchOptions}
                value={value == null ? '' : String(value)}
                onValueChange={(nextValue) => {
                    setValue(nextValue);
                    setTouched();
                }}
                disabled={field.disabled}
                placeholder={field.placeholder}
                emptyMessage={field.emptyMessage}
                showClear={field.showClear}
                isInvalid={errors.length > 0}
                width={field.width}
            />
        </FieldLayout>
    );
};
