import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
import { PkButton } from "@verbb/plugin-kit-web/components/button/pk-button.js";
//#region src/components/Button.tsx
var PkButtonElement = createPluginKitComponent({
	tagName: "pk-button",
	elementClass: PkButton,
	react: React,
	events: { onPkClick: "click" }
});
/** React facade over `<pk-button>`. Behavior and styles live in the web component. */
function Button({ children, variant = "default", size = "default", icon, groupTrigger, withCaret, loading = false, disabled = false, type = "button", spinnerSize, spinnerVariant, spinnerTone, "data-state": dataState, ...props }) {
	return /* @__PURE__ */ jsx(PkButtonElement, {
		variant,
		size,
		loading,
		disabled,
		type,
		...trueBooleanProps([
			"icon",
			"groupTrigger",
			"withCaret"
		], {
			icon,
			groupTrigger,
			withCaret
		}),
		...spinnerSize ? { "spinner-size": spinnerSize } : {},
		...spinnerVariant ? { "spinner-variant": spinnerVariant } : {},
		...spinnerTone ? { "spinner-tone": spinnerTone } : {},
		...dataState ? { "data-state": dataState } : {},
		...props,
		children
	});
}
//#endregion
export { Button, PkButtonElement };

//# sourceMappingURL=Button.js.map