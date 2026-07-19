import { ColorInput } from '../../components/ColorInput.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type ColorFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        disabled?: boolean;
    };
};

export const ColorField = ({ form, field }: ColorFieldProps) => {
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
            <ColorInput
                value={String(value || '')}
                onPkChange={(event) => {
                    setValue((event as CustomEvent<{ value: string }>).detail?.value ?? '');
                    setTouched();
                }}
                disabled={field.disabled}
                invalid={isInvalid}
            />
        </FieldLayout>
    );
};
