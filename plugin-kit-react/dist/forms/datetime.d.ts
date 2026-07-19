export type DateTimeParts = {
    date: string;
    time: string;
};
/**
 * Split a stored datetime value into the string parts the string-valued `pk-date-picker`
 * (`YYYY-MM-DD`) and `pk-time-picker` (`HH:MM`) consume. Kept string-based on purpose: the
 * web-component pickers are string-valued, so there is no need to round-trip through `Date`.
 */
export declare const parseDateTimeParts: (value: unknown) => DateTimeParts;
export declare const formatDateTimeParts: (date: string, time: string) => string;
//# sourceMappingURL=datetime.d.ts.map