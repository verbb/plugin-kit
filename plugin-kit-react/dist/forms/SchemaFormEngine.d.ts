import { default as React } from 'react';
import { SchemaIndex, SchemaNode, SchemaRenderable } from '@verbb/plugin-kit-forms';
import { FormValues, SchemaFormEngineApi } from './engine/context.js';
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
export declare const SchemaFormEngine: React.ForwardRefExoticComponent<{
    form: SchemaFormEngineApi;
    className?: string;
    withoutForm?: boolean;
} & React.RefAttributes<SchemaFormEngineApi>>;
export {};
//# sourceMappingURL=SchemaFormEngine.d.ts.map