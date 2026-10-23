import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React, { forwardRef, useState } from "react";
import { DataTableRequestController, PkDataTable, dataTableCellSlot, dataTableValue, defaultDataTableQuery, persistDataTableView, queryDataTable } from "@verbb/plugin-kit-web/components/data-table/pk-data-table.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/DataTable.tsx
var PkDataTableElement = createPluginKitComponent({
	tagName: "pk-data-table",
	elementClass: PkDataTable,
	react: React,
	events: {
		onPkQueryChange: "pk-query-change",
		onPkViewChange: "pk-view-change",
		onPkSelectionChange: "pk-selection-change",
		onPkRowAction: "pk-row-action",
		onPkLoad: "pk-load",
		onPkLoadError: "pk-load-error",
		onPkRetry: "pk-retry",
		onPkExport: "pk-export"
	}
});
/** Only projects React cells; all table state and behaviour remain canonical. */
var DataTable = forwardRef(function DataTable({ columns = [], rows = [], rowKey = "id", children, onPkLoad, ...props }, ref) {
	const [loadedRows, setLoadedRows] = useState([]);
	const canonicalColumns = columns.map(({ renderCell, ...column }) => ({
		...column,
		...renderCell ? { type: "custom" } : {}
	}));
	const displayedRows = props.mode === "remote" && props.dataSource ? loadedRows : rows;
	return /* @__PURE__ */ jsxs(PkDataTableElement, {
		...props,
		ref,
		columns: canonicalColumns,
		rows,
		rowKey,
		onPkLoad: (event) => {
			setLoadedRows(event.detail.result.rows);
			onPkLoad?.(event);
		},
		children: [children, displayedRows.map((row) => columns.filter((column) => column.renderCell).map((column) => {
			const key = typeof rowKey === "function" ? rowKey(row) : row[rowKey];
			const slot = dataTableCellSlot(key, column.id);
			const canonical = canonicalColumns.find((item) => item.id === column.id);
			return /* @__PURE__ */ jsx("span", {
				slot,
				children: column.renderCell?.({
					row,
					column: canonical,
					value: dataTableValue(row, canonical),
					rowKey: key
				})
			}, slot);
		}))]
	});
});
//#endregion
export { DataTable, DataTableRequestController, PkDataTableElement, defaultDataTableQuery, persistDataTableView, queryDataTable };

//# sourceMappingURL=DataTable.js.map