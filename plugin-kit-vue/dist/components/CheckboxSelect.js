import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/checkbox-select.js";
//#region src/components/CheckboxSelect.ts
/** Vue facade over `<pk-checkbox-select>`. Behavior and styles live in the web component. */
var CheckboxSelect = createPkComponent({
	name: "PkCheckboxSelect",
	tagName: "pk-checkbox-select"
});
var PkCheckboxSelectElement = CheckboxSelect;
//#endregion
export { CheckboxSelect, PkCheckboxSelectElement };

//# sourceMappingURL=CheckboxSelect.js.map