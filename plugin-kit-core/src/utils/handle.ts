import { findUniqueHandle, generateHandle } from './string';

/** Minimal dot/bracket path getter so this stays dependency-free (no lodash). */
const getByPath = (source: unknown, path: string): unknown => {
    if (source == null || typeof source !== 'object' || !path) {
        return undefined;
    }

    const segments = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
    let current: unknown = source;

    for (const segment of segments) {
        if (current == null || typeof current !== 'object') {
            return undefined;
        }

        current = (current as Record<string, unknown>)[segment];
    }

    return current;
};

const normalizeHandleSource = (value: unknown): string => {
    if (value == null) {
        return '';
    }

    return String(value)
        // Strip variable/template tokens so handle generation uses human text only.
        .replace(/\{[^}]*\}/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Resolve dynamic reserved handles from other field values (e.g. a sibling field whose
 * value would collide once slugified).
 */
export const getDynamicReservedHandles = (
    values: Record<string, unknown>,
    reservedFieldValues: string[] = [],
): string[] => {
    const dynamicHandles: string[] = [];

    reservedFieldValues.forEach((fieldPath) => {
        const value = getByPath(values, fieldPath);

        if (value && typeof value === 'string') {
            const handleValue = generateHandle(normalizeHandleSource(value));

            if (handleValue) {
                dynamicHandles.push(handleValue);
            }
        }
    });

    return dynamicHandles;
};

const truncateHandle = (handle: string, maxLength?: number): string => {
    if (!Number.isFinite(maxLength)) {
        return handle;
    }

    const length = Math.max(Number(maxLength), 0);
    return handle.slice(0, length);
};

const findUniqueHandleWithinMaxLength = (
    baseHandle: string,
    reservedHandles: string[] = [],
    maxLength?: number,
): string => {
    if (!baseHandle) {
        return '';
    }

    if (!Number.isFinite(maxLength)) {
        return findUniqueHandle(baseHandle, reservedHandles);
    }

    const normalizedReserved = new Set((reservedHandles || []).map((handle) => {
        return String(handle || '').toLowerCase();
    }));

    const truncatedBase = truncateHandle(baseHandle, maxLength);
    if (!truncatedBase) {
        return '';
    }

    if (!normalizedReserved.has(truncatedBase.toLowerCase())) {
        return truncatedBase;
    }

    let suffix = 1;

    while (suffix < 10000) {
        const suffixText = String(suffix);
        const baseMaxLength = Math.max(Number(maxLength) - suffixText.length, 0);
        const truncatedWithSuffix = `${truncatedBase.slice(0, baseMaxLength)}${suffixText}`;

        if (!normalizedReserved.has(truncatedWithSuffix.toLowerCase())) {
            return truncatedWithSuffix;
        }

        suffix += 1;
    }

    return truncatedBase;
};

/**
 * Generate a unique handle from a human-readable source value, honouring reserved handles
 * (static + dynamically derived from other field values) and an optional max length.
 */
export const buildUniqueHandleFromSource = ({
    sourceValue,
    values = {},
    reservedHandles = [],
    reservedFieldValues = [],
    maxLength,
}: {
    sourceValue: unknown;
    values?: Record<string, unknown>;
    reservedHandles?: string[];
    reservedFieldValues?: string[];
    maxLength?: number;
}): string => {
    const baseHandle = generateHandle(normalizeHandleSource(sourceValue));
    const dynamicHandles = getDynamicReservedHandles(values, reservedFieldValues);
    const allReservedHandles = [...reservedHandles, ...dynamicHandles];

    return findUniqueHandleWithinMaxLength(baseHandle, allReservedHandles, maxLength);
};
