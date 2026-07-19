import { SchemaNode } from '@verbb/plugin-kit-forms';
import { SchemaFormEngineApi } from '../engine/context.js';
type RadioGroupFieldOption = {
    value: unknown;
    label: string;
    description?: string;
    disabled?: boolean;
    if?: string;
    [key: string]: unknown;
};
type RadioGroupFieldProps = {
    form: SchemaFormEngineApi;
    field: SchemaNode & {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        options?: RadioGroupFieldOption[];
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const RadioGroupField: ({ form, field }: RadioGroupFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RadioGroupField.d.ts.map