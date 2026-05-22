import { ComboboxInputOption } from '../../components/ComboboxInput';
import { SchemaFormEngineApi } from '../engine/context';
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
        fetchOptions?: () => Promise<ComboboxInputOption[]>;
        multiple?: boolean;
        cacheKey?: string;
        cacheTtlMs?: number;
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const ComboboxField: ({ form, field }: ComboboxFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ComboboxField.d.ts.map