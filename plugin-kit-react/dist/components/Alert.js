import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkAlert } from "@verbb/plugin-kit-web/components/alert/pk-alert.js";
//#region src/components/Alert.tsx
/** React facade over `<pk-alert>`. Behaviour and styles live in the web component. */
var PkAlertElement = createPluginKitComponent({
	tagName: "pk-alert",
	elementClass: PkAlert,
	react: React,
	events: {
		onPkDismiss: "pk-dismiss",
		onPkCopy: "pk-copy",
		onPkCopyError: "pk-copy-error"
	}
});
var Alert = PkAlertElement;
//#endregion
export { Alert, PkAlertElement };

//# sourceMappingURL=Alert.js.map