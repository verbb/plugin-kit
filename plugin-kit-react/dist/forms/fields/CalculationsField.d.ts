import { VariableCategories } from '../../components/tiptap/VariableDropdown';
import { SchemaFormEngineApi } from '../engine/context';
import { SchemaNode } from '../engine/SchemaIndex';
import { VariableConfig } from '../contexts/VariableCategoriesContext';
type CalculationsFieldProps = {
    form: SchemaFormEngineApi;
    field: SchemaNode & {
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
        validationAction?: string;
        rows?: number;
    };
};
export declare const CalculationsField: ({ form, field }: CalculationsFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CalculationsField.d.ts.map