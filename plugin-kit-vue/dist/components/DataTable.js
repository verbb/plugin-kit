import { defineComponent, h, shallowRef } from "vue";
import { DataTableRequestController, dataTableCellSlot, dataTableValue, defaultDataTableQuery, persistDataTableView, queryDataTable } from "@verbb/plugin-kit-web/components/data-table/pk-data-table.js";
//#region src/components/DataTable.ts
/** Named cell slots project Vue content; the web component owns the table. */
var DataTable = defineComponent({
	name: "PkDataTable",
	inheritAttrs: false,
	props: {
		mode: {
			type: String,
			default: "client"
		},
		dataSource: {
			type: Function,
			default: void 0
		},
		rows: {
			type: Array,
			default: () => []
		},
		columns: {
			type: Array,
			default: () => []
		},
		rowLabel: {
			type: [String, Function],
			default: void 0
		},
		rowActions: {
			type: Function,
			default: void 0
		},
		manualOrder: {
			type: Boolean,
			default: false
		},
		reorderDisabled: {
			type: Boolean,
			default: false
		},
		rowKey: {
			type: [String, Function],
			default: "id"
		}
	},
	setup(props, { attrs, slots }) {
		const loadedRows = shallowRef([]);
		return () => {
			const columns = props.columns.map((column) => ({
				...column,
				...slots[`cell-${column.id}`] ? {
					type: "custom",
					renderCell: void 0
				} : {}
			}));
			const rows = props.mode === "remote" && props.dataSource ? loadedRows.value : props.rows;
			return h("pk-data-table", {
				...attrs,
				mode: props.mode,
				dataSource: props.dataSource,
				rows: props.rows,
				columns,
				rowKey: props.rowKey,
				rowLabel: props.rowLabel,
				rowActions: props.rowActions,
				manualOrder: props.manualOrder,
				reorderDisabled: props.reorderDisabled,
				"onPk-load": (event) => {
					loadedRows.value = event.detail.result.rows;
					const listener = attrs["onPk-load"];
					if (typeof listener === "function") listener(event);
				}
			}, [...Object.entries(slots).filter(([name]) => !name.startsWith("cell-")).map(([name, slot]) => h("span", name === "default" ? {} : { slot: name }, slot?.())), ...rows.flatMap((row) => columns.filter((column) => slots[`cell-${column.id}`]).map((column) => {
				const key = typeof props.rowKey === "function" ? props.rowKey(row) : row[props.rowKey];
				const slot = dataTableCellSlot(key, column.id);
				return h("span", {
					key: slot,
					slot
				}, slots[`cell-${column.id}`]?.({
					row,
					column,
					rowKey: key,
					value: dataTableValue(row, column)
				}));
			}))]);
		};
	}
});
var PkDataTableElement = DataTable;
//#endregion
export { DataTable, DataTableRequestController, PkDataTableElement, defaultDataTableQuery, persistDataTableView, queryDataTable };

//# sourceMappingURL=DataTable.js.map