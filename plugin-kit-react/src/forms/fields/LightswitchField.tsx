import { Lightswitch } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

type LightswitchFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
    };
};

export const LightswitchField = ({ form, field }: LightswitchFieldProps) => {
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
            <Lightswitch
                checked={Boolean(value)}
                onCheckedChange={(checked) => { return setValue(Boolean(checked)); }}
                aria-label={field.label}
                aria-invalid={errors.length > 0}
            />
        </FieldLayout>
    );
};
