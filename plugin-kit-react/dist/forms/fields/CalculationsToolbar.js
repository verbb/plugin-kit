import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/Dialog.js";
import { VariableDropdown } from "../../components/tiptap/VariableDropdown.js";
import "../../components/index.js";
import { Button } from "../../components/Button.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/forms/fields/CalculationsToolbar.tsx
var OPERATOR_GROUPS = [
	{
		title: "Arithmetic",
		items: [
			["+", "Addition"],
			["-", "Subtraction"],
			["*", "Multiplication"],
			["/", "Division"],
			["%", "Modulus"],
			["**", "Power"]
		]
	},
	{
		title: "Bitwise",
		items: [
			["&", "AND"],
			["|", "OR"],
			["^", "XOR"]
		]
	},
	{
		title: "Logical",
		items: [
			["!, not", "Not"],
			["&&, and", "And"],
			["||, or", "Or"]
		]
	},
	{
		title: "Comparison",
		items: [
			["==", "Equal"],
			["===", "Identical"],
			["!=", "Not equal"],
			["!==", "Not identical"],
			["<, >, <=, >=", "Relational"],
			["matches", "Regex match"]
		]
	},
	{
		title: "Ternary",
		items: [["a ? b : c", "Conditional"]]
	},
	{
		title: "Array",
		items: [["in", "Contains"], ["not in", "Does not contain"]]
	},
	{
		title: "Numeric",
		items: [["..", "Range"]]
	},
	{
		title: "String",
		items: [["~", "Concatenation"]]
	}
];
var CalculationsToolbar = ({ editor, variableCategories, variableCategoryLabels, variableCategoryOrder, variablePickerOpen, onVariablePickerOpenChange, guideOpen, onGuideOpenChange, validating, onValidate }) => {
	const t = useTranslation();
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between relative z-10 px-[8px] py-[8px] border-b border-[rgba(96,125,159,0.4)] bg-white shadow-[0_2px_3px_rgba(49,49,93,.07)]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-1",
			children: /* @__PURE__ */ jsx(VariableDropdown, {
				editor,
				variableCategories,
				variableCategoryLabels,
				variableCategoryOrder,
				title: t("Insert Variable"),
				buttonLabel: t("Insert Field"),
				buttonVariant: "outline",
				buttonSize: "sm",
				buttonClassName: "h-auto [&_svg]:size-3",
				open: variablePickerOpen,
				onOpenChange: onVariablePickerOpenChange
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsxs(Dialog, {
				open: guideOpen,
				onOpenChange: onGuideOpenChange,
				children: [/* @__PURE__ */ jsx(DialogTrigger, { render: /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					size: "sm",
					children: t("Syntax Guide")
				}) }), /* @__PURE__ */ jsxs(DialogContent, {
					className: "max-w-4xl",
					showCloseButton: true,
					children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsx(DialogTitle, { children: t("Syntax Guide") }), /* @__PURE__ */ jsx(DialogDescription, { children: t("Use field variables and expression syntax in formulas.") })] }), /* @__PURE__ */ jsx("div", {
						className: "grid gap-4 p-4 text-sm md:grid-cols-2 xl:grid-cols-4",
						children: OPERATOR_GROUPS.map((group) => {
							return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "mb-2 font-semibold text-gray-700",
								children: t(group.title)
							}), /* @__PURE__ */ jsx("ul", {
								className: "space-y-1 text-xs text-gray-600",
								children: group.items.map(([token, label]) => {
									return /* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("code", {
											className: "rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[11px]",
											children: token
										}), /* @__PURE__ */ jsx("span", { children: t(label) })]
									}, `${group.title}-${token}`);
								})
							})] }, group.title);
						})
					})]
				})]
			}), /* @__PURE__ */ jsx(Button, {
				variant: "secondary",
				size: "sm",
				loading: validating,
				onClick: onValidate,
				children: t("Test Formula")
			})]
		})]
	});
};
//#endregion
export { CalculationsToolbar };

//# sourceMappingURL=CalculationsToolbar.js.map