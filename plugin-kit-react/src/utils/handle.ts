import { get as getValue } from 'lodash-es';
import { generateHandle, findUniqueHandle } from '@verbb/plugin-kit';

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

const getDynamicReservedHandles = (values: Record<string, unknown>, reservedFieldValues: string[] = []) => {
    const dynamicHandles: string[] = [];

    reservedFieldValues.forEach((fieldPath) => {
        const value = getValue(values, fieldPath);

        if (value && typeof value === 'string') {
            const handleValue = generateHandle(normalizeHandleSource(value));

            if (handleValue) {
                dynamicHandles.push(handleValue);
            }
        }
    });

    return dynamicHandles;
};

const truncateHandle = (handle: string, maxLength?: number) => {
    if (!Number.isFinite(maxLength)) {
        return handle;
    }

    const length = Math.max(Number(maxLength), 0);
    return handle.slice(0, length);
};

const findUniqueHandleWithinMaxLength = (baseHandle: string, reservedHandles: string[] = [], maxLength?: number) => {
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

const buildUniqueHandleFromSource = ({
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
}) => {
    const baseHandle = generateHandle(normalizeHandleSource(sourceValue));
    const dynamicHandles = getDynamicReservedHandles(values, reservedFieldValues);
    const allReservedHandles = [...reservedHandles, ...dynamicHandles];

    return findUniqueHandleWithinMaxLength(baseHandle, allReservedHandles, maxLength);
};

export { buildUniqueHandleFromSource, getDynamicReservedHandles };
