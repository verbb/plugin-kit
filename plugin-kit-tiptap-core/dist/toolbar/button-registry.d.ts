import { Editor } from '@tiptap/core';
export type TiptapButtonName = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'subscript' | 'superscript' | 'unordered-list' | 'ordered-list' | 'blockquote' | 'highlight' | 'code' | 'code-block' | 'hr' | 'line-break' | 'align-left' | 'align-center' | 'align-right' | 'align-justify' | 'clear-format' | 'undo' | 'redo' | 'link' | 'table' | 'variableTag' | `h${1 | 2 | 3 | 4 | 5 | 6}`;
export type TiptapTableInsertOptions = {
    rows?: number;
    cols?: number;
    withHeaderRow?: boolean;
};
export type RunTiptapButtonOptions = {
    tableOptions?: TiptapTableInsertOptions;
};
export declare function isTiptapButtonName(value: string): value is TiptapButtonName;
export declare function isTiptapButtonActive(editor: Editor, buttonName: string): boolean;
export declare function runTiptapButton(editor: Editor, buttonName: string, options?: RunTiptapButtonOptions): boolean;
//# sourceMappingURL=button-registry.d.ts.map