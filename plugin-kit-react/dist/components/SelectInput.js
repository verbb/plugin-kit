import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./Select.js";
import { Status } from "./Status.js";
import "./index.js";
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/SelectInput.tsx
var SelectInput = forwardRef(({ options, placeholder, size, onChange, value, triggerClassName, contentClassName, alignItemWithTrigger = false, isInvalid, id, modal = true, "aria-invalid": ariaInvalid, "aria-describedby": ariaDescribedBy, "aria-errormessage": ariaErrorMessage, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...selectProps }, ref) => {
	const handleValueChange = (nextValue) => {
		if (onChange) onChange(nextValue);
	};
	const hasGroup = (option) => {
		return typeof option === "object" && option !== null && "group" in option;
	};
	const groupedOptions = options.map((option, index) => {
		if (hasGroup(option)) return option;
		return {
			group: null,
			options: [option],
			_key: `ungrouped-${index}`
		};
	});
	const flatOptions = options.flatMap((option) => {
		if (hasGroup(option)) return option.options;
		return [option];
	});
	const selectedOption = flatOptions.find((option) => {
		return String(option.value) === String(value);
	});
	const resolvedPlaceholder = placeholder || "";
	const resolvedIsInvalid = Boolean(isInvalid || ariaInvalid === true || ariaInvalid === "true");
	return /* @__PURE__ */ jsxs(Select, {
		value,
		onValueChange: handleValueChange,
		size,
		items: flatOptions,
		modal,
		...selectProps,
		children: [/* @__PURE__ */ jsxs(SelectTrigger, {
			ref,
			id,
			"aria-invalid": resolvedIsInvalid,
			"aria-describedby": ariaDescribedBy,
			"aria-errormessage": ariaErrorMessage,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
			className: cn(selectedOption?.status && "relative [&_[data-slot=select-value]]:pl-5", "[&_[data-slot=select-value]]:overflow-hidden [&_[data-slot=select-value]>span]:block [&_[data-slot=select-value]>span]:min-w-0 [&_[data-slot=select-value]>span]:max-w-full [&_[data-slot=select-value]>span]:truncate", triggerClassName),
			children: [selectedOption?.status && /* @__PURE__ */ jsx(Status, {
				status: selectedOption.status,
				className: "absolute left-2.5 top-1/2 -translate-y-1/2"
			}), /* @__PURE__ */ jsx(SelectValue, {
				placeholder,
				children: selectedOption ? /* @__PURE__ */ jsx("span", {
					className: "block min-w-0 max-w-full truncate",
					title: selectedOption.label,
					children: selectedOption.label
				}) : /* @__PURE__ */ jsx("span", {
					className: "block min-w-0 max-w-full truncate text-slate-500",
					title: resolvedPlaceholder,
					children: resolvedPlaceholder
				})
			})]
		}), options?.length > 0 && /* @__PURE__ */ jsx(SelectContent, {
			className: contentClassName,
			alignItemWithTrigger,
			children: groupedOptions.map((group) => {
				return /* @__PURE__ */ jsxs(SelectGroup, { children: [group.group && /* @__PURE__ */ jsx(SelectLabel, { children: group.group }), group.options?.map((option) => {
					return /* @__PURE__ */ jsxs(SelectItem, {
						value: option.value,
						disabled: option.disabled,
						children: [option.status && /* @__PURE__ */ jsx(Status, { status: option.status }), /* @__PURE__ */ jsx("span", {
							className: "block min-w-0 flex-1 truncate",
							title: option.label,
							children: option.label
						})]
					}, String(option.value));
				})] }, group.group ?? group._key);
			})
		})]
	});
});
var SelectInput_default = Select;
//#endregion
export { SelectInput, SelectInput_default as default };

//# sourceMappingURL=SelectInput.js.map