import { Editor, Extensions } from '@tiptap/core';
export declare function serializeTiptapDocumentContent(content: unknown): string;
/** Normalize React/HTML `value` into the JSON string the editor stores and emits. */
export declare function serializeTiptapDocumentValue(raw: string | unknown[] | null | undefined): string;
export declare function parseTiptapDocumentValue(raw: string | unknown[] | null | undefined): unknown[];
export type TiptapEditorHostOptions = {
    element: HTMLElement;
    extensions?: Extensions;
    content: unknown;
    editable: boolean;
    trailingCursorText?: string;
    minHeight?: string;
    onUpdate?: (content: unknown[]) => void;
};
export declare class TiptapEditorHost {
    editor: Editor | null;
    private lastEmitted;
    /** Skip TipTap `onUpdate` while applying controlled prop content — otherwise setContent
     * re-emits pk-change → React setValue → value prop → setContent … forever. */
    private suppressUpdateEmission;
    mount({ element, extensions, content, editable, trailingCursorText, minHeight, onUpdate, }: TiptapEditorHostOptions): void;
    setContent(content: unknown, options?: {
        trailingCursorText?: string;
        respectFocus?: boolean;
    }): void;
    destroy(): void;
}
//# sourceMappingURL=tiptap-editor-host.d.ts.map