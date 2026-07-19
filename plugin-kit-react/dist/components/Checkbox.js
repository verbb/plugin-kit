import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { readPkCheckedDetail } from "../utils/pk-change.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
import { PkCheckbox } from "@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js";
//#region src/components/Checkbox.tsx
var PkCheckboxElement = createPluginKitComponent({
	tagName: "pk-checkbox",
	elementClass: PkCheckbox,
	react: React,
	events: {
		onPkChange: "pk-change",
		onChange: "change"
	}
});
/** React facade over `<pk-checkbox>`. Behavior and styles live in the web component. */
function Checkbox({ children, checked, defaultChecked, indeterminate = false, disabled = false, invalid = false, required = false, value = "on", "data-state": dataState, onCheckedChange, onPkChange, ...props }) {
	const [uncontrolledChecked, setUncontrolledChecked] = React.useState(Boolean(defaultChecked));
	const isControlled = checked !== void 0;
	const resolvedChecked = isControlled ? checked : uncontrolledChecked;
	const handlePkChange = (event) => {
		const next = readPkCheckedDetail(event);
		if (!isControlled) setUncontrolledChecked(next);
		onPkChange?.(event);
		onCheckedChange?.(next);
	};
	return /* @__PURE__ */ jsx(PkCheckboxElement, {
		checked: resolvedChecked,
		defaultChecked,
		indeterminate,
		disabled,
		invalid,
		required,
		checkboxValue: value,
		...dataState ? { "data-state": dataState } : {},
		onPkChange: handlePkChange,
		...props,
		children
	});
}
//#endregion
export { Checkbox, PkCheckboxElement };

//# sourceMappingURL=Checkbox.js.map