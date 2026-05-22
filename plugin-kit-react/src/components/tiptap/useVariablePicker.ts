import { useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import type { VariableOption, VariableCategories } from './VariableDropdown';
import type { VariableGroup } from './VariableCommandList';
import { getVariableCategoryEntries, matchesVariableQuery, toTopLevelGroups } from './variablePickerUtils';
export type UseVariablePickerOptions = {
    variableCategories: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    /** Called when a leaf variable is selected. defaultIfEmpty is optional (e.g. "Guest" for {user:firstName|Guest}). */
    onApply: (baseVariable: VariableOption, variable: VariableOption, defaultIfEmpty?: string) => void;
    /** When true, reset pages and search (e.g. when picker opens) */
    isOpen?: boolean;
    /** When opening for edit, start on this child page instead of top level */
    initialPage?: VariableOption | null;
    /** Optional: return current "default if empty" value when a variable is applied */
    getDefaultIfEmpty?: () => string;
    /** Defers expensive top-level group building until the picker is opened. */
    deferUntilOpen?: boolean;
};

export function useVariablePicker({
    variableCategories,
    variableCategoryLabels,
    variableCategoryOrder,
    onApply,
    isOpen,
    initialPage,
    getDefaultIfEmpty,
    deferUntilOpen = false,
}: UseVariablePickerOptions) {
    const t = useTranslation();
    const [pages, setPages] = useState<VariableOption[]>([]);
    const [search, setSearch] = useState('');

    const page = pages.at(-1);
    const shouldResolveGroups = !deferUntilOpen || Boolean(isOpen) || Boolean(page) || Boolean(initialPage);

    const flatCategories = useMemo(
        () => {
            if (!shouldResolveGroups) {
                return [];
            }

            return getVariableCategoryEntries(variableCategories, variableCategoryLabels, variableCategoryOrder);
        },
        [shouldResolveGroups, variableCategories, variableCategoryLabels, variableCategoryOrder],
    );

    const groupedTopLevel: VariableGroup[] = useMemo(() => {
        if (!shouldResolveGroups) {
            return [];
        }

        return toTopLevelGroups(flatCategories, t);
    }, [flatCategories, shouldResolveGroups, t]);

    const normalizedSearch = search.trim().toLowerCase();

    const groups: VariableGroup[] | null = useMemo(() => {
        if (!shouldResolveGroups && !page) {
            return [];
        }

        if (page?.children?.length) {
            const { children } = page;
            const groupValue = page.value ?? page.label ?? 'selectors';
            if (!normalizedSearch) {
                return [{ label: t('Selectors'), value: groupValue, items: children }];
            }
            const filtered = children.filter((item) => {
                return matchesVariableQuery(item, normalizedSearch);
            });
            return filtered.length ? [{ label: t('Selectors'), value: groupValue, items: filtered }] : [];
        }

        if (!normalizedSearch) {
            return groupedTopLevel;
        }

        return groupedTopLevel
            .map((g) => {
                return {
                    ...g,
                    items: g.items.filter((item) => {
                        const selfMatches = matchesVariableQuery(item, normalizedSearch);
                        if (selfMatches) {
                            return true;
                        }

                        const children = Array.isArray(item.children) ? item.children : [];
                        return children.some((c) => {
                            return matchesVariableQuery(c, normalizedSearch);
                        });
                    }),
                };
            })
            .filter((g) => {
                return g.items.length > 0;
            });
    }, [page, normalizedSearch, groupedTopLevel, shouldResolveGroups, t]);

    const options = useMemo(() => {
        return (groups ?? []).flatMap((g) => {
            return g.items;
        });
    }, [groups]);

    const handleSelect = useCallback((variable: VariableOption, baseVariableOpt?: VariableOption) => {
        if (Array.isArray(variable.children) && variable.children.length > 0) {
            setPages((p) => {
                return [...p, variable];
            });
            setSearch('');
            return;
        }

        const baseVariable = baseVariableOpt ?? page ?? variable;
        onApply(baseVariable, variable, getDefaultIfEmpty?.());
    }, [getDefaultIfEmpty, onApply, page]);

    const handleBack = useCallback(() => {
        setPages((p) => {
            return p.slice(0, -1);
        });
    }, []);

    const reset = useCallback(() => {
        setPages([]);
        setSearch('');
    }, []);

    useEffect(() => {
        if (isOpen) {
            if (initialPage && Array.isArray(initialPage.children) && initialPage.children.length > 0) {
                setPages([initialPage]);
                setSearch('');
            } else {
                reset();
            }
        }
    }, [initialPage, isOpen, reset]);

    return {
        groups,
        options,
        search,
        setSearch,
        page,
        handleSelect,
        handleBack,
        reset,
    };
}
