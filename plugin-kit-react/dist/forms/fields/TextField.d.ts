import { SchemaFormEngineApi } from '../engine/context';
type TextFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const TextField: ({ form, field }: TextFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TextField.d.ts.map