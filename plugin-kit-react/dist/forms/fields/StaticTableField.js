import { EditableTable } from "../../components/EditableTable.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/StaticTableField.tsx
var normalizeColumnsConfig = (columnsConfig) => {
	if (Array.isArray(columnsConfig)) return columnsConfig;
	if (!columnsConfig || typeof columnsConfig !== "object") return [];
	return Object.entries(columnsConfig).map(([key, value]) => {
		const config = value && typeof value === "object" ? value : {};
		return {
			name: config.name || key,
			...config
		};
	});
};
var normalizeRowsConfig = (rowsConfig) => {
	if (Array.isArray(rowsConfig)) return rowsConfig;
	if (!rowsConfig || typeof rowsConfig !== "object") return [];
	return Object.entries(rowsConfig).map(([key, value]) => {
		return {
			key,
			...value && typeof value === "object" ? value : {}
		};
	});
};
var mapColumns = (columns) => {
	return (columns || []).map((config, index) => {
		const className = String(config?.class || "");
		const columnName = config?.name || `col${index + 1}`;
		const type = config?.type === "fieldSelect" ? "select" : config?.type || "text";
		const isThin = Boolean(config?.thin || className.includes("thin"));
		return {
			name: columnName,
			label: config?.label ?? config?.heading ?? columnName,
			type,
			required: Boolean(config?.required),
			options: config?.options,
			placeholder: config?.placeholder,
			thin: isThin,
			className
		};
	});
};
var mapRowsToArray = (rowEntries, columns, fieldValue) => {
	const editableColumnNames = columns.filter((column) => {
		return !["heading", "label"].includes(column.type || "");
	}).map((column) => {
		return column.name;
	});
	return rowEntries.map((defaultRow, index) => {
		const rowKey = String(defaultRow?.key || defaultRow?.name || `row${index + 1}`);
		const savedRow = fieldValue?.[rowKey];
		const savedRowData = savedRow && typeof savedRow === "object" ? savedRow : {};
		const normalizedRow = {
			...defaultRow,
			...savedRowData,
			__staticRowKey: rowKey,
			__staticRowIndex: index
		};
		if (editableColumnNames.length === 1 && typeof savedRow !== "object") normalizedRow[editableColumnNames[0]] = savedRow ?? "";
		return normalizedRow;
	});
};
var StaticTableField = ({ form, field }) => {
	const { value, setValue, setTouched, errors } = useEngineField(form, field.name);
	const rowEntries = useMemo(() => {
		return normalizeRowsConfig(field.rows);
	}, [field.rows]);
	const columns = useMemo(() => {
		return mapColumns(normalizeColumnsConfig(field.columns));
	}, [field.columns]);
	const rows = useMemo(() => {
		return mapRowsToArray(rowEntries, columns, value);
	}, [
		columns,
		rowEntries,
		value
	]);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		withControl: false,
		children: /* @__PURE__ */ jsx(EditableTable, {
			columns,
			rows,
			onChange: (nextRows) => {
				const nextValue = {};
				const editableColumns = columns.filter((column) => {
					return !["heading", "label"].includes(column.type || "");
				});
				nextRows.forEach((row, index) => {
					const fallbackKey = String(rowEntries[index]?.key || rowEntries[index]?.name || `row${index + 1}`);
					const rowKey = row.__staticRowKey || fallbackKey;
					if (editableColumns.length === 1) {
						nextValue[rowKey] = row[editableColumns[0].name] ?? "";
						return;
					}
					const normalizedRow = {};
					editableColumns.forEach((column) => {
						normalizedRow[column.name] = row[column.name] ?? "";
					});
					nextValue[rowKey] = normalizedRow;
				});
				setValue(nextValue);
				setTouched();
			},
			allowAdd: false,
			allowDelete: false,
			allowReorder: false,
			className: "",
			onCellChange: void 0,
			modifyColumn: void 0,
			fieldName: void 0,
			cellErrors: {}
		})
	});
};
//#endregion
export { StaticTableField };

//# sourceMappingURL=StaticTableField.js.map