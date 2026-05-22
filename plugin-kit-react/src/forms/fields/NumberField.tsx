import { Input } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

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
                onChange={(event) => { return setValue(event.target.value); }}
                onBlur={setTouched}
                placeholder={field.placeholder}
                disabled={field.disabled}
                style={field.size ? { width: `${field.size}rem` } : undefined}
                aria-invalid={isInvalid}
            />
        </FieldLayout>
    );
};
