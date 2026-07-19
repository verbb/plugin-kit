import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkIcon } from "@verbb/plugin-kit-web/components/icon/pk-icon.js";
//#region src/components/Icon.tsx
/** React facade over `<pk-icon>`. Behavior and styles live in the web component. */
var PkIconElement = createPluginKitComponent({
	tagName: "pk-icon",
	elementClass: PkIcon,
	react: React
});
var Icon = PkIconElement;
//#endregion
export { Icon, PkIconElement };

//# sourceMappingURL=Icon.js.map