import {
    Fragment, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import type { ComponentProps } from 'react';

import { Spinner } from '@verbb/plugin-kit-react/components';
import {
    Combobox,
    ComboboxPrimitiveInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxList,
    ComboboxItem,
    ComboboxValue,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
    ComboboxHighlightedText,
    useComboboxAnchor,
} from '@verbb/plugin-kit-react/components/Combobox';

export type ComboboxInputOption = {
    label: string;
    value: string | number;
    icon?: string | null;
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

type CacheEntry = {
    options: ComboboxInputOption[];
    expiresAt: number;
};

const optionsCache = new Map<string, CacheEntry>();

const toStringValue = (value: unknown): string => {
    return String(value ?? '');
};

const OptionIcon = ({ icon }: { icon?: string | null }) => {
    if (!icon || typeof icon !== 'string') {
        return null;
    }

    return (
        <span
            className="text-slate-500 [&_svg]:size-4 [&_svg]:shrink-0"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: icon }}
        />
    );
};

export const ComboboxInput = ({
    options,
    fetchOptions,
    value = null,
    onValueChange,
    multiple = false,
    disabled = false,
    placeholder = 'Select an option',
    emptyMessage = 'No options found.',
    className,
    contentClassName,
    withLoadingIndicator = true,
    showClear = true,
    open,
    defaultOpen,
    onOpenChange,
    onInputValueChange,
    cacheKey,
    cacheTtlMs = 5 * 60 * 1000,
    disableCache = false,
}: ComboboxInputProps) => {
    const [fetchedOptions, setFetchedOptions] = useState<ComboboxInputOption[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [internalOpen, setInternalOpen] = useState(Boolean(defaultOpen));
    const [searchValue, setSearchValue] = useState('');
    const hasLoadedRef = useRef(false);
    const anchor = useComboboxAnchor();
    const isMultiple = multiple;
    const isOpen = open ?? internalOpen;

    const resolvedOptions = useMemo(() => {
        return fetchedOptions ?? options ?? [];
    }, [fetchedOptions, options]);

    const resolveCachedOptions = useCallback(() => {
        if (disableCache || !cacheKey) {
            return null;
        }

        const cached = optionsCache.get(cacheKey);
        if (!cached) {
            return null;
        }

        if (cached.expiresAt <= Date.now()) {
            optionsCache.delete(cacheKey);
            return null;
        }

        return cached.options;
    }, [cacheKey, disableCache]);

    const persistCachedOptions = useCallback((nextOptions: ComboboxInputOption[]) => {
        if (disableCache || !cacheKey) {
            return;
        }

        optionsCache.set(cacheKey, {
            options: nextOptions,
            expiresAt: Date.now() + cacheTtlMs,
        });
    }, [cacheKey, cacheTtlMs, disableCache]);

    useEffect(() => {
        if (!fetchOptions || !isOpen) {
            return;
        }

        const cachedOptions = resolveCachedOptions();
        if (cachedOptions) {
            setFetchedOptions(cachedOptions);
            hasLoadedRef.current = true;
            return;
        }

        if (hasLoadedRef.current && fetchedOptions) {
            return;
        }

        let isMounted = true;

        const loadOptions = async() => {
            setLoading(true);

            try {
                const fetchedOptions = await fetchOptions();

                if (isMounted) {
                    setFetchedOptions(fetchedOptions);
                    persistCachedOptions(fetchedOptions);
                    hasLoadedRef.current = true;
                }
            } catch (error) {
                console.error('Failed to load combobox options:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadOptions();

        return () => {
            isMounted = false;
        };
    }, [fetchOptions, fetchedOptions, isOpen, persistCachedOptions, resolveCachedOptions]);

    const selectedValue = useMemo(() => {
        if (isMultiple) {
            const selectedValues = Array.isArray(value) ? new Set(value.map((item) => { return toStringValue(item); })) : new Set<string>();
            return resolvedOptions.filter((option) => { return selectedValues.has(toStringValue(option.value)); });
        }

        return resolvedOptions.find((option) => { return toStringValue(option.value) === toStringValue(value); }) ?? null;
    }, [isMultiple, resolvedOptions, value]);

    const handleChange = (nextValue: unknown) => {
        if (!onValueChange) {
            return;
        }

        if (isMultiple) {
            const nextItems = Array.isArray(nextValue) ? nextValue : [];
            onValueChange(nextItems.map((item) => { return item.value; }));
            return;
        }

        onValueChange(nextValue?.value ?? null);
    };

    return (
        <div className="flex items-center gap-2">
            <Combobox
                multiple={isMultiple}
                items={resolvedOptions}
                value={selectedValue as ComponentProps<typeof Combobox>['value']}
                onValueChange={handleChange}
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={(nextOpen) => {
                    setInternalOpen(nextOpen);
                    onOpenChange?.(nextOpen);

                    if (!nextOpen) {
                        setSearchValue('');
                    }
                }}
                onInputValueChange={(nextValue) => {
                    const nextSearchValue = String(nextValue ?? '');
                    setSearchValue(nextSearchValue);
                    onInputValueChange?.(nextSearchValue);
                }}
                itemToStringLabel={(item) => { return (item as ComboboxInputOption | null)?.label ?? ''; }}
                itemToStringValue={(item) => { return toStringValue((item as ComboboxInputOption | null)?.value); }}
                disabled={disabled}
            >
                {isMultiple ? (
                    <ComboboxChips ref={anchor} className={className}>
                        <ComboboxValue>
                            {(items) => {
                                return (
                                    <Fragment>
                                        {items.map((item) => {
                                            return (
                                                <ComboboxChip key={toStringValue(item.value)}>
                                                    <OptionIcon icon={item.icon} />
                                                    {item.label}
                                                </ComboboxChip>
                                            );
                                        })}
                                        <ComboboxChipsInput placeholder={placeholder} />
                                    </Fragment>
                                );
                            }}
                        </ComboboxValue>
                    </ComboboxChips>
                ) : (
                    <ComboboxPrimitiveInput
                        className={className}
                        placeholder={placeholder}
                        showClear={showClear}
                        disabled={disabled}
                    />
                )}

                <ComboboxContent
                    anchor={isMultiple ? anchor : undefined}
                    className={contentClassName}
                >
                    <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => {
                            return (
                                <ComboboxItem key={toStringValue(item.value)} value={item}>
                                    <span className="flex items-center gap-2">
                                        <OptionIcon icon={item.icon} />
                                        <ComboboxHighlightedText text={item.label} search={searchValue} />
                                    </span>
                                </ComboboxItem>
                            );
                        }}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>

            {withLoadingIndicator && loading && <Spinner size="xs" />}
        </div>
    );
};
