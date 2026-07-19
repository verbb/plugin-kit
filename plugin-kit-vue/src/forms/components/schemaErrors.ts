import type { SchemaNode, SchemaRenderable } from '@verbb/plugin-kit-forms';

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

export const collectSchemaFieldNames = (schema: SchemaRenderable): Set<string> => {
    const names = new Set<string>();

    const walk = (node: SchemaRenderable): void => {
        if (typeof node === 'string') {
            return;
        }

        if (Array.isArray(node)) {
            node.forEach(walk);
            return;
        }

        if (!isRecord(node)) {
            return;
        }

        const schemaNode = node as SchemaNode;
        if (schemaNode.$field && typeof schemaNode.name === 'string' && schemaNode.name) {
            names.add(schemaNode.name);
        }

        if (schemaNode.children) {
            walk(schemaNode.children);
        }

        if (schemaNode.schema) {
            walk(schemaNode.schema);
        }
    };

    walk(schema);
    return names;
};

export const schemaSubtreeHasErrors = (
    errors: Record<string, unknown>,
    schema: SchemaRenderable,
): boolean => {
    const fieldNames = collectSchemaFieldNames(schema);

    return Array.from(fieldNames).some((fieldName) => {
        if (Array.isArray(errors[fieldName]) && (errors[fieldName] as unknown[]).length > 0) {
            return true;
        }

        return Object.keys(errors).some((errorPath) => {
            return errorPath.startsWith(`${fieldName}.`);
        });
    });
};
