import { Textarea } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

type TextareaFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        rows?: number;
        required?: boolean;
        disabled?: boolean;
    };
};

export const TextareaField = ({ form, field }: TextareaFieldProps) => {
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
            <Textarea
                value={String(value ?? '')}
                onChange={(event) => { return setValue(event.target.value); }}
                onBlur={setTouched}
                placeholder={field.placeholder}
                disabled={field.disabled}
                rows={field.rows}
                aria-invalid={isInvalid}
            />
        </FieldLayout>
    );
};
