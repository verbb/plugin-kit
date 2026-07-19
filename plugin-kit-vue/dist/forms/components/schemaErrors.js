//#region src/forms/components/schemaErrors.ts
var isRecord = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
var collectSchemaFieldNames = (schema) => {
	const names = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (typeof node === "string") return;
		if (Array.isArray(node)) {
			node.forEach(walk);
			return;
		}
		if (!isRecord(node)) return;
		const schemaNode = node;
		if (schemaNode.$field && typeof schemaNode.name === "string" && schemaNode.name) names.add(schemaNode.name);
		if (schemaNode.children) walk(schemaNode.children);
		if (schemaNode.schema) walk(schemaNode.schema);
	};
	walk(schema);
	return names;
};
var schemaSubtreeHasErrors = (errors, schema) => {
	const fieldNames = collectSchemaFieldNames(schema);
	return Array.from(fieldNames).some((fieldName) => {
		if (Array.isArray(errors[fieldName]) && errors[fieldName].length > 0) return true;
		return Object.keys(errors).some((errorPath) => {
			return errorPath.startsWith(`${fieldName}.`);
		});
	});
};
//#endregion
export { collectSchemaFieldNames, schemaSubtreeHasErrors };

//# sourceMappingURL=schemaErrors.js.map