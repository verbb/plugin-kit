import type { PkOption } from '../components/select/pk-option.js';

/** Custom option filter — `(option, query) => boolean`. Query is already lowercased. */
export type PkOptionFilter = (option: PkOption, query: string) => boolean;

/**
 * Default Combobox / Autocomplete filter: label, value, or full search text substring.
 * Rich options may set a short `label` for the closed input — still match subtitle text.
 */
export function defaultOptionFilter(option: PkOption, query: string): boolean {
    const label = option.getLabel().toLowerCase();
    const value = option.value.toLowerCase();
    const searchText = (option.getSearchText?.() ?? label).toLowerCase();

    return label.includes(query) || value.includes(query) || searchText.includes(query);
}

/** Resolve a custom filter or the default substring match. */
export function matchesOptionFilter(
    option: PkOption,
    query: string,
    filter: PkOptionFilter | null | undefined,
): boolean {
    if (filter) {
        return filter(option, query);
    }

    return defaultOptionFilter(option, query);
}
