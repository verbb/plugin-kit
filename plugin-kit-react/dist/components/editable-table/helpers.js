//#region src/components/editable-table/helpers.ts
var GENERATED_CELL_MODE = {
	EMPTY: "empty",
	AUTO: "auto",
	MANUAL: "manual",
	SEEDED: "seeded"
};
var isGeneratedColumn = (column) => {
	return (column?.type === "handle" || column?.type === "value") && column?.name && column?.source;
};
var isThinColumn = (column) => {
	return Boolean(column?.thin || column?.type === "checkbox" || column?.type === "lightswitch" || column?.type === "radio");
};
var getGeneratedCellKey = (rowId, columnName) => {
	return `${rowId}:${columnName}`;
};
var isEmptyCellValue = (value) => {
	return value === void 0 || value === null || value === "";
};
//#endregion
export { GENERATED_CELL_MODE, getGeneratedCellKey, isEmptyCellValue, isGeneratedColumn, isThinColumn };

//# sourceMappingURL=helpers.js.map