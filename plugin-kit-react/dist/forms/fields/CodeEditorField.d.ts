import { CodeEditorProps } from '../../components/CodeEditor.js';
import { SchemaFormEngineApi } from '../engine/context.js';
type CodeEditorFieldProps = {
    form: SchemaFormEngineApi;
    field: {
        name: string;
        label?: string;
        instructions?: string;
        warning?: string;
        rows?: number;
        tabSize?: number;
        lineNumbers?: boolean;
        language?: CodeEditorProps['language'];
        required?: boolean;
        disabled?: boolean;
    };
};
export declare const CodeEditorField: ({ form, field }: CodeEditorFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CodeEditorField.d.ts.map