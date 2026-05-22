import { SchemaFormEngineApi } from '../engine/context';
import { VariableConfig } from '../contexts/VariableCategoriesContext';
import { VariableCategories } from '../../components/tiptap/VariableDropdown';
type VariablePickerFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        variableConfig?: VariableConfig;
        variableCategories?: VariableCategories;
        variablePickerTriggerCharacters?: string[];
    };
};
export declare const VariablePickerField: ({ form, field }: VariablePickerFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=VariablePickerField.d.ts.map