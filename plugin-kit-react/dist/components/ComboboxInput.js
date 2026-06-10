import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxHighlightedText, ComboboxItem, ComboboxList, ComboboxPrimitiveInput, ComboboxValue, useComboboxAnchor } from "./Combobox.js";
import { Spinner } from "./Spinner.js";
import "./index.js";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/ComboboxInput.tsx
var optionsCache = /* @__PURE__ */ new Map();
var toStringValue = (value) => {
	return String(value ?? "");
};
var OptionIcon = ({ icon }) => {
	if (!icon || typeof icon !== "string") return null;
	return /* @__PURE__ */ jsx("span", {
		className: "text-slate-500 [&_svg]:size-4 [&_svg]:shrink-0",
		"aria-hidden": "true",
		dangerouslySetInnerHTML: { __html: icon }
	});
};
var ComboboxInput = ({ options, fetchOptions, value = null, onValueChange, multiple = false, disabled = false, placeholder = "Select an option", emptyMessage = "No options found.", className, contentClassName, withLoadingIndicator = true, showClear = true, open, defaultOpen, onOpenChange, onInputValueChange, cacheKey, cacheTtlMs = 300 * 1e3, disableCache = false }) => {
	const [fetchedOptions, setFetchedOptions] = useState(null);
	const [loading, setLoading] = useState(false);
	const [internalOpen, setInternalOpen] = useState(Boolean(defaultOpen));
	const [searchValue, setSearchValue] = useState("");
	const hasLoadedRef = useRef(false);
	const anchor = useComboboxAnchor();
	const isMultiple = multiple;
	const isOpen = open ?? internalOpen;
	const resolvedOptions = useMemo(() => {
		return fetchedOptions ?? options ?? [];
	}, [fetchedOptions, options]);
	const resolveCachedOptions = useCallback(() => {
		if (disableCache || !cacheKey) return null;
		const cached = optionsCache.get(cacheKey);
		if (!cached) return null;
		if (cached.expiresAt <= Date.now()) {
			optionsCache.delete(cacheKey);
			return null;
		}
		return cached.options;
	}, [cacheKey, disableCache]);
	const persistCachedOptions = useCallback((nextOptions) => {
		if (disableCache || !cacheKey) return;
		optionsCache.set(cacheKey, {
			options: nextOptions,
			expiresAt: Date.now() + cacheTtlMs
		});
	}, [
		cacheKey,
		cacheTtlMs,
		disableCache
	]);
	useEffect(() => {
		if (!fetchOptions || !isOpen) return;
		const cachedOptions = resolveCachedOptions();
		if (cachedOptions) {
			setFetchedOptions(cachedOptions);
			hasLoadedRef.current = true;
			return;
		}
		if (hasLoadedRef.current && fetchedOptions) return;
		let isMounted = true;
		const loadOptions = async () => {
			setLoading(true);
			try {
				const fetchedOptions = await fetchOptions();
				if (isMounted) {
					setFetchedOptions(fetchedOptions);
					persistCachedOptions(fetchedOptions);
					hasLoadedRef.current = true;
				}
			} catch (error) {
				console.error("Failed to load combobox options:", error);
			} finally {
				if (isMounted) setLoading(false);
			}
		};
		loadOptions();
		return () => {
			isMounted = false;
		};
	}, [
		fetchOptions,
		fetchedOptions,
		isOpen,
		persistCachedOptions,
		resolveCachedOptions
	]);
	const selectedValue = useMemo(() => {
		if (isMultiple) {
			const selectedValues = Array.isArray(value) ? new Set(value.map((item) => {
				return toStringValue(item);
			})) : /* @__PURE__ */ new Set();
			return resolvedOptions.filter((option) => {
				return selectedValues.has(toStringValue(option.value));
			});
		}
		return resolvedOptions.find((option) => {
			return toStringValue(option.value) === toStringValue(value);
		}) ?? null;
	}, [
		isMultiple,
		resolvedOptions,
		value
	]);
	const handleChange = (nextValue) => {
		if (!onValueChange) return;
		if (isMultiple) {
			onValueChange((Array.isArray(nextValue) ? nextValue : []).map((item) => {
				return item.value;
			}));
			return;
		}
		onValueChange(nextValue?.value ?? null);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsxs(Combobox, {
			multiple: isMultiple,
			items: resolvedOptions,
			value: selectedValue,
			onValueChange: handleChange,
			open,
			defaultOpen,
			onOpenChange: (nextOpen) => {
				setInternalOpen(nextOpen);
				onOpenChange?.(nextOpen);
				if (!nextOpen) setSearchValue("");
			},
			onInputValueChange: (nextValue) => {
				const nextSearchValue = String(nextValue ?? "");
				setSearchValue(nextSearchValue);
				onInputValueChange?.(nextSearchValue);
			},
			itemToStringLabel: (item) => {
				return item?.label ?? "";
			},
			itemToStringValue: (item) => {
				return toStringValue(item?.value);
			},
			disabled,
			children: [isMultiple ? /* @__PURE__ */ jsx(ComboboxChips, {
				ref: anchor,
				className,
				children: /* @__PURE__ */ jsx(ComboboxValue, { children: (items) => {
					return /* @__PURE__ */ jsxs(Fragment, { children: [items.map((item) => {
						return /* @__PURE__ */ jsxs(ComboboxChip, { children: [/* @__PURE__ */ jsx(OptionIcon, { icon: item.icon }), item.label] }, toStringValue(item.value));
					}), /* @__PURE__ */ jsx(ComboboxChipsInput, { placeholder })] });
				} })
			}) : /* @__PURE__ */ jsx(ComboboxPrimitiveInput, {
				className,
				placeholder,
				showClear,
				disabled
			}), /* @__PURE__ */ jsxs(ComboboxContent, {
				anchor: isMultiple ? anchor : void 0,
				className: contentClassName,
				children: [/* @__PURE__ */ jsx(ComboboxEmpty, { children: emptyMessage }), /* @__PURE__ */ jsx(ComboboxList, { children: (item) => {
					return /* @__PURE__ */ jsx(ComboboxItem, {
						value: item,
						children: /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(OptionIcon, { icon: item.icon }), /* @__PURE__ */ jsx(ComboboxHighlightedText, {
								text: item.label,
								search: searchValue
							})]
						})
					}, toStringValue(item.value));
				} })]
			})]
		}), withLoadingIndicator && loading && /* @__PURE__ */ jsx(Spinner, { size: "xs" })]
	});
};
//#endregion
export { ComboboxInput };

//# sourceMappingURL=ComboboxInput.js.map