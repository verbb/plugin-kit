import { createPkComponentFamily } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/tiptap-editor.js";
import "@verbb/plugin-kit-web/components/tiptap-input.js";
import "@verbb/plugin-kit-web/components/tiptap-content.js";
//#region src/components/Tiptap.ts
/** Vue facades over the `<pk-tiptap-*>` family. Behavior and styles live in the web components. */
var family = createPkComponentFamily({
	TiptapEditor: "pk-tiptap-editor",
	TiptapInput: "pk-tiptap-input",
	TiptapContent: "pk-tiptap-content"
});
var TiptapEditor = family.TiptapEditor;
var PkTiptapEditorElement = TiptapEditor;
var TiptapInput = family.TiptapInput;
var PkTiptapInputElement = TiptapInput;
var TiptapContent = family.TiptapContent;
var PkTiptapContentElement = TiptapContent;
//#endregion
export { PkTiptapContentElement, PkTiptapEditorElement, PkTiptapInputElement, TiptapContent, TiptapEditor, TiptapInput };

//# sourceMappingURL=Tiptap.js.map