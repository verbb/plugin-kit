import { Editor, Extensions } from '@tiptap/core';
export type TiptapDocumentSurface = 'editor' | 'content';
export type TiptapExtensionFactory = () => Extensions[number];
export type TiptapExtensionRegistration = {
    id: string;
    extension: Extensions[number] | TiptapExtensionFactory;
    /** Document surfaces that receive the extension. Defaults to both. */
    surfaces?: TiptapDocumentSurface[];
};
/** Framework-neutral icon data rendered through Plugin Kit's escaping icon helper. */
export type TiptapToolbarIcon = {
    readonly width: number;
    readonly height: number;
    readonly path: string;
};
export type TiptapToolbarControl = {
    id: string;
    label: string;
    icon?: TiptapToolbarIcon;
    run: (editor: Editor) => boolean | void;
    isActive?: (editor: Editor) => boolean;
    isVisible?: (editor: Editor) => boolean;
};
/**
 * Register a document extension before mounting a Plugin Kit editor or renderer.
 * Core schema names cannot be replaced because stored JSON must remain portable.
 */
export declare function registerTiptapExtension(registration: TiptapExtensionRegistration): () => void;
export declare function getRegisteredTiptapExtensions(surface: TiptapDocumentSurface): Extensions;
/** Register a stock-toolbar-compatible control without introducing a global runtime. */
export declare function registerTiptapToolbarControl(control: TiptapToolbarControl): () => void;
export declare function getRegisteredTiptapToolbarControl(id: string): TiptapToolbarControl | undefined;
export declare function isRegisteredTiptapToolbarControl(id: string): boolean;
//# sourceMappingURL=registry.d.ts.map