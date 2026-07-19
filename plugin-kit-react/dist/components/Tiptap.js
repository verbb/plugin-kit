import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
import { PkTiptapContent } from "@verbb/plugin-kit-web/components/tiptap/pk-tiptap-content.js";
import { PkTiptapEditor } from "@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js";
import { PkTiptapInput } from "@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js";
//#region src/components/Tiptap.tsx
/** React facades over the `<pk-tiptap-*>` family. Behavior and styles live in the web components. */
var PkTiptapEditorElement = createPluginKitComponent({
	tagName: "pk-tiptap-editor",
	elementClass: PkTiptapEditor,
	react: React,
	events: {
		onPkChange: "pk-change",
		onInput: "input",
		onPkVariableTagConfigure: "pk-variable-tag-configure"
	}
});
var PkTiptapInputElement = createPluginKitComponent({
	tagName: "pk-tiptap-input",
	elementClass: PkTiptapInput,
	react: React,
	events: {
		onPkChange: "pk-change",
		onInput: "input",
		onPkVariableTagConfigure: "pk-variable-tag-configure"
	}
});
var PkTiptapContentElement = createPluginKitComponent({
	tagName: "pk-tiptap-content",
	elementClass: PkTiptapContent,
	react: React
});
function serializeTiptapEditorValue(raw) {
	if (raw == null) return "[]";
	if (typeof raw === "string") return raw;
	if (Array.isArray(raw)) return JSON.stringify(raw);
	return "[]";
}
function readPkChangeValue(event) {
	const detail = event.detail;
	return typeof detail?.value === "string" ? detail.value : void 0;
}
/**
* TipTap editors are form-associated. Never forward `disabled={undefined}` —
* @lit/react assigns the property, and FAE must not treat that as a toggle force.
*/
function TiptapEditor({ value, onChange, onPkChange, disabled, invalid, readonly, readOnly, ...props }) {
	const isReadonly = Boolean(readonly ?? readOnly);
	return /* @__PURE__ */ jsx(PkTiptapEditorElement, {
		...props,
		value: serializeTiptapEditorValue(value),
		onPkChange: (event) => {
			onPkChange?.(event);
			const next = readPkChangeValue(event);
			if (next !== void 0) onChange?.(next);
		},
		...trueBooleanProps([
			"disabled",
			"invalid",
			"readonly"
		], {
			disabled,
			invalid,
			readonly: isReadonly
		})
	});
}
function TiptapInput({ onChange, onPkChange, disabled, invalid, readonly, readOnly, fitCell, ...props }) {
	const isReadonly = Boolean(readonly ?? readOnly);
	return /* @__PURE__ */ jsx(PkTiptapInputElement, {
		...props,
		onPkChange: (event) => {
			onPkChange?.(event);
			const next = readPkChangeValue(event);
			if (next !== void 0) onChange?.(next);
		},
		...trueBooleanProps([
			"disabled",
			"invalid",
			"readonly",
			"fitCell"
		], {
			disabled,
			invalid,
			readonly: isReadonly,
			fitCell
		})
	});
}
var TiptapContent = PkTiptapContentElement;
//#endregion
export { PkTiptapContentElement, PkTiptapEditorElement, PkTiptapInputElement, TiptapContent, TiptapEditor, TiptapInput };

//# sourceMappingURL=Tiptap.js.map