import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
import { PkInputGroup } from "@verbb/plugin-kit-web/components/input-group/pk-input-group.js";
import { PkInputGroupAddon } from "@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js";
import { PkInputGroupButton } from "@verbb/plugin-kit-web/components/input-group/pk-input-group-button.js";
import { PkInputGroupInput } from "@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js";
import { PkInputGroupText } from "@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js";
import { PkInputGroupTextarea } from "@verbb/plugin-kit-web/components/input-group/pk-input-group-textarea.js";
//#region src/components/InputGroup.tsx
/** React facades over the `<pk-input-group>` family. Behavior and styles live in the web components. */
var PkInputGroupElement = createPluginKitComponent({
	tagName: "pk-input-group",
	elementClass: PkInputGroup,
	react: React
});
var PkInputGroupAddonElement = createPluginKitComponent({
	tagName: "pk-input-group-addon",
	elementClass: PkInputGroupAddon,
	react: React
});
var PkInputGroupButtonElement = createPluginKitComponent({
	tagName: "pk-input-group-button",
	elementClass: PkInputGroupButton,
	react: React
});
var PkInputGroupInputElement = createPluginKitComponent({
	tagName: "pk-input-group-input",
	elementClass: PkInputGroupInput,
	react: React,
	events: {
		onInput: "input",
		onChange: "input"
	}
});
var PkInputGroupTextElement = createPluginKitComponent({
	tagName: "pk-input-group-text",
	elementClass: PkInputGroupText,
	react: React
});
var PkInputGroupTextareaElement = createPluginKitComponent({
	tagName: "pk-input-group-textarea",
	elementClass: PkInputGroupTextarea,
	react: React,
	events: {
		onInput: "input",
		onChange: "input"
	}
});
var InputGroup = PkInputGroupElement;
var InputGroupAddon = PkInputGroupAddonElement;
var InputGroupButton = PkInputGroupButtonElement;
var InputGroupInput = forwardRef(function InputGroupInput(props, ref) {
	const { disabled, readonly, invalid, ...rest } = props;
	return /* @__PURE__ */ jsx(PkInputGroupInputElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"readonly",
			"invalid"
		], {
			disabled,
			readonly,
			invalid
		})
	});
});
InputGroupInput.displayName = "InputGroupInput";
var InputGroupText = PkInputGroupTextElement;
var InputGroupTextarea = forwardRef(function InputGroupTextarea(props, ref) {
	const { disabled, readonly, invalid, ...rest } = props;
	return /* @__PURE__ */ jsx(PkInputGroupTextareaElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"readonly",
			"invalid"
		], {
			disabled,
			readonly,
			invalid
		})
	});
});
InputGroupTextarea.displayName = "InputGroupTextarea";
//#endregion
export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea, PkInputGroupAddonElement, PkInputGroupButtonElement, PkInputGroupElement, PkInputGroupInputElement, PkInputGroupTextElement, PkInputGroupTextareaElement };

//# sourceMappingURL=InputGroup.js.map