import { cn } from "../../utils/classes.js";
import { evaluateCondition } from "../../utils/schema.js";
import "../../utils/index.js";
import { RadioGroup, RadioGroupItem } from "../../components/RadioGroup.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/forms/fields/RadioGroupField.tsx
var RadioGroupField = ({ form, field }) => {
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
	const currentValueKey = value === void 0 || value === null ? void 0 : String(value);
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
		children: /* @__PURE__ */ jsx(RadioGroup, {
			name: field.name,
			value: currentValueKey,
			onValueChange: (nextValue) => {
				const matchedOption = filteredOptions.find((option) => {
					return String(option?.value) === nextValue;
				});
				setValue(matchedOption ? matchedOption.value : nextValue);
				setTouched();
			},
			"aria-invalid": isInvalid,
			disabled: field.disabled,
			className: "gap-3",
			children: filteredOptions.map((option, index) => {
				const optionId = `${field.name}-${index}`;
				const optionValue = String(option.value);
				const hasDescription = Boolean(option.description);
				const optionDisabled = field.disabled || option.disabled;
				return /* @__PURE__ */ jsxs("label", {
					htmlFor: optionId,
					className: cn("flex gap-2 text-sm", hasDescription ? "items-start" : "items-center", optionDisabled && "cursor-not-allowed opacity-60"),
					children: [/* @__PURE__ */ jsx(RadioGroupItem, {
						id: optionId,
						value: optionValue,
						disabled: optionDisabled,
						"aria-invalid": isInvalid,
						className: hasDescription ? "mt-0.5" : void 0
					}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
						className: "font-medium text-slate-950",
						children: option.label
					}), hasDescription && /* @__PURE__ */ jsx("span", {
						className: "block text-gray-500",
						children: option.description
					})] })]
				}, optionId);
			})
		})
	});
};
//#endregion
export { RadioGroupField };

//# sourceMappingURL=RadioGroupField.js.map