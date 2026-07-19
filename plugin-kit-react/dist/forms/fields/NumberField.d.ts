import { SchemaFormEngineApi } from '../engine/context.js';
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