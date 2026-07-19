import { Status } from "./Status.js";
import { Option, OptionGroup, Select } from "./Select.js";
import { forwardRef, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/SelectInput.tsx
var isGroup = (option) => {
	return typeof option === "object" && option !== null && "group" in option;
};
var toStringValue = (value) => {
	return value === void 0 || value === null ? "" : String(value);
};
/**
* Convenience facade over `<pk-select>` matching the `plugin-kit-react` `SelectInput`
* ergonomics: an `options[]` array plus controlled `value`/`onChange`, instead of the
* slotted `<pk-option>` children the raw `Select` facade exposes.
*
* `pk-select` is string-valued, so option values are stringified for the element and
* mapped back to their original value on change.
*/
var SelectInput = forwardRef(function SelectInput({ options, value, onChange, placeholder, disabled, isInvalid, clearable, size, width, name, id, onBlur, "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, "aria-errormessage": ariaErrorMessage, "aria-labelledby": ariaLabelledBy }, ref) {
	const flatOptions = useMemo(() => {
		return options.flatMap((option) => {
			return isGroup(option) ? option.options : [option];
		});
	}, [options]);
	const handleChange = (event) => {
		if (!onChange) return;
		const detail = event.detail;
		const raw = Array.isArray(detail?.value) ? detail?.value[0] : detail?.value;
		const match = flatOptions.find((option) => {
			return toStringValue(option.value) === toStringValue(raw);
		});
		onChange(match ? match.value : raw ?? "");
	};
	const renderOption = (option) => {
		return /* @__PURE__ */ jsxs(Option, {
			value: toStringValue(option.value),
			disabled: option.disabled,
			children: [option.status ? /* @__PURE__ */ jsx(Status, {
				slot: "start",
				status: option.status
			}) : null, option.label]
		}, toStringValue(option.value));
	};
	return /* @__PURE__ */ jsx(Select, {
		ref,
		value: toStringValue(value),
		placeholder,
		disabled,
		invalid: isInvalid,
		clearable,
		size,
		width,
		name,
		id,
		onPkChange: handleChange,
		onFocusOut: onBlur,
		"aria-label": ariaLabel,
		"aria-describedby": ariaDescribedBy,
		"aria-errormessage": ariaErrorMessage,
		"aria-labelledby": ariaLabelledBy,
		children: options.map((option) => {
			return isGroup(option) ? /* @__PURE__ */ jsx(OptionGroup, {
				label: option.group,
				children: option.options.map(renderOption)
			}, option.group) : renderOption(option);
		})
	});
});
//#endregion
export { SelectInput };

//# sourceMappingURL=SelectInput.js.map