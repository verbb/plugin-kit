import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { useTranslation } from "../hooks/useTranslation.js";
import "../hooks/index.js";
import { TableRow } from "./editable-table/TableRow.js";
import { isGeneratedColumn, isThinColumn } from "./editable-table/helpers.js";
import { useEditableTableRows } from "./editable-table/useEditableTableRows.js";
import { useEditableTableDnd } from "./editable-table/useEditableTableDnd.js";
import { useEditableTableCellChange } from "./editable-table/useEditableTableCellChange.js";
import { Table, TableBody, TableHead, TableHeader, TableRow as TableRow$1 } from "./Table.js";
import "./index.js";
import { Button } from "./Button.js";
import { useCallback, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { DragDropProvider } from "@dnd-kit/react";
import { AutoScroller } from "@dnd-kit/dom";
//#region src/components/EditableTable.tsx
function EditableTable({ columns, rows, onChange, onCellChange = void 0, addRowLabel, allowReorder = true, allowAdd = true, allowDelete = true, className = "", modifyColumn = void 0, fieldName = void 0, cellErrors = {}, newRowDefaults = {}, renderActions = void 0, renderRowActions = void 0, renderRowMenuItemsBeforeCore = void 0, renderRowMenuItemsAfterCore = void 0, renderRowMenuItems = void 0 }) {
	const TableRowComponent = TableRow;
	const t = useTranslation();
	const normalizedColumns = useMemo(() => {
		const sourceColumns = Array.isArray(columns) ? columns : [];
		const validColumns = sourceColumns.filter((column) => {
			return typeof column?.name === "string" && column.name.trim() !== "";
		});
		if (validColumns.length !== sourceColumns.length) {
			const invalidColumns = sourceColumns.filter((column) => {
				return !(typeof column?.name === "string" && column.name.trim() !== "");
			});
			console.error("EditableTable: column definitions must include a non-empty `name`.", {
				invalidColumns,
				columns: sourceColumns
			});
		}
		return validColumns;
	}, [columns]);
	const generatedColumns = useMemo(() => {
		return normalizedColumns.filter(isGeneratedColumn);
	}, [normalizedColumns]);
	const columnsSignature = useMemo(() => {
		return JSON.stringify(normalizedColumns.map((column) => {
			return {
				name: column.name,
				type: column.type,
				label: column.label,
				required: column.required,
				placeholder: column.placeholder,
				options: column.options
			};
		}));
	}, [normalizedColumns]);
	const { internalData, setInternalData, internalDataRef, skipNextRowsSyncRef, handleChange, addRow, removeRow, updateRow, moveRow } = useEditableTableRows({
		rows,
		onChange,
		newRowDefaults
	});
	const { isDragging, isDndHydrated, effectiveAllowReorder, handleDragStart, handleDragEnd } = useEditableTableDnd({
		allowReorder,
		internalData,
		handleChange
	});
	const { handleCellValueChange } = useEditableTableCellChange({
		internalData,
		internalDataRef,
		setInternalData,
		skipNextRowsSyncRef,
		generatedColumns,
		onCellChange,
		updateRow,
		handleChange
	});
	const getCellErrors = useCallback((rowIndex, columnName) => {
		if (!fieldName) return [];
		const key = `${fieldName}.${rowIndex}.${columnName}`;
		const errors = cellErrors?.[key];
		if (!errors) return [];
		return Array.isArray(errors) ? errors : [errors];
	}, [cellErrors, fieldName]);
	return /* @__PURE__ */ jsxs("div", {
		className,
		children: [
			typeof renderActions === "function" ? renderActions({
				rows: internalData,
				addRow,
				isDragging
			}) : null,
			/* @__PURE__ */ jsx(DragDropProvider, {
				plugins: useCallback((defaults) => {
					return defaults.filter((plugin) => {
						return plugin !== AutoScroller;
					});
				}, []),
				onDragStart: handleDragStart,
				onDragEnd: handleDragEnd,
				children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow$1, { children: [normalizedColumns.map((column) => {
					return /* @__PURE__ */ jsxs(TableHead, {
						className: cn(column.className, isThinColumn(column) && "w-[1%] whitespace-nowrap"),
						children: [column.label, column.required && /* @__PURE__ */ jsx("span", {
							className: "text-error ml-1",
							children: "*"
						})]
					}, column.name);
				}), (allowReorder || allowDelete) && /* @__PURE__ */ jsx(TableHead, { className: "p-0 w-0" })] }) }), /* @__PURE__ */ jsx(TableBody, { children: internalData.map((row, rowIndex) => {
					return /* @__PURE__ */ jsx(TableRowComponent, {
						row,
						rowIndex,
						rowCount: internalData.length,
						columns: normalizedColumns,
						columnsSignature,
						useDnd: allowReorder && isDndHydrated,
						allowReorder: effectiveAllowReorder && isDndHydrated,
						showReorderControls: allowReorder,
						allowDelete,
						modifyColumn,
						getCellErrors,
						onUpdateCell: handleCellValueChange,
						moveRow,
						removeRow,
						t,
						renderRowActions,
						renderRowMenuItemsBeforeCore,
						renderRowMenuItemsAfterCore,
						renderRowMenuItems
					}, row._id);
				}) })] })
			}),
			allowAdd && /* @__PURE__ */ jsxs(Button, {
				type: "button",
				variant: "dashed",
				onClick: addRow,
				className: cn("w-full rounded-t-none! border-t-0!", isDragging && "pointer-events-none"),
				children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
					icon: faPlus,
					className: "size-3 mr-1"
				}), addRowLabel || t("Add row")]
			})
		]
	});
}
//#endregion
export { EditableTable };

//# sourceMappingURL=EditableTable.js.map