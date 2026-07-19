export type DateTimeParts = {
    date: string;
    time: string;
};
/**
 * Split stored datetime strings into the string values consumed by the web pickers.
 * Avoids `Date` so Craft-local values do not shift through timezone conversion.
 */
export declare const parseDateTimeParts: (value: unknown) => DateTimeParts;
export declare const formatDateTimeParts: (date: string, time: string) => string;
//# sourceMappingURL=datetime.d.ts.map