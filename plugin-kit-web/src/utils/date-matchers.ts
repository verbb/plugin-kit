/** Date disabling matchers — ported from  `date-picker/internal/matchers`. */

import {
    isSameDay,
    parseIsoDate,
} from './date.js';

export type DisabledMatcherOptions = {
    min?: Date | null;
    max?: Date | null;
    disabledDates?: Date[];
    disabledDaysOfWeek?: number[];
    disablePast?: boolean;
    disableFuture?: boolean;
    today: Date;
    isDateDisabled?: (date: Date) => boolean;
};

export function buildDisabledMatcher(options: DisabledMatcherOptions): (date: Date) => boolean {
    const {
        min,
        max,
        disabledDates = [],
        disabledDaysOfWeek = [],
        disablePast = false,
        disableFuture = false,
        today,
        isDateDisabled,
    } = options;

    const minTime = min?.getTime() ?? Number.NEGATIVE_INFINITY;
    const maxTime = max?.getTime() ?? Number.POSITIVE_INFINITY;
    const todayTime = today.getTime();
    const dayOfWeekSet = new Set(disabledDaysOfWeek);
    const dateTimeSet = new Set(disabledDates.map((date) => date.getTime()));

    return function isDisabled(date: Date): boolean {
        const time = date.getTime();

        if (time < minTime || time > maxTime) {
            return true;
        }

        if (disablePast && time < todayTime) {
            return true;
        }

        if (disableFuture && time > todayTime) {
            return true;
        }

        if (dayOfWeekSet.size && dayOfWeekSet.has(date.getDay())) {
            return true;
        }

        if (dateTimeSet.size && dateTimeSet.has(time)) {
            return true;
        }

        if (isDateDisabled?.(date)) {
            return true;
        }

        return false;
    };
}

export function parseDisabledDates(value: string | string[] | Date[] | null | undefined): Date[] {
    if (value == null || value === '') {
        return [];
    }

    const list = Array.isArray(value) ? value : value.split(/\s+/);
    const out: Date[] = [];

    for (const item of list) {
        if (item instanceof Date) {
            if (!Number.isNaN(item.getTime())) {
                out.push(new Date(item.getFullYear(), item.getMonth(), item.getDate()));
            }

            continue;
        }

        const parsed = parseIsoDate(String(item).trim());

        if (parsed) {
            out.push(parsed);
        }
    }

    return out;
}

const WEEKDAY_NAMES = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
} as const;

export type WeekdayName = keyof typeof WEEKDAY_NAMES;

export function parseDaysOfWeek(value: string | null | undefined): number[] {
    if (value == null || value === '') {
        return [];
    }

    const tokens = String(value).toLowerCase().split(/\s+/).filter(Boolean);
    const out = new Set<number>();

    for (const token of tokens) {
        if (token in WEEKDAY_NAMES) {
            out.add(WEEKDAY_NAMES[token as WeekdayName]);
        }
    }

    return [...out];
}

export function includesDay(arr: Date[], target: Date): boolean {
    return arr.some((date) => isSameDay(date, target));
}

export function anyDisabledInRange(
    start: Date,
    end: Date,
    isDisabled: (date: Date) => boolean,
): boolean {
    const rangeStart = start.getTime() <= end.getTime() ? start : end;
    const rangeEnd = start.getTime() <= end.getTime() ? end : start;
    const cursor = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate());

    while (cursor.getTime() <= rangeEnd.getTime()) {
        if (isDisabled(cursor)) {
            return true;
        }

        cursor.setDate(cursor.getDate() + 1);
    }

    return false;
}

export function allDisabledInRange(
    start: Date,
    end: Date,
    isDisabled: (date: Date) => boolean,
): boolean {
    const rangeStart = start.getTime() <= end.getTime() ? start : end;
    const rangeEnd = start.getTime() <= end.getTime() ? end : start;
    const cursor = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate());

    while (cursor.getTime() <= rangeEnd.getTime()) {
        if (!isDisabled(cursor)) {
            return false;
        }

        cursor.setDate(cursor.getDate() + 1);
    }

    return true;
}
