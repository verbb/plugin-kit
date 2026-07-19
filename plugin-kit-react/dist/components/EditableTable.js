import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { PkEditableTable, getCustomCellSlotName, isCustomColumn, nextRowId } from "@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js";
//#region src/components/EditableTable.tsx
var PkEditableTableElement = createPluginKitComponent({
	tagName: "pk-editable-table",
	elementClass: PkEditableTable,
	react: React,
	events: {
		onPkChange: "pk-change",
		onPkCellChange: "pk-cell-change",
		onPkRowMenuSelect: "pk-row-menu-select",
		onInput: "input",
		onChange: "change"
	}
});
function optionalBoolean(name, value) {
	if (value === void 0) return {};
	return { [name]: value };
}
function cellHasError(cellErrors, fieldName, rowIndex, columnName) {
	if (!cellErrors) return false;
	const errors = (fieldName ? cellErrors[`${fieldName}.${rowIndex}.${columnName}`] : void 0) ?? cellErrors[`${rowIndex}.${columnName}`];
	if (!errors) return false;
	return Array.isArray(errors) ? errors.length > 0 : Boolean(errors);
}
function normalizeColumnsForElement(columns) {
	if (!Array.isArray(columns)) return [];
	return columns.map((column) => {
		const forceCustom = typeof column.renderCell === "function" || column.type === "custom" || typeof column.type === "string" && column.type !== "" && isCustomColumn({
			name: String(column.name),
			type: column.type
		});
		return {
			name: String(column.name),
			type: (forceCustom ? "custom" : column.type) || "text",
			label: column.label,
			required: column.required,
			placeholder: column.placeholder,
			width: column.width,
			thin: column.thin,
			options: column.options,
			source: column.source,
			allowUnselect: column.allowUnselect,
			class: column.class || column.className || void 0
		};
	});
}
function wrapModifyRow(modifyRow) {
	if (!modifyRow) return null;
	return (row, rowIndex) => {
		const result = modifyRow(row, rowIndex);
		if (!result || typeof result !== "object") return result ?? void 0;
		if ("cellClassName" in result || "tone" in result) {
			const typed = result;
			return {
				class: typed.class || typed.cellClassName,
				title: typed.title,
				tone: typed.tone
			};
		}
		return result;
	};
}
/**
* Keep stable `_id`s for slotted custom cells. The CE also mints ids, but React
* projections key slots from the rows prop — without ids on first paint, TipTap
* cells would mount empty until the next pk-change.
*/
function ensureRowIds(rows, previousIds) {
	if (!Array.isArray(rows)) return {
		rows: [],
		ids: [],
		minted: false
	};
	let minted = false;
	const ids = [];
	return {
		rows: rows.map((row, index) => {
			if (typeof row._id === "string" && row._id !== "") {
				ids[index] = row._id;
				return row;
			}
			const reused = previousIds[index];
			const id = reused || nextRowId();
			if (!reused) minted = true;
			ids[index] = id;
			return {
				...row,
				_id: id
			};
		}),
		ids,
		minted
	};
}
/**
* React facade over `<pk-editable-table>`.
* Behavior and styles live in the web component; this layer adds React sugar
* (`onChange`, `onCellChange`, `renderCell` light-DOM projection, `modifyRow`
* className alias) without reimplementing the table.
*/
var EditableTable = forwardRef(function EditableTable({ allowAdd, allowDelete, allowReorder, columns, rows, cellErrors, fieldName, onChange, onCellChange, onPkChange, onPkCellChange, onPkRowMenuSelect, onRowMenuSelect, modifyColumn, modifyRow, getRowMenuItems, renderRowMenuItemsBeforeCore, children, ...rest }, ref) {
	const elementRef = useRef(null);
	const rowIdsRef = useRef([]);
	useImperativeHandle(ref, () => elementRef.current, []);
	const { rows: rowsWithIds, ids: nextIds, minted } = useMemo(() => ensureRowIds(rows, rowIdsRef.current), [rows]);
	rowIdsRef.current = nextIds;
	useEffect(() => {
		if (!minted || !onChange) return;
		onChange(rowsWithIds);
	}, [
		minted,
		onChange,
		rowsWithIds
	]);
	const elementColumns = useMemo(() => normalizeColumnsForElement(columns), [columns]);
	const resolvedGetRowMenuItems = getRowMenuItems ?? renderRowMenuItemsBeforeCore ?? null;
	const resolvedModifyRow = useMemo(() => wrapModifyRow(modifyRow), [modifyRow]);
	const handlePkChange = useCallback((event) => {
		onPkChange?.(event);
		if (!onChange) return;
		const detail = event.detail;
		if (detail?.rows) onChange(detail.rows);
	}, [onChange, onPkChange]);
	const handlePkCellChange = useCallback((event) => {
		onPkCellChange?.(event);
		if (!onCellChange) return;
		const detail = event.detail;
		if (!detail) return;
		onCellChange(detail.rowIndex, detail.columnName, detail.value, detail.row);
	}, [onCellChange, onPkCellChange]);
	const handlePkRowMenuSelect = useCallback((event) => {
		onPkRowMenuSelect?.(event);
		if (!onRowMenuSelect) return;
		const detail = event.detail;
		if (detail) onRowMenuSelect(detail);
	}, [onPkRowMenuSelect, onRowMenuSelect]);
	const customCellProjections = useMemo(() => {
		if (!Array.isArray(columns) || rowsWithIds.length === 0) return null;
		const projections = [];
		rowsWithIds.forEach((row, rowIndex) => {
			const rowId = String(row._id);
			columns.forEach((column) => {
				if (typeof column.renderCell !== "function") return;
				const columnName = String(column.name);
				const slotName = getCustomCellSlotName(rowId, columnName);
				const isInvalid = cellHasError(cellErrors, typeof fieldName === "string" ? fieldName : void 0, rowIndex, columnName);
				projections.push(/* @__PURE__ */ jsx("div", {
					slot: slotName,
					className: typeof column.contentClassName === "string" ? column.contentClassName : void 0,
					children: column.renderCell({
						column,
						row,
						rowIndex,
						value: row[columnName],
						isInvalid,
						updateValue: (next) => {
							elementRef.current?.setCellValue(rowIndex, columnName, next);
						}
					})
				}, slotName));
			});
		});
		return projections.length > 0 ? projections : null;
	}, [
		cellErrors,
		columns,
		fieldName,
		rowsWithIds
	]);
	return /* @__PURE__ */ jsxs(PkEditableTableElement, {
		ref: elementRef,
		...rest,
		columns: elementColumns,
		rows: rowsWithIds,
		cellErrors,
		fieldName,
		modifyColumn: modifyColumn ?? null,
		modifyRow: resolvedModifyRow,
		getRowMenuItems: resolvedGetRowMenuItems,
		...optionalBoolean("allowAdd", allowAdd),
		...optionalBoolean("allowDelete", allowDelete),
		...optionalBoolean("allowReorder", allowReorder),
		...onChange || onPkChange ? { onPkChange: handlePkChange } : {},
		...onCellChange || onPkCellChange ? { onPkCellChange: handlePkCellChange } : {},
		...onRowMenuSelect || onPkRowMenuSelect ? { onPkRowMenuSelect: handlePkRowMenuSelect } : {},
		children: [customCellProjections, children]
	});
});
EditableTable.displayName = "EditableTable";
//#endregion
export { EditableTable, PkEditableTableElement, getCustomCellSlotName };

//# sourceMappingURL=EditableTable.js.map