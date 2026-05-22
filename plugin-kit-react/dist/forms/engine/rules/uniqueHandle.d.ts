import { SchemaNode } from '../SchemaIndex';
type RuleContext = {
    path: string;
    values: Record<string, unknown>;
    field: SchemaNode;
};
export declare const uniqueHandleRule: (value: unknown, label: string, args: string[], context?: RuleContext) => string | null;
export {};
//# sourceMappingURL=uniqueHandle.d.ts.map