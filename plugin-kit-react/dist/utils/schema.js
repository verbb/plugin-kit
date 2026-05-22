import { __toESM } from "../_virtual/_rolldown/runtime.js";
import { require_Jexl } from "../node_modules/jexl/dist/Jexl.js";
//#region src/utils/schema.ts
var import_Jexl = /* @__PURE__ */ __toESM(require_Jexl(), 1);
var Jexl = "default" in import_Jexl ? import_Jexl.default : import_Jexl;
var warnedConditions = /* @__PURE__ */ new Set();
var evaluateCondition = (condition, data) => {
	if (!condition) return true;
	try {
		return Jexl.evalSync(condition, data);
	} catch (error) {
		if (typeof condition === "string" && !warnedConditions.has(condition)) {
			warnedConditions.add(condition);
			console.warn("Condition evaluation error:", error, "Condition:", condition, "Data:", data);
		}
		return false;
	}
};
var traverseSchema = (node, visitor) => {
	if (Array.isArray(node)) node.forEach((child) => {
		return traverseSchema(child, visitor);
	});
	else if (node && typeof node === "object") {
		visitor(node);
		if (node.$field === "list") return;
		Object.values(node).forEach((value) => {
			if (value && (typeof value === "object" || Array.isArray(value))) traverseSchema(value, visitor);
		});
	}
};
var extractFields = (nodes) => {
	const fields = [];
	traverseSchema(nodes, (node) => {
		if (node.$field) fields.push(node);
	});
	return fields;
};
var extractFieldNames = (content) => {
	return extractFields(content).map((field) => {
		return field.name;
	}).filter((name) => {
		return typeof name === "string";
	});
};
var normalizeAttrs = (attrs = {}) => {
	const normalized = { ...attrs };
	if (typeof normalized.class === "string") {
		normalized.className = normalized.class;
		delete normalized.class;
	}
	return normalized;
};
//#endregion
export { evaluateCondition, extractFieldNames, extractFields, normalizeAttrs, traverseSchema };

//# sourceMappingURL=schema.js.map