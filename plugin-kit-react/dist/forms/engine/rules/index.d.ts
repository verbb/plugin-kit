import { SchemaNode } from '../SchemaIndex';
export type RuleHandlerContext = {
    path: string;
    values: Record<string, unknown>;
    field: SchemaNode;
};
export type RuleHandler = (value: unknown, label: string, args: string[], context?: RuleHandlerContext) => string | null;
export declare const ruleHandlers: Record<string, RuleHandler>;
//# sourceMappingURL=index.d.ts.map