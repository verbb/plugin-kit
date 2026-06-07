import { evaluateCondition } from "../../utils/schema.js";
import { SelectInput } from "../../components/SelectInput.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/SelectField.tsx
var SelectField = ({ form, field }) => {
	const { value, setValue, setTouched, errors, isInvalid } = useEngineField(form, field.name);
	const values = useSyncExternalStore(form.store.subscribe.bind(form.store), () => {
		return form.store.state.values;
	}, () => {
		return form.store.state.values;
	});
	const conditionData = useMemo(() => {
		const scopePath = typeof field._scopePath === "string" ? field._scopePath : "";
		const scopedValues = scopePath ? form?.getFieldValue?.(scopePath) : null;
		const scopedObject = scopedValues && typeof scopedValues === "object" ? scopedValues : {};
		const fieldData = field._data && typeof field._data === "object" ? field._data : {};
		return {
			...values || {},
			...scopedObject,
			...fieldData
		};
	}, [
		field,
		form,
		values
	]);
	const filteredOptions = useMemo(() => {
		return (Array.isArray(field.options) ? field.options : []).filter((option) => {
			if (!option?.if) return true;
			return evaluateCondition(option.if, conditionData);
		});
	}, [conditionData, field.options]);
	useEffect(() => {
		if (value === void 0 || value === null || value === "") return;
		if (filteredOptions.some((option) => {
			return String(option?.value) === String(value);
		})) return;
		const fallback = filteredOptions.find((option) => {
			return option?.value !== void 0 && option?.disabled !== true;
		});
		setValue(fallback ? fallback.value : "");
	}, [
		filteredOptions,
		setValue,
		value
	]);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(SelectInput, {
			options: filteredOptions,
			placeholder: field.placeholder,
			value: value ?? "",
			onChange: (nextValue) => {
				return setValue(nextValue);
			},
			isInvalid,
			onBlur: setTouched
		})
	});
};
//#endregion
export { SelectField };

//# sourceMappingURL=SelectField.js.map