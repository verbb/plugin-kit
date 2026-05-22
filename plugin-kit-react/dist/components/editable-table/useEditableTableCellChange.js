import { utils_exports } from "../../utils/index.js";
import { GENERATED_CELL_MODE, getGeneratedCellKey, isEmptyCellValue, isGeneratedColumn } from "./helpers.js";
import { useCallback, useEffect, useRef } from "react";
//#region src/components/editable-table/useEditableTableCellChange.ts
var useEditableTableCellChange = ({ internalData, internalDataRef, setInternalData, skipNextRowsSyncRef, generatedColumns, onCellChange, updateRow, handleChange }) => {
	const pendingCellChangesRef = useRef(/* @__PURE__ */ new Map());
	const cellChangesRafRef = useRef(null);
	const generatedCellModesRef = useRef(/* @__PURE__ */ new Map());
	useEffect(() => {
		if (internalData.length === 0 || generatedColumns.length === 0) {
			generatedCellModesRef.current.clear();
			return;
		}
		const validKeys = /* @__PURE__ */ new Set();
		internalData.forEach((row) => {
			generatedColumns.forEach((column) => {
				const key = getGeneratedCellKey(row._id, column.name);
				validKeys.add(key);
				if (generatedCellModesRef.current.has(key)) return;
				const value = row[column.name];
				generatedCellModesRef.current.set(key, isEmptyCellValue(value) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.SEEDED);
			});
		});
		Array.from(generatedCellModesRef.current.keys()).forEach((key) => {
			if (!validKeys.has(key)) generatedCellModesRef.current.delete(key);
		});
	}, [generatedColumns, internalData]);
	const flushPendingCellChanges = useCallback(() => {
		cellChangesRafRef.current = null;
		if (!onCellChange || pendingCellChangesRef.current.size === 0) return;
		const entries = Array.from(pendingCellChangesRef.current.values());
		pendingCellChangesRef.current.clear();
		entries.forEach(({ rowIndex, columnName, value, row }) => {
			onCellChange(rowIndex, columnName, value, row);
		});
	}, [onCellChange]);
	useEffect(() => {
		return () => {
			if (cellChangesRafRef.current !== null && typeof cancelAnimationFrame === "function") cancelAnimationFrame(cellChangesRafRef.current);
			flushPendingCellChanges();
		};
	}, [flushPendingCellChanges]);
	return { handleCellValueChange: useCallback((rowIndex, row, column, newValue) => {
		if (column.type === "radio") {
			const nextChecked = Boolean(newValue);
			const updatesByRowId = /* @__PURE__ */ new Map();
			const allowUnselect = Boolean(column.allowUnselect);
			if (nextChecked) internalDataRef.current.forEach((item) => {
				const currentValue = Boolean(item[column.name]);
				const targetValue = item._id === row._id;
				if (currentValue !== targetValue) updatesByRowId.set(item._id, { [column.name]: targetValue });
			});
			else if (allowUnselect && Boolean(row[column.name])) updatesByRowId.set(row._id, { [column.name]: false });
			else return;
			if (updatesByRowId.size === 0) return;
			const nextData = internalDataRef.current.map((item) => {
				const rowUpdates = updatesByRowId.get(item._id);
				return rowUpdates ? {
					...item,
					...rowUpdates
				} : item;
			});
			skipNextRowsSyncRef.current += 1;
			setInternalData(nextData);
			if (onCellChange) {
				updatesByRowId.forEach((updates, rowId) => {
					const targetRow = internalDataRef.current.find((item) => {
						return item._id === rowId;
					});
					const targetRowIndex = internalDataRef.current.findIndex((item) => {
						return item._id === rowId;
					});
					if (!targetRow || targetRowIndex === -1) return;
					Object.entries(updates).forEach(([columnName, value]) => {
						const key = `${rowId || targetRowIndex}:${columnName}`;
						pendingCellChangesRef.current.set(key, {
							rowIndex: targetRowIndex,
							columnName,
							value,
							row: targetRow
						});
					});
				});
				if (cellChangesRafRef.current === null) if (typeof requestAnimationFrame === "function") cellChangesRafRef.current = requestAnimationFrame(flushPendingCellChanges);
				else flushPendingCellChanges();
				return;
			}
			handleChange(nextData);
			return;
		}
		if (isGeneratedColumn(column)) {
			const targetKey = getGeneratedCellKey(row._id, column.name);
			generatedCellModesRef.current.set(targetKey, GENERATED_CELL_MODE.MANUAL);
		}
		const sourceUpdate = { [column.name]: newValue };
		const derivedUpdates = {};
		generatedColumns.forEach((targetColumn) => {
			if (targetColumn.source !== column.name) return;
			const targetKey = getGeneratedCellKey(row._id, targetColumn.name);
			const currentTargetValue = row[targetColumn.name];
			const existingMode = generatedCellModesRef.current.get(targetKey) ?? (isEmptyCellValue(currentTargetValue) ? GENERATED_CELL_MODE.EMPTY : GENERATED_CELL_MODE.SEEDED);
			if (existingMode === GENERATED_CELL_MODE.MANUAL || existingMode === GENERATED_CELL_MODE.SEEDED) return;
			if (targetColumn.type === "handle") {
				derivedUpdates[targetColumn.name] = (0, utils_exports.generateHandle)(String(newValue ?? ""));
				generatedCellModesRef.current.set(targetKey, GENERATED_CELL_MODE.AUTO);
			} else if (targetColumn.type === "value") {
				derivedUpdates[targetColumn.name] = newValue;
				generatedCellModesRef.current.set(targetKey, GENERATED_CELL_MODE.AUTO);
			}
		});
		const allUpdates = {
			...sourceUpdate,
			...derivedUpdates
		};
		if (!Object.entries(allUpdates).some(([key, value]) => {
			return row[key] !== value;
		})) return;
		if (column.onChange) column.onChange(newValue, row, column.name);
		if (onCellChange) {
			skipNextRowsSyncRef.current += 1;
			setInternalData((prevData) => {
				return (0, utils_exports.updateItem)(prevData, row, allUpdates);
			});
			Object.entries(allUpdates).forEach(([columnName, value]) => {
				const key = `${row._id || rowIndex}:${columnName}`;
				pendingCellChangesRef.current.set(key, {
					rowIndex,
					columnName,
					value,
					row
				});
			});
			if (cellChangesRafRef.current === null) if (typeof requestAnimationFrame === "function") cellChangesRafRef.current = requestAnimationFrame(flushPendingCellChanges);
			else flushPendingCellChanges();
			return;
		}
		updateRow(row, allUpdates);
	}, [
		flushPendingCellChanges,
		generatedColumns,
		handleChange,
		internalDataRef,
		onCellChange,
		setInternalData,
		skipNextRowsSyncRef,
		updateRow
	]) };
};
//#endregion
export { useEditableTableCellChange };

//# sourceMappingURL=useEditableTableCellChange.js.map