import { useMemo } from 'react';

import { DatePicker } from '../../components/DatePicker.js';
import { TimePicker } from '../../components/TimePicker.js';
import { FieldLayout } from '../Field.js';
import { formatDateTimeParts, parseDateTimeParts } from '../datetime.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type DateTimeFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
    };
};

export const DateTimeField = ({ form, field }: DateTimeFieldProps) => {
    const { value, setValue, setTouched, errors } = useEngineField(form, field.name);
    const parts = useMemo(() => { return parseDateTimeParts(value); }, [value]);
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
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <DatePicker
                    value={parts.date}
                    onPkChange={(event) => {
                        setValue(formatDateTimeParts((event as CustomEvent<{ value: string }>).detail?.value ?? '', parts.time));
                        setTouched();
                    }}
                    invalid={isInvalid}
                />
                <TimePicker
                    value={parts.time}
                    onPkChange={(event) => {
                        setValue(formatDateTimeParts(parts.date, (event as CustomEvent<{ value: string }>).detail?.value ?? ''));
                        setTouched();
                    }}
                    invalid={isInvalid}
                />
            </div>
        </FieldLayout>
    );
};
