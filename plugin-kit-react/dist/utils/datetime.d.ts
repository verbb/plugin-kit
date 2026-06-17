export type ParsedDateTimeValue = {
    date: Date | null;
    time: string;
};
export declare const parseLocalDate: (value: unknown) => Date | undefined;
export declare const parseDateTimeValue: (value: unknown) => ParsedDateTimeValue;
export declare const startOfMonth: (value: Date) => Date;
export declare const resolveCalendarMonth: (selected?: Date) => Date;
export declare const formatDateTimeValue: (date: Date | null, time: string) => string;
//# sourceMappingURL=datetime.d.ts.map