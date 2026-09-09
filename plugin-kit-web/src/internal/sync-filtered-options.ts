import type { PkOption } from '../components/select/pk-option.js';
import { syncListboxSeparators } from './sync-listbox-separators.js';

export type SyncFilteredOptionsConfig = {
    /** Host that owns `pk-option` / `pk-option-group` / `pk-separator` children. */
    host: HTMLElement;
    options: PkOption[];
    /** Options that should remain visible (already filtered). */
    visible: PkOption[];
    /** Prefix for `optionId` values (e.g. listbox id). */
    listboxId: string;
    /** Lowercased query for `matchQuery` highlight; empty when closed / unfiltered. */
    filterQuery: string;
    /**
     * Whether each option is “selected” for checkmarks.
     * Autocomplete always returns false — the freeform text is the value.
     */
    isSelected: (value: string) => boolean;
};

/**
 * Apply filter visibility, match highlight, option ids, and group empty markers.
 * Shared by Combobox and Autocomplete — not a full listbox controller.
 */
export function syncFilteredOptions(config: SyncFilteredOptionsConfig): void {
    const {
        host, options, visible, listboxId, filterQuery, isSelected,
    } = config;

    for (const option of options) {
        option.selected = isSelected(option.value);
        option.hidden = !visible.includes(option);
        option.optionId = `${listboxId}-option-${option.value}`;
        option.matchQuery = filterQuery;
    }

    for (const group of host.querySelectorAll('pk-option-group')) {
        const groupOptions = [...group.querySelectorAll('pk-option')];
        // Use data-pk-filter-empty — not `hidden` — so clearing the query can
        // resurrect options. `hidden` is reserved for intentional author hide.
        const filterEmpty = groupOptions.length > 0
            && groupOptions.every((option) => option.hidden);

        group.toggleAttribute('data-pk-filter-empty', filterEmpty);
    }

    syncListboxSeparators(host);
}
