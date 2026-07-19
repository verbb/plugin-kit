import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/input.js";
//#region src/components/Input.ts
/** Vue facade over `<pk-input>`. Behavior and styles live in the web component. */
var Input = createPkComponent({
	name: "PkInput",
	tagName: "pk-input"
});
var PkInputElement = Input;
//#endregion
export { Input, PkInputElement };

//# sourceMappingURL=Input.js.map