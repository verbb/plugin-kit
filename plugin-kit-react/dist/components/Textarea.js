import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { PkTextarea } from "@verbb/plugin-kit-web/components/textarea/pk-textarea.js";
//#region src/components/Textarea.tsx
var PkTextareaElement = createPluginKitComponent({
	tagName: "pk-textarea",
	elementClass: PkTextarea,
	react: React,
	events: {
		onInput: "input",
		onChange: "input",
		onFocus: "focus",
		onBlur: "blur"
	}
});
/** React facade over `<pk-textarea>`. Behavior and styles live in the web component. */
var Textarea = forwardRef(function Textarea(props, ref) {
	const { disabled, readonly, invalid, fitCell, ...rest } = props;
	return /* @__PURE__ */ jsx(PkTextareaElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"readonly",
			"invalid",
			"fitCell"
		], {
			disabled,
			readonly,
			invalid,
			fitCell
		})
	});
});
Textarea.displayName = "Textarea";
//#endregion
export { Textarea };

//# sourceMappingURL=Textarea.js.map