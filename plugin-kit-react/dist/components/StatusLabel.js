import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkStatusLabel } from "@verbb/plugin-kit-web/components/status-label/pk-status-label.js";
//#region src/components/StatusLabel.tsx
/** React facade over `<pk-status-label>`. Behavior and styles live in the web component. */
var PkStatusLabelElement = createPluginKitComponent({
	tagName: "pk-status-label",
	elementClass: PkStatusLabel,
	react: React
});
var StatusLabel = PkStatusLabelElement;
//#endregion
export { PkStatusLabelElement, StatusLabel };

//# sourceMappingURL=StatusLabel.js.map