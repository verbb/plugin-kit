import { SchemaFormEngineApi } from '../engine/context';
type CodeEditorFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        placeholder?: string;
        rows?: number;
        tabSize?: number;
        lineNumbers?: boolean;
        language?: 'html' | 'text';
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const CodeEditorField: ({ form, field }: CodeEditorFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CodeEditorField.d.ts.map