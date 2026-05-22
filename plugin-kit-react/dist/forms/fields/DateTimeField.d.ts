import { SchemaFormEngineApi } from '../engine/context';
type DateTimeFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
    };
};
export declare const DateTimeField: ({ form, field }: DateTimeFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DateTimeField.d.ts.map