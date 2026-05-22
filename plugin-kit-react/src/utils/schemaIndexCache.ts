import { createSchemaFieldIndex } from './schemaIndex';

const hasErrorValue = (value: unknown) => {
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    if (!value) {
        return false;
    }
    if (typeof value === 'object') {
        const entry = value as { errors?: unknown[] };
        if (Array.isArray(entry.errors)) {
            return entry.errors.length > 0;
        }
    }
    return Boolean(value);
};

const indexCache = new WeakMap<object, ReturnType<typeof createSchemaFieldIndex>>();

export const getSchemaFieldIndex = (node: unknown) => {
    if (!node || (typeof node !== 'object' && !Array.isArray(node))) {
        return createSchemaFieldIndex([]);
    }

    const key = node as object;
    const cached = indexCache.get(key);
    if (cached) {
        return cached;
    }

    const index = createSchemaFieldIndex(node);
    indexCache.set(key, index);
    return index;
};

export const hasSchemaErrorsCached = (errors: Record<string, unknown> | undefined, node: unknown) => {
    if (!errors || !node) {
        return false;
    }
    const { fieldNames } = getSchemaFieldIndex(node);
    return fieldNames.some((fieldName) => {
        return hasErrorValue(errors[fieldName]);
    });
};
