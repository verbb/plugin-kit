import { DatePicker, TimePicker } from '@verbb/plugin-kit-react/components';
import { useEffect, useState } from 'react';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import { useEngineField } from '../useEngineField';

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
    const { value, setValue, errors } = useEngineField(form, field.name);
    const initialDate = value ? new Date(String(value)) : null;
    const initialTime = initialDate ? initialDate.toTimeString().slice(0, 5) : '';

    const [dateValue, setDateValue] = useState<Date | null>(initialDate);
    const [timeValue, setTimeValue] = useState<string>(initialTime);

    useEffect(() => {
        let nextValue = '';

        if (dateValue && timeValue) {
            const combinedDateTime = new Date(`${dateValue.toISOString().split('T')[0]}T${timeValue}`);
            nextValue = combinedDateTime.toISOString();
        } else if (dateValue) {
            const dateOnly = new Date(`${dateValue.toISOString().split('T')[0]}T00:00:00`);
            nextValue = dateOnly.toISOString();
        }

        if (String(value ?? '') !== nextValue) {
            setValue(nextValue);
        }
    }, [dateValue, timeValue, setValue, value]);

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
            withControl={false}
        >
            <div className="flex gap-2">
                <DatePicker
                    value={dateValue}
                    onValueChange={(nextValue) => { setDateValue(nextValue ?? null); }}
                    isInvalid={errors.length > 0}
                />
                <TimePicker
                    value={timeValue}
                    onValueChange={setTimeValue}
                    isInvalid={errors.length > 0}
                />
            </div>
        </FieldLayout>
    );
};
