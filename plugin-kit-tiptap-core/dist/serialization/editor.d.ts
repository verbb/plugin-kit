import { JSONContent } from '@tiptap/core';
type NormalizeContentOptions = {
    trailingCursorText?: string;
};
export declare const normalizeContentArray: (content: unknown, { trailingCursorText }?: NormalizeContentOptions) => JSONContent[];
export declare const valueToContent: (value: unknown, options?: NormalizeContentOptions) => JSONContent | null;
export declare const getFatalTiptapContentError: (value: unknown) => string;
export {};
//# sourceMappingURL=editor.d.ts.map