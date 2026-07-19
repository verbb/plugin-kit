import { PkCheckboxSelectOption } from '../../components/CheckboxSelect.js';
import { SchemaFormEngineApi } from '../engine/context.js';
type CheckboxSelectFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        options?: PkCheckboxSelectOption[];
        showAllOption?: boolean;
        allLabel?: string;
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const CheckboxSelectField: ({ form, field }: CheckboxSelectFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CheckboxSelectField.d.ts.map