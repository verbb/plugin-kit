import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { readPkCheckedDetail } from "../utils/pk-change.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
import { PkLightswitch } from "@verbb/plugin-kit-web/components/lightswitch/pk-lightswitch.js";
//#region src/components/Lightswitch.tsx
var PkLightswitchElement = createPluginKitComponent({
	tagName: "pk-lightswitch",
	elementClass: PkLightswitch,
	react: React,
	events: {
		onPkChange: "pk-change",
		onInput: "input",
		onChange: "change"
	}
});
/** React facade over `<pk-lightswitch>`. Behavior and styles live in the web component. */
function Lightswitch({ onCheckedChange, onPkChange, ...props }) {
	const handlePkChange = (event) => {
		onPkChange?.(event);
		onCheckedChange?.(readPkCheckedDetail(event));
	};
	return /* @__PURE__ */ jsx(PkLightswitchElement, {
		...props,
		...onCheckedChange || onPkChange ? { onPkChange: handlePkChange } : {}
	});
}
//#endregion
export { Lightswitch, PkLightswitchElement };

//# sourceMappingURL=Lightswitch.js.map