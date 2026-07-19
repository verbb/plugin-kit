import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/toggle-group.js";
//#region src/components/ToggleGroup.ts
/** Vue facade over `<pk-toggle-group>`. Behavior and styles live in the web component. */
var ToggleGroup = createPkComponent({
	name: "PkToggleGroup",
	tagName: "pk-toggle-group"
});
var PkToggleGroupElement = ToggleGroup;
//#endregion
export { PkToggleGroupElement, ToggleGroup };

//# sourceMappingURL=ToggleGroup.js.map