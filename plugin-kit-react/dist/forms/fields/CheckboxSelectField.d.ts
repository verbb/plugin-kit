import { CheckboxSelectOption } from '../../components/CheckboxSelect';
import { SchemaFormEngineApi } from '../engine/context';
type CheckboxSelectFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        options?: CheckboxSelectOption[];
        showAllOption?: boolean;
        allLabel?: string;
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const CheckboxSelectField: ({ form, field }: CheckboxSelectFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CheckboxSelectField.d.ts.map