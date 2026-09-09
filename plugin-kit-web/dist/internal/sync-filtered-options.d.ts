import { PkOption } from '../components/select/pk-option.js';
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
export declare function syncFilteredOptions(config: SyncFilteredOptionsConfig): void;
//# sourceMappingURL=sync-filtered-options.d.ts.map