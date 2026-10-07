import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/state-panel.js";
//#region src/components/StatePanel.ts
/** Vue facade over `<pk-state-panel>`. Behaviour and styles live in the web component. */
var StatePanel = createPkComponent({
	name: "PkStatePanel",
	tagName: "pk-state-panel"
});
var PkStatePanelElement = StatePanel;
//#endregion
export { PkStatePanelElement, StatePanel };

//# sourceMappingURL=StatePanel.js.map