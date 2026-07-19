import { default as React } from 'react';
import { PkCombobox, PkComboboxSize } from '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
export interface ComboboxInputOption {
    value: string | number;
    label: string;
    disabled?: boolean;
    [key: string]: unknown;
}
export type ComboboxFetchOptions = (query: string, signal?: AbortSignal) => Promise<ComboboxInputOption[]>;
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
/**
 * Convenience facade over `<pk-combobox>` mirroring the `plugin-kit-react` `ComboboxInput`
 * contract: `options[]` (or `fetchOptions` for async search), controlled `value`/`onValueChange`,
 * and `multiple`. Unlike the base-ui version, `pk-combobox` owns async fetching, filtering, chips,
 * and empty/loading states internally — this wrapper just maps props/values.
 *
 * `pk-combobox` is string-valued, so values are stringified for the element and mapped back to
 * their original option value on change.
 */
export declare const ComboboxInput: React.ForwardRefExoticComponent<ComboboxInputProps & React.RefAttributes<PkCombobox>>;
//# sourceMappingURL=ComboboxInput.d.ts.map