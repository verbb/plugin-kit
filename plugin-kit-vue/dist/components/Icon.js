import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/icon.js";
//#region src/components/Icon.ts
/** Vue facade over `<pk-icon>`. Behavior and styles live in the web component. */
var Icon = createPkComponent({
	name: "PkIcon",
	tagName: "pk-icon"
});
var PkIconElement = Icon;
//#endregion
export { Icon, PkIconElement };

//# sourceMappingURL=Icon.js.map