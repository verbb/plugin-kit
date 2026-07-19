export type TimeOption = {
    value: string;
    label: string;
};
export type TimepickerFormatOptions = {
    timeFormat?: string;
    lang?: {
        AM?: string;
        PM?: string;
    };
    locale?: string;
};
/** Generate time options in 30-minute increments — mirrors React `generateTimeOptions`. */
export declare function generateTimeOptions(): TimeOption[];
export declare function clearTimeOptionsCache(): void;
//# sourceMappingURL=time-options.d.ts.map