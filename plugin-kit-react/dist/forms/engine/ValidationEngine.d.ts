import { SchemaIndex, SchemaNode } from './SchemaIndex';
import { FormValues } from './context';
type ConditionDataResolver = (values: FormValues, field?: SchemaNode) => Record<string, unknown>;
export type ValidationResult = {
    fields: Record<string, string[]>;
} | undefined;
export declare const createValidationEngine: (index: SchemaIndex, options?: {
    conditionDataResolver?: ConditionDataResolver;
}) => {
    validate: (values: FormValues) => ValidationResult;
};
export {};
//# sourceMappingURL=ValidationEngine.d.ts.map