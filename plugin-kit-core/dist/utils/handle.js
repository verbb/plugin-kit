import { findUniqueHandle, generateHandle } from "./string.js";
//#region src/utils/handle.ts
/** Minimal dot/bracket path getter so this stays dependency-free (no lodash). */
var getByPath = (source, path) => {
	if (source == null || typeof source !== "object" || !path) return;
	const segments = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
	let current = source;
	for (const segment of segments) {
		if (current == null || typeof current !== "object") return;
		current = current[segment];
	}
	return current;
};
var normalizeHandleSource = (value) => {
	if (value == null) return "";
	return String(value).replace(/\{[^}]*\}/g, " ").replace(/\s+/g, " ").trim();
};
/**
* Resolve dynamic reserved handles from other field values (e.g. a sibling field whose
* value would collide once slugified).
*/
var getDynamicReservedHandles = (values, reservedFieldValues = []) => {
	const dynamicHandles = [];
	reservedFieldValues.forEach((fieldPath) => {
		const value = getByPath(values, fieldPath);
		if (value && typeof value === "string") {
			const handleValue = generateHandle(normalizeHandleSource(value));
			if (handleValue) dynamicHandles.push(handleValue);
		}
	});
	return dynamicHandles;
};
var truncateHandle = (handle, maxLength) => {
	if (!Number.isFinite(maxLength)) return handle;
	const length = Math.max(Number(maxLength), 0);
	return handle.slice(0, length);
};
var findUniqueHandleWithinMaxLength = (baseHandle, reservedHandles = [], maxLength) => {
	if (!baseHandle) return "";
	if (!Number.isFinite(maxLength)) return findUniqueHandle(baseHandle, reservedHandles);
	const normalizedReserved = new Set((reservedHandles || []).map((handle) => {
		return String(handle || "").toLowerCase();
	}));
	const truncatedBase = truncateHandle(baseHandle, maxLength);
	if (!truncatedBase) return "";
	if (!normalizedReserved.has(truncatedBase.toLowerCase())) return truncatedBase;
	let suffix = 1;
	while (suffix < 1e4) {
		const suffixText = String(suffix);
		const baseMaxLength = Math.max(Number(maxLength) - suffixText.length, 0);
		const truncatedWithSuffix = `${truncatedBase.slice(0, baseMaxLength)}${suffixText}`;
		if (!normalizedReserved.has(truncatedWithSuffix.toLowerCase())) return truncatedWithSuffix;
		suffix += 1;
	}
	return truncatedBase;
};
/**
* Generate a unique handle from a human-readable source value, honouring reserved handles
* (static + dynamically derived from other field values) and an optional max length.
*/
var buildUniqueHandleFromSource = ({ sourceValue, values = {}, reservedHandles = [], reservedFieldValues = [], maxLength }) => {
	const baseHandle = generateHandle(normalizeHandleSource(sourceValue));
	const dynamicHandles = getDynamicReservedHandles(values, reservedFieldValues);
	return findUniqueHandleWithinMaxLength(baseHandle, [...reservedHandles, ...dynamicHandles], maxLength);
};
//#endregion
export { buildUniqueHandleFromSource, getDynamicReservedHandles };

//# sourceMappingURL=handle.js.map