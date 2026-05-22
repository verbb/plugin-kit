import { cn } from "../../utils/classes.js";
import "../../utils/index.js";
import { Checkbox } from "../Checkbox.js";
import { ComboboxInput } from "../ComboboxInput.js";
import { ColorInput } from "../ColorInput.js";
import { DatePicker } from "../DatePicker.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../DropdownMenu.js";
import { VariableCommandList } from "../tiptap/VariableCommandList.js";
import { useVariablePicker } from "../tiptap/useVariablePicker.js";
import { Input } from "../Input.js";
import { Lightswitch } from "../Lightswitch.js";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover.js";
import { SelectInput } from "../SelectInput.js";
import { Textarea } from "../Textarea.js";
import { TimePicker } from "../TimePicker.js";
import "../index.js";
import { Button } from "../Button.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEllipsis } from "@fortawesome/pro-solid-svg-icons";
//#region src/components/editable-table/TableCell.tsx
function VariablePickerCell({ finalColumn, value, updateValue, isInvalid }) {
	const t = useTranslation();
	const [open, setOpen] = useState(false);
	const picker = useVariablePicker({
		variableCategories: finalColumn.variableCategories || {},
		variableCategoryLabels: finalColumn.variableCategoryLabels || {},
		variableCategoryOrder: finalColumn.variableCategoryOrder || [],
		isOpen: open,
		onApply: (_baseVariable, variable) => {
			updateValue(String(variable?.value || ""));
			setOpen(false);
		}
	});
	const noneOptionLabel = finalColumn.noneOptionLabel || t("Select an option");
	const selectedLabel = useMemo(() => {
		const targetValue = String(value || "");
		if (!targetValue) return noneOptionLabel;
		let label = "";
		const visit = (items = []) => {
			items.forEach((item) => {
				if (label || !item || typeof item !== "object") return;
				if (String(item.value || "") === targetValue) {
					label = item.label || targetValue;
					return;
				}
				if (Array.isArray(item.children)) visit(item.children);
			});
		};
		Object.values(finalColumn.variableCategories || {}).forEach((items) => {
			if (Array.isArray(items)) visit(items);
		});
		return label || targetValue;
	}, [
		finalColumn.variableCategories,
		noneOptionLabel,
		value
	]);
	const pickerGroups = useMemo(() => {
		const groups = Array.isArray(picker.groups) ? picker.groups : [];
		const groupedByPage = [];
		groups.forEach((group) => {
			if (group?.value !== "fieldsVariables" || !Array.isArray(group.items)) {
				groupedByPage.push(group);
				return;
			}
			const pageBuckets = /* @__PURE__ */ new Map();
			group.items.forEach((item) => {
				const pageLabel = String(item?.pageLabel || "").trim() || t("Fields");
				if (!pageBuckets.has(pageLabel)) pageBuckets.set(pageLabel, []);
				const bucket = pageBuckets.get(pageLabel);
				if (bucket) bucket.push(item);
			});
			pageBuckets.forEach((items, pageLabel) => {
				groupedByPage.push({
					label: pageLabel,
					value: `fieldsVariables:${pageLabel}`,
					items
				});
			});
		});
		if (picker.page) return groupedByPage;
		return [{
			label: "",
			value: "none",
			items: [{
				label: noneOptionLabel,
				value: "__none__"
			}]
		}, ...groupedByPage];
	}, [
		noneOptionLabel,
		picker.groups,
		picker.page,
		t
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-1 px-2",
		children: [/* @__PURE__ */ jsxs(Popover, {
			modal: false,
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ jsx(PopoverTrigger, {
				nativeButton: true,
				render: /* @__PURE__ */ jsxs(Button, {
					size: "sm",
					variant: "default",
					className: cn("min-w-0 flex-1 py-[6px] justify-between", isInvalid && "border-error", finalColumn.className),
					children: [/* @__PURE__ */ jsx("span", {
						className: "truncate flex-1 text-left",
						children: selectedLabel
					}), /* @__PURE__ */ jsx(FontAwesomeIcon, {
						icon: faChevronDown,
						className: "size-2.5 pointer-events-none ml-2 shrink-0"
					})]
				})
			}), /* @__PURE__ */ jsx(PopoverContent, {
				align: "start",
				side: "bottom",
				sideOffset: 6,
				positionMethod: "fixed",
				collisionAvoidance: {
					side: "flip",
					align: "shift",
					fallbackAxisSide: "none"
				},
				className: finalColumn.contentClassName || "min-w-[360px] max-w-[480px] p-0 overflow-hidden flex flex-col",
				portalClassName: "z-250",
				children: /* @__PURE__ */ jsx(VariableCommandList, {
					search: picker.search,
					onSearchChange: picker.setSearch,
					groups: pickerGroups,
					options: picker.options,
					onSelect: (item, baseVariable) => {
						if (item?.value === "__none__") {
							updateValue("");
							setOpen(false);
							return;
						}
						picker.handleSelect(item, baseVariable);
					},
					placeholder: t("Search values"),
					showSearch: true,
					shouldFilter: false,
					onBack: picker.page ? picker.handleBack : void 0,
					isChildMode: !!picker.page,
					selectFirstItem: true,
					autoFocusSearchInput: true
				})
			})]
		}), finalColumn.showActionsMenu !== false && /* @__PURE__ */ jsxs(DropdownMenu, {
			size: "sm",
			children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, { render: /* @__PURE__ */ jsx(Button, {
				className: "rounded-none w-7 h-7 -mr-1",
				variant: "none",
				"aria-label": t("More actions"),
				size: "xs",
				children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
					icon: faEllipsis,
					className: "size-3"
				})
			}) }), /* @__PURE__ */ jsx(DropdownMenuContent, {
				align: "end",
				sideOffset: 8,
				children: /* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsx(DropdownMenuItem, {
					onClick: () => {
						updateValue("");
					},
					children: noneOptionLabel
				}) })
			})]
		})]
	});
}
function TableCell({ column, value, row, rowIndex, modifyColumn, getCellErrors, onUpdateCell }) {
	const updateValue = (newValue) => {
		onUpdateCell(rowIndex, row, column, newValue);
	};
	const columnModifications = modifyColumn ? modifyColumn(row, column.name) : null;
	const finalColumn = columnModifications ? {
		...column,
		...columnModifications
	} : column;
	const cellErrorList = getCellErrors(rowIndex, finalColumn.name);
	const isInvalid = cellErrorList.length > 0;
	const { renderCell } = finalColumn;
	if (typeof renderCell === "function") return renderCell({
		column: finalColumn,
		value,
		row,
		rowIndex,
		isInvalid,
		updateValue,
		cellErrors: cellErrorList
	});
	switch (finalColumn.type) {
		case "select": return /* @__PURE__ */ jsx("div", {
			className: "min-w-0 px-2",
			children: /* @__PURE__ */ jsx(SelectInput, {
				size: "xs",
				options: finalColumn.options,
				placeholder: finalColumn.placeholder,
				onChange: updateValue,
				value: value || "",
				triggerClassName: cn("w-full max-w-full", isInvalid && "border-error"),
				"data-editable-table-input": "true"
			})
		});
		case "combobox": return /* @__PURE__ */ jsx("div", {
			className: "px-2",
			children: /* @__PURE__ */ jsx(ComboboxInput, {
				options: finalColumn.options,
				placeholder: finalColumn.placeholder,
				value: value || null,
				onValueChange: (nextValue) => {
					return updateValue(nextValue ?? "");
				},
				className: cn(isInvalid && "border-error", finalColumn.className),
				contentClassName: finalColumn.contentClassName
			})
		});
		case "variablePicker": return /* @__PURE__ */ jsx(VariablePickerCell, {
			finalColumn,
			value,
			updateValue,
			isInvalid
		});
		case "textarea": return /* @__PURE__ */ jsx(Textarea, {
			value: value || "",
			"data-editable-table-input": "true",
			onChange: (e) => {
				return updateValue(e.target.value);
			},
			"aria-invalid": isInvalid,
			className: cn([
				"h-full w-full min-h-auto",
				"border-none",
				"rounded-none",
				"bg-transparent",
				"focus-visible:shadow-none",
				"focus-visible:inset-ring-1",
				"focus-visible:inset-ring-gray-200",
				"aria-invalid:focus-visible:shadow-none!",
				"aria-invalid:focus-visible:inset-ring-rose-600!",
				isInvalid && "inset-ring-1 inset-ring-rose-600"
			]),
			rows: 1,
			placeholder: finalColumn.placeholder
		});
		case "checkbox": return /* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-center px-2",
			children: /* @__PURE__ */ jsx(Checkbox, {
				checked: Boolean(value),
				onCheckedChange: (checked) => {
					return updateValue(Boolean(checked));
				},
				"aria-invalid": isInvalid
			})
		});
		case "radio": return /* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-center px-2",
			children: /* @__PURE__ */ jsx(Checkbox, {
				checked: Boolean(value),
				onCheckedChange: (checked) => {
					return updateValue(Boolean(checked));
				},
				"aria-invalid": isInvalid
			})
		});
		case "lightswitch": return /* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-center px-2",
			children: /* @__PURE__ */ jsx(Lightswitch, {
				checked: Boolean(value),
				size: "sm",
				onCheckedChange: (checked) => {
					return updateValue(Boolean(checked));
				},
				"aria-invalid": isInvalid
			})
		});
		case "label": return /* @__PURE__ */ jsx("div", {
			className: "px-2 py-2 text-sm",
			children: value || ""
		});
		case "heading": return /* @__PURE__ */ jsx("div", {
			className: "px-2 py-2 text-sm font-semibold text-gray-800",
			children: value || ""
		});
		case "handle":
		case "value": return /* @__PURE__ */ jsx(Input, {
			type: "text",
			value: value ?? "",
			"data-editable-table-input": "true",
			onChange: (e) => {
				return updateValue(e.target.value);
			},
			"aria-invalid": isInvalid,
			className: cn([
				"h-full w-full",
				"relative",
				"border-none",
				"rounded-none",
				"bg-transparent",
				"font-mono text-[0.9em]",
				"focus-visible:shadow-none",
				"focus-visible:inset-ring-1",
				"focus-visible:inset-ring-gray-200",
				"aria-invalid:focus-visible:shadow-none!",
				"aria-invalid:focus-visible:inset-ring-rose-600!",
				isInvalid && "inset-ring-1 inset-ring-rose-600"
			]),
			placeholder: finalColumn.placeholder
		});
		case "color": return /* @__PURE__ */ jsx(ColorInput, {
			value: value || "",
			size: "sm",
			onValueChange: (nextValue) => {
				return updateValue(nextValue);
			},
			isInvalid,
			fitCell: true,
			className: cn([
				"h-full w-full",
				"relative",
				"border-none",
				"rounded-none",
				"bg-transparent",
				"focus-visible:shadow-none",
				"focus-visible:inset-ring-1",
				"focus-visible:inset-ring-gray-200",
				"aria-invalid:focus-visible:shadow-none!",
				"aria-invalid:focus-visible:inset-ring-rose-600!",
				isInvalid && "inset-ring-1 inset-ring-rose-600"
			]),
			"data-editable-table-input": "true"
		});
		case "date": return /* @__PURE__ */ jsx(DatePicker, {
			value: value || null,
			onValueChange: (nextDate) => {
				if (!nextDate) {
					updateValue("");
					return;
				}
				const isoDate = nextDate.toISOString().split("T")[0];
				updateValue(isoDate);
			},
			placeholder: finalColumn.placeholder,
			className: cn([
				"h-full w-full",
				"relative",
				"border-none",
				"rounded-none",
				"bg-transparent",
				"focus-visible:shadow-none",
				"focus-visible:inset-ring-1",
				"focus-visible:inset-ring-gray-200",
				"aria-invalid:focus-visible:shadow-none!",
				"aria-invalid:focus-visible:inset-ring-rose-600!",
				isInvalid && "inset-ring-1 inset-ring-rose-600"
			]),
			isInvalid
		});
		case "time": return /* @__PURE__ */ jsx(TimePicker, {
			value: value || "",
			onValueChange: (nextValue) => {
				return updateValue(nextValue || "");
			},
			placeholder: finalColumn.placeholder,
			className: cn([
				"h-full w-full",
				"relative",
				"border-none",
				"rounded-none",
				"bg-transparent",
				"focus-visible:shadow-none",
				"focus-visible:inset-ring-1",
				"focus-visible:inset-ring-gray-200",
				"aria-invalid:focus-visible:shadow-none!",
				"aria-invalid:focus-visible:inset-ring-rose-600!",
				isInvalid && "inset-ring-1 inset-ring-rose-600"
			]),
			isInvalid
		});
		default: return /* @__PURE__ */ jsx(Input, {
			type: finalColumn.type || "text",
			value: value || "",
			"data-editable-table-input": "true",
			onChange: (e) => {
				return updateValue(e.target.value);
			},
			"aria-invalid": isInvalid,
			className: cn([
				"h-full w-full",
				"relative",
				"border-none",
				"rounded-none",
				"bg-transparent",
				"focus-visible:shadow-none",
				"focus-visible:inset-ring-1",
				"focus-visible:inset-ring-gray-200",
				"aria-invalid:focus-visible:shadow-none!",
				"aria-invalid:focus-visible:inset-ring-rose-600!",
				isInvalid && "inset-ring-1 inset-ring-rose-600"
			]),
			placeholder: finalColumn.placeholder
		});
	}
}
//#endregion
export { TableCell };

//# sourceMappingURL=TableCell.js.map