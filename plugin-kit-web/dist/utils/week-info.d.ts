/** Locale week info — ported from  `date-picker/internal/week-info`. */
export type WeekdayName = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export type WeekInfo = {
    /** First day of the week (1=Monday … 7=Sunday, per Intl spec). */
    firstDay: number;
    /** Weekend day numbers (1=Monday … 7=Sunday). */
    weekend: number[];
};
export declare function getWeekInfo(locale: string): WeekInfo;
/** Convert Intl first day (1=Mon..7=Sun) to JS `Date.getDay()` (0=Sun..6=Sat). */
export declare function intlFirstDayToJsDay(intlFirstDay: number): number;
export declare function intlWeekendToJsDays(intlWeekend: number[]): number[];
export declare function resolveFirstDayOfWeek(attribute: 'auto' | WeekdayName, locale: string): number;
//# sourceMappingURL=week-info.d.ts.map