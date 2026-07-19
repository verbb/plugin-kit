import { Combobox } from "./Combobox.js";
import { Option } from "./Select.js";
import { forwardRef, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/ComboboxInput.tsx
var toStringValue = (value) => {
	return value === void 0 || value === null ? "" : String(value);
};
/**
* Convenience facade over `<pk-combobox>` mirroring the `plugin-kit-react` `ComboboxInput`
* contract: `options[]` (or `fetchOptions` for async search), controlled `value`/`onValueChange`,
* and `multiple`. Unlike the base-ui version, `pk-combobox` owns async fetching, filtering, chips,
* and empty/loading states internally — this wrapper just maps props/values.
*
* `pk-combobox` is string-valued, so values are stringified for the element and mapped back to
* their original option value on change.
*/
var ComboboxInput = forwardRef(function ComboboxInput({ options, fetchOptions, value = null, onValueChange, multiple = false, disabled = false, placeholder = "", emptyMessage = "No options found.", loadingMessage = "Searching…", startTypingMessage = "Start typing to search…", showClear = false, isInvalid, size, width, allowCreate, onCreate, onOpenChange, name, id, "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, "aria-errormessage": ariaErrorMessage, "aria-labelledby": ariaLabelledBy }, ref) {
	const usesAsync = Boolean(fetchOptions) && !options?.length;
	const flatOptions = useMemo(() => {
		return options ?? [];
	}, [options]);
	const mapBack = (raw) => {
		const match = flatOptions.find((option) => {
			return toStringValue(option.value) === toStringValue(raw);
		});
		return match ? match.value : raw;
	};
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
		const raw = event.detail?.value;
		if (multiple) {
			onValueChange((Array.isArray(raw) ? raw : raw ? [raw] : []).map((entry) => {
				return mapBack(entry);
			}));
			return;
		}
		const single = Array.isArray(raw) ? raw[0] : raw;
		onValueChange(single ? mapBack(single) : null);
	};
	const valueProps = multiple ? { values: (Array.isArray(value) ? value : []).map((entry) => {
		return toStringValue(entry);
	}) } : { value: toStringValue(value) };
	return /* @__PURE__ */ jsx(Combobox, {
		ref,
		multiple,
		disabled,
		placeholder,
		emptyMessage,
		loadingMessage,
		startTypingMessage,
		clearable: showClear,
		invalid: isInvalid,
		size,
		width,
		allowCreate,
		async: usesAsync,
		fetchOptions: adaptedFetch,
		name,
		id,
		onPkChange: handleChange,
		onPkCreate: onCreate ? (event) => {
			return onCreate(event.detail?.query ?? "");
		} : void 0,
		onPkOpenChange: onOpenChange ? (event) => {
			return onOpenChange(Boolean(event.detail?.open));
		} : void 0,
		"aria-label": ariaLabel,
		"aria-describedby": ariaDescribedBy,
		"aria-errormessage": ariaErrorMessage,
		"aria-labelledby": ariaLabelledBy,
		...valueProps,
		children: !usesAsync && flatOptions.map((option) => {
			return /* @__PURE__ */ jsx(Option, {
				value: toStringValue(option.value),
				disabled: option.disabled,
				children: option.label
			}, toStringValue(option.value));
		})
	});
});
//#endregion
export { ComboboxInput };

//# sourceMappingURL=ComboboxInput.js.map