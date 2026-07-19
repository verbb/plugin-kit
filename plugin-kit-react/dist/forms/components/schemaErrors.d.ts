import { SchemaRenderable } from '@verbb/plugin-kit-forms';
/** Collect `$field` names under a schema subtree for tab/wrapper error chrome. */
export declare const collectSchemaFieldNames: (schema: SchemaRenderable, names?: Set<string>) => Set<string>;
export declare const schemaSubtreeHasErrors: (errors: Record<string, unknown> | undefined, schema: SchemaRenderable) => boolean;
//# sourceMappingURL=schemaErrors.d.ts.map