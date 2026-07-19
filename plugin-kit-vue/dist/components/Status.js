import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/status.js";
//#region src/components/Status.ts
/** Vue facade over `<pk-status>`. Behavior and styles live in the web component. */
var Status = createPkComponent({
	name: "PkStatus",
	tagName: "pk-status"
});
var PkStatusElement = Status;
//#endregion
export { PkStatusElement, Status };

//# sourceMappingURL=Status.js.map