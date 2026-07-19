import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkCalendar } from "@verbb/plugin-kit-web/components/calendar/pk-calendar.js";
//#region src/components/Calendar.tsx
/** React facade over `<pk-calendar>`. Behavior and styles live in the web component. */
var PkCalendarElement = createPluginKitComponent({
	tagName: "pk-calendar",
	elementClass: PkCalendar,
	react: React,
	events: {
		onInput: "input",
		onChange: "change",
		onPkFocusDay: "pk-focus-day",
		onPkViewChange: "pk-view-change"
	}
});
var Calendar = PkCalendarElement;
//#endregion
export { Calendar, PkCalendarElement };

//# sourceMappingURL=Calendar.js.map