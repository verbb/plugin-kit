import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { isHostEvent } from "../utils/isHostEvent.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
import { PkTab } from "@verbb/plugin-kit-web/components/tabs/pk-tab.js";
import { PkTabHeading } from "@verbb/plugin-kit-web/components/tabs/pk-tab-heading.js";
import { PkTabPanel } from "@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js";
import { PkTabs } from "@verbb/plugin-kit-web/components/tabs/pk-tabs.js";
//#region src/components/Tabs.tsx
/** React facades over the `<pk-tabs>` family. Behavior and styles live in the web components. */
var PkTabsElement = createPluginKitComponent({
	tagName: "pk-tabs",
	elementClass: PkTabs,
	react: React,
	events: {
		onPkChange: "pk-change",
		onPkTabShow: "pk-tab-show",
		onPkTabHide: "pk-tab-hide"
	}
});
var PkTabElement = createPluginKitComponent({
	tagName: "pk-tab",
	elementClass: PkTab,
	react: React,
	events: {
		onPkTabSelect: "pk-tab-select",
		onPkTabKeydown: "pk-tab-keydown"
	}
});
var PkTabHeadingElement = createPluginKitComponent({
	tagName: "pk-tab-heading",
	elementClass: PkTabHeading,
	react: React
});
var PkTabPanelElement = createPluginKitComponent({
	tagName: "pk-tab-panel",
	elementClass: PkTabPanel,
	react: React
});
/** React facade over `<pk-tabs>` — only forwards host-originated tab events. */
function Tabs({ onPkChange, onPkTabShow, onPkTabHide, ...props }) {
	return /* @__PURE__ */ jsx(PkTabsElement, {
		...props,
		...onPkChange ? { onPkChange: (event) => {
			if (!isHostEvent(event)) return;
			onPkChange(event);
		} } : {},
		...onPkTabShow ? { onPkTabShow: (event) => {
			if (!isHostEvent(event)) return;
			onPkTabShow(event);
		} } : {},
		...onPkTabHide ? { onPkTabHide: (event) => {
			if (!isHostEvent(event)) return;
			onPkTabHide(event);
		} } : {}
	});
}
var Tab = PkTabElement;
var TabHeading = PkTabHeadingElement;
var TabPanel = PkTabPanelElement;
//#endregion
export { PkTabElement, PkTabHeadingElement, PkTabPanelElement, PkTabsElement, Tab, TabHeading, TabPanel, Tabs };

//# sourceMappingURL=Tabs.js.map