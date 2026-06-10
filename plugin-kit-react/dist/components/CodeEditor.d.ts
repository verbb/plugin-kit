import { ReactCodeMirrorProps } from '@uiw/react-codemirror';
type CodeEditorLanguage = 'html' | 'text';
type CodeEditorProps = Omit<ReactCodeMirrorProps, 'value' | 'onChange'> & {
    value: string;
    onChange: (value: string) => void;
    language?: CodeEditorLanguage;
    tabSize?: number;
    lineNumbers?: boolean;
    isInvalid?: boolean;
};
export declare const CodeEditor: ({ value, onChange, language, tabSize, lineNumbers, rows, disabled, readOnly, isInvalid, className, ...props }: CodeEditorProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CodeEditor.d.ts.map