import { getSchemaFieldNames } from "./schemaFieldNames.js";
//#region src/utils/schemaIndex.ts
var hasErrorValue = (value) => {
	if (Array.isArray(value)) return value.length > 0;
	if (!value) return false;
	if (typeof value === "object") {
		const entry = value;
		if (Array.isArray(entry.errors)) return entry.errors.length > 0;
	}
	return Boolean(value);
};
var createSchemaFieldIndex = (node) => {
	const fieldNames = getSchemaFieldNames(node);
	const fieldNameSet = new Set(fieldNames);
	return {
		fieldNames,
		hasField: (fieldName) => {
			return fieldNameSet.has(fieldName);
		}
	};
};
var hasSchemaErrors = (errors, node) => {
	if (!errors || !node) return false;
	return getSchemaFieldNames(node).some((fieldName) => {
		return hasErrorValue(errors[fieldName]);
	});
};
//#endregion
export { createSchemaFieldIndex, hasSchemaErrors };

//# sourceMappingURL=schemaIndex.js.map