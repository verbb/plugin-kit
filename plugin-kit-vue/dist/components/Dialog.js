import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/dialog.js";
//#region src/components/Dialog.ts
/** Vue facade over `<pk-dialog>`. Behavior and styles live in the web component. */
var Dialog = createPkComponent({
	name: "PkDialog",
	tagName: "pk-dialog"
});
var PkDialogElement = Dialog;
//#endregion
export { Dialog, PkDialogElement };

//# sourceMappingURL=Dialog.js.map