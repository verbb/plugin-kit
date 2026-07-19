import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/time-picker.js";
//#region src/components/TimePicker.ts
/** Vue facade over `<pk-time-picker>`. Behavior and styles live in the web component. */
var TimePicker = createPkComponent({
	name: "PkTimePicker",
	tagName: "pk-time-picker"
});
var PkTimePickerElement = TimePicker;
//#endregion
export { PkTimePickerElement, TimePicker };

//# sourceMappingURL=TimePicker.js.map