import { SchemaFormEngineApi } from '../engine/context';
type HandleFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        source?: string;
        reservedHandles?: string[];
        reservedFieldValues?: string[];
        maxLength?: number;
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const HandleField: ({ form, field }: HandleFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=HandleField.d.ts.map