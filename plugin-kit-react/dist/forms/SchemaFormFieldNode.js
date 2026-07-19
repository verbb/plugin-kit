import { cacheLoadedBuiltinFormField, getRegisteredFormField } from "./registry.js";
import { isBuiltinFormFieldType, loadBuiltinFormField } from "./builtin-field-loaders.js";
import { createElement, memo, useEffect, useState } from "react";
//#region src/forms/SchemaFormFieldNode.tsx
var SchemaFormFieldNode = memo(({ fieldType, schema, field, form, children }) => {
	const registeredField = getRegisteredFormField(fieldType);
	const [Component, setComponent] = useState(() => registeredField ?? null);
	const [loadFailed, setLoadFailed] = useState(false);
	useEffect(() => {
		if (registeredField) {
			setComponent(() => registeredField);
			setLoadFailed(false);
			return;
		}
		if (!isBuiltinFormFieldType(fieldType)) {
			console.warn(`Unknown form field type: ${fieldType}`);
			setComponent(null);
			setLoadFailed(true);
			return;
		}
		let cancelled = false;
		setLoadFailed(false);
		loadBuiltinFormField(fieldType).then((loaded) => {
			if (cancelled || !loaded) return;
			cacheLoadedBuiltinFormField(fieldType, loaded);
			setComponent(() => loaded);
		}).catch((error) => {
			if (cancelled) return;
			console.error(`Failed to load form field "${fieldType}":`, error);
			setComponent(null);
			setLoadFailed(true);
		});
		return () => {
			cancelled = true;
		};
	}, [fieldType, registeredField]);
	if (loadFailed || !Component) return null;
	return createElement(Component, {
		schema,
		field,
		form
	}, children);
});
SchemaFormFieldNode.displayName = "SchemaFormFieldNode";
//#endregion
export { SchemaFormFieldNode };

//# sourceMappingURL=SchemaFormFieldNode.js.map