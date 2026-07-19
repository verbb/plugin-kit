import { Input } from '../../components/Input.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type NumberFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        size?: number;
        required?: boolean;
        disabled?: boolean;
    };
};

export const NumberField = ({ form, field }: NumberFieldProps) => {
    const {
        value, setValue, setTouched, errors, isInvalid,
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
            <Input
                type="number"
                value={String(value ?? '')}
                onInput={(event) => { return setValue((event.target as { value?: string }).value ?? ''); }}
                onBlur={setTouched}
                placeholder={field.placeholder}
                disabled={field.disabled}
                invalid={isInvalid}
                style={field.size ? { width: `${field.size}rem` } : undefined}
            />
        </FieldLayout>
    );
};
