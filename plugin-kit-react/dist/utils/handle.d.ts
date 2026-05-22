declare const getDynamicReservedHandles: (values: Record<string, unknown>, reservedFieldValues?: string[]) => string[];
declare const buildUniqueHandleFromSource: ({ sourceValue, values, reservedHandles, reservedFieldValues, maxLength, }: {
    sourceValue: unknown;
    values?: Record<string, unknown>;
    reservedHandles?: string[];
    reservedFieldValues?: string[];
    maxLength?: number;
}) => string;
export { buildUniqueHandleFromSource, getDynamicReservedHandles };
//# sourceMappingURL=handle.d.ts.map