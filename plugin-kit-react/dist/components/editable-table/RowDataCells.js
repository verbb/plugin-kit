import { cn } from "../../utils/classes.js";
import "../../utils/index.js";
import { TableCell } from "./TableCell.js";
import { TableCell as TableCell$1 } from "../Table.js";
import "../index.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/editable-table/RowDataCells.jsx
var RowDataCells = React.memo(({ row, rowIndex, columns, columnsSignature, modifyColumn, modifyRow, getCellErrors, onUpdateCell }) => {
	const rowModifications = modifyRow ? modifyRow(row, rowIndex) : null;
	return columns.map((column) => {
		const columnModifications = modifyColumn ? modifyColumn(row, column.name) : null;
		return /* @__PURE__ */ jsx(TableCell$1, {
			className: cn(column.className, rowModifications?.cellClassName, columnModifications?.cellClassName),
			title: rowModifications?.title ?? columnModifications?.title,
			children: /* @__PURE__ */ jsx(TableCell, {
				row,
				rowIndex,
				column,
				value: row[column.name],
				modifyColumn,
				getCellErrors,
				onUpdateCell
			})
		}, column.name);
	});
}, (prevProps, nextProps) => {
	return prevProps.row === nextProps.row && prevProps.rowIndex === nextProps.rowIndex && prevProps.columnsSignature === nextProps.columnsSignature && prevProps.getCellErrors === nextProps.getCellErrors && prevProps.modifyRow === nextProps.modifyRow;
});
//#endregion
export { RowDataCells };

//# sourceMappingURL=RowDataCells.js.map