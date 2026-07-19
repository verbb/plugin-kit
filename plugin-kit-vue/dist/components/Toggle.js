import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/toggle.js";
//#region src/components/Toggle.ts
/** Vue facade over `<pk-toggle>`. Behavior and styles live in the web component. */
var Toggle = createPkComponent({
	name: "PkToggle",
	tagName: "pk-toggle"
});
var PkToggleElement = Toggle;
//#endregion
export { PkToggleElement, Toggle };

//# sourceMappingURL=Toggle.js.map