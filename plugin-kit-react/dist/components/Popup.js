import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkPopup } from "@verbb/plugin-kit-web/components/popup/pk-popup.js";
//#region src/components/Popup.tsx
/** React facade over `<pk-popup>` (low-level positioning primitive). Behavior lives in the web component. */
var PkPopupElement = createPluginKitComponent({
	tagName: "pk-popup",
	elementClass: PkPopup,
	react: React,
	events: {
		onPkReposition: "pk-reposition",
		onPkPopupContentSync: "pk-popup-content-sync"
	}
});
var Popup = PkPopupElement;
//#endregion
export { PkPopupElement, Popup };

//# sourceMappingURL=Popup.js.map