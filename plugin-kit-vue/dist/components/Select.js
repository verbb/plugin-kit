import { createPkComponentFamily } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/select.js";
//#region src/components/Select.ts
/** Vue facades over the `<pk-select>` family. Behavior and styles live in the web components. */
var family = createPkComponentFamily({
	Select: "pk-select",
	Option: "pk-option",
	OptionGroup: "pk-option-group"
});
var Select = family.Select;
var PkSelectElement = Select;
var Option = family.Option;
var PkOptionElement = Option;
var OptionGroup = family.OptionGroup;
var PkOptionGroupElement = OptionGroup;
//#endregion
export { Option, OptionGroup, PkOptionElement, PkOptionGroupElement, PkSelectElement, Select };

//# sourceMappingURL=Select.js.map