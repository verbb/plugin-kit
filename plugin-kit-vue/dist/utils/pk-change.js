//#region src/utils/pk-change.ts
/** Read `{ checked }` from a `pk-change` event dispatched by boolean controls. */
function readPkCheckedDetail(event) {
	return Boolean(event.detail?.checked);
}
/** Read `{ value }` from a `pk-change` event dispatched by value controls. */
function readPkValueDetail(event) {
	return event.detail?.value ?? "";
}
//#endregion
export { readPkCheckedDetail, readPkValueDetail };

//# sourceMappingURL=pk-change.js.map