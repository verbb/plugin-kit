import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/copy-button.js";
//#region src/components/CopyButton.ts
/** Vue facade over `<pk-copy-button>`. Behavior and styles live in the web component. */
var CopyButton = createPkComponent({
	name: "PkCopyButton",
	tagName: "pk-copy-button"
});
var PkCopyButtonElement = CopyButton;
//#endregion
export { CopyButton, PkCopyButtonElement };

//# sourceMappingURL=CopyButton.js.map