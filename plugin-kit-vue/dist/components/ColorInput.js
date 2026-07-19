import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/color-input.js";
//#region src/components/ColorInput.ts
/** Vue facade over `<pk-color-input>`. Behavior and styles live in the web component. */
var ColorInput = createPkComponent({
	name: "PkColorInput",
	tagName: "pk-color-input"
});
var PkColorInputElement = ColorInput;
//#endregion
export { ColorInput, PkColorInputElement };

//# sourceMappingURL=ColorInput.js.map