import { cn } from "../../utils/classes.js";
import "../../utils/index.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip.js";
import { buildVariableTagAttrs } from "./variableSerialization.js";
import { VariableCommandList } from "./VariableCommandList.js";
import { useVariablePicker } from "./useVariablePicker.js";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover.js";
import "../index.js";
import { Button } from "../Button.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEditorState } from "@tiptap/react";
import { faPlusCircle } from "@fortawesome/pro-regular-svg-icons";
//#region src/components/tiptap/VariableDropdown.tsx
function formatVariableCategoryLabel(key, labels) {
	return labels?.[key] ?? key;
}
function VariableDropdown({ editor, variableCategories, variableCategoryLabels, variableCategoryOrder, title, buttonLabel, buttonVariant, buttonSize, buttonClassName, open, onOpenChange, triggerMode = "toolbar" }) {
	const t = useTranslation();
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
	const isControlledOpen = typeof open === "boolean";
	const isOpen = isControlledOpen ? open : uncontrolledOpen;
	const picker = useVariablePicker({
		variableCategories,
		variableCategoryLabels,
		variableCategoryOrder,
		isOpen,
		onApply: (baseVariable, variable) => {
			const attrs = buildVariableTagAttrs(baseVariable, variable);
			(editor?.chain())?.focus?.()?.setVariableTag?.(attrs)?.run?.();
			if (!isControlledOpen) setUncontrolledOpen(false);
			onOpenChange?.(false);
			picker.reset();
		}
	});
	const isVariableActive = useEditorState({
		editor,
		selector: ({ editor: ed }) => {
			return (ed?.isFocused && ed?.isActive("variableTag")) ?? false;
		}
	});
	const handleOpenChange = (nextOpen) => {
		if (!nextOpen) picker.reset();
		if (!isControlledOpen) setUncontrolledOpen(nextOpen);
		onOpenChange?.(nextOpen);
	};
	if (!Object.values(variableCategories ?? {}).some((items) => {
		return Array.isArray(items) && items.length > 0;
	})) return null;
	const triggerButton = /* @__PURE__ */ jsxs(Button, {
		variant: buttonVariant ?? "none",
		size: buttonSize,
		className: cn(triggerMode === "toolbar" && [
			buttonLabel ? "h-[32px] px-[8px] gap-1.5" : "w-[32px] h-[32px]",
			"text-[#1c2e36]",
			"hover:bg-slate-100!",
			isVariableActive && "bg-slate-250! hover:bg-slate-250!"
		], triggerMode === "input" && [
			"absolute right-[1px] top-1/2 -translate-y-1/2",
			"border-l border-transparent",
			"rounded-[3px] rounded-l-none",
			"h-[calc(100%-2px)]",
			"text-[#8d959b]",
			"bg-white hover:bg-slate-50",
			"border-[#d7dfe7]",
			"text-[#1c2e36]"
		], buttonClassName ?? ""),
		children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
			icon: faPlusCircle,
			className: "size-4"
		}), buttonLabel && /* @__PURE__ */ jsx("span", { children: buttonLabel })]
	});
	return /* @__PURE__ */ jsxs(Popover, {
		modal: false,
		open: isOpen,
		onOpenChange: handleOpenChange,
		children: [buttonLabel || title ? /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, { render: /* @__PURE__ */ jsx(PopoverTrigger, {
			nativeButton: true,
			render: triggerButton
		}) }), /* @__PURE__ */ jsx(TooltipContent, {
			sideOffset: 4,
			children: buttonLabel || title
		})] }) : /* @__PURE__ */ jsx(PopoverTrigger, {
			nativeButton: true,
			render: triggerButton
		}), /* @__PURE__ */ jsx(PopoverContent, {
			align: triggerMode === "input" ? "end" : "start",
			side: "bottom",
			sideOffset: 6,
			positionMethod: "fixed",
			collisionAvoidance: {
				side: "flip",
				align: "shift",
				fallbackAxisSide: "none"
			},
			className: "min-w-[260px] max-w-[360px] p-0 overflow-hidden flex flex-col",
			portalClassName: "z-250",
			children: /* @__PURE__ */ jsx(VariableCommandList, {
				search: picker.search,
				onSearchChange: picker.setSearch,
				groups: picker.groups,
				options: picker.options,
				onSelect: picker.handleSelect,
				placeholder: t("Search variables"),
				showSearch: true,
				shouldFilter: false,
				onBack: picker.page ? picker.handleBack : void 0,
				isChildMode: !!picker.page,
				selectFirstItem: triggerMode === "input",
				autoFocusSearchInput: triggerMode !== "input"
			})
		})]
	});
}
//#endregion
export { VariableDropdown, formatVariableCategoryLabel };

//# sourceMappingURL=VariableDropdown.js.map