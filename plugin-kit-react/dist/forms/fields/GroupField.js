import { FieldLayout } from "../Field.js";
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/GroupField.tsx
var prefixGroupSchema = (schema, prefix, scopePath) => {
	if (Array.isArray(schema)) return schema.map((item) => {
		return prefixGroupSchema(item, prefix, scopePath);
	});
	if (!schema || typeof schema !== "object") return schema;
	const nextSchema = { ...schema };
	if (typeof scopePath === "string" && scopePath && !nextSchema._scopePath) nextSchema._scopePath = scopePath;
	if (typeof nextSchema.name === "string" && nextSchema.name && nextSchema.$field) nextSchema.name = `${prefix}${nextSchema.name}`;
	if (nextSchema.$field !== "group") {
		if (Array.isArray(nextSchema.schema)) nextSchema.schema = prefixGroupSchema(nextSchema.schema, prefix, scopePath);
		if (Array.isArray(nextSchema.children)) nextSchema.children = prefixGroupSchema(nextSchema.children, prefix, scopePath);
	}
	return nextSchema;
};
var GroupField = ({ form, field, children }) => {
	const Renderer = form?.SchemaRenderer;
	const prefix = field.name ? `${field.name}.` : "";
	const scopedSchema = useMemo(() => {
		const schema = field.schema ?? field.children ?? children ?? [];
		if (!prefix) return schema;
		return prefixGroupSchema(schema, prefix, field.name || "");
	}, [
		children,
		field.children,
		field.name,
		field.schema,
		prefix
	]);
	if (!Renderer) return null;
	const errors = field.name ? form?.getGroupedErrorsForPath?.(field.name) ?? form?.getErrorMapFields?.()[field.name] ?? [] : [];
	if (field.label || field.instructions || field.warning) return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name || "group",
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(Renderer, { schema: scopedSchema })
	});
	return /* @__PURE__ */ jsx(Renderer, { schema: scopedSchema });
};
//#endregion
export { GroupField };

//# sourceMappingURL=GroupField.js.map