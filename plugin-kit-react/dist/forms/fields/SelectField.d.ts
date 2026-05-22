import { SchemaFormEngineApi } from '../engine/context';
import { SchemaNode } from '../engine/SchemaIndex';
type SelectFieldOption = {
    value: unknown;
    label: string;
    disabled?: boolean;
    if?: string;
    [key: string]: unknown;
};
type SelectFieldProps = {
    form: SchemaFormEngineApi;
    field: SchemaNode & {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        options?: SelectFieldOption[];
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const SelectField: ({ form, field }: SelectFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SelectField.d.ts.map