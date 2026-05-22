//#region src/utils/schemaNormalize.ts
var normalizeSchemaNode = (node) => {
	if (Array.isArray(node)) return node.map(normalizeSchemaNode);
	if (!node || typeof node !== "object") return node;
	const next = { ...node };
	if (next.children) {
		next.children = (Array.isArray(next.children) ? next.children : [next.children]).map(normalizeSchemaNode);
		if (!next.schema && (next.$el || next.$cmp || next.$field)) next.schema = next.children;
	}
	if (next.schema) next.schema = (Array.isArray(next.schema) ? next.schema : [next.schema]).map(normalizeSchemaNode);
	if ((next.$field === "list" || next.$field === "table") && next.name && next.schema && !next.schemaChildPrefix) next.schemaChildPrefix = `${next.name}.*.`;
	return next;
};
//#endregion
export { normalizeSchemaNode };

//# sourceMappingURL=schemaNormalize.js.map