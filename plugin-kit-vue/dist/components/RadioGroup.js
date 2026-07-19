import { createPkComponentFamily } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/radio-group.js";
//#region src/components/RadioGroup.ts
/** Vue facades over the `<pk-radio-group>` family. Behavior and styles live in the web components. */
var family = createPkComponentFamily({
	RadioGroup: "pk-radio-group",
	Radio: "pk-radio"
});
var RadioGroup = family.RadioGroup;
var PkRadioGroupElement = RadioGroup;
var Radio = family.Radio;
var PkRadioElement = Radio;
//#endregion
export { PkRadioElement, PkRadioGroupElement, Radio, RadioGroup };

//# sourceMappingURL=RadioGroup.js.map