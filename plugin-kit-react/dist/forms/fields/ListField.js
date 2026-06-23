import { FieldLayout } from "../Field.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/ListField.tsx
var ListField = ({ form, field }) => {
	const Renderer = form?.SchemaRenderer;
	const errors = field.showGroupedErrors !== false ? form?.getGroupedErrorsForPath?.(field.name) ?? form?.getErrorMapFields?.()[field.name] ?? [] : [];
	if (!Renderer) return null;
	const items = Array.isArray(form.getFieldValue(field.name)) ? form.getFieldValue(field.name) : [];
	const itemSchema = field.schema;
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		withControl: false,
		className: field.className,
		children: items.map((item, index) => {
			const modifyChildren = (children) => {
				let normalizedChildren = [];
				if (Array.isArray(children)) normalizedChildren = children;
				else if (children) normalizedChildren = [children];
				return normalizedChildren.map((child) => {
					if (!child || typeof child !== "object" || Array.isArray(child)) return child;
					const childNode = child;
					const resolvedChildren = Boolean(childNode.children) && typeof childNode.children === "object" ? modifyChildren(childNode.children) : childNode.children;
					const childWithContext = {
						...childNode,
						_data: {
							$item: item,
							$key: index
						},
						children: resolvedChildren
					};
					if (childNode.$field && typeof childNode.name === "string") return {
						...childWithContext,
						name: `${field.name}.${index}.${childNode.name}`
					};
					return childWithContext;
				});
			};
			const modifiedChildren = modifyChildren(itemSchema);
			const key = item?._uid || item?.id || `${field.name}-${index}`;
			return /* @__PURE__ */ jsx(Renderer, { schema: modifiedChildren }, key);
		})
	});
};
//#endregion
export { ListField };

//# sourceMappingURL=ListField.js.map