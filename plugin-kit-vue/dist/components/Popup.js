import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/popup.js";
//#region src/components/Popup.ts
/** Vue facade over `<pk-popup>`. Behavior and styles live in the web component. */
var Popup = createPkComponent({
	name: "PkPopup",
	tagName: "pk-popup"
});
var PkPopupElement = Popup;
//#endregion
export { PkPopupElement, Popup };

//# sourceMappingURL=Popup.js.map