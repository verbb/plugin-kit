//#region src/constants.ts
var CODE_EDITOR_LINE_HEIGHT_PX = 18;
function computeCodeEditorMinHeight(rows = 12) {
	return `${Math.max(Number(rows) || 12, 4) * 18 + 12}px`;
}
//#endregion
export { CODE_EDITOR_LINE_HEIGHT_PX, computeCodeEditorMinHeight };

//# sourceMappingURL=constants.js.map