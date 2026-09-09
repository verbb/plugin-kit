import { AutocompleteFetchOptions, AutocompleteInputOption } from '../../components/AutocompleteInput.js';
import { SchemaFormEngineApi } from '../engine/context.js';
type AutocompleteFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        emptyMessage?: string;
        options?: AutocompleteInputOption[];
        fetchOptions?: AutocompleteFetchOptions;
        required?: boolean;
        disabled?: boolean;
        showClear?: boolean;
        width?: 'full';
    };
};
/**
 * SchemaForm `$field: "autocomplete"` — freeform text with optional suggestions.
 * Use for path/alias fields where the typed value is the answer; pair `warning`
 * on the schema node for plugin-owned existence checks.
 */
export declare const AutocompleteField: ({ form, field }: AutocompleteFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AutocompleteField.d.ts.map