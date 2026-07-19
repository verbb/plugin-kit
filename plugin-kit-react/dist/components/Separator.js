import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkSeparator } from "@verbb/plugin-kit-web/components/separator/pk-separator.js";
//#region src/components/Separator.tsx
/** React facade over `<pk-separator>`. Behavior and styles live in the web component. */
var PkSeparatorElement = createPluginKitComponent({
	tagName: "pk-separator",
	elementClass: PkSeparator,
	react: React
});
var Separator = PkSeparatorElement;
//#endregion
export { PkSeparatorElement, Separator };

//# sourceMappingURL=Separator.js.map