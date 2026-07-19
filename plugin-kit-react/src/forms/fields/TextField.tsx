import { Input } from '../../components/Input.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type TextFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        translatable?: boolean;
    };
};

export const TextField = ({ form, field }: TextFieldProps) => {
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
            translatable={field.translatable}
            errors={errors}
        >
            <Input
                value={String(value ?? '')}
                onInput={(event) => { return setValue((event.target as { value?: string }).value ?? ''); }}
                onBlur={setTouched}
                placeholder={field.placeholder}
                disabled={field.disabled}
                invalid={isInvalid}
            />
        </FieldLayout>
    );
};
