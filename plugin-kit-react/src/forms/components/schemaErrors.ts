import type { SchemaNode, SchemaRenderable } from '@verbb/plugin-kit-forms';

const hasErrorValue = (value: unknown): boolean => {
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

/** Collect `$field` names under a schema subtree for tab/wrapper error chrome. */
export const collectSchemaFieldNames = (schema: SchemaRenderable, names: Set<string> = new Set()): Set<string> => {
    if (Array.isArray(schema)) {
        schema.forEach((entry) => {
            collectSchemaFieldNames(entry, names);
        });
        return names;
    }

    if (!schema || typeof schema !== 'object') {
        return names;
    }

    const node = schema as SchemaNode;

    if (node.$field && typeof node.name === 'string' && node.name) {
        names.add(node.name);
    }

    if (node.children) {
        collectSchemaFieldNames(node.children as SchemaRenderable, names);
    }

    if (node.schema) {
        collectSchemaFieldNames(node.schema as SchemaRenderable, names);
    }

    return names;
};

export const schemaSubtreeHasErrors = (
    errors: Record<string, unknown> | undefined,
    schema: SchemaRenderable,
): boolean => {
    if (!errors || !schema) {
        return false;
    }

    const fieldNames = collectSchemaFieldNames(schema);
    return Array.from(fieldNames).some((fieldName) => hasErrorValue(errors[fieldName]));
};
