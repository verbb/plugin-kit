import React, { forwardRef, useMemo } from 'react';
import type { PkSelect, PkSelectSize } from '@verbb/plugin-kit-web/components/select/pk-select.js';
import type { PkStatusVariant } from '@verbb/plugin-kit-web/components/status/pk-status.js';

import { Option, OptionGroup, Select } from './Select.js';
import { Status } from './Status.js';

export interface SelectInputOption {
    value: unknown;
    label: string;
    disabled?: boolean;
    status?: string;
}

export interface SelectInputOptionGroup {
    group: string;
    options: SelectInputOption[];
}

export interface SelectInputProps {
    options: Array<SelectInputOption | SelectInputOptionGroup>;
    value?: unknown;
    onChange?: (value: unknown) => void;
    placeholder?: string;
    disabled?: boolean;
    isInvalid?: boolean;
    clearable?: boolean;
    size?: PkSelectSize;
    /** When `full`, stretch the select host to the available width (table cells). */
    width?: 'full';
    name?: string;
    id?: string;
    onBlur?: (event: Event) => void;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
    'aria-labelledby'?: string;
}

const isGroup = (option: SelectInputOption | SelectInputOptionGroup): option is SelectInputOptionGroup => {
    return typeof option === 'object' && option !== null && 'group' in option;
};

const toStringValue = (value: unknown): string => {
    return value === undefined || value === null ? '' : String(value);
};

/**
 * Convenience facade over `<pk-select>` matching the `plugin-kit-react` `SelectInput`
 * ergonomics: an `options[]` array plus controlled `value`/`onChange`, instead of the
 * slotted `<pk-option>` children the raw `Select` facade exposes.
 *
 * `pk-select` is string-valued, so option values are stringified for the element and
 * mapped back to their original value on change.
 */
export const SelectInput = forwardRef<PkSelect, SelectInputProps>(function SelectInput(
    {
        options,
        value,
        onChange,
        placeholder,
        disabled,
        isInvalid,
        clearable,
        size,
        width,
        name,
        id,
        onBlur,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-errormessage': ariaErrorMessage,
        'aria-labelledby': ariaLabelledBy,
    },
    ref,
) {
    const flatOptions = useMemo(() => {
        return options.flatMap((option) => { return isGroup(option) ? option.options : [option]; });
    }, [options]);

    const handleChange = (event: Event): void => {
        if (!onChange) {
            return;
        }

        const detail = (event as CustomEvent<{ value: string | string[] }>).detail;
        const raw = Array.isArray(detail?.value) ? detail?.value[0] : detail?.value;
        const match = flatOptions.find((option) => { return toStringValue(option.value) === toStringValue(raw); });

        onChange(match ? match.value : raw ?? '');
    };

    const renderOption = (option: SelectInputOption) => {
        return (
            <Option key={toStringValue(option.value)} value={toStringValue(option.value)} disabled={option.disabled}>
                {option.status ? <Status slot="start" status={option.status as PkStatusVariant} /> : null}
                {option.label}
            </Option>
        );
    };

    return (
        <Select
            ref={ref}
            value={toStringValue(value)}
            placeholder={placeholder}
            disabled={disabled}
            invalid={isInvalid}
            clearable={clearable}
            size={size}
            width={width}
            name={name}
            id={id}
            onPkChange={handleChange}
            onFocusOut={onBlur}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-errormessage={ariaErrorMessage}
            aria-labelledby={ariaLabelledBy}
        >
            {options.map((option) => {
                return isGroup(option) ? (
                    <OptionGroup key={option.group} label={option.group}>
                        {option.options.map(renderOption)}
                    </OptionGroup>
                ) : (
                    renderOption(option)
                );
            })}
        </Select>
    );
});
