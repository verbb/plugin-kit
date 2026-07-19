/** Locale chain aligned with React `hostGetLocale` / Craft CP. */
export declare function resolveHostLocale(): string;
/**
 * Display date in the host locale — mirrors React `hostFormatDate` → `Craft.formatDate`.
 * Falls back to numeric `Intl` when Craft is unavailable (e.g. playground).
 */
export declare function formatHostDate(date: Date, locale?: string): string;
//# sourceMappingURL=host-date.d.ts.map