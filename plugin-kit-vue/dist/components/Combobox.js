import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/combobox.js";
//#region src/components/Combobox.ts
/** Vue facade over `<pk-combobox>`. Behavior and styles live in the web component. */
var Combobox = createPkComponent({
	name: "PkCombobox",
	tagName: "pk-combobox"
});
var PkComboboxElement = Combobox;
//#endregion
export { Combobox, PkComboboxElement };

//# sourceMappingURL=Combobox.js.map