import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef, useCallback } from "react";
import { jsx } from "react/jsx-runtime";
import { PkColorInput } from "@verbb/plugin-kit-web/components/color-input/pk-color-input.js";
//#region src/components/ColorInput.tsx
var PkColorInputElement = createPluginKitComponent({
	tagName: "pk-color-input",
	elementClass: PkColorInput,
	react: React,
	events: {
		onPkChange: "pk-change",
		onInput: "input",
		onNativeChange: "change",
		onBlur: "blur"
	}
});
/** React facade over `<pk-color-input>`. Behavior and styles live in the web component. */
var ColorInput = forwardRef(function ColorInput({ disabled, readonly, readOnly, invalid, isInvalid, onChange, onValueChange, onPkChange, ...rest }, ref) {
	const resolvedInvalid = Boolean(invalid ?? isInvalid);
	const resolvedReadonly = Boolean(readonly ?? readOnly);
	const valueCallback = onChange ?? onValueChange;
	const handlePkChange = useCallback((event) => {
		onPkChange?.(event);
		if (!valueCallback) return;
		const detail = event.detail;
		if (detail && "value" in detail) valueCallback(detail.value ?? "");
	}, [onPkChange, valueCallback]);
	return /* @__PURE__ */ jsx(PkColorInputElement, {
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
		}),
		...valueCallback || onPkChange ? { onPkChange: handlePkChange } : {}
	});
});
ColorInput.displayName = "ColorInput";
//#endregion
export { ColorInput, PkColorInputElement };

//# sourceMappingURL=ColorInput.js.map