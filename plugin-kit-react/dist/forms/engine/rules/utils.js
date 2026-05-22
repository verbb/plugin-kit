//#region src/forms/engine/rules/utils.ts
var isEmptyValue = (value) => {
	if (value === void 0 || value === null) return true;
	if (typeof value === "string") return value === "";
	if (Array.isArray(value)) return value.length === 0;
	return false;
};
var getValueSize = (value) => {
	if (typeof value === "number") return value;
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (trimmed !== "" && Number.isFinite(Number(trimmed))) return Number(trimmed);
		return value.length;
	}
	if (Array.isArray(value)) return value.length;
	return NaN;
};
//#endregion
export { getValueSize, isEmptyValue };

//# sourceMappingURL=utils.js.map