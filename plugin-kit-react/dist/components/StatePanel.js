import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkStatePanel } from "@verbb/plugin-kit-web/components/state-panel/pk-state-panel.js";
//#region src/components/StatePanel.tsx
/** React facade over `<pk-state-panel>`. Behaviour and styles live in the web component. */
var PkStatePanelElement = createPluginKitComponent({
	tagName: "pk-state-panel",
	elementClass: PkStatePanel,
	react: React,
	events: {
		onPkCopy: "pk-copy",
		onPkCopyError: "pk-copy-error"
	}
});
var StatePanel = PkStatePanelElement;
//#endregion
export { PkStatePanelElement, StatePanel };

//# sourceMappingURL=StatePanel.js.map