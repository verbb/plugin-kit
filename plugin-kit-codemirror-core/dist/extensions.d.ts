import { Compartment, Extension } from '@codemirror/state';
import { CodeEditorLanguage } from './constants.js';
export type CreateCodeEditorExtensionsOptions = {
    language?: CodeEditorLanguage;
    tabSize?: number;
    lineNumbers?: boolean;
    editable?: boolean;
    editableCompartment?: Compartment;
    onUpdate?: (value: string) => void;
    onBlur?: () => void;
};
export declare function createCodeEditorExtensions({ language, tabSize, lineNumbers: showLineNumbers, editable, editableCompartment, onUpdate, onBlur, }: CreateCodeEditorExtensionsOptions): Extension[];
//# sourceMappingURL=extensions.d.ts.map