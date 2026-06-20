import { SchemaFormEngineApi } from '../engine/context';
type TextareaFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        rows?: number;
        required?: boolean;
        disabled?: boolean;
        translatable?: boolean;
    };
};
export declare const TextareaField: ({ form, field }: TextareaFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TextareaField.d.ts.map