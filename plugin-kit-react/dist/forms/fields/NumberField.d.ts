import { SchemaFormEngineApi } from '../engine/context';
type NumberFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        size?: number;
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const NumberField: ({ form, field }: NumberFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=NumberField.d.ts.map