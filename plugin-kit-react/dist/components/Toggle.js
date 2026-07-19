import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkToggle } from "@verbb/plugin-kit-web/components/toggle/pk-toggle.js";
//#region src/components/Toggle.tsx
/** React facade over `<pk-toggle>`. Behavior and styles live in the web component. */
var PkToggleElement = createPluginKitComponent({
	tagName: "pk-toggle",
	elementClass: PkToggle,
	react: React,
	events: {
		onPkPressedChange: "pk-pressed-change",
		onChange: "change"
	}
});
var Toggle = PkToggleElement;
//#endregion
export { PkToggleElement, Toggle };

//# sourceMappingURL=Toggle.js.map