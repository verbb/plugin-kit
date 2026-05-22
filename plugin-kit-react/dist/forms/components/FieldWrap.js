import { FieldLayout, InlineFieldErrorVisibilityContext } from "../Field.js";
import { useSchemaEngineContext } from "../engine/context.js";
import { useMemo, useSyncExternalStore } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/forms/components/FieldWrap.tsx
var collectFieldNames = (schema, names) => {
	if (Array.isArray(schema)) {
		schema.forEach((entry) => {
			collectFieldNames(entry, names);
		});
		return;
	}
	if (!schema || typeof schema !== "object") return;
	if (schema.$field && typeof schema.name === "string" && schema.name) names.add(schema.name);
	if (Array.isArray(schema.children)) collectFieldNames(schema.children, names);
	if (Array.isArray(schema.schema)) collectFieldNames(schema.schema, names);
};
var ATTRIBUTE_MESSAGE_PATTERN = /^(.+?) (cannot be blank\.|must be .+)$/;
var formatWrapperMessage = (message, wrapperLabel) => {
	if (!wrapperLabel) return message;
	const match = String(message).match(ATTRIBUTE_MESSAGE_PATTERN);
	if (match) {
		const [, , suffix] = match;
		return `${wrapperLabel} ${suffix}`;
	}
	return `${wrapperLabel} ${message}`;
};
var FieldWrap = Object.assign(({ name, label, instructions, required, warning, children, schemaNode }) => {
	const form = useSchemaEngineContext();
	const fieldName = name || label || "field";
	const nestedFieldNames = useMemo(() => {
		const names = /* @__PURE__ */ new Set();
		collectFieldNames(schemaNode?.children || [], names);
		return Array.from(names);
	}, [schemaNode]);
	const errorMap = useSyncExternalStore(form.store.subscribe.bind(form.store), () => {
		return form.getErrorMapFields() || {};
	}, () => {
		return {};
	});
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: fieldName,
		label,
		instructions,
		required,
		warning,
		errors: useMemo(() => {
			if (name && typeof form?.getGroupedErrorsForPath === "function") return form.getGroupedErrorsForPath(name) || [];
			if (!nestedFieldNames.length) return [];
			const groupedErrors = [];
			nestedFieldNames.forEach((fieldPath) => {
				(errorMap[fieldPath] || []).forEach((message) => {
					groupedErrors.push(formatWrapperMessage(String(message), label || name || fieldName));
				});
				Object.entries(errorMap).forEach(([errorPath, messages]) => {
					if (!errorPath.startsWith(`${fieldPath}.`)) return;
					(messages || []).forEach((message) => {
						groupedErrors.push(formatWrapperMessage(String(message), label || name || fieldName));
					});
				});
			});
			return Array.from(new Set(groupedErrors));
		}, [
			errorMap,
			fieldName,
			form,
			label,
			name,
			nestedFieldNames
		]),
		withControl: false,
		children: /* @__PURE__ */ jsx(InlineFieldErrorVisibilityContext.Provider, {
			value: false,
			children: /* @__PURE__ */ jsx("div", {
				className: "flex items-center flex-row gap-2",
				children
			})
		})
	});
}, { usesSchemaNode: true });
//#endregion
export { FieldWrap };

//# sourceMappingURL=FieldWrap.js.map