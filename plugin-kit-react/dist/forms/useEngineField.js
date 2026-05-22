import { useSyncExternalStore } from "react";
//#region src/forms/useEngineField.ts
var EMPTY_ERRORS = [];
var useEngineField = (form, name) => {
	const value = useSyncExternalStore(form.store.subscribe.bind(form.store), () => {
		return form.getFieldValue(name);
	}, () => {
		return form.getFieldValue(name);
	});
	const errors = useSyncExternalStore(form.store.subscribe.bind(form.store), () => {
		return form.getErrorMapFields()[name] || EMPTY_ERRORS;
	}, () => {
		return form.getErrorMapFields()[name] || EMPTY_ERRORS;
	});
	const setValue = (nextValue) => {
		form.setFieldValue(name, nextValue);
	};
	const setTouched = () => {
		form.store.setTouched(name, true);
	};
	return {
		value,
		errors,
		isInvalid: errors.length > 0,
		setValue,
		setTouched
	};
};
//#endregion
export { useEngineField };

//# sourceMappingURL=useEngineField.js.map