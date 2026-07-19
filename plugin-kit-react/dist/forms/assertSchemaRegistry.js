import { getFormComponentRegistry, getFormFieldRegistry } from "./registry.js";
import { isBuiltinFormFieldType } from "./builtin-field-loaders.js";
//#region src/forms/assertSchemaRegistry.ts
var isRecord = (value) => {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};
var walkSchema = (schema, path, visit) => {
	if (typeof schema === "string") return;
	if (Array.isArray(schema)) {
		schema.forEach((item, index) => {
			if (typeof item === "string" || !isRecord(item)) return;
			const itemPath = `${path}[${index}]`;
			visit(item, itemPath);
			walkSchema(item, itemPath, visit);
		});
		return;
	}
	if (!isRecord(schema)) return;
	const node = schema;
	visit(node, path);
	if (node.children) walkSchema(node.children, `${path}.children`, visit);
	if (node.schema) walkSchema(node.schema, `${path}.schema`, visit);
};
/**
* Walk a SchemaForm tree and verify every `$field` / `$cmp` key is registered.
* Use in dev/test bootstraps for large plugins (Formie-scale) before shipping CP screens.
*/
var assertSchemaRegistry = (schema, options = {}) => {
	const { failFast = false } = options;
	const fieldRegistry = getFormFieldRegistry();
	const componentRegistry = getFormComponentRegistry();
	const issues = [];
	walkSchema(schema, "schema", (node, nodePath) => {
		if (node.$field) {
			const key = String(node.$field);
			if (!fieldRegistry[key] && !isBuiltinFormFieldType(key)) {
				const issue = {
					path: nodePath,
					kind: "field",
					key
				};
				issues.push(issue);
				if (failFast) throw new Error(`SchemaForm: unregistered field "${key}" at ${nodePath}`);
			}
		}
		if (node.$cmp) {
			const key = String(node.$cmp);
			if (!componentRegistry[key]) {
				const issue = {
					path: nodePath,
					kind: "component",
					key
				};
				issues.push(issue);
				if (failFast) throw new Error(`SchemaForm: unregistered component "${key}" at ${nodePath}`);
			}
		}
	});
	return issues;
};
/** Dev helper: log registry gaps for a schema index root tree. */
var debugSchemaRegistry = (schemaIndex, options) => {
	if (!schemaIndex?.schema) return [];
	const issues = assertSchemaRegistry(schemaIndex.schema, options);
	if (issues.length) console.warn("[plugin-kit] SchemaForm registry gaps:", issues);
	return issues;
};
//#endregion
export { assertSchemaRegistry, debugSchemaRegistry };

//# sourceMappingURL=assertSchemaRegistry.js.map