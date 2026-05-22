import { cn } from "../../utils/classes.js";
import "../../utils/index.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { VariableCommandList } from "./VariableCommandList.js";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover.js";
import "../index.js";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/tiptap/InlineVariablePickerPopover.tsx
function InlineVariablePickerPopover({ open, onOpenChange, position, isChildMode, query, onQueryChange, filteredVariables, onSelect, onBack }) {
	const t = useTranslation();
	const groups = filteredVariables.isChildMode || !filteredVariables.groups?.length ? null : filteredVariables.groups;
	const { options } = filteredVariables;
	return /* @__PURE__ */ jsxs(Popover, {
		modal: false,
		open: open && options.length > 0,
		onOpenChange: (nextOpen) => {
			if (!nextOpen) onOpenChange(false);
		},
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			nativeButton: false,
			render: /* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				className: "absolute size-px opacity-0 pointer-events-none",
				style: {
					top: position.top,
					left: position.left
				}
			})
		}), /* @__PURE__ */ jsx(PopoverContent, {
			align: "start",
			side: "bottom",
			sideOffset: 4,
			positionMethod: "fixed",
			collisionAvoidance: {
				side: "flip",
				align: "shift",
				fallbackAxisSide: "none"
			},
			portalClassName: "z-250",
			className: cn("p-0 overflow-hidden flex flex-col", isChildMode ? "w-[260px] max-h-[280px]" : "min-w-[260px] max-w-[360px] max-h-[300px]"),
			children: /* @__PURE__ */ jsx(VariableCommandList, {
				search: query,
				onSearchChange: onQueryChange,
				groups,
				options,
				onSelect,
				showSearch: true,
				placeholder: t("Search variables"),
				shouldFilter: false,
				onBack: isChildMode ? onBack : void 0,
				isChildMode,
				selectFirstItem: true,
				autoFocusSearchInput: false
			})
		})]
	});
}
//#endregion
export { InlineVariablePickerPopover };

//# sourceMappingURL=InlineVariablePickerPopover.js.map