import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkScrollArea } from "@verbb/plugin-kit-web/components/scroll-area/pk-scroll-area.js";
//#region src/components/ScrollArea.tsx
/** React facade over `<pk-scroll-area>`. Behavior and styles live in the web component. */
var PkScrollAreaElement = createPluginKitComponent({
	tagName: "pk-scroll-area",
	elementClass: PkScrollArea,
	react: React,
	events: { onPkScroll: "pk-scroll" }
});
var ScrollArea = PkScrollAreaElement;
//#endregion
export { PkScrollAreaElement, ScrollArea };

//# sourceMappingURL=ScrollArea.js.map