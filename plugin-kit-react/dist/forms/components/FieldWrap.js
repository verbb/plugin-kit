import { FieldLayout } from "../Field.js";
import { useSchemaEngineContext } from "../engine/context.js";
import { collectSchemaFieldNames } from "./schemaErrors.js";
import { useMemo, useSyncExternalStore } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/forms/components/FieldWrap.tsx
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
/**
* Schema `$cmp: 'FieldWrap'` — labels a horizontal cluster of nested fields and
* surfaces grouped nested errors on the wrapper (kit v1 FieldWrap contract).
*/
var FieldWrap = Object.assign(({ name, label, instructions, required, warning, children, schemaNode }) => {
	const form = useSchemaEngineContext();
	const fieldName = name || label || "field";
	const nestedFieldNames = useMemo(() => {
		return Array.from(collectSchemaFieldNames(schemaNode?.children || []));
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
		children: /* @__PURE__ */ jsx("div", {
			"data-pk-field-wrap-controls": "",
			style: {
				display: "flex",
				alignItems: "center",
				flexDirection: "row",
				flexWrap: "wrap",
				gap: "0.5rem"
			},
			children
		})
	});
}, { usesSchemaNode: true });
//#endregion
export { FieldWrap };

//# sourceMappingURL=FieldWrap.js.map