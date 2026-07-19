import React from 'react';

import { readPkValueDetail } from '../utils/pk-change.js';
import { Radio, RadioGroup, type RadioGroupProps } from './RadioGroup.js';

export interface RadioGroupInputOption {
    value: unknown;
    label: React.ReactNode;
    disabled?: boolean;
}

export interface RadioGroupInputProps extends Omit<RadioGroupProps, 'children' | 'onChange' | 'onPkChange' | 'value'> {
    options: RadioGroupInputOption[];
    value?: unknown;
    onChange?: (value: unknown) => void;
    onPkChange?: RadioGroupProps['onPkChange'];
}

const toStringValue = (value: unknown): string => {
    return value === undefined || value === null ? '' : String(value);
};

/**
 * Convenience facade over `<pk-radio-group>` with an `options[]` array plus controlled
 * `value`/`onChange`, instead of slotted `<pk-radio>` children the raw `RadioGroup` exposes.
 */
export function RadioGroupInput({
    options,
    value,
    onChange,
    onPkChange,
    ...props
}: RadioGroupInputProps) {
    const handlePkChange = (event: Event): void => {
        onPkChange?.(event as Parameters<NonNullable<RadioGroupProps['onPkChange']>>[0]);

        if (!onChange) {
            return;
        }

        const nextValue = readPkValueDetail(event);
        const match = options.find((option) => toStringValue(option.value) === nextValue);

        onChange(match ? match.value : nextValue);
    };

    return (
        <RadioGroup
            {...props}
            value={toStringValue(value)}
            onPkChange={handlePkChange}
        >
            {options.map((option) => (
                <Radio
                    key={toStringValue(option.value)}
                    value={toStringValue(option.value)}
                    disabled={option.disabled}
                >
                    {option.label}
                </Radio>
            ))}
        </RadioGroup>
    );
}
