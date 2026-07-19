import type { SchemaIndex, SchemaNode, SchemaRenderable } from '@verbb/plugin-kit-forms';

import { isBuiltinFormFieldType } from './builtin-field-loaders.js';
import { getFormComponentRegistry, getFormFieldRegistry } from './registry.js';

export type AssertSchemaRegistryOptions = {
    /** When true, throw on the first missing registry key instead of collecting all. */
    failFast?: boolean;
};

export type SchemaRegistryIssue = {
    path: string;
    kind: 'field' | 'component';
    key: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const walkSchema = (
    schema: SchemaRenderable,
    path: string,
    visit: (node: SchemaNode, path: string) => void,
): void => {
    if (typeof schema === 'string') {
        return;
    }

    if (Array.isArray(schema)) {
        schema.forEach((item, index) => {
            if (typeof item === 'string' || !isRecord(item)) {
                return;
            }

            const itemPath = `${path}[${index}]`;
            visit(item as SchemaNode, itemPath);
            walkSchema(item as SchemaRenderable, itemPath, visit);
        });
        return;
    }

    if (!isRecord(schema)) {
        return;
    }

    const node = schema as SchemaNode;
    visit(node, path);

    if (node.children) {
        walkSchema(node.children as SchemaRenderable, `${path}.children`, visit);
    }

    if (node.schema) {
        walkSchema(node.schema as SchemaRenderable, `${path}.schema`, visit);
    }
};

/**
 * Walk a SchemaForm tree and verify every `$field` / `$cmp` key is registered.
 * Use in dev/test bootstraps for large plugins (Formie-scale) before shipping CP screens.
 */
export const assertSchemaRegistry = (
    schema: SchemaRenderable,
    options: AssertSchemaRegistryOptions = {},
): SchemaRegistryIssue[] => {
    const { failFast = false } = options;

    const fieldRegistry = getFormFieldRegistry();
    const componentRegistry = getFormComponentRegistry();
    const issues: SchemaRegistryIssue[] = [];

    walkSchema(schema, 'schema', (node, nodePath) => {
        if (node.$field) {
            const key = String(node.$field);
            if (!fieldRegistry[key] && !isBuiltinFormFieldType(key)) {
                const issue: SchemaRegistryIssue = { path: nodePath, kind: 'field', key };
                issues.push(issue);
                if (failFast) {
                    throw new Error(`SchemaForm: unregistered field "${key}" at ${nodePath}`);
                }
            }
        }

        if (node.$cmp) {
            const key = String(node.$cmp);
            if (!componentRegistry[key]) {
                const issue: SchemaRegistryIssue = { path: nodePath, kind: 'component', key };
                issues.push(issue);
                if (failFast) {
                    throw new Error(`SchemaForm: unregistered component "${key}" at ${nodePath}`);
                }
            }
        }
    });

    return issues;
};

/** Dev helper: log registry gaps for a schema index root tree. */
export const debugSchemaRegistry = (
    schemaIndex: SchemaIndex | null | undefined,
    options?: AssertSchemaRegistryOptions,
): SchemaRegistryIssue[] => {
    if (!schemaIndex?.schema) {
        return [];
    }

    const issues = assertSchemaRegistry(schemaIndex.schema, options);

    if (issues.length) {
        console.warn('[plugin-kit] SchemaForm registry gaps:', issues);
    }

    return issues;
};
