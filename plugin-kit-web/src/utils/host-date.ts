type CraftDateApi = {
    formatDate?: (date: Date) => string;
    locale?: string;
};

function getCraft(): CraftDateApi | undefined {
    return (globalThis as typeof globalThis & { Craft?: CraftDateApi }).Craft;
}

/** Locale chain aligned with React `hostGetLocale` / Craft CP. */
export function resolveHostLocale(): string {
    return getCraft()?.locale || document.documentElement.lang || 'en-US';
}

/**
 * Display date in the host locale — mirrors React `hostFormatDate` → `Craft.formatDate`.
 * Falls back to numeric `Intl` when Craft is unavailable (e.g. playground).
 */
export function formatHostDate(date: Date, locale?: string): string {
    const craftFormat = getCraft()?.formatDate;

    if (typeof craftFormat === 'function') {
        try {
            return craftFormat(date);
        } catch {
            // fall through to Intl
        }
    }

    const resolved = locale || resolveHostLocale();

    return new Intl.DateTimeFormat(resolved, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(date);
}
