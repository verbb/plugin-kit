import { extractFieldNames } from './schema';

const fieldNamesCache = new WeakMap<object, string[]>();

export const getSchemaFieldNames = (node: unknown): string[] => {
    if (!node || (typeof node !== 'object' && !Array.isArray(node))) {
        return [];
    }

    const key = node as object;
    const cached = fieldNamesCache.get(key);
    if (cached) {
        return cached;
    }

    const fieldNames = extractFieldNames(node);
    fieldNamesCache.set(key, fieldNames);
    return fieldNames;
};
