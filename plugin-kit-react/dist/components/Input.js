import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { PkInput } from "@verbb/plugin-kit-web/components/input/pk-input.js";
//#region src/components/Input.tsx
var PkInputElement = createPluginKitComponent({
	tagName: "pk-input",
	elementClass: PkInput,
	react: React,
	events: {
		onInput: "input",
		onChange: "input",
		onPkClear: "pk-clear",
		onFocus: "focus",
		onBlur: "blur"
	}
});
/** React facade over `<pk-input>`. Behavior and styles live in the web component. */
var Input = forwardRef(function Input(props, ref) {
	const { disabled, readonly, invalid, fitCell, autofocus, mono, ...rest } = props;
	return /* @__PURE__ */ jsx(PkInputElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"readonly",
			"invalid",
			"fitCell",
			"autofocus",
			"mono"
		], {
			disabled,
			readonly,
			invalid,
			fitCell,
			autofocus,
			mono
		})
	});
});
Input.displayName = "Input";
//#endregion
export { Input };

//# sourceMappingURL=Input.js.map