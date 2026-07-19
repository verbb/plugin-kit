import { EditorView } from '@codemirror/view';
import { CodeEditorLanguage } from './constants.js';
export type CodeMirrorHostMountOptions = {
    parent: HTMLElement;
    value?: string;
    language?: CodeEditorLanguage;
    tabSize?: number;
    lineNumbers?: boolean;
    rows?: number;
    editable?: boolean;
    onUpdate?: (value: string) => void;
    onBlur?: () => void;
};
export declare class CodeMirrorHost {
    view: EditorView | null;
    private readonly editableCompartment;
    private lastEmitted;
    mount({ parent, value, language, tabSize, lineNumbers, rows, editable, onUpdate, onBlur, }: CodeMirrorHostMountOptions): void;
    getValue(): string;
    setValue(value: string, options?: {
        respectFocus?: boolean;
    }): void;
    setEditable(editable: boolean): void;
    destroy(): void;
}
//# sourceMappingURL=host.d.ts.map