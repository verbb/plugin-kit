import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { CheckboxInput } from "./CheckboxInput.js";
import { useCallback, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/CheckboxSelect.tsx
var ALL_VALUE = "*";
function CheckboxSelect({ options, value = [], onChange, showAllOption = false, allLabel = "All", disabled = false, className }) {
	const isAllSelected = value === "*";
	const selectedArray = useMemo(() => {
		if (isAllSelected) return options.map((option) => {
			return option.value;
		});
		if (Array.isArray(value)) return value;
		return [];
	}, [
		isAllSelected,
		options,
		value
	]);
	const handleAllChange = useCallback((checked) => {
		onChange?.(checked === true ? "*" : []);
	}, [onChange]);
	const handleItemChange = useCallback((optionValue, checked) => {
		if (isAllSelected) return;
		const next = checked ? [...selectedArray, optionValue] : selectedArray.filter((v) => {
			return v !== optionValue;
		});
		onChange?.(next);
	}, [
		isAllSelected,
		selectedArray,
		onChange
	]);
	return /* @__PURE__ */ jsxs("fieldset", {
		className: cn("space-y-1", className),
		disabled,
		children: [showAllOption && /* @__PURE__ */ jsx(CheckboxInput, {
			label: allLabel,
			labelClassName: "font-bold",
			className: "items-start gap-1.5",
			checked: isAllSelected,
			onCheckedChange: handleAllChange,
			disabled
		}), options.map((option) => {
			const isChecked = isAllSelected || selectedArray.includes(option.value);
			const isItemDisabled = isAllSelected;
			return /* @__PURE__ */ jsx(CheckboxInput, {
				label: option.label,
				className: "items-start gap-1.5",
				checked: isChecked,
				onCheckedChange: (checked) => {
					return handleItemChange(option.value, checked === true);
				},
				disabled: disabled || isItemDisabled
			}, option.value);
		})]
	});
}
//#endregion
export { ALL_VALUE, CheckboxSelect };

//# sourceMappingURL=CheckboxSelect.js.map