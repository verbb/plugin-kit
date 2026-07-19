/**
 * Resolve dynamic reserved handles from other field values (e.g. a sibling field whose
 * value would collide once slugified).
 */
export declare const getDynamicReservedHandles: (values: Record<string, unknown>, reservedFieldValues?: string[]) => string[];
/**
 * Generate a unique handle from a human-readable source value, honouring reserved handles
 * (static + dynamically derived from other field values) and an optional max length.
 */
export declare const buildUniqueHandleFromSource: ({ sourceValue, values, reservedHandles, reservedFieldValues, maxLength, }: {
    sourceValue: unknown;
    values?: Record<string, unknown>;
    reservedHandles?: string[];
    reservedFieldValues?: string[];
    maxLength?: number;
}) => string;
//# sourceMappingURL=handle.d.ts.map