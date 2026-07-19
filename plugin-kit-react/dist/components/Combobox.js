import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { PkCombobox } from "@verbb/plugin-kit-web/components/combobox/pk-combobox.js";
//#region src/components/Combobox.tsx
var PkComboboxElement = createPluginKitComponent({
	tagName: "pk-combobox",
	elementClass: PkCombobox,
	react: React,
	events: {
		onPkChange: "pk-change",
		onPkClear: "pk-clear",
		onPkCreate: "pk-create",
		onInput: "input",
		onChange: "change",
		onPkShow: "pk-show",
		onPkAfterShow: "pk-after-show",
		onPkHide: "pk-hide",
		onPkAfterHide: "pk-after-hide",
		onPkOpenChange: "pk-open-change"
	}
});
/** React facade over `<pk-combobox>`. Behavior and styles live in the web component. */
var Combobox = forwardRef(function Combobox(props, ref) {
	const { disabled, invalid, clearable, multiple, open, popupMode, allowCreate, allowCustomValue, ...rest } = props;
	return /* @__PURE__ */ jsx(PkComboboxElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"invalid",
			"clearable",
			"multiple",
			"open",
			"popupMode",
			"allowCreate",
			"allowCustomValue"
		], {
			disabled,
			invalid,
			clearable,
			multiple,
			open,
			popupMode,
			allowCreate,
			allowCustomValue
		})
	});
});
Combobox.displayName = "Combobox";
//#endregion
export { Combobox, PkComboboxElement };

//# sourceMappingURL=Combobox.js.map