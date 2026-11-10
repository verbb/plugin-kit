import { describe, expect, it } from 'vitest';

import { createFormatter, formatChange, formatDuration, formatValue, parseBucketDate } from './format';

const en = { locale: 'en-US' };

describe('parseBucketDate', () => {
    it('reads date keys as local calendar dates', () => {
        const date = parseBucketDate('2026-11-05')!;

        expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2026, 10, 5]);
        expect(parseBucketDate('2026-11')!.getDate()).toBe(1);
        expect(parseBucketDate('not a date')).toBeNull();
        expect(parseBucketDate(null)).toBeNull();
        expect(parseBucketDate(2024)!.getFullYear()).toBe(2024);
    });
});

describe('createFormatter', () => {
    it('compacts large numbers on axes only', () => {
        expect(formatValue(128430, { type: 'number' }, { ...en, context: 'axis' })).toBe('128.4K');
        expect(formatValue(4000, { type: 'number' }, { ...en, context: 'axis' })).toBe('4,000');
        expect(formatValue(128430, { type: 'number' }, en)).toBe('128,430');
        expect(formatValue(4.7, { type: 'number' }, en)).toBe('4.7');
        expect(formatValue(4, { type: 'number', decimals: 1 }, en)).toBe('4.0');
        expect(formatValue(-1250.5, { type: 'number' }, en)).toBe('-1,250.5');
        expect(formatValue(Number.NaN, { type: 'number' }, en)).toBe('–');
    });

    it('formats money with the currency minor units by default', () => {
        expect(formatValue(12480.5, { type: 'money', currency: 'USD' }, en)).toBe('$12,480.50');
        expect(formatValue(12480, { type: 'money', currency: 'USD', decimals: 0 }, en)).toBe('$12,480');
        expect(formatValue(1980, { type: 'money', currency: 'JPY' }, en)).toBe('¥1,980');
        expect(formatValue(12480, { type: 'money', currency: 'USD' }, { ...en, context: 'axis' })).toBe('$12.5K');
    });

    it('treats percent values as ratios', () => {
        expect(formatValue(0.1124, { type: 'percent' }, en)).toBe('11.2%');
        expect(formatValue(0.1124, { type: 'percent' }, { ...en, context: 'axis' })).toBe('11%');
    });

    it('formats durations exactly', () => {
        expect(formatDuration(95400, 'en-US')).toBe('26h 30m');
        expect(formatDuration(150, 'en-US', 'axis')).toBe('2m 30s');
        expect(formatDuration(3725, 'en-US', 'axis')).toBe('1h 2m');
        expect(formatDuration(0, 'en-US')).toBe('0s');
    });

    it('formats date buckets for axes and tooltips', () => {
        expect(formatValue('2026-11-05', { type: 'date', bucket: 'day' }, { ...en, context: 'axis' })).toBe('Nov 5');
        expect(formatValue('2026-11-05', { type: 'date', bucket: 'day' }, en)).toBe('Thu, Nov 5, 2026');
        expect(formatValue('2026-11-01', { type: 'date', bucket: 'month' }, en)).toBe('November 2026');
        expect(formatValue(2024, { type: 'date', bucket: 'year' }, en)).toBe('2024');
        expect(formatValue('2026-11-02', { type: 'date', bucket: 'week' }, en)).toMatch(/^Nov 2\s*–\s*8, 2026$/);
    });

    it('uses the empty label for missing values', () => {
        const format = createFormatter({ type: 'number' }, en);

        expect(format(null)).toBe('–');
        expect(format(undefined)).toBe('–');
        expect(createFormatter({ type: 'number' }, { ...en, emptyLabel: 'No data' })(null)).toBe('No data');
    });

    it('follows the locale', () => {
        expect(formatValue(12480.5, { type: 'money', currency: 'EUR' }, { locale: 'de-DE' })).toBe('12.480,50 €');
    });
});

describe('formatChange', () => {
    it('describes relative change and its tone', () => {
        expect(formatChange(12480, 10576, { type: 'money' }, en)).toEqual({ text: '+18%', direction: 1, tone: 'good' });
        expect(formatChange(7.43, 7.74, { type: 'money' }, en)).toEqual({ text: '-4%', direction: -1, tone: 'bad' });
        expect(formatChange(95400, 108000, { type: 'duration' }, { ...en, positive: 'down' })?.tone).toBe('good');
        expect(formatChange(5, 5, { type: 'number' }, en)?.tone).toBe('neutral');
    });

    it('describes absolute change in points for percentages', () => {
        expect(formatChange(0.112, 0.098, { type: 'percent' }, { ...en, mode: 'absolute' })?.text).toBe('+1.4 pts');
        expect(formatChange(84, 72, { type: 'number' }, { ...en, mode: 'absolute' })?.text).toBe('+12');
        expect(formatChange(4.4, 4, { type: 'number' }, { ...en, mode: 'absolute' })?.text).toBe('+0.4');
        expect(formatChange(70, 72, { type: 'number' }, { ...en, mode: 'absolute' })?.text).toBe('-2');
        expect(formatChange(5, 7.5, { type: 'money', currency: 'USD' }, { ...en, mode: 'absolute' })?.text).toBe('-$2.50');
    });

    it('returns null when a comparison is impossible', () => {
        expect(formatChange(5, 0, { type: 'number' }, en)).toBeNull();
        expect(formatChange(null, 4, { type: 'number' }, en)).toBeNull();
    });
});
