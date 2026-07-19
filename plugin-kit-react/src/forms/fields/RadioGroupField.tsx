import { useEffect, useMemo, useSyncExternalStore } from 'react';

import { evaluateCondition } from '@verbb/plugin-kit-forms';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { RadioGroupInput } from '../../components/RadioGroupInput.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type RadioGroupFieldOption = {
    value: unknown;
    label: string;
    description?: string;
    disabled?: boolean;
    if?: string;
    [key: string]: unknown;
};

type RadioGroupFieldProps = {
    form: SchemaFormEngineApi;
    field: SchemaNode & {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        options?: RadioGroupFieldOption[];
        required?: boolean;
        disabled?: boolean;
    };
};

export const RadioGroupField = ({ form, field }: RadioGroupFieldProps) => {
    const {
        value, setValue, setTouched, errors,
    } = useEngineField(form, field.name);
    const values = useSyncExternalStore(
        form.store.subscribe.bind(form.store),
        () => { return form.store.state.values; },
        () => { return form.store.state.values; },
    );

    const conditionData = useMemo(() => {
        const scopePath = typeof field._scopePath === 'string' ? field._scopePath : '';
        const scopedValues = scopePath ? form?.getFieldValue?.(scopePath) : null;
        const scopedObject = scopedValues && typeof scopedValues === 'object' ? scopedValues : {};
        const fieldData = (field._data && typeof field._data === 'object') ? field._data : {};

        return {
            ...(values || {}),
            ...scopedObject,
            ...fieldData,
        };
    }, [field, form, values]);

    const filteredOptions = useMemo(() => {
        const options = Array.isArray(field.options) ? field.options : [];

        return options.filter((option) => {
            if (!option?.if) {
                return true;
            }

            return evaluateCondition(option.if, conditionData);
        });
    }, [conditionData, field.options]);

    useEffect(() => {
        if (value === undefined || value === null || value === '') {
            return;
        }

        const hasCurrentValue = filteredOptions.some((option) => {
            return String(option?.value) === String(value);
        });

        if (hasCurrentValue) {
            return;
        }

        const fallback = filteredOptions.find((option) => {
            return option?.value !== undefined && option?.disabled !== true;
        });

        setValue(fallback ? fallback.value : '');
    }, [filteredOptions, setValue, value]);

    return (
        <FieldLayout
            name={field.name}
            label={field.label}
            instructions={field.instructions}
            warning={field.warning}
            required={field.required}
            errors={errors}
        >
            <RadioGroupInput
                name={field.name}
                value={value}
                options={filteredOptions.map((option) => ({
                    value: option.value,
                    label: option.label,
                    disabled: option.disabled,
                }))}
                onChange={(nextValue) => {
                    setValue(nextValue);
                    setTouched();
                }}
                disabled={field.disabled}
                aria-label={field.label}
            />
        </FieldLayout>
    );
};
