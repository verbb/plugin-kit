type SchemaNode = Record<string, unknown> & {
    $field?: string;
    name?: string;
    children?: SchemaValue;
    schema?: SchemaValue;
};
type SchemaValue = SchemaNode | SchemaNode[] | null | undefined;
export declare const evaluateCondition: (condition: string | undefined, data: Record<string, unknown>) => any;
export declare const traverseSchema: (node: SchemaValue, visitor: (node: SchemaNode) => void) => void;
export declare const extractFields: (nodes: SchemaValue) => SchemaNode[];
export declare const extractFieldNames: (content: SchemaValue) => string[];
export declare const normalizeAttrs: (attrs?: Record<string, unknown>) => Record<string, unknown> & {
    class?: string;
    className?: string;
};
export {};
//# sourceMappingURL=schema.d.ts.map