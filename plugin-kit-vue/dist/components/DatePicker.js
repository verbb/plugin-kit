import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/date-picker.js";
//#region src/components/DatePicker.ts
/** Vue facade over `<pk-date-picker>`. Behavior and styles live in the web component. */
var DatePicker = createPkComponent({
	name: "PkDatePicker",
	tagName: "pk-date-picker"
});
var PkDatePickerElement = DatePicker;
//#endregion
export { DatePicker, PkDatePickerElement };

//# sourceMappingURL=DatePicker.js.map