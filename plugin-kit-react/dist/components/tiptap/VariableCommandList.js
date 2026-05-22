import { cn } from "../../utils/classes.js";
import "../../utils/index.js";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../Command.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { Button } from "../Button.js";
import React, { useLayoutEffect, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-solid-svg-icons";
//#region src/components/tiptap/VariableCommandList.tsx
/**
* Command-based variable list. Used by VariableDropdown and InlineVariablePickerPopover.
* Supports grouped items and nested "pages" (parent → children) via groups/options.
*/
/** Renders child item only when search is non-empty and child matches (cmdk sub-item pattern) */
function VariableSubItem({ child, parent, groupLabel, search, handleSelectItem }) {
	const q = search.trim().toLowerCase();
	if (!q) return null;
	if (!((child.label ?? "").toLowerCase().includes(q) || String(child.value ?? "").toLowerCase().includes(q))) return null;
	const key = child.value ?? child.label ?? `sub-${parent.label}-${child.label}`;
	return /* @__PURE__ */ jsx(CommandItem, {
		value: child.value ?? child.label ?? key,
		onSelect: () => {
			return handleSelectItem(child, parent);
		},
		keywords: [
			child.label,
			child.value ?? "",
			parent.label,
			groupLabel
		],
		children: child.label
	}, key);
}
function VariableCommandList({ search, onSearchChange, groups, options, selectedValue, onSelect, placeholder, showSearch = true, shouldFilter = false, onBack, isChildMode = false, selectFirstItem = true, autoFocusSearchInput = true, afterSearchContent }) {
	const t = useTranslation();
	const listRef = useRef(null);
	const commandRef = useRef(null);
	const savedScrollTopRef = useRef(null);
	const flatItems = groups ? groups.flatMap((g) => {
		return g.items;
	}) : options;
	const isControlled = selectedValue !== void 0 && selectedValue !== null;
	const currentValue = selectedValue ?? (selectFirstItem ? flatItems[0]?.value ?? "" : "");
	const commandProps = isControlled ? {
		value: currentValue,
		onValueChange: () => {}
	} : { defaultValue: currentValue || void 0 };
	const handleSelectItem = (item, baseVariable) => {
		if (Array.isArray(item.children) && item.children.length > 0) savedScrollTopRef.current = listRef.current?.scrollTop ?? 0;
		onSelect(item, baseVariable);
	};
	const wasChildModeRef = React.useRef(isChildMode);
	useLayoutEffect(() => {
		const wasChild = wasChildModeRef.current;
		wasChildModeRef.current = isChildMode;
		if (wasChild && !isChildMode && savedScrollTopRef.current != null && listRef.current) {
			listRef.current.scrollTop = savedScrollTopRef.current;
			savedScrollTopRef.current = null;
		}
		if (!wasChild && isChildMode && showSearch && autoFocusSearchInput) (commandRef.current?.querySelector("[data-slot=\"command-input\"]"))?.focus();
	}, [
		autoFocusSearchInput,
		isChildMode,
		showSearch
	]);
	const handleKeyDown = (e) => {
		if (onBack && !search.trim() && e.key === "Backspace") {
			e.preventDefault();
			e.stopPropagation();
			onBack();
		}
	};
	const content = /* @__PURE__ */ jsx("div", {
		ref: commandRef,
		className: "contents",
		children: /* @__PURE__ */ jsxs(Command, {
			shouldFilter,
			className: "border-0 shadow-none rounded-none",
			...commandProps,
			children: [
				showSearch && /* @__PURE__ */ jsx(CommandInput, {
					value: search,
					onValueChange: onSearchChange,
					placeholder: placeholder ?? t("Search variables"),
					className: "border-0"
				}),
				afterSearchContent,
				onBack && /* @__PURE__ */ jsxs(Button, {
					variant: "none",
					className: cn(["w-full text-left text-[11px] flex flex-1 items-center justify-start", "hover:bg-slate-100 gap-1 border-b border-slate-150 px-2 py-1.5"]),
					onClick: (e) => {
						e.preventDefault();
						onBack();
					},
					children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
						icon: faChevronLeft,
						className: "size-[8px] shrink-0"
					}), t("Back")]
				}),
				/* @__PURE__ */ jsxs(CommandList, {
					ref: listRef,
					className: "max-h-[280px]",
					children: [/* @__PURE__ */ jsx(CommandEmpty, { children: t("No variables found.") }), groups ? groups.map((group, gi) => {
						return /* @__PURE__ */ jsxs(React.Fragment, { children: [gi > 0 && /* @__PURE__ */ jsx(CommandSeparator, {}), /* @__PURE__ */ jsx(CommandGroup, {
							heading: group.label,
							children: group.items.map((item, ii) => {
								const q = search.trim().toLowerCase();
								const hasChildren = Array.isArray(item.children) && item.children.length > 0;
								const showParent = !hasChildren || !q;
								return /* @__PURE__ */ jsxs(React.Fragment, { children: [showParent && /* @__PURE__ */ jsxs(CommandItem, {
									value: item.value ?? item.label ?? `${gi}-${ii}`,
									onSelect: () => {
										return handleSelectItem(item);
									},
									keywords: [
										item.label,
										item.value ?? "",
										group.label
									],
									children: [/* @__PURE__ */ jsx("span", {
										className: "truncate flex-1",
										children: item.label
									}), hasChildren && /* @__PURE__ */ jsx(FontAwesomeIcon, {
										icon: faChevronRight,
										className: cn("size-3 shrink-0 text-gray-400 ml-2"),
										"aria-hidden": true
									})]
								}), hasChildren && item.children.map((child) => {
									return /* @__PURE__ */ jsx(VariableSubItem, {
										child,
										parent: item,
										groupLabel: group.label,
										search,
										handleSelectItem
									}, child.value ?? child.label ?? `${gi}-${ii}-${child.label}`);
								})] }, item.value ?? item.label ?? `${gi}-${ii}`);
							})
						})] }, group.value ?? group.label ?? gi);
					}) : /* @__PURE__ */ jsx(CommandGroup, {
						heading: t("Selectors"),
						children: options.map((item, i) => {
							return /* @__PURE__ */ jsx(CommandItem, {
								value: item.value ?? item.label ?? `opt-${i}`,
								onSelect: () => {
									return handleSelectItem(item);
								},
								children: item.label
							}, item.value ?? item.label ?? `opt-${i}`);
						})
					})]
				})
			]
		})
	});
	return onBack ? /* @__PURE__ */ jsx("div", {
		onKeyDown: handleKeyDown,
		className: "contents",
		children: content
	}) : content;
}
//#endregion
export { VariableCommandList };

//# sourceMappingURL=VariableCommandList.js.map