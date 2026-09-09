import { default as React } from 'react';
import { PkAutocomplete, PkAutocompleteSize } from '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';
export interface AutocompleteInputOption {
    value: string | number;
    label: string;
    disabled?: boolean;
    [key: string]: unknown;
}
export type AutocompleteFetchOptions = (query: string, signal?: AbortSignal) => Promise<AutocompleteInputOption[]>;
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
/**
 * Convenience facade over `<pk-autocomplete>` for schema / prop-driven options.
 * Unlike ComboboxInput, the committed value is always freeform text — choosing a
 * suggestion inserts that option’s value string into the field.
 */
export declare const AutocompleteInput: React.ForwardRefExoticComponent<AutocompleteInputProps & React.RefAttributes<PkAutocomplete>>;
//# sourceMappingURL=AutocompleteInput.d.ts.map