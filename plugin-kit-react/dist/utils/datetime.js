//#region src/utils/datetime.ts
var pad2 = (value) => {
	return String(value).padStart(2, "0");
};
var parseLocalDate = (value) => {
	return parseDateTimeValue(value).date ?? void 0;
};
var parseDateTimeValue = (value) => {
	if (value === null || value === void 0 || value === "") return {
		date: null,
		time: ""
	};
	if (value instanceof Date) {
		if (Number.isNaN(value.getTime())) return {
			date: null,
			time: ""
		};
		return {
			date: new Date(value.getFullYear(), value.getMonth(), value.getDate()),
			time: `${pad2(value.getHours())}:${pad2(value.getMinutes())}`
		};
	}
	const stringValue = String(value).trim();
	if (!stringValue) return {
		date: null,
		time: ""
	};
	const localMatch = stringValue.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/);
	if (localMatch && !/[zZ]$/.test(stringValue) && !/[+-]\d{2}:?\d{2}$/.test(stringValue)) {
		const [, year, month, day, hour = "00", minute = "00"] = localMatch;
		return {
			date: new Date(Number(year), Number(month) - 1, Number(day)),
			time: `${hour}:${minute}`
		};
	}
	const parsed = new Date(stringValue);
	if (Number.isNaN(parsed.getTime())) return {
		date: null,
		time: ""
	};
	return {
		date: new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()),
		time: `${pad2(parsed.getHours())}:${pad2(parsed.getMinutes())}`
	};
};
var startOfMonth = (value) => {
	return new Date(value.getFullYear(), value.getMonth(), 1);
};
var resolveCalendarMonth = (selected) => {
	return startOfMonth(selected ?? /* @__PURE__ */ new Date());
};
var formatDateTimeValue = (date, time) => {
	if (!date) return "";
	const [hour = "00", minute = "00"] = (time || "00:00").split(":");
	return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())} ${pad2(Number(hour))}:${pad2(Number(minute))}:00`;
};
//#endregion
export { formatDateTimeValue, parseDateTimeValue, parseLocalDate, resolveCalendarMonth, startOfMonth };

//# sourceMappingURL=datetime.js.map