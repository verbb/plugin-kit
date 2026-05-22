type SchemaNormalizeNode = Record<string, unknown> & {
    children?: SchemaNormalizeValue;
    schema?: SchemaNormalizeValue;
    $el?: string;
    $cmp?: string;
    $field?: string;
    name?: string;
    schemaChildPrefix?: string;
};
type SchemaNormalizeValue = SchemaNormalizeNode | SchemaNormalizeNode[] | null | undefined;
export declare const normalizeSchemaNode: (node: SchemaNormalizeValue) => SchemaNormalizeValue;
export {};
//# sourceMappingURL=schemaNormalize.d.ts.map