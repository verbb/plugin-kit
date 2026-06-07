import { cn } from "../../utils/classes.js";
import "../../utils/index.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../DropdownMenu.js";
import { RowDataCells } from "./RowDataCells.js";
import { TableCell, TableRow as TableRow$1 } from "../Table.js";
import "../index.js";
import { Button } from "../Button.js";
import React from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faEllipsis, faXmark } from "@fortawesome/pro-solid-svg-icons";
import { useSortable } from "@dnd-kit/react/sortable";
import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
//#region src/components/editable-table/TableRow.jsx
var SortableRow = ({ row, rowIndex, allowReorder, className, children }) => {
	const sortable = useSortable({
		id: row._id,
		index: rowIndex,
		disabled: !allowReorder,
		modifiers: [RestrictToVerticalAxis, RestrictToElement.configure({ element: (operation) => {
			return (operation?.source?.element)?.parentElement ?? null;
		} })]
	});
	return /* @__PURE__ */ jsx(TableRow$1, {
		ref: sortable.ref,
		className: cn(sortable.isDragging && "shadow-lg", className),
		children: children({ handleRef: sortable.handleRef })
	});
};
var PlainRow = ({ className, children }) => {
	return /* @__PURE__ */ jsx(TableRow$1, {
		className,
		children: typeof children === "function" ? children({ handleRef: void 0 }) : children
	});
};
var TableRow = React.memo(({ row, rowIndex, rowCount, columns, columnsSignature, useDnd, allowReorder, showReorderControls, allowDelete, modifyColumn, modifyRow, getCellErrors, onUpdateCell, moveRow, removeRow, t, renderRowActions, renderRowMenuItemsBeforeCore, renderRowMenuItemsAfterCore, renderRowMenuItems }) => {
	return /* @__PURE__ */ jsx(useDnd ? SortableRow : PlainRow, {
		row,
		rowIndex,
		allowReorder,
		className: "bg-white",
		children: ({ handleRef }) => {
			const dragHandleRef = useDnd ? handleRef : void 0;
			const rowModifications = modifyRow ? modifyRow(row, rowIndex) : null;
			const legacyBeforeRowMenuItems = renderRowMenuItems?.({
				row,
				rowIndex,
				rowCount
			});
			const customRowMenuItemsBeforeCore = renderRowMenuItemsBeforeCore?.({
				row,
				rowIndex,
				rowCount
			}) ?? legacyBeforeRowMenuItems;
			const customRowMenuItemsAfterCore = renderRowMenuItemsAfterCore?.({
				row,
				rowIndex,
				rowCount
			});
			const hasCustomRowMenuItemsBeforeCore = Boolean(customRowMenuItemsBeforeCore);
			const hasCustomRowMenuItemsAfterCore = Boolean(customRowMenuItemsAfterCore);
			const hasMoveActions = showReorderControls && rowCount > 1;
			const hasMenuActions = hasMoveActions || hasCustomRowMenuItemsBeforeCore || hasCustomRowMenuItemsAfterCore;
			return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(RowDataCells, {
				row,
				rowIndex,
				columns,
				columnsSignature,
				modifyColumn,
				modifyRow,
				getCellErrors,
				onUpdateCell
			}), (showReorderControls || allowDelete) && /* @__PURE__ */ jsx(TableCell, {
				className: cn(rowModifications?.cellClassName ?? "bg-[#fbfcfe]"),
				title: rowModifications?.title,
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center px-1",
					children: [
						showReorderControls && /* @__PURE__ */ jsx("span", {
							ref: dragHandleRef,
							children: /* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "none",
								size: "xs",
								disabled: !useDnd,
								className: cn("cursor-move", "p-0 w-[24px] h-[24px]", "text-gray-500", "hover:bg-transparent", "active:bg-transparent", "hover:text-blue-500", !useDnd && "opacity-40 cursor-default"),
								children: /* @__PURE__ */ jsx("div", {
									className: "size-3",
									children: /* @__PURE__ */ jsx("svg", {
										xmlns: "http://www.w3.org/2000/svg",
										viewBox: "0 0 448 512",
										focusable: "false",
										"aria-hidden": "true",
										children: /* @__PURE__ */ jsx("path", {
											fill: "currentColor",
											d: "M71.3 295.6c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2s-57.4 21.9-79.2 0zM184.4 182.5c-21.9-21.9-21.9-57.3 0-79.2s57.3-21.9 79.2 0 21.9 57.3 0 79.2-57.3 21.8-79.2 0zm0 147c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.9-21.8-21.9-57.3 0-79.2zM297.5 216.4c21.9-21.9 57.3-21.9 79.2 0s21.9 57.3 0 79.2s-57.3 21.9-79.2 0c-21.8-21.9-21.8-57.3 0-79.2z"
										})
									})
								})
							})
						}),
						showReorderControls && /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
							render: /* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "none",
								size: "xs",
								disabled: !hasMenuActions,
								className: cn("p-0 w-[24px] h-[24px]", "text-gray-500", "hover:bg-transparent", "active:bg-transparent", "hover:text-blue-500", !hasMenuActions && "opacity-40 cursor-not-allowed"),
								"aria-label": t("Row actions")
							}),
							children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
								icon: faEllipsis,
								className: "size-[12px]"
							})
						}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
							align: "end",
							children: [
								customRowMenuItemsBeforeCore,
								hasCustomRowMenuItemsBeforeCore && hasMoveActions && /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
								showReorderControls && rowIndex > 0 && /* @__PURE__ */ jsxs(DropdownMenuItem, {
									onClick: () => {
										return moveRow(row, -1);
									},
									children: [/* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faArrowUp }), t("Move up")]
								}),
								showReorderControls && rowIndex < rowCount - 1 && /* @__PURE__ */ jsxs(DropdownMenuItem, {
									onClick: () => {
										return moveRow(row, 1);
									},
									children: [/* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faArrowDown }), t("Move down")]
								}),
								hasMoveActions && hasCustomRowMenuItemsAfterCore && /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
								customRowMenuItemsAfterCore
							]
						})] }),
						renderRowActions?.({
							row,
							rowIndex,
							rowCount
						}),
						allowDelete && /* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "none",
							size: "xs",
							onClick: () => {
								return removeRow(row);
							},
							className: cn("p-0 w-[24px] h-[24px]", "text-gray-500", "hover:bg-transparent", "active:bg-transparent", "hover:text-red-500"),
							children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
								icon: faXmark,
								className: "size-[12px] mt-[2px]"
							})
						})
					]
				})
			})] });
		}
	});
}, (prevProps, nextProps) => {
	return prevProps.row === nextProps.row && prevProps.rowIndex === nextProps.rowIndex && prevProps.rowCount === nextProps.rowCount && prevProps.columnsSignature === nextProps.columnsSignature && prevProps.getCellErrors === nextProps.getCellErrors && prevProps.useDnd === nextProps.useDnd && prevProps.allowReorder === nextProps.allowReorder && prevProps.showReorderControls === nextProps.showReorderControls && prevProps.allowDelete === nextProps.allowDelete && prevProps.modifyRow === nextProps.modifyRow && prevProps.renderRowActions === nextProps.renderRowActions && prevProps.renderRowMenuItemsBeforeCore === nextProps.renderRowMenuItemsBeforeCore && prevProps.renderRowMenuItemsAfterCore === nextProps.renderRowMenuItemsAfterCore && prevProps.renderRowMenuItems === nextProps.renderRowMenuItems;
});
//#endregion
export { TableRow };

//# sourceMappingURL=TableRow.js.map