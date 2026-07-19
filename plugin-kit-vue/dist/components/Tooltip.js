import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/tooltip.js";
//#region src/components/Tooltip.ts
/** Vue facade over `<pk-tooltip>`. Behavior and styles live in the web component. */
var Tooltip = createPkComponent({
	name: "PkTooltip",
	tagName: "pk-tooltip"
});
var PkTooltipElement = Tooltip;
//#endregion
export { PkTooltipElement, Tooltip };

//# sourceMappingURL=Tooltip.js.map