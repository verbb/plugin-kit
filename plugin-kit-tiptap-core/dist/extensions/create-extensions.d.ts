import { NodeViewRenderer } from '@tiptap/core';
export type CreateTiptapExtensionsOptions = {
    trailingCursorText?: string;
    variableTagNodeView?: NodeViewRenderer;
    includeVariableTag?: boolean;
};
export declare const createTiptapExtensions: ({ trailingCursorText, variableTagNodeView, includeVariableTag, }?: CreateTiptapExtensionsOptions) => (import('@tiptap/core').Mark<import('@tiptap/extension-link').LinkOptions, any> | import('@tiptap/core').Node<any, any> | import('@tiptap/core').Extension<import('@tiptap/extensions').DropcursorOptions, any> | import('@tiptap/core').Extension<any, any> | import('@tiptap/core').Node<import('@tiptap/extension-paragraph').ParagraphOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-hard-break').HardBreakOptions, any> | import('@tiptap/core').Mark<import('@tiptap/extension-bold').BoldOptions, any> | import('@tiptap/core').Mark<import('@tiptap/extension-highlight').HighlightOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-list').BulletListOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-code-block').CodeBlockOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-heading').HeadingOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-horizontal-rule').HorizontalRuleOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-list').ListItemOptions, any> | import('@tiptap/core').Node<import('@tiptap/extension-table').TableOptions, any> | import('@tiptap/core').Extension<import('@tiptap/extensions').UndoRedoOptions, any> | import('@tiptap/core').Extension<import('@tiptap/extension-text-align').TextAlignOptions, any>)[];
export type CreateTiptapInputExtensionsOptions = {
    trailingCursorText?: string;
    variableTagNodeView?: NodeViewRenderer;
};
export declare const createTiptapInputExtensions: ({ trailingCursorText, variableTagNodeView, }?: CreateTiptapInputExtensionsOptions) => import('@tiptap/core').Node<any, any>[];
//# sourceMappingURL=create-extensions.d.ts.map