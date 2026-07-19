import { useEffect, useMemo, useSyncExternalStore } from 'react';
import type React from 'react';

import { evaluateCondition } from '@verbb/plugin-kit-forms';
import type { SchemaNode } from '@verbb/plugin-kit-forms';

import { SelectInput } from '../../components/SelectInput.js';
import { FieldLayout } from '../Field.js';
import type { SchemaFormEngineApi } from '../engine/context.js';
import { useEngineField } from '../useEngineField.js';

type SelectFieldOption = {
    value: unknown;
    label: string;
    disabled?: boolean;
    if?: string;
    [key: string]: unknown;
};

type SelectFieldProps = {
    form: SchemaFormEngineApi;
    field: SchemaNode & {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        options?: SelectFieldOption[];
        required?: boolean;
        disabled?: boolean;
    };
};

type SelectInputProps = React.ComponentProps<typeof SelectInput>;

export const SelectField = ({ form, field }: SelectFieldProps) => {
    const {
        value, setValue, setTouched, errors, isInvalid,
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
            <SelectInput
                options={filteredOptions}
                placeholder={field.placeholder}
                value={value ?? ''}
                onChange={(nextValue) => { return setValue(nextValue); }}
                isInvalid={isInvalid}
                onBlur={setTouched as SelectInputProps['onBlur']}
                disabled={field.disabled}
            />
        </FieldLayout>
    );
};
