import { ReactNode } from 'react';
import { SchemaFormEngineApi } from '../engine/context';
import { SchemaRenderable } from '../engine/SchemaIndex';
type GroupFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name?: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        schema?: SchemaRenderable;
        children?: SchemaRenderable;
    };
    children?: ReactNode;
};
export declare const GroupField: ({ form, field, children }: GroupFieldProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=GroupField.d.ts.map