//#region src/forms/engine/SchemaIndex.ts
var normalizeSchema = (items, path = "root") => {
	if (Array.isArray(items)) return items.map((item, index) => {
		return normalizeSchema(item, `${path}.${index}`);
	});
	if (!items || typeof items !== "object") return items;
	const itemWithId = { ...items };
	const itemPath = path || "root";
	if (!itemWithId._id) itemWithId._id = `schema_${itemPath}`;
	if (Array.isArray(itemWithId.children)) itemWithId.children = itemWithId.children.map((child, index) => {
		return normalizeSchema(child, `${itemPath}.children.${index}`);
	});
	if (Array.isArray(itemWithId.schema)) itemWithId.schema = itemWithId.schema.map((child, index) => {
		return normalizeSchema(child, `${itemPath}.schema.${index}`);
	});
	return itemWithId;
};
//#endregion
export { normalizeSchema };

//# sourceMappingURL=SchemaIndex.js.map