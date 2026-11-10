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

const EMPTY = '–';
const COMPACT_THRESHOLD = 10000;

// Intl constructors are comparatively expensive; charts format hundreds of ticks per draw.
const numberFormats = new Map<string, Intl.NumberFormat>();
const dateFormats = new Map<string, Intl.DateTimeFormat>();

function numberFormat(locale: string | undefined, options: Intl.NumberFormatOptions): Intl.NumberFormat {
    const key = `${locale ?? ''}|${JSON.stringify(options)}`;
    let format = numberFormats.get(key);

    if (!format) {
        format = new Intl.NumberFormat(locale, options);
        numberFormats.set(key, format);
    }

    return format;
}

function dateFormat(locale: string | undefined, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
    const key = `${locale ?? ''}|${JSON.stringify(options)}`;
    let format = dateFormats.get(key);

    if (!format) {
        format = new Intl.DateTimeFormat(locale, options);
        dateFormats.set(key, format);
    }

    return format;
}

function toNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
        return null;
    }

    const number = typeof value === 'number' ? value : Number(value);

    return Number.isFinite(number) ? number : null;
}

/**
 * Parse a bucket key into a local `Date`.
 * `YYYY`, `YYYY-MM` and `YYYY-MM-DD` keys are read as local calendar dates (not UTC),
 * so a `2026-11-05` bucket never renders as 4 November west of Greenwich.
 */
export function parseBucketDate(value: unknown): Date | null {
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'number') {
        // A bare four-digit integer is a year key, not milliseconds since 1970.
        if (Number.isInteger(value) && value >= 1000 && value <= 9999) {
            return new Date(value, 0, 1);
        }

        const date = new Date(value);

        return Number.isNaN(date.getTime()) ? null : date;
    }

    if (typeof value !== 'string' || value === '') {
        return null;
    }

    const match = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(value);

    if (match) {
        return new Date(Number(match[1]), Number(match[2] ?? 1) - 1, Number(match[3] ?? 1));
    }

    const date = new Date(value);

    return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Format a duration in seconds with narrow units, e.g. `26h 30m` or `2m 5s`.
 * The `axis` context drops seconds once hours are present and never rounds a part up,
 * so tick labels stay exact.
 */
export function formatDuration(seconds: number, locale?: string, context: FormatContext = 'full'): string {
    const total = Math.max(0, Math.round(seconds));
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    const unit = (amount: number, name: 'hour' | 'minute' | 'second') => {
        return numberFormat(locale, { style: 'unit', unit: name, unitDisplay: 'narrow' }).format(amount);
    };
    const parts: string[] = [];

    if (hours) {
        parts.push(unit(hours, 'hour'));
    }

    if (minutes) {
        parts.push(unit(minutes, 'minute'));
    }

    if (secs && (!hours || context === 'full')) {
        parts.push(unit(secs, 'second'));
    }

    return parts.length ? parts.join(' ') : unit(0, 'second');
}

