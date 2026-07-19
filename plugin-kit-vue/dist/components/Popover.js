import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/popover.js";
//#region src/components/Popover.ts
/** Vue facade over `<pk-popover>`. Behavior and styles live in the web component. */
var Popover = createPkComponent({
	name: "PkPopover",
	tagName: "pk-popover"
});
var PkPopoverElement = Popover;
//#endregion
export { PkPopoverElement, Popover };

//# sourceMappingURL=Popover.js.map