import React, { forwardRef, useMemo } from 'react';
import type { PkCombobox, PkComboboxSize } from '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';

import { Combobox } from './Combobox.js';
import { Option } from './Select.js';

export interface ComboboxInputOption {
    value: string | number;
    label: string;
    disabled?: boolean;
    [key: string]: unknown;
}

export type ComboboxFetchOptions = (
    query: string,
    signal?: AbortSignal,
) => Promise<ComboboxInputOption[]>;

export interface ComboboxInputProps {
    options?: ComboboxInputOption[];
    fetchOptions?: ComboboxFetchOptions;
    value?: string | number | Array<string | number> | null;
    onValueChange?: (value: string | number | Array<string | number> | null) => void;
    multiple?: boolean;
    disabled?: boolean;
    placeholder?: string;
    emptyMessage?: string;
    loadingMessage?: string;
    startTypingMessage?: string;
    showClear?: boolean;
    isInvalid?: boolean;
    size?: PkComboboxSize;
    /** When `full`, stretch the combobox host to the available width (schema fields, table cells). */
    width?: 'full';
    allowCreate?: boolean;
    onCreate?: (query: string) => void;
    onOpenChange?: (open: boolean) => void;
    name?: string;
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
    'aria-labelledby'?: string;
}

const toStringValue = (value: unknown): string => {
    return value === undefined || value === null ? '' : String(value);
};

/**
 * Convenience facade over `<pk-combobox>` mirroring the `plugin-kit-react` `ComboboxInput`
 * contract: `options[]` (or `fetchOptions` for async search), controlled `value`/`onValueChange`,
 * and `multiple`. Unlike the base-ui version, `pk-combobox` owns async fetching, filtering, chips,
 * and empty/loading states internally — this wrapper just maps props/values.
 *
 * `pk-combobox` is string-valued, so values are stringified for the element and mapped back to
 * their original option value on change.
 */
export const ComboboxInput = forwardRef<PkCombobox, ComboboxInputProps>(function ComboboxInput(
    {
        options,
        fetchOptions,
        value = null,
        onValueChange,
        multiple = false,
        disabled = false,
        placeholder = '',
        emptyMessage = 'No options found.',
        loadingMessage = 'Searching…',
        startTypingMessage = 'Start typing to search…',
        // Off by default — match pk-combobox `clearable=false` and v1 (None as a list option).
        showClear = false,
        isInvalid,
        size,
        width,
        allowCreate,
        onCreate,
        onOpenChange,
        name,
        id,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-errormessage': ariaErrorMessage,
        'aria-labelledby': ariaLabelledBy,
    },
    ref,
) {
    const usesAsync = Boolean(fetchOptions) && !options?.length;

    const flatOptions = useMemo(() => { return options ?? []; }, [options]);

    const mapBack = (raw: string): string | number => {
        const match = flatOptions.find((option) => { return toStringValue(option.value) === toStringValue(raw); });
        return match ? match.value : raw;
    };

    const adaptedFetch = useMemo(() => {
        if (!fetchOptions) {
            return null;
        }

        return async (query: string, signal: AbortSignal) => {
            const results = await fetchOptions(query, signal);
            return results.map((option) => { return { value: toStringValue(option.value), label: option.label }; });
        };
    }, [fetchOptions]);

    const handleChange = (event: Event): void => {
        if (!onValueChange) {
            return;
        }

        const detail = (event as CustomEvent<{ value: string | string[] }>).detail;
        const raw = detail?.value;

        if (multiple) {
            const arr = Array.isArray(raw) ? raw : raw ? [raw] : [];
            onValueChange(arr.map((entry) => { return mapBack(entry); }));
            return;
        }

        const single = Array.isArray(raw) ? raw[0] : raw;
        onValueChange(single ? mapBack(single) : null);
    };

    const valueProps = multiple
        ? { values: (Array.isArray(value) ? value : []).map((entry) => { return toStringValue(entry); }) }
        : { value: toStringValue(value) };

    return (
        <Combobox
            ref={ref}
            multiple={multiple}
            disabled={disabled}
            placeholder={placeholder}
            emptyMessage={emptyMessage}
            loadingMessage={loadingMessage}
            startTypingMessage={startTypingMessage}
            clearable={showClear}
            invalid={isInvalid}
            size={size}
            width={width}
            allowCreate={allowCreate}
            async={usesAsync}
            fetchOptions={adaptedFetch}
            name={name}
            id={id}
            onPkChange={handleChange}
            onPkCreate={onCreate ? (event: Event) => { return onCreate((event as CustomEvent<{ query: string }>).detail?.query ?? ''); } : undefined}
            onPkOpenChange={onOpenChange ? (event: Event) => { return onOpenChange(Boolean((event as CustomEvent<{ open: boolean }>).detail?.open)); } : undefined}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-errormessage={ariaErrorMessage}
            aria-labelledby={ariaLabelledBy}
            {...valueProps}
        >
            {!usesAsync
                && flatOptions.map((option) => {
                    return (
                        <Option key={toStringValue(option.value)} value={toStringValue(option.value)} disabled={option.disabled}>
                            {option.label}
                        </Option>
                    );
                })}
        </Combobox>
    );
});
