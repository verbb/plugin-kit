import { DatePicker, TimePicker } from '@verbb/plugin-kit-react/components';
import { formatDateTimeValue, parseDateTimeValue } from '@verbb/plugin-kit-react/utils/datetime';
import { useMemo } from 'react';
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
    const parsedValue = useMemo(() => parseDateTimeValue(value), [value]);

    const handleDateChange = (nextValue?: Date) => {
        setValue(formatDateTimeValue(nextValue ?? null, parsedValue.time));
    };

    const handleTimeChange = (nextTime: string) => {
        setValue(formatDateTimeValue(parsedValue.date, nextTime));
    };

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
                    value={parsedValue.date}
                    onValueChange={handleDateChange}
                    isInvalid={errors.length > 0}
                />
                <TimePicker
                    value={parsedValue.time}
                    onValueChange={handleTimeChange}
                    isInvalid={errors.length > 0}
                />
            </div>
        </FieldLayout>
    );
};
