export type SchemaNode = {
    _id?: string;
    _data?: Record<string, unknown>;
    _scopePath?: string;
    name?: string;
    label?: string;
    required?: boolean;
    validation?: string;
    columns?: unknown[];
    children?: SchemaRenderable;
    schema?: SchemaRenderable;
    schemaChildPrefix?: string;
    $field?: string;
    $cmp?: string;
    $el?: string;
    type?: string;
    if?: string;
    hideOnIf?: boolean;
    attrs?: Record<string, unknown>;
    props?: Record<string, unknown>;
    [key: string]: unknown;
};
export type SchemaRenderable = SchemaNode | string | SchemaRenderable[];
export type FieldEntry = {
    path: string;
    field: SchemaNode;
};
export type SchemaIndex = {
    schema: SchemaRenderable;
    fieldEntries: FieldEntry[];
};
export declare const normalizeSchema: (items: SchemaRenderable, path?: string) => SchemaRenderable;
//# sourceMappingURL=SchemaIndex.d.ts.map