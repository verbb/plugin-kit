//#region src/forms/utils.ts
/** Normalize schema HTML attrs for Vue render functions. */
var normalizeAttrs = (attrs = {}) => {
	return { ...attrs };
};
var isRecord = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
var readEventValue = (valueOrEvent) => {
	if (!isRecord(valueOrEvent) || !isRecord(valueOrEvent.target)) return valueOrEvent;
	const { type, checked, value } = valueOrEvent.target;
	return type === "checkbox" ? checked : value;
};
var readPkValue = (event) => {
	return event.detail?.value ?? "";
};
//#endregion
export { isRecord, normalizeAttrs, readEventValue, readPkValue };

//# sourceMappingURL=utils.js.map