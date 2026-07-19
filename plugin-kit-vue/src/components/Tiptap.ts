import { createPkComponentFamily } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/tiptap-editor.js';
import '@verbb/plugin-kit-web/components/tiptap-input.js';
import '@verbb/plugin-kit-web/components/tiptap-content.js';

/** Vue facades over the `<pk-tiptap-*>` family. Behavior and styles live in the web components. */
const family = createPkComponentFamily({
    TiptapEditor: 'pk-tiptap-editor',
    TiptapInput: 'pk-tiptap-input',
    TiptapContent: 'pk-tiptap-content',
});

export const TiptapEditor = family.TiptapEditor;
export const PkTiptapEditorElement = TiptapEditor;
export const TiptapInput = family.TiptapInput;
export const PkTiptapInputElement = TiptapInput;
export const TiptapContent = family.TiptapContent;
export const PkTiptapContentElement = TiptapContent;

export type TiptapEditorProps = Record<string, unknown>;
export type TiptapInputProps = Record<string, unknown>;
export type TiptapContentProps = Record<string, unknown>;
