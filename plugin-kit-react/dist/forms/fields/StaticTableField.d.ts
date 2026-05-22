import { SchemaFormEngineApi } from '../engine/context';
type StaticTableOption = {
    label?: string;
    value?: unknown;
    [key: string]: unknown;
};
type StaticTableColumn = {
    name?: string;
    type?: string;
    label?: string;
    heading?: string;
    class?: string;
    required?: boolean;
    options?: StaticTableOption[];
    placeholder?: string;
    thin?: boolean;
    [key: string]: unknown;
};
type StaticTableRowValue = Record<string, unknown>;
type StaticTableFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        columns?: StaticTableColumn[] | Record<string, StaticTableColumn>;
        rows?: StaticTableRowValue[] | Record<string, StaticTableRowValue>;
    };
};
export declare const StaticTableField: ({ form, field }: StaticTableFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=StaticTableField.d.ts.map