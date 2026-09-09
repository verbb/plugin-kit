import React, { forwardRef, useMemo } from 'react';
import type { PkAutocomplete, PkAutocompleteSize } from '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';

import { Autocomplete } from './Autocomplete.js';
import { Option } from './Select.js';

export interface AutocompleteInputOption {
    value: string | number;
    label: string;
    disabled?: boolean;
    [key: string]: unknown;
}

export type AutocompleteFetchOptions = (
    query: string,
    signal?: AbortSignal,
) => Promise<AutocompleteInputOption[]>;

export interface AutocompleteInputProps {
    options?: AutocompleteInputOption[];
    fetchOptions?: AutocompleteFetchOptions;
    /** Freeform field value — always string (empty when cleared). */
    value?: string | null;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
    emptyMessage?: string;
    loadingMessage?: string;
    startTypingMessage?: string;
    showClear?: boolean;
    isInvalid?: boolean;
    size?: PkAutocompleteSize;
    /** When `full`, stretch the host to the available width (schema fields). */
    width?: 'full';
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
 * Convenience facade over `<pk-autocomplete>` for schema / prop-driven options.
 * Unlike ComboboxInput, the committed value is always freeform text — choosing a
 * suggestion inserts that option’s value string into the field.
 */
export const AutocompleteInput = forwardRef<PkAutocomplete, AutocompleteInputProps>(function AutocompleteInput(
    {
        options,
        fetchOptions,
        value = '',
        onValueChange,
        disabled = false,
        placeholder = '',
        emptyMessage = 'No options found.',
        loadingMessage = 'Searching…',
        startTypingMessage = 'Start typing to search…',
        showClear = false,
        isInvalid,
        size,
        width,
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

        const detail = (event as CustomEvent<{ value?: string }>).detail;
        onValueChange(detail?.value ?? '');
    };

    return (
        <Autocomplete
            ref={ref}
            disabled={disabled}
            placeholder={placeholder}
            emptyMessage={emptyMessage}
            loadingMessage={loadingMessage}
            startTypingMessage={startTypingMessage}
            clearable={showClear}
            invalid={isInvalid}
            size={size}
            width={width}
            async={usesAsync}
            fetchOptions={adaptedFetch}
            name={name}
            id={id}
            value={toStringValue(value)}
            onPkChange={handleChange}
            onPkOpenChange={onOpenChange ? (event: Event) => {
                return onOpenChange(Boolean((event as CustomEvent<{ open: boolean }>).detail?.open));
            } : undefined}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-errormessage={ariaErrorMessage}
            aria-labelledby={ariaLabelledBy}
        >
            {!usesAsync
                && flatOptions.map((option) => {
                    return (
                        <Option key={toStringValue(option.value)} value={toStringValue(option.value)} disabled={option.disabled}>
                            {option.label}
                        </Option>
                    );
                })}
        </Autocomplete>
    );
});

AutocompleteInput.displayName = 'AutocompleteInput';
