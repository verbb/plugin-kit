//#region src/forms/components/schemaErrors.ts
var hasErrorValue = (value) => {
	if (Array.isArray(value)) return value.length > 0;
	if (!value) return false;
	if (typeof value === "object") {
		const entry = value;
		if (Array.isArray(entry.errors)) return entry.errors.length > 0;
	}
	return Boolean(value);
};
/** Collect `$field` names under a schema subtree for tab/wrapper error chrome. */
var collectSchemaFieldNames = (schema, names = /* @__PURE__ */ new Set()) => {
	if (Array.isArray(schema)) {
		schema.forEach((entry) => {
			collectSchemaFieldNames(entry, names);
		});
		return names;
	}
	if (!schema || typeof schema !== "object") return names;
	const node = schema;
	if (node.$field && typeof node.name === "string" && node.name) names.add(node.name);
	if (node.children) collectSchemaFieldNames(node.children, names);
	if (node.schema) collectSchemaFieldNames(node.schema, names);
	return names;
};
var schemaSubtreeHasErrors = (errors, schema) => {
	if (!errors || !schema) return false;
	const fieldNames = collectSchemaFieldNames(schema);
	return Array.from(fieldNames).some((fieldName) => hasErrorValue(errors[fieldName]));
};
//#endregion
export { collectSchemaFieldNames, schemaSubtreeHasErrors };

//# sourceMappingURL=schemaErrors.js.map