import { ColorInput } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

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
                onValueChange={(nextValue) => {
                    setValue(nextValue || '');
                }}
                onBlur={setTouched}
                disabled={field.disabled}
                isInvalid={isInvalid}
            />
        </FieldLayout>
    );
};
