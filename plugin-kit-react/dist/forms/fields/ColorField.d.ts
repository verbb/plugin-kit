import { SchemaFormEngineApi } from '../engine/context.js';
type ColorFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const ColorField: ({ form, field }: ColorFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ColorField.d.ts.map