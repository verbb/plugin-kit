export type ComboboxInputOption = {
    label: string;
    value: string | number;
    [key: string]: unknown;
};
export type ComboboxInputProps = {
    options?: ComboboxInputOption[];
    fetchOptions?: () => Promise<ComboboxInputOption[]>;
    value?: string | number | Array<string | number> | null;
    onValueChange?: (value: string | number | Array<string | number> | null) => void;
    multiple?: boolean;
    disabled?: boolean;
    placeholder?: string;
    emptyMessage?: string;
    className?: string;
    contentClassName?: string;
    withLoadingIndicator?: boolean;
    showClear?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onInputValueChange?: (value: string) => void;
    cacheKey?: string;
    cacheTtlMs?: number;
    disableCache?: boolean;
};
export declare const ComboboxInput: ({ options, fetchOptions, value, onValueChange, multiple, disabled, placeholder, emptyMessage, className, contentClassName, withLoadingIndicator, showClear, open, defaultOpen, onOpenChange, onInputValueChange, cacheKey, cacheTtlMs, disableCache, }: ComboboxInputProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ComboboxInput.d.ts.map