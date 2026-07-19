import type { PkIcon } from './types.js';

const camelToKebab = (value: string): string => {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Normalize a consumer-facing name to the registry key.
 * Accepts kebab-case (`chevron-down`) or camelCase (`chevronDown`) — same glyph, not synonyms.
 */
export const normalizeIconName = (name: string): string => {
    const trimmed = name.trim();
    if (!trimmed) {
        return trimmed;
    }

    // Already kebab / lowercase with separators — keep as-is after lowercasing.
    if (!/[A-Z]/.test(trimmed)) {
        return trimmed.toLowerCase();
    }

    return camelToKebab(trimmed);
};

/** Empty until the consumer registers icons or imports `@verbb/plugin-kit-icons/all.js`. */
const registry: Record<string, PkIcon> = {};

/** All currently registered icon names (kebab-case). */
export const getIconNames = (): readonly string[] => {
    return Object.keys(registry).sort();
};

/** Resolve an icon by kebab-case or camelCase name. Returns `undefined` if unknown. */
export const getIcon = (name: string): PkIcon | undefined => {
    if (!name) {
        return undefined;
    }

    const key = normalizeIconName(name);

    return registry[key] ?? registry[name];
};

/**
 * Register (or overwrite) an icon for `<pk-icon icon="…">` / {@link getIcon}.
 *
 * Call once at app bootstrap for every name your Twig/HTML looks up. Prefer named
 * icon imports so unused glyphs stay out of the bundle; use
 * `@verbb/plugin-kit-icons/all.js` only when you need the full curated set.
 *
 * Object keys may be camelCase (`arrowUp`) or kebab-case (`arrow-up`) — both
 * store under the kebab key that HTML uses.
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
export const registerIcon = (name: string, icon: PkIcon): void => {
    const key = normalizeIconName(name);

    if (!key) {
        throw new Error('registerIcon: name must be a non-empty string');
    }

    if (!icon?.path || !icon.width || !icon.height) {
        throw new Error(`registerIcon: icon "${key}" must include width, height, and path`);
    }

    registry[key] = icon;
};

/**
 * Register several icons in one call. Equivalent to repeated {@link registerIcon}.
 * Keys may be kebab-case or camelCase (normalized to kebab).
 */
export const registerIcons = (entries: Record<string, PkIcon>): void => {
    for (const [name, icon] of Object.entries(entries)) {
        registerIcon(name, icon);
    }
};
