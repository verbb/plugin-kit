import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/textarea.js";
//#region src/components/Textarea.ts
/** Vue facade over `<pk-textarea>`. Behavior and styles live in the web component. */
var Textarea = createPkComponent({
	name: "PkTextarea",
	tagName: "pk-textarea"
});
var PkTextareaElement = Textarea;
//#endregion
export { PkTextareaElement, Textarea };

//# sourceMappingURL=Textarea.js.map