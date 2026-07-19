import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { PkTimePicker } from "@verbb/plugin-kit-web/components/time-picker/pk-time-picker.js";
//#region src/components/TimePicker.tsx
var PkTimePickerElement = createPluginKitComponent({
	tagName: "pk-time-picker",
	elementClass: PkTimePicker,
	react: React,
	events: {
		onPkChange: "pk-change",
		onPkClear: "pk-clear",
		onInput: "input",
		onChange: "change"
	}
});
/** React facade over `<pk-time-picker>`. Behavior and styles live in the web component. */
var TimePicker = forwardRef(function TimePicker(props, ref) {
	const { disabled, invalid, clearable, multiple, open, ...rest } = props;
	return /* @__PURE__ */ jsx(PkTimePickerElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"invalid",
			"clearable",
			"multiple",
			"open"
		], {
			disabled,
			invalid,
			clearable,
			multiple,
			open
		})
	});
});
TimePicker.displayName = "TimePicker";
//#endregion
export { PkTimePickerElement, TimePicker };

//# sourceMappingURL=TimePicker.js.map