import { default as React } from 'react';
import { PkCodeEditor } from '@verbb/plugin-kit-web/components/code-editor/pk-code-editor.js';
declare const PkCodeEditorElement: import('@lit/react').ReactWebComponent<PkCodeEditor, {
    onPkChange: string;
    onInput: string;
    onChange: string;
    onBlur: string;
}>;
type PkCodeEditorElementProps = React.ComponentProps<typeof PkCodeEditorElement>;
export type CodeEditorProps = PkCodeEditorElementProps & {
    /** React alias for the CE `invalid` boolean attribute. */
    isInvalid?: boolean;
    /** React/Formie alias for the Lit `readonly` property. */
    readOnly?: boolean;
};
/** React facade over `<pk-code-editor>`. Behavior and styles live in the web component. */
export declare const CodeEditor: React.ForwardRefExoticComponent<Omit<CodeEditorProps, "ref"> & React.RefAttributes<PkCodeEditor>>;
export { PkCodeEditorElement };
//# sourceMappingURL=CodeEditor.d.ts.map