const DATE_OPTIONS: Record<Exclude<DateBucket, 'week'>, Record<FormatContext, Intl.DateTimeFormatOptions>> = {
    hour: {
        axis: { hour: 'numeric' },
        full: { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' },
    },
    day: {
        axis: { month: 'short', day: 'numeric' },
        full: { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' },
    },
    month: {
        axis: { month: 'short' },
        full: { month: 'long', year: 'numeric' },
    },
    year: {
        axis: { year: 'numeric' },
        full: { year: 'numeric' },
    },
};

function formatDate(value: unknown, bucket: DateBucket, context: FormatContext, locale?: string): string | null {
    const date = parseBucketDate(value);

    if (!date) {
        return null;
    }

    if (bucket === 'week') {
        if (context === 'axis') {
            return dateFormat(locale, DATE_OPTIONS.day.axis).format(date);
        }

        const end = new Date(date);
        end.setDate(end.getDate() + 6);

        return dateFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' }).formatRange(date, end);
    }

    return dateFormat(locale, DATE_OPTIONS[bucket][context]).format(date);
}

/** Build a reusable formatter for one spec, locale and context. */
export function createFormatter(spec: FormatSpec = {}, options: FormatOptions = {}): ValueFormatter {
    const { context = 'full', locale, emptyLabel = EMPTY } = options;
    const type = spec.type ?? 'category';
    const axis = context === 'axis';

    switch (type) {
        case 'date': {
            const bucket = spec.bucket ?? 'day';

            return (value) => {
                if (value === null || value === undefined || value === '') {
                    return emptyLabel;
                }

                return formatDate(value, bucket, context, locale) ?? String(value);
            };
        }
        case 'number':
            return (value) => {
                const number = toNumber(value);

                if (number === null) {
                    return emptyLabel;
                }

                const compact = axis && Math.abs(number) >= COMPACT_THRESHOLD;

                if (compact) {
                    return numberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(number);
                }

                if (!axis && spec.decimals !== undefined) {
                    return numberFormat(locale, { minimumFractionDigits: spec.decimals, maximumFractionDigits: spec.decimals }).format(number);
                }

                // Whole numbers stay whole; fractional averages keep their precision.
                return numberFormat(locale, { maximumFractionDigits: axis ? 1 : 2 }).format(number);
            };
        case 'money':
            return (value) => {
                const number = toNumber(value);

                if (number === null) {
                    return emptyLabel;
                }

                const currency = spec.currency || 'USD';

                if (axis) {
                    return numberFormat(locale, {
                        style: 'currency',
                        currency,
                        notation: 'compact',
                        maximumFractionDigits: 1,
                    }).format(number);
                }

                // Default to the currency's own minor units (2 for USD, 0 for JPY).
                return numberFormat(locale, {
                    style: 'currency',
                    currency,
                    ...(spec.decimals !== undefined
                        ? { minimumFractionDigits: spec.decimals, maximumFractionDigits: spec.decimals }
                        : {}),
                }).format(number);
            };
        case 'percent':
            return (value) => {
                const number = toNumber(value);

                if (number === null) {
                    return emptyLabel;
                }

                return numberFormat(locale, { style: 'percent', maximumFractionDigits: axis ? 0 : 1 }).format(number);
            };
        case 'duration':
            return (value) => {
                const number = toNumber(value);

                return number === null ? emptyLabel : formatDuration(number, locale, context);
            };
        default:
            return (value) => (value === null || value === undefined || value === '' ? emptyLabel : String(value));
    }
}

/** One-off formatting. Prefer `createFormatter` when formatting many values. */
export function formatValue(value: unknown, spec: FormatSpec = {}, options: FormatOptions = {}): string {
    return createFormatter(spec, options)(value);
}

/**
 * Describe the change from `previous` to `current`.
 * `relative` gives a signed percentage; `absolute` gives a signed difference, in
 * percentage points when the spec is `percent`. Returns `null` when either value is
 * missing, or for a relative change from zero.
 */
export function formatChange(
    current: unknown,
    previous: unknown,
    spec: FormatSpec = {},
    options: ChangeOptions = {},
): FormattedChange | null {
    const { mode = 'relative', positive = 'up', locale, pointsLabel = 'pts' } = options;
    const now = toNumber(current);
    const before = toNumber(previous);

    if (now === null || before === null) {
        return null;
    }

    let text: string;
    let delta: number;

    if (mode === 'absolute') {
        if (spec.type === 'percent') {
            delta = Math.round((now - before) * 1000) / 10;
            text = `${numberFormat(locale, { signDisplay: 'exceptZero', maximumFractionDigits: 1 }).format(delta)} ${pointsLabel}`;
        } else {
            delta = now - before;
            // Intl supplies the locale's own minus sign, matching relative changes.
            const formatted = createFormatter(spec, { locale })(delta);
            text = delta > 0 ? `+${formatted}` : formatted;
        }
    } else {
        if (before === 0) {
            return null;
        }

        const ratio = (now - before) / Math.abs(before);
        delta = Math.round(ratio * 1000) / 1000;
        text = numberFormat(locale, {
            style: 'percent',
            signDisplay: 'exceptZero',
            maximumFractionDigits: Math.abs(ratio) < 0.1 ? 1 : 0,
        }).format(ratio);
    }

    const direction = (Math.sign(delta) || 0) as -1 | 0 | 1;
    let tone: ChangeTone = 'neutral';

    if (direction !== 0 && positive !== 'none') {
        tone = (direction > 0) === (positive === 'up') ? 'good' : 'bad';
    }

    return { text, direction, tone };
}
