/** ISO date helpers — ported from  `date-picker/internal/iso`. */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseIsoDate(value: string | Date | null | undefined): Date | null {
    if (value == null || value === '') {
        return null;
    }

    // React/v1 DatePicker often passes a Date; never call string methods on it.
    if (value instanceof Date) {
        return coerceToDate(value);
    }

    if (typeof value !== 'string') {
        return null;
    }

    const match = ISO_DATE.exec(value.trim());

    if (!match) {
        return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return null;
    }

    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }

    return date;
}

export function formatIsoDate(date: Date | null | undefined): string {
    if (!date || Number.isNaN(date.getTime())) {
        return '';
    }

    const year = String(date.getFullYear()).padStart(4, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function coerceToDate(value: unknown): Date | null {
    if (value == null) {
        return null;
    }

    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) {
            return null;
        }

        return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }

    return parseIsoDate(String(value));
}

export type DateRange = {
    from: Date | null;
    to: Date | null;
};

export function parseRange(value: string | null | undefined): DateRange {
    if (!value) {
        return { from: null, to: null };
    }

    const parts = value.split('/');

    if (parts.length === 1) {
        return { from: parseIsoDate(parts[0]), to: null };
    }

    const from = parseIsoDate(parts[0]);
    const to = parseIsoDate(parts[1]);

    if (!from || !to) {
        return { from, to };
    }

    return from.getTime() <= to.getTime()
        ? { from, to }
        : { from: to, to: from };
}

export function formatRange(range: DateRange | null | undefined): string {
    if (!range) {
        return '';
    }

    const { from, to } = range;

    if (!from && !to) {
        return '';
    }

    if (from && !to) {
        return formatIsoDate(from);
    }

    if (!from && to) {
        return formatIsoDate(to);
    }

    return `${formatIsoDate(from)}/${formatIsoDate(to)}`;
}

/**
 * Multi-date ("multiple" mode) serialization: a comma-separated list of ISO dates.
 * Always parsed/emitted deduped and sorted ascending so the stored value is stable
 * regardless of the order the user clicked days.
 */
export function parseDateList(value: string | null | undefined): Date[] {
    if (!value) {
        return [];
    }

    const seen = new Set<string>();
    const dates: Date[] = [];

    for (const part of value.split(',')) {
        const date = parseIsoDate(part.trim());

        if (!date) {
            continue;
        }

        const iso = formatIsoDate(date);

        if (seen.has(iso)) {
            continue;
        }

        seen.add(iso);
        dates.push(date);
    }

    dates.sort((a, b) => a.getTime() - b.getTime());

    return dates;
}

export function formatDateList(dates: ReadonlyArray<Date | null | undefined>): string {
    const seen = new Set<string>();

    for (const date of dates) {
        const iso = formatIsoDate(date ?? null);

        if (iso) {
            seen.add(iso);
        }
    }

    return [...seen].sort().join(',');
}

/** Toggle a day in/out of a multi-date list, returning the new sorted CSV value. */
export function toggleDateInList(value: string | null | undefined, date: Date): string {
    const iso = formatIsoDate(date);

    if (!iso) {
        return value ?? '';
    }

    const existing = parseDateList(value);
    const next = existing.some((entry) => isSameDay(entry, date))
        ? existing.filter((entry) => !isSameDay(entry, date))
        : [...existing, date];

    return formatDateList(next);
}

export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
    if (!a || !b) {
        return false;
    }

    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}

export function isSameMonth(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function addDays(date: Date, days: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function addMonths(date: Date, months: number): Date {
    const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
    const lastDay = daysInMonth(target.getFullYear(), target.getMonth());

    return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
}

export function addYears(date: Date, years: number): Date {
    return addMonths(date, years * 12);
}

export function daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

export function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function todayDate(): Date {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function diffDays(a: Date, b: Date): number {
    const ms = a.getTime() - b.getTime();

    return Math.round(ms / 86_400_000);
}

/** ISO 8601 week number for the given date. */
export function isoWeekNumber(date: Date): number {
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayNum = (target.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNum + 3);

    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const firstDayNum = (firstThursday.getDay() + 6) % 7;
    firstThursday.setDate(firstThursday.getDate() - firstDayNum + 3);

    return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 86_400_000));
}

export function formatDisplayDate(date: Date, locale?: string): string {
    return new Intl.DateTimeFormat(locale || undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}
