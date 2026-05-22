import { cn } from "../../utils/classes.js";
import "../../utils/index.js";
import { TableCell } from "./TableCell.js";
import { TableCell as TableCell$1 } from "../Table.js";
import "../index.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/editable-table/RowDataCells.jsx
var isThinColumn = (column) => {
	return Boolean(column?.thin || column?.type === "checkbox" || column?.type === "lightswitch" || column?.type === "radio");
};
var RowDataCells = React.memo(({ row, rowIndex, columns, columnsSignature, modifyColumn, getCellErrors, onUpdateCell }) => {
	return columns.map((column) => {
		return /* @__PURE__ */ jsx(TableCell$1, {
			className: cn(column.className, isThinColumn(column) && "w-[1%] whitespace-nowrap"),
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
	return prevProps.row === nextProps.row && prevProps.rowIndex === nextProps.rowIndex && prevProps.columnsSignature === nextProps.columnsSignature && prevProps.getCellErrors === nextProps.getCellErrors;
});
//#endregion
export { RowDataCells };

//# sourceMappingURL=RowDataCells.js.map