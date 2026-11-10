/**
 * Locale-aware value formatting for charts, stat tiles and tables.
 *
 * Everything here is `Intl`-based and framework-neutral. A value is described by a
 * `FormatSpec` (its type plus options such as currency or date bucket), and each spec
 * has two renderings: `axis` (compact, for ticks and tight spaces) and `full` (for
 * tooltips, tables and screen-reader text).
 */
export type FormatType = 'number' | 'money' | 'percent' | 'duration' | 'date' | 'category';
/** Bucket a date value represents. Week buckets start on the given date and span seven days. */
export type DateBucket = 'hour' | 'day' | 'week' | 'month' | 'year';
export type FormatContext = 'axis' | 'full';
export type FormatSpec = {
    type?: FormatType;
    /** ISO 4217 currency code for `money`. Defaults to `USD`. */
    currency?: string;
    /** Fixed fraction digits for `number` and `money` in the `full` context. By default numbers show up to two. */
    decimals?: number;
    /** Date bucket for `date` values. Defaults to `day`. */
    bucket?: DateBucket;
};
export type FormatOptions = {
    context?: FormatContext;
    locale?: string;
    /** Text for `null`/`undefined` values. Defaults to an en dash. */
    emptyLabel?: string;
};
export type ValueFormatter = (value: unknown) => string;
export type ChangeMode = 'relative' | 'absolute';
/** Which direction counts as an improvement for a metric. */
export type ChangePositive = 'up' | 'down' | 'none';
export type ChangeTone = 'good' | 'bad' | 'neutral';
export type FormattedChange = {
    text: string;
    direction: -1 | 0 | 1;
    tone: ChangeTone;
};
export type ChangeOptions = {
    mode?: ChangeMode;
    positive?: ChangePositive;
    locale?: string;
    /** Suffix for absolute changes between `percent` values. Defaults to `pts`. */
    pointsLabel?: string;
};
/**
 * Parse a bucket key into a local `Date`.
 * `YYYY`, `YYYY-MM` and `YYYY-MM-DD` keys are read as local calendar dates (not UTC),
 * so a `2026-11-05` bucket never renders as 4 November west of Greenwich.
 */
export declare function parseBucketDate(value: unknown): Date | null;
/**
 * Format a duration in seconds with narrow units, e.g. `26h 30m` or `2m 5s`.
 * The `axis` context drops seconds once hours are present and never rounds a part up,
 * so tick labels stay exact.
 */
export declare function formatDuration(seconds: number, locale?: string, context?: FormatContext): string;
/** Build a reusable formatter for one spec, locale and context. */
export declare function createFormatter(spec?: FormatSpec, options?: FormatOptions): ValueFormatter;
/** One-off formatting. Prefer `createFormatter` when formatting many values. */
export declare function formatValue(value: unknown, spec?: FormatSpec, options?: FormatOptions): string;
/**
 * Describe the change from `previous` to `current`.
 * `relative` gives a signed percentage; `absolute` gives a signed difference, in
 * percentage points when the spec is `percent`. Returns `null` when either value is
 * missing, or for a relative change from zero.
 */
export declare function formatChange(current: unknown, previous: unknown, spec?: FormatSpec, options?: ChangeOptions): FormattedChange | null;
//# sourceMappingURL=format.d.ts.map