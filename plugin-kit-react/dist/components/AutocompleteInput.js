import { Autocomplete } from "./Autocomplete.js";
import { Option } from "./Select.js";
import { forwardRef, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/AutocompleteInput.tsx
var toStringValue = (value) => {
	return value === void 0 || value === null ? "" : String(value);
};
/**
* Convenience facade over `<pk-autocomplete>` for schema / prop-driven options.
* Unlike ComboboxInput, the committed value is always freeform text — choosing a
* suggestion inserts that option’s value string into the field.
*/
var AutocompleteInput = forwardRef(function AutocompleteInput({ options, fetchOptions, value = "", onValueChange, disabled = false, placeholder = "", emptyMessage = "No options found.", loadingMessage = "Searching…", startTypingMessage = "Start typing to search…", showClear = false, isInvalid, size, width, onOpenChange, name, id, "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, "aria-errormessage": ariaErrorMessage, "aria-labelledby": ariaLabelledBy }, ref) {
	const usesAsync = Boolean(fetchOptions) && !options?.length;
	const flatOptions = useMemo(() => {
		return options ?? [];
	}, [options]);
	const adaptedFetch = useMemo(() => {
		if (!fetchOptions) return null;
		return async (query, signal) => {
			return (await fetchOptions(query, signal)).map((option) => {
				return {
					value: toStringValue(option.value),
					label: option.label
				};
			});
		};
	}, [fetchOptions]);
	const handleChange = (event) => {
		if (!onValueChange) return;
		const detail = event.detail;
		onValueChange(detail?.value ?? "");
	};
	return /* @__PURE__ */ jsx(Autocomplete, {
		ref,
		disabled,
		placeholder,
		emptyMessage,
		loadingMessage,
		startTypingMessage,
		clearable: showClear,
		invalid: isInvalid,
		size,
		width,
		async: usesAsync,
		fetchOptions: adaptedFetch,
		name,
		id,
		value: toStringValue(value),
		onPkChange: handleChange,
		onPkOpenChange: onOpenChange ? (event) => {
			return onOpenChange(Boolean(event.detail?.open));
		} : void 0,
		"aria-label": ariaLabel,
		"aria-describedby": ariaDescribedBy,
		"aria-errormessage": ariaErrorMessage,
		"aria-labelledby": ariaLabelledBy,
		children: !usesAsync && flatOptions.map((option) => {
			return /* @__PURE__ */ jsx(Option, {
				value: toStringValue(option.value),
				disabled: option.disabled,
				children: option.label
			}, toStringValue(option.value));
		})
	});
});
AutocompleteInput.displayName = "AutocompleteInput";
//#endregion
export { AutocompleteInput };

//# sourceMappingURL=AutocompleteInput.js.map