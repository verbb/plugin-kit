import { getSchemaFieldNames } from './schemaFieldNames';

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

export const createSchemaFieldIndex = (node: unknown) => {
    const fieldNames = getSchemaFieldNames(node);
    const fieldNameSet = new Set(fieldNames);
    return {
        fieldNames,
        hasField: (fieldName: string) => { return fieldNameSet.has(fieldName); },
    };
};

export const hasSchemaErrors = (errors: Record<string, unknown> | undefined, node: unknown) => {
    if (!errors || !node) {
        return false;
    }
    const fieldNames = getSchemaFieldNames(node);
    return fieldNames.some((fieldName) => {
        return hasErrorValue(errors[fieldName]);
    });
};
