import { extractFieldNames } from "./schema.js";
//#region src/utils/schemaFieldNames.ts
var fieldNamesCache = /* @__PURE__ */ new WeakMap();
var getSchemaFieldNames = (node) => {
	if (!node || typeof node !== "object" && !Array.isArray(node)) return [];
	const key = node;
	const cached = fieldNamesCache.get(key);
	if (cached) return cached;
	const fieldNames = extractFieldNames(node);
	fieldNamesCache.set(key, fieldNames);
	return fieldNames;
};
//#endregion
export { getSchemaFieldNames };

//# sourceMappingURL=schemaFieldNames.js.map