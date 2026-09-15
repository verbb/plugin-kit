import { Extensions, NodeViewRenderer } from '@tiptap/core';
import { TiptapDocumentSurface } from '../registry.js';
export type CreateTiptapExtensionsOptions = {
    trailingCursorText?: string;
    variableTagNodeView?: NodeViewRenderer;
    includeVariableTag?: boolean;
    /** Select registered extensions for an editable editor or read-only renderer. */
    surface?: TiptapDocumentSurface;
};
export declare const createTiptapExtensions: ({ trailingCursorText, variableTagNodeView, includeVariableTag, surface, }?: CreateTiptapExtensionsOptions) => Extensions;
export type CreateTiptapInputExtensionsOptions = {
    trailingCursorText?: string;
    variableTagNodeView?: NodeViewRenderer;
};
export declare const createTiptapInputExtensions: ({ trailingCursorText, variableTagNodeView, }?: CreateTiptapInputExtensionsOptions) => import('@tiptap/core').Node<any, any>[];
//# sourceMappingURL=create-extensions.d.ts.map