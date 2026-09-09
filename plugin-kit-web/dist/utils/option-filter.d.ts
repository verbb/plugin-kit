import { PkOption } from '../components/select/pk-option.js';
/** Custom option filter — `(option, query) => boolean`. Query is already lowercased. */
export type PkOptionFilter = (option: PkOption, query: string) => boolean;
/**
 * Default Combobox / Autocomplete filter: label, value, or full search text substring.
 * Rich options may set a short `label` for the closed input — still match subtitle text.
 */
export declare function defaultOptionFilter(option: PkOption, query: string): boolean;
/** Resolve a custom filter or the default substring match. */
export declare function matchesOptionFilter(option: PkOption, query: string, filter: PkOptionFilter | null | undefined): boolean;
//# sourceMappingURL=option-filter.d.ts.map