import { PkIcon } from './types.js';
/**
 * Normalize a consumer-facing name to the registry key.
 * Accepts kebab-case (`chevron-down`) or camelCase (`chevronDown`) — same glyph, not synonyms.
 */
export declare const normalizeIconName: (name: string) => string;
/**
 * Subscribe to additive `registerIcon(s)` updates (e.g. `<pk-icon>` re-resolves
 * after a later plugin merges glyphs into the shared map). Returns unsubscribe.
 */
export declare const subscribeIconRegistry: (listener: () => void) => (() => void);
/** All currently registered icon names (kebab-case). */
export declare const getIconNames: () => readonly string[];
/** Resolve an icon by kebab-case or camelCase name. Returns `undefined` if unknown. */
export declare const getIcon: (name: string) => PkIcon | undefined;
/**
 * Register (or overwrite) an icon for `<pk-icon icon="…">` / {@link getIcon}.
 *
 * Call once at app bootstrap for every name your markup looks up. Prefer named
 * icon imports so unused glyphs stay out of the bundle; use
 * `@verbb/plugin-kit-icons/all.js` only when you need the full curated set.
 *
 * Object keys may be camelCase (`arrowUp`) or kebab-case (`arrow-up`) — both
 * store under the kebab key that HTML uses.
 *
 * Registrations merge into a **page-global** map so multiple Craft plugins that
 * each bundle this package still share one glyph table (first `pk-icon` wins
 * define; every plugin’s `registerIcons` still contributes).
 *
 * @example
 * ```ts
 * import { registerIcons, plus, gear, arrowUp } from '@verbb/plugin-kit-icons';
 *
 * registerIcons({ plus, gear, arrowUp });
 * // <pk-icon icon="plus"></pk-icon>
 * // <pk-icon icon="arrow-up"></pk-icon>
 * ```
 */
export declare const registerIcon: (name: string, icon: PkIcon) => void;
/**
 * Register several icons in one call. Equivalent to repeated {@link registerIcon},
 * with a single change notification at the end.
 * Keys may be kebab-case or camelCase (normalized to kebab).
 */
export declare const registerIcons: (entries: Record<string, PkIcon>) => void;
//# sourceMappingURL=registry.d.ts.map