import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/alert.js";
//#region src/components/Alert.ts
/** Vue facade over `<pk-alert>`. Behaviour and styles live in the web component. */
var Alert = createPkComponent({
	name: "PkAlert",
	tagName: "pk-alert"
});
var PkAlertElement = Alert;
//#endregion
export { Alert, PkAlertElement };

//# sourceMappingURL=Alert.js.map