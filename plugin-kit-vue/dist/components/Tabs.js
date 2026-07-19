import { createPkComponentFamily } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/tabs.js";
//#region src/components/Tabs.ts
/** Vue facades over the `<pk-tabs>` family. Behavior and styles live in the web components. */
var family = createPkComponentFamily({
	Tabs: "pk-tabs",
	Tab: "pk-tab",
	TabHeading: "pk-tab-heading",
	TabPanel: "pk-tab-panel"
});
var Tabs = family.Tabs;
var PkTabsElement = Tabs;
var Tab = family.Tab;
var PkTabElement = Tab;
var TabHeading = family.TabHeading;
var PkTabHeadingElement = TabHeading;
var TabPanel = family.TabPanel;
var PkTabPanelElement = TabPanel;
//#endregion
export { PkTabElement, PkTabHeadingElement, PkTabPanelElement, PkTabsElement, Tab, TabHeading, TabPanel, Tabs };

//# sourceMappingURL=Tabs.js.map