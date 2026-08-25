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

/**
 * Cross-bundle singleton keys. Craft CP pages load several Plugin Kit consumers,
 * each with its own Vite copy of this module — a module-scoped `registry` object
 * would not be shared, so Plugin B’s `registerIcons({ gear })` never reaches
 * Plugin A’s winning `<pk-icon>`. `globalThis` is the same map for every copy.
 */
const REGISTRY_KEY = '__PK_ICON_REGISTRY__';
const LISTENERS_KEY = '__PK_ICON_REGISTRY_LISTENERS__';

type IconRegistryGlobal = typeof globalThis & {
    [REGISTRY_KEY]?: Record<string, PkIcon>;
    [LISTENERS_KEY]?: Set<() => void>;
};

const getRegistry = (): Record<string, PkIcon> => {
    const root = globalThis as IconRegistryGlobal;

    if (!root[REGISTRY_KEY]) {
        root[REGISTRY_KEY] = {};
    }

    return root[REGISTRY_KEY];
};

const getListeners = (): Set<() => void> => {
    const root = globalThis as IconRegistryGlobal;

    if (!root[LISTENERS_KEY]) {
        root[LISTENERS_KEY] = new Set();
    }

    return root[LISTENERS_KEY];
};

const notifyRegistryChanged = (): void => {
    for (const listener of getListeners()) {
        try {
            listener();
        } catch {
            // Listener errors must not break other subscribers / registerIcons.
        }
    }
};

/**
 * Subscribe to additive `registerIcon(s)` updates (e.g. `<pk-icon>` re-resolves
 * after a later plugin merges glyphs into the shared map). Returns unsubscribe.
 */
export const subscribeIconRegistry = (listener: () => void): (() => void) => {
    const listeners = getListeners();
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

/** All currently registered icon names (kebab-case). */
export const getIconNames = (): readonly string[] => {
    return Object.keys(getRegistry()).sort();
};

/** Resolve an icon by kebab-case or camelCase name. Returns `undefined` if unknown. */
export const getIcon = (name: string): PkIcon | undefined => {
    if (!name) {
        return undefined;
    }

    const registry = getRegistry();
    const key = normalizeIconName(name);

    return registry[key] ?? registry[name];
};

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
export const registerIcon = (name: string, icon: PkIcon): void => {
    const key = normalizeIconName(name);

    if (!key) {
        throw new Error('registerIcon: name must be a non-empty string');
    }

    if (!icon?.path || !icon.width || !icon.height) {
        throw new Error(`registerIcon: icon "${key}" must include width, height, and path`);
    }

    getRegistry()[key] = icon;
    notifyRegistryChanged();
};

/**
 * Register several icons in one call. Equivalent to repeated {@link registerIcon},
 * with a single change notification at the end.
 * Keys may be kebab-case or camelCase (normalized to kebab).
 */
export const registerIcons = (entries: Record<string, PkIcon>): void => {
    let changed = false;

    for (const [name, icon] of Object.entries(entries)) {
        const key = normalizeIconName(name);

        if (!key) {
            throw new Error('registerIcon: name must be a non-empty string');
        }

        if (!icon?.path || !icon.width || !icon.height) {
            throw new Error(`registerIcon: icon "${key}" must include width, height, and path`);
        }

        getRegistry()[key] = icon;
        changed = true;
    }

    if (changed) {
        notifyRegistryChanged();
    }
};
