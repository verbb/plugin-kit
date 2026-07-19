import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef, useCallback } from "react";
import { jsx } from "react/jsx-runtime";
import { ALL_VALUE, PkCheckboxSelect } from "@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js";
//#region src/components/CheckboxSelect.tsx
var PkCheckboxSelectElement = createPluginKitComponent({
	tagName: "pk-checkbox-select",
	elementClass: PkCheckboxSelect,
	react: React,
	events: {
		onPkChange: "pk-change",
		onNativeChange: "change"
	}
});
/** React facade over `<pk-checkbox-select>`. Behavior and styles live in the web component. */
var CheckboxSelect = forwardRef(function CheckboxSelect({ disabled, onChange, onPkChange, ...rest }, ref) {
	const handlePkChange = useCallback((event) => {
		onPkChange?.(event);
		if (!onChange) return;
		const detail = event.detail;
		if (detail && "value" in detail) onChange(detail.value);
	}, [onChange, onPkChange]);
	return /* @__PURE__ */ jsx(PkCheckboxSelectElement, {
		ref,
		...rest,
		...trueBooleanProps(["disabled"], { disabled }),
		...onChange || onPkChange ? { onPkChange: handlePkChange } : {}
	});
});
CheckboxSelect.displayName = "CheckboxSelect";
//#endregion
export { ALL_VALUE, CheckboxSelect, PkCheckboxSelectElement };

//# sourceMappingURL=CheckboxSelect.js.map