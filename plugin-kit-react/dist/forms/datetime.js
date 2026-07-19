//#region src/forms/datetime.ts
var pad2 = (value) => {
	return value.padStart(2, "0");
};
/**
* Split a stored datetime value into the string parts the string-valued `pk-date-picker`
* (`YYYY-MM-DD`) and `pk-time-picker` (`HH:MM`) consume. Kept string-based on purpose: the
* web-component pickers are string-valued, so there is no need to round-trip through `Date`.
*/
var parseDateTimeParts = (value) => {
	if (value === null || value === void 0 || value === "") return {
		date: "",
		time: ""
	};
	const match = String(value).trim().match(/^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}):(\d{2}))?/);
	if (!match) return {
		date: "",
		time: ""
	};
	const [, date, hour, minute] = match;
	return {
		date,
		time: hour !== void 0 && minute !== void 0 ? `${hour}:${minute}` : ""
	};
};
var formatDateTimeParts = (date, time) => {
	if (!date) return "";
	const [hour = "00", minute = "00"] = (time || "00:00").split(":");
	return `${date} ${pad2(hour)}:${pad2(minute)}:00`;
};
//#endregion
export { formatDateTimeParts, parseDateTimeParts };

//# sourceMappingURL=datetime.js.map