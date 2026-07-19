import { Lightswitch } from '../../components/Lightswitch.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

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
                onCheckedChange={(checked) => setValue(checked)}
                aria-label={field.label}
            />
        </FieldLayout>
    );
};
