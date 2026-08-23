import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkConnectOauth } from "@verbb/plugin-kit-web/components/connect/pk-connect-oauth.js";
//#region src/components/ConnectOauth.tsx
/** React facade over `<pk-connect-oauth>`. Behavior and styles live in the web component. */
var PkConnectOauthElement = createPluginKitComponent({
	tagName: "pk-connect-oauth",
	elementClass: PkConnectOauth,
	react: React
});
var ConnectOauth = PkConnectOauthElement;
//#endregion
export { ConnectOauth, PkConnectOauthElement };

//# sourceMappingURL=ConnectOauth.js.map