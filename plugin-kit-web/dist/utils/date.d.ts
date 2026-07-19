/** ISO date helpers — ported from  `date-picker/internal/iso`. */
export declare function parseIsoDate(value: string | Date | null | undefined): Date | null;
export declare function formatIsoDate(date: Date | null | undefined): string;
export declare function coerceToDate(value: unknown): Date | null;
export type DateRange = {
    from: Date | null;
    to: Date | null;
};
export declare function parseRange(value: string | null | undefined): DateRange;
export declare function formatRange(range: DateRange | null | undefined): string;
export declare function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean;
export declare function isSameMonth(a: Date, b: Date): boolean;
export declare function addDays(date: Date, days: number): Date;
export declare function addMonths(date: Date, months: number): Date;
export declare function addYears(date: Date, years: number): Date;
export declare function daysInMonth(year: number, month: number): number;
export declare function startOfMonth(date: Date): Date;
export declare function todayDate(): Date;
export declare function diffDays(a: Date, b: Date): number;
/** ISO 8601 week number for the given date. */
export declare function isoWeekNumber(date: Date): number;
export declare function formatDisplayDate(date: Date, locale?: string): string;
//# sourceMappingURL=date.d.ts.map