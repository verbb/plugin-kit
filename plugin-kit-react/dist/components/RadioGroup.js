import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { PkRadio } from "@verbb/plugin-kit-web/components/radio-group/pk-radio.js";
import { PkRadioGroup } from "@verbb/plugin-kit-web/components/radio-group/pk-radio-group.js";
//#region src/components/RadioGroup.tsx
var PkRadioGroupElement = createPluginKitComponent({
	tagName: "pk-radio-group",
	elementClass: PkRadioGroup,
	react: React,
	events: {
		onPkChange: "pk-change",
		onInput: "input",
		onChange: "change"
	}
});
var PkRadioElement = createPluginKitComponent({
	tagName: "pk-radio",
	elementClass: PkRadio,
	react: React,
	events: { onPkRadioSelect: "pk-radio-select" }
});
/** React facade over `<pk-radio-group>`. Behavior and styles live in the web component. */
var RadioGroup = forwardRef(function RadioGroup(props, ref) {
	const { disabled, invalid, required, ...rest } = props;
	return /* @__PURE__ */ jsx(PkRadioGroupElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"invalid",
			"required"
		], {
			disabled,
			invalid,
			required
		})
	});
});
RadioGroup.displayName = "RadioGroup";
var Radio = forwardRef(function Radio(props, ref) {
	const { disabled, invalid, required, checked, ...rest } = props;
	return /* @__PURE__ */ jsx(PkRadioElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"invalid",
			"required",
			"checked"
		], {
			disabled,
			invalid,
			required,
			checked
		})
	});
});
Radio.displayName = "Radio";
//#endregion
export { PkRadioElement, PkRadioGroupElement, Radio, RadioGroup };

//# sourceMappingURL=RadioGroup.js.map