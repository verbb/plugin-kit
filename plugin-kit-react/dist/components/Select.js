import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { PkOption } from "@verbb/plugin-kit-web/components/select/pk-option.js";
import { PkOptionGroup } from "@verbb/plugin-kit-web/components/select/pk-option-group.js";
import { PkSelect } from "@verbb/plugin-kit-web/components/select/pk-select.js";
//#region src/components/Select.tsx
var PkSelectElement = createPluginKitComponent({
	tagName: "pk-select",
	elementClass: PkSelect,
	react: React,
	events: {
		onPkChange: "pk-change",
		onPkClear: "pk-clear",
		onInput: "input",
		onChange: "change",
		onFocusOut: "focusout",
		onPkShow: "pk-show",
		onPkAfterShow: "pk-after-show",
		onPkHide: "pk-hide",
		onPkAfterHide: "pk-after-hide",
		onPkOpenChange: "pk-open-change"
	}
});
var PkOptionElement = createPluginKitComponent({
	tagName: "pk-option",
	elementClass: PkOption,
	react: React,
	events: {
		onPkOptionSelect: "pk-option-select",
		onPkOptionHighlight: "pk-option-highlight"
	}
});
var PkOptionGroupElement = createPluginKitComponent({
	tagName: "pk-option-group",
	elementClass: PkOptionGroup,
	react: React
});
/** React facades over the `<pk-select>` family. Behavior and styles live in the web components. */
var Select = forwardRef(function Select(props, ref) {
	const { disabled, invalid, clearable, multiple, open, ...rest } = props;
	return /* @__PURE__ */ jsx(PkSelectElement, {
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
Select.displayName = "Select";
var Option = forwardRef(function Option(props, ref) {
	const { disabled, selected, highlighted, hidden, ...rest } = props;
	return /* @__PURE__ */ jsx(PkOptionElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"selected",
			"highlighted",
			"hidden"
		], {
			disabled,
			selected,
			highlighted,
			hidden
		})
	});
});
Option.displayName = "Option";
var OptionGroup = PkOptionGroupElement;
//#endregion
export { Option, OptionGroup, PkOptionElement, PkOptionGroupElement, PkSelectElement, Select };

//# sourceMappingURL=Select.js.map