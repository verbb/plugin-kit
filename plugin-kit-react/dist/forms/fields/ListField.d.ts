import { SchemaFormEngineApi } from '../engine/context';
import { SchemaRenderable } from '../engine/SchemaIndex';
type ListFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        schema?: SchemaRenderable;
        showGroupedErrors?: boolean;
        className?: string;
    };
};
export declare const ListField: ({ form, field }: ListFieldProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ListField.d.ts.map