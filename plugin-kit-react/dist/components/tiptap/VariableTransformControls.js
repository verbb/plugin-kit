import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { Input } from "../Input.js";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../Select.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/tiptap/VariableTransformControls.tsx
function TransformParamField({ param, value, onChange, t }) {
	if (!Array.isArray(param.options) || param.options.length === 0) return /* @__PURE__ */ jsx(Input, {
		type: param.type === "number" ? "number" : "text",
		value,
		onChange: (event) => {
			return onChange(event.target.value);
		},
		placeholder: param.placeholder || (param.default == null ? "" : String(param.default)),
		className: "text-[13px] placeholder:text-slate-400"
	});
	const { options } = param;
	const selectItems = [...options.map((option) => {
		return {
			value: option.value,
			label: option.label
		};
	})];
	const groupedOptions = options.reduce((acc, option) => {
		const group = option.group ?? "";
		if (!acc[group]) acc[group] = [];
		acc[group].push(option);
		return acc;
	}, {});
	const groupOrder = Object.keys(groupedOptions);
	const preferredDefault = options.some((option) => {
		return option.value === "isoDate";
	}) ? "isoDate" : options[0]?.value ?? "";
	const resolvedDefault = String(param.default ?? preferredDefault);
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-2",
		children: /* @__PURE__ */ jsxs(Select, {
			value: value || resolvedDefault,
			items: selectItems,
			onValueChange: (value) => {
				onChange(String(value ?? ""));
			},
			size: "sm",
			children: [/* @__PURE__ */ jsx(SelectTrigger, {
				className: "w-full",
				children: /* @__PURE__ */ jsx(SelectValue, { placeholder: t("Select option") })
			}), /* @__PURE__ */ jsx(SelectContent, { children: groupOrder.map((groupKey) => {
				const entries = groupedOptions[groupKey] ?? [];
				if (entries.length === 0) return null;
				if (!groupKey) return entries.map((entry) => {
					return /* @__PURE__ */ jsx(SelectItem, {
						value: entry.value,
						children: entry.label
					}, entry.value);
				});
				return /* @__PURE__ */ jsxs(SelectGroup, { children: [/* @__PURE__ */ jsx(SelectLabel, { children: groupKey }), entries.map((entry) => {
					return /* @__PURE__ */ jsx(SelectItem, {
						value: entry.value,
						children: entry.label
					}, entry.value);
				})] }, groupKey);
			}) })]
		})
	});
}
function VariableTransformControls({ transformerId, onTransformerIdChange, transformOptions, hasIncompatibleTransformerSelection, selectedTransformer, transformerParams, onTransformerParamChange }) {
	const t = useTranslation();
	if (transformOptions.length === 0) return null;
	const selectItems = [{
		value: "",
		label: t("None")
	}, ...transformOptions.map((option) => {
		return {
			value: option.value,
			label: option.label
		};
	})];
	const activeParams = (selectedTransformer?.params ?? []).filter((param) => {
		if (!param.showWhen) return true;
		return (transformerParams[param.showWhen.param] ?? "") === param.showWhen.equals;
	});
	const groupedTransformOptions = transformOptions.reduce((groups, option) => {
		const typeKey = option.appliesTo?.[0] || "other";
		if (!groups[typeKey]) groups[typeKey] = [];
		groups[typeKey].push(option);
		return groups;
	}, {});
	const groupOrder = [
		"text",
		"number",
		"date",
		"boolean",
		"other"
	];
	const groupLabelByType = {
		text: t("Text"),
		number: t("Number"),
		date: t("Date"),
		boolean: t("Boolean"),
		other: t("Other")
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("label", {
			className: "text-[11px] text-gray-500 block mt-2 mb-1",
			children: t("Transform (optional)")
		}),
		/* @__PURE__ */ jsxs(Select, {
			value: transformerId,
			onValueChange: (value) => {
				return onTransformerIdChange(String(value ?? ""));
			},
			items: selectItems,
			size: "sm",
			children: [/* @__PURE__ */ jsx(SelectTrigger, {
				className: "w-full",
				children: /* @__PURE__ */ jsx(SelectValue, { placeholder: t("None") })
			}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
				value: "",
				children: t("None")
			}), groupOrder.map((typeKey) => {
				const options = groupedTransformOptions[typeKey] ?? [];
				if (options.length === 0) return null;
				return /* @__PURE__ */ jsxs(SelectGroup, { children: [/* @__PURE__ */ jsx(SelectLabel, { children: groupLabelByType[typeKey] ?? typeKey }), options.map((option) => {
					return /* @__PURE__ */ jsx(SelectItem, {
						value: option.value,
						children: option.label
					}, `${typeKey}-${option.value}`);
				})] }, typeKey);
			})] })]
		}),
		hasIncompatibleTransformerSelection && /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-[11px] text-amber-700",
			children: t("The selected transform is not compatible with this variable.")
		}),
		activeParams.length > 0 && /* @__PURE__ */ jsx("div", {
			className: "mt-2 space-y-2",
			children: activeParams.map((param) => {
				return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "text-[11px] text-gray-500 block mb-1",
					children: param.label
				}), /* @__PURE__ */ jsx(TransformParamField, {
					param,
					value: transformerParams[param.name] ?? "",
					onChange: (value) => {
						onTransformerParamChange(param.name, value);
						if (param.name === "preset" && value !== "custom") onTransformerParamChange("pattern", "");
					},
					t
				})] }, param.name);
			})
		})
	] });
}
//#endregion
export { VariableTransformControls };

//# sourceMappingURL=VariableTransformControls.js.map