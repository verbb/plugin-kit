import { describe, expect, it } from 'vitest';

import {
    formatDateTimeValue,
    parseDateTimeValue,
    parseLocalDate,
    resolveCalendarMonth,
} from './datetime';

describe('parseDateTimeValue', () => {
    it('parses Craft-style wall-clock datetime strings as local dates', () => {
        const parsed = parseDateTimeValue('2026-01-01 00:00:00');

        expect(parsed.date?.getFullYear()).toBe(2026);
        expect(parsed.date?.getMonth()).toBe(0);
        expect(parsed.date?.getDate()).toBe(1);
        expect(parsed.time).toBe('00:00');
    });

    it('round-trips formatted datetime values', () => {
        const date = new Date(2026, 0, 1);
        const formatted = formatDateTimeValue(date, '00:00');
        const parsed = parseDateTimeValue(formatted);

        expect(parsed.date?.getFullYear()).toBe(2026);
        expect(parsed.date?.getMonth()).toBe(0);
        expect(parsed.date?.getDate()).toBe(1);
        expect(parsed.time).toBe('00:00');
    });
});

describe('resolveCalendarMonth', () => {
    it('opens on the month of a parsed local date value', () => {
        const selected = parseLocalDate('2026-05-01 00:00:00');
        const month = resolveCalendarMonth(selected);

        expect(month.getFullYear()).toBe(2026);
        expect(month.getMonth()).toBe(4);
        expect(month.getDate()).toBe(1);
    });

    it('falls back to the current month when no date is selected', () => {
        const today = new Date();
        const month = resolveCalendarMonth(undefined);

        expect(month.getFullYear()).toBe(today.getFullYear());
        expect(month.getMonth()).toBe(today.getMonth());
        expect(month.getDate()).toBe(1);
    });
});
