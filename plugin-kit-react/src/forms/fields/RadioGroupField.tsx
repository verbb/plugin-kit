import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { RadioGroup, RadioGroupItem } from '@verbb/plugin-kit-react/components/RadioGroup';
import { evaluateCondition } from '@verbb/plugin-kit-react/utils/schema';
import { cn } from '@verbb/plugin-kit-react/utils';
import { FieldLayout } from '../Field';
import type { SchemaFormEngineApi } from '../engine/context';
import type { SchemaNode } from '../engine/SchemaIndex';
import { useEngineField } from '../useEngineField';

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

    const currentValueKey = value === undefined || value === null ? undefined : String(value);

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
            <RadioGroup
                name={field.name}
                value={currentValueKey}
                onValueChange={(nextValue) => {
                    const matchedOption = filteredOptions.find((option) => {
                        return String(option?.value) === nextValue;
                    });

                    setValue(matchedOption ? matchedOption.value : nextValue);
                    setTouched();
                }}
                aria-invalid={isInvalid}
                disabled={field.disabled}
                className="gap-3"
            >
                {filteredOptions.map((option, index) => {
                    const optionId = `${field.name}-${index}`;
                    const optionValue = String(option.value);
                    const hasDescription = Boolean(option.description);
                    const optionDisabled = field.disabled || option.disabled;

                    return (
                        <label
                            key={optionId}
                            htmlFor={optionId}
                            className={cn(
                                'flex gap-2 text-sm',
                                hasDescription ? 'items-start' : 'items-center',
                                optionDisabled && 'cursor-not-allowed opacity-60',
                            )}
                        >
                            <RadioGroupItem
                                id={optionId}
                                value={optionValue}
                                disabled={optionDisabled}
                                aria-invalid={isInvalid}
                                className={hasDescription ? 'mt-0.5' : undefined}
                            />

                            <span>
                                <span className="font-medium text-slate-950">{option.label}</span>

                                {hasDescription && (
                                    <span className="block text-gray-500">{option.description}</span>
                                )}
                            </span>
                        </label>
                    );
                })}
            </RadioGroup>
        </FieldLayout>
    );
};
