import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkTooltip } from "@verbb/plugin-kit-web/components/tooltip/pk-tooltip.js";
//#region src/components/Tooltip.tsx
/** React facade over `<pk-tooltip>`. Behavior and styles live in the web component. */
var PkTooltipElement = createPluginKitComponent({
	tagName: "pk-tooltip",
	elementClass: PkTooltip,
	react: React,
	events: {
		onPkShow: "pk-show",
		onPkAfterShow: "pk-after-show",
		onPkHide: "pk-hide",
		onPkAfterHide: "pk-after-hide",
		onPkOpenChange: "pk-open-change"
	}
});
var Tooltip = PkTooltipElement;
//#endregion
export { PkTooltipElement, Tooltip };

//# sourceMappingURL=Tooltip.js.map