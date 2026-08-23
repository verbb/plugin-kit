import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkConnect } from "@verbb/plugin-kit-web/components/connect/pk-connect.js";
//#region src/components/Connect.tsx
/** React facade over `<pk-connect>`. Behavior and styles live in the web component. */
var PkConnectElement = createPluginKitComponent({
	tagName: "pk-connect",
	elementClass: PkConnect,
	react: React,
	events: { onPkStatusChange: "pk-status-change" }
});
var Connect = PkConnectElement;
//#endregion
export { Connect, PkConnectElement };

//# sourceMappingURL=Connect.js.map