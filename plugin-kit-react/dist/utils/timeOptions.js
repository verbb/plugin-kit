import { hostGetLocale, hostGetTimepickerOptions } from "./hostBridge.js";
//#region src/utils/timeOptions.ts
var timeOptionsCache = null;
var generateTimeOptions = () => {
	if (timeOptionsCache) return timeOptionsCache;
	const options = [];
	const timepickerOptions = hostGetTimepickerOptions() || {};
	const lang = timepickerOptions.lang || {
		AM: "AM",
		PM: "PM"
	};
	const timeFormat = timepickerOptions.timeFormat || "g:i A";
	for (let hour = 0; hour < 24; hour++) for (let minute = 0; minute < 60; minute += 30) {
		const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
		let displayTime;
		if (timeFormat === "g:i A") {
			let displayHour = hour;
			if (hour === 0) displayHour = 12;
			else if (hour > 12) displayHour = hour - 12;
			const ampm = hour >= 12 ? lang.PM : lang.AM;
			displayTime = `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
		} else if (timeFormat === "G:i") displayTime = timeString;
		else displayTime = (/* @__PURE__ */ new Date(`2000-01-01T${timeString}:00`)).toLocaleTimeString(hostGetLocale() || "en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: timeFormat.includes("A")
		});
		options.push({
			value: timeString,
			label: displayTime
		});
	}
	timeOptionsCache = options;
	return options;
};
var clearTimeOptionsCache = () => {
	timeOptionsCache = null;
};
//#endregion
export { clearTimeOptionsCache, generateTimeOptions };

//# sourceMappingURL=timeOptions.js.map