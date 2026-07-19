import { ComboboxFetchOptions, ComboboxInputOption } from '../../components/ComboboxInput.js';
import { SchemaFormEngineApi } from '../engine/context.js';
type ComboboxFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        emptyMessage?: string;
        options?: ComboboxInputOption[];
        fetchOptions?: ComboboxFetchOptions;
        multiple?: boolean;
        required?: boolean;
        disabled?: boolean;
        width?: 'full';
    };
};
export declare const ComboboxField: ({ form, field }: ComboboxFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ComboboxField.d.ts.map