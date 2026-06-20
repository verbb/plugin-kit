import { LinkOptionsInput } from '../../components';
import { SchemaFormEngineApi } from '../engine/context';
import { VariableConfig } from '../contexts/VariableCategoriesContext';
type RichTextFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        buttons?: string[];
        variableConfig?: VariableConfig;
        required?: boolean;
        disabled?: boolean;
        rows?: number;
        linkOptions?: LinkOptionsInput;
        linkSelectorStorageKeyPrefix?: string;
        translatable?: boolean;
    };
};
export declare const RichTextField: ({ form, field }: RichTextFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RichTextField.d.ts.map