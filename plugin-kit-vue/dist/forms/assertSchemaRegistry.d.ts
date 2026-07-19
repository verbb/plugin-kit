import { SchemaIndex, SchemaRenderable } from '@verbb/plugin-kit-forms';
export type AssertSchemaRegistryOptions = {
    /** When true, throw on the first missing registry key instead of collecting all. */
    failFast?: boolean;
};
export type SchemaRegistryIssue = {
    path: string;
    kind: 'field' | 'component';
    key: string;
};
/**
 * Walk a SchemaForm tree and verify every `$field` / `$cmp` key can resolve.
 * Useful in dev/test bootstraps before shipping large CP schemas.
 */
export declare const assertSchemaRegistry: (schema: SchemaRenderable, options?: AssertSchemaRegistryOptions) => SchemaRegistryIssue[];
export declare const debugSchemaRegistry: (schemaIndex: SchemaIndex | null | undefined, options?: AssertSchemaRegistryOptions) => SchemaRegistryIssue[];
//# sourceMappingURL=assertSchemaRegistry.d.ts.map