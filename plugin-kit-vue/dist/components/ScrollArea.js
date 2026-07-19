import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/scroll-area.js";
//#region src/components/ScrollArea.ts
/** Vue facade over `<pk-scroll-area>`. Behavior and styles live in the web component. */
var ScrollArea = createPkComponent({
	name: "PkScrollArea",
	tagName: "pk-scroll-area"
});
var PkScrollAreaElement = ScrollArea;
//#endregion
export { PkScrollAreaElement, ScrollArea };

//# sourceMappingURL=ScrollArea.js.map