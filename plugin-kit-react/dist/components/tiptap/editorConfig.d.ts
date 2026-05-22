import { JSONContent } from '@tiptap/core';
type CreateTiptapExtensionsOptions = {
    trailingCursorText?: string;
};
type NormalizeContentOptions = {
    trailingCursorText?: string;
};
export declare const createTiptapExtensions: ({ trailingCursorText, }?: CreateTiptapExtensionsOptions) => (import('@tiptap/core').Node<any, any> | import('@tiptap/core').Node<import('@tiptap/extension-paragraph').ParagraphOptions, any> | import('@tiptap/core').Node<{
    trailingCursorText: string;
}, any> | import('@tiptap/core').Extension<import('@tiptap/extensions').DropcursorOptions, any> | import('@tiptap/core').Extension<any, any> | import('@tiptap/core').Node<import('@tiptap/extension-hard-break').HardBreakOptions, any> | import('@tiptap/core').Mark<import('@tiptap/extension-bold').BoldOptions, any> | import('@tiptap/core').Mark<import('@tiptap/extension-highlight').HighlightOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-list').BulletListOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-code-block').CodeBlockOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-heading').HeadingOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-horizontal-rule').HorizontalRuleOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-list').ListItemOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-table').TableOptions, any> | import('@tiptap/core').Extension<import('@tiptap/extensions').UndoRedoOptions, any> | import('@tiptap/core').Mark<import('@tiptap/extension-link').LinkOptions, any> | import('@tiptap/core').Extension<import('@tiptap/extension-text-align').TextAlignOptions, any>)[];
export declare const normalizeContentArray: (content: unknown, { trailingCursorText }?: NormalizeContentOptions) => JSONContent[];
export declare const valueToContent: (value: unknown, options?: NormalizeContentOptions) => JSONContent | null;
export declare const getFatalTiptapContentError: (value: unknown) => string;
export {};
//# sourceMappingURL=editorConfig.d.ts.map