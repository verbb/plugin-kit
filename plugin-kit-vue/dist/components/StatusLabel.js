import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/status-label.js";
//#region src/components/StatusLabel.ts
/** Vue facade over `<pk-status-label>`. Behavior and styles live in the web component. */
var StatusLabel = createPkComponent({
	name: "PkStatusLabel",
	tagName: "pk-status-label"
});
var PkStatusLabelElement = StatusLabel;
//#endregion
export { PkStatusLabelElement, StatusLabel };

//# sourceMappingURL=StatusLabel.js.map