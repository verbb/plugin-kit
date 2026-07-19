import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkStatus } from "@verbb/plugin-kit-web/components/status/pk-status.js";
//#region src/components/Status.tsx
/** React facade over `<pk-status>`. Behavior and styles live in the web component. */
var PkStatusElement = createPluginKitComponent({
	tagName: "pk-status",
	elementClass: PkStatus,
	react: React
});
var Status = PkStatusElement;
//#endregion
export { PkStatusElement, Status };

//# sourceMappingURL=Status.js.map