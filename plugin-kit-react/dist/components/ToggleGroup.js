import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkToggleGroup } from "@verbb/plugin-kit-web/components/toggle-group/pk-toggle-group.js";
//#region src/components/ToggleGroup.tsx
/** React facade over `<pk-toggle-group>`. Behavior and styles live in the web component. */
var PkToggleGroupElement = createPluginKitComponent({
	tagName: "pk-toggle-group",
	elementClass: PkToggleGroup,
	react: React,
	events: { onPkValueChange: "pk-value-change" }
});
var ToggleGroup = PkToggleGroupElement;
//#endregion
export { PkToggleGroupElement, ToggleGroup };

//# sourceMappingURL=ToggleGroup.js.map