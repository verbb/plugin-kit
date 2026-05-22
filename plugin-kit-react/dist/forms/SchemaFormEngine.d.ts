import { SchemaIndex, SchemaNode, SchemaRenderable } from './engine/SchemaIndex';
import { FormValues, SchemaFormEngineApi } from './engine/context';
type SchemaFormEngineErrors = Record<string, unknown> | {
    errors?: unknown;
} | unknown[];
type SchemaFormEngineOptions = {
    schema?: SchemaRenderable;
    schemaIndex: SchemaIndex | null;
    defaultValues?: FormValues;
    errors?: SchemaFormEngineErrors;
    onChange?: (values: Record<string, unknown>, form: SchemaFormEngineApi) => void;
    getConditionContext?: (values: FormValues, field?: SchemaNode) => Record<string, unknown>;
    parentForm?: SchemaFormEngineApi | null;
    parentPath?: string;
};
export declare const useSchemaFormEngine: ({ schemaIndex, defaultValues, errors, onChange, getConditionContext, parentForm, parentPath, }: SchemaFormEngineOptions) => SchemaFormEngineApi;
export declare const SchemaFormEngine: import('react').ForwardRefExoticComponent<{
    form: SchemaFormEngineApi;
    className?: string;
    withoutForm?: boolean;
} & import('react').RefAttributes<SchemaFormEngineApi>>;
export {};
//# sourceMappingURL=SchemaFormEngine.d.ts.map