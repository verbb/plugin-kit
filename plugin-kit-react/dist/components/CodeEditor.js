import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { PkCodeEditor } from "@verbb/plugin-kit-web/components/code-editor/pk-code-editor.js";
//#region src/components/CodeEditor.tsx
var PkCodeEditorElement = createPluginKitComponent({
	tagName: "pk-code-editor",
	elementClass: PkCodeEditor,
	react: React,
	events: {
		onPkChange: "pk-change",
		onInput: "input",
		onChange: "input",
		onBlur: "blur"
	}
});
/** React facade over `<pk-code-editor>`. Behavior and styles live in the web component. */
var CodeEditor = forwardRef(function CodeEditor({ disabled, readonly, readOnly, invalid, isInvalid, ...rest }, ref) {
	const resolvedInvalid = Boolean(invalid ?? isInvalid);
	const resolvedReadonly = Boolean(readonly ?? readOnly);
	return /* @__PURE__ */ jsx(PkCodeEditorElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"readonly",
			"invalid"
		], {
			disabled,
			readonly: resolvedReadonly,
			invalid: resolvedInvalid
		})
	});
});
CodeEditor.displayName = "CodeEditor";
//#endregion
export { CodeEditor, PkCodeEditorElement };

//# sourceMappingURL=CodeEditor.js.map