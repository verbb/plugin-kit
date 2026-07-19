import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/calendar.js";
//#region src/components/Calendar.ts
/** Vue facade over `<pk-calendar>`. Behavior and styles live in the web component. */
var Calendar = createPkComponent({
	name: "PkCalendar",
	tagName: "pk-calendar"
});
var PkCalendarElement = Calendar;
//#endregion
export { Calendar, PkCalendarElement };

//# sourceMappingURL=Calendar.js.map