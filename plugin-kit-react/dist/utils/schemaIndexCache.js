import { createSchemaFieldIndex } from "./schemaIndex.js";
//#region src/utils/schemaIndexCache.ts
var hasErrorValue = (value) => {
	if (Array.isArray(value)) return value.length > 0;
	if (!value) return false;
	if (typeof value === "object") {
		const entry = value;
		if (Array.isArray(entry.errors)) return entry.errors.length > 0;
	}
	return Boolean(value);
};
var indexCache = /* @__PURE__ */ new WeakMap();
var getSchemaFieldIndex = (node) => {
	if (!node || typeof node !== "object" && !Array.isArray(node)) return createSchemaFieldIndex([]);
	const key = node;
	const cached = indexCache.get(key);
	if (cached) return cached;
	const index = createSchemaFieldIndex(node);
	indexCache.set(key, index);
	return index;
};
var hasSchemaErrorsCached = (errors, node) => {
	if (!errors || !node) return false;
	const { fieldNames } = getSchemaFieldIndex(node);
	return fieldNames.some((fieldName) => {
		return hasErrorValue(errors[fieldName]);
	});
};
//#endregion
export { getSchemaFieldIndex, hasSchemaErrorsCached };

//# sourceMappingURL=schemaIndexCache.js.map