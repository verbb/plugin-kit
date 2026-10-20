import { Editor, NodeViewRenderer } from '@tiptap/core';
export declare const PK_VARIABLE_TAG_CONFIGURE_EVENT = "pk-variable-tag-configure";
/** Transform metadata grouped by value type, supplied by the consuming application. */
export type PkVariableTransformerRegistry = Record<string, readonly {
    id: string;
    label?: string;
}[]>;
/** Refresh labels without changing the editor document or its selection. */
export declare function refreshVariableTagPresentation(host: HTMLElement): void;
export type PkVariableTagConfigureDetail = {
    editor: Editor;
    anchor: HTMLElement;
    attrs: Record<string, unknown>;
    getPos: () => number | undefined;
    updateAttributes: (attributes: Record<string, unknown>) => void;
    deleteNode: () => void;
};
/**
 * DOM node view for variable tags in vanilla editors.
 * Chip + remove match kit v1; configure UI is opened via `pk-variable-tag-configure`
 * (Formie mounts the edit overlay beside the WC editor).
 */
export declare function createVariableTagDomNodeView(): NodeViewRenderer;
//# sourceMappingURL=variable-tag-node-view.d.ts.map