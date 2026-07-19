import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/code-editor.js";
//#region src/components/CodeEditor.ts
/** Vue facade over `<pk-code-editor>`. Behavior and styles live in the web component. */
var CodeEditor = createPkComponent({
	name: "PkCodeEditor",
	tagName: "pk-code-editor"
});
var PkCodeEditorElement = CodeEditor;
//#endregion
export { CodeEditor, PkCodeEditorElement };

//# sourceMappingURL=CodeEditor.js.map