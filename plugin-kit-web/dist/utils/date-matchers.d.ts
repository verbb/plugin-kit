/** Date disabling matchers — ported from  `date-picker/internal/matchers`. */
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
export declare function buildDisabledMatcher(options: DisabledMatcherOptions): (date: Date) => boolean;
export declare function parseDisabledDates(value: string | string[] | Date[] | null | undefined): Date[];
declare const WEEKDAY_NAMES: {
    readonly sun: 0;
    readonly mon: 1;
    readonly tue: 2;
    readonly wed: 3;
    readonly thu: 4;
    readonly fri: 5;
    readonly sat: 6;
};
export type WeekdayName = keyof typeof WEEKDAY_NAMES;
export declare function parseDaysOfWeek(value: string | null | undefined): number[];
export declare function includesDay(arr: Date[], target: Date): boolean;
export declare function anyDisabledInRange(start: Date, end: Date, isDisabled: (date: Date) => boolean): boolean;
export declare function allDisabledInRange(start: Date, end: Date, isDisabled: (date: Date) => boolean): boolean;
export {};
//# sourceMappingURL=date-matchers.d.ts.map