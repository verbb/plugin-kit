import { utils_exports } from "../../utils/index.js";
import { useCallback, useEffect, useRef, useState } from "react";
//#region src/components/editable-table/useEditableTableRows.ts
var reorderByIndex = (items, from, to) => {
	if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return items;
	const nextItems = [...items];
	const [moved] = nextItems.splice(from, 1);
	nextItems.splice(to, 0, moved);
	return nextItems;
};
var useEditableTableRows = ({ rows, onChange, newRowDefaults = {} }) => {
	const [internalData, setInternalData] = useState([]);
	const stableRowIdsRef = useRef([]);
	const internalDataRef = useRef([]);
	const skipNextRowsSyncRef = useRef(0);
	const rowsMatch = (prevRows = [], nextRows = []) => {
		if (prevRows.length !== nextRows.length) return false;
		for (let i = 0; i < prevRows.length; i++) {
			const prevRow = prevRows[i] || {};
			const nextRow = nextRows[i] || {};
			if (prevRow._id !== nextRow._id) return false;
			const keys = new Set([...Object.keys(prevRow), ...Object.keys(nextRow)]);
			for (const key of keys) {
				if (key === "_id") continue;
				if (prevRow[key] !== nextRow[key]) return false;
			}
		}
		return true;
	};
	useEffect(() => {
		if (!rows || rows.length === 0) {
			stableRowIdsRef.current = [];
			setInternalData([]);
			return;
		}
		if (skipNextRowsSyncRef.current > 0) {
			skipNextRowsSyncRef.current -= 1;
			return;
		}
		setInternalData((prevData) => {
			const nextData = (0, utils_exports.normalizeCollection)(rows).map((normalizedRow, index) => {
				if (rows[index]?._id) {
					stableRowIdsRef.current[index] = rows[index]._id;
					return normalizedRow;
				}
				const stableId = prevData[index]?._id || stableRowIdsRef.current[index] || normalizedRow._id;
				stableRowIdsRef.current[index] = stableId;
				return {
					...normalizedRow,
					_id: stableId
				};
			});
			stableRowIdsRef.current = stableRowIdsRef.current.slice(0, nextData.length);
			if (rowsMatch(prevData, nextData)) return prevData;
			return nextData;
		});
	}, [rows]);
	useEffect(() => {
		internalDataRef.current = internalData;
	}, [internalData]);
	const handleChange = useCallback((nextRows) => {
		onChange(nextRows);
	}, [onChange]);
	return {
		internalData,
		setInternalData,
		internalDataRef,
		skipNextRowsSyncRef,
		handleChange,
		addRow: useCallback(() => {
			const nextData = [...internalDataRef.current, (0, utils_exports.createItem)(newRowDefaults)];
			skipNextRowsSyncRef.current += 1;
			setInternalData(nextData);
			handleChange(nextData);
		}, [handleChange, newRowDefaults]),
		removeRow: useCallback((row) => {
			const nextData = (0, utils_exports.deleteItem)(internalDataRef.current, row);
			skipNextRowsSyncRef.current += 1;
			setInternalData(nextData);
			handleChange(nextData);
		}, [handleChange]),
		updateRow: useCallback((row, updates) => {
			if (!Object.entries(updates).some(([key, val]) => {
				return row[key] !== val;
			})) return;
			const nextData = (0, utils_exports.updateItem)(internalDataRef.current, row, updates);
			skipNextRowsSyncRef.current += 1;
			setInternalData(nextData);
			handleChange(nextData);
		}, [handleChange]),
		moveRow: useCallback((row, direction) => {
			const prevData = internalDataRef.current;
			const index = prevData.findIndex((item) => {
				return item._id === row._id;
			});
			const nextIndex = index + direction;
			if (index === -1 || nextIndex < 0 || nextIndex >= prevData.length) return;
			const nextData = reorderByIndex(prevData, index, nextIndex);
			skipNextRowsSyncRef.current += 1;
			setInternalData(nextData);
			handleChange(nextData);
		}, [handleChange])
	};
};
//#endregion
export { useEditableTableRows };

//# sourceMappingURL=useEditableTableRows.js.map