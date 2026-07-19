//#region src/toolbar/button-registry.ts
var HEADING_LEVELS = [
	1,
	2,
	3,
	4,
	5,
	6
];
function isTiptapButtonName(value) {
	if (HEADING_LEVELS.some((level) => value === `h${level}`)) return true;
	return [
		"bold",
		"italic",
		"underline",
		"strikethrough",
		"subscript",
		"superscript",
		"unordered-list",
		"ordered-list",
		"blockquote",
		"highlight",
		"code",
		"code-block",
		"hr",
		"line-break",
		"align-left",
		"align-center",
		"align-right",
		"align-justify",
		"clear-format",
		"undo",
		"redo",
		"link",
		"table",
		"variableTag"
	].includes(value);
}
function isTiptapButtonActive(editor, buttonName) {
	if (!isTiptapButtonName(buttonName)) return false;
	const headingMatch = buttonName.match(/^h([1-6])$/);
	if (headingMatch) {
		const level = Number(headingMatch[1]);
		return editor.isActive("heading", { level });
	}
	switch (buttonName) {
		case "bold": return editor.isActive("bold");
		case "italic": return editor.isActive("italic");
		case "underline": return editor.isActive("underline");
		case "strikethrough": return editor.isActive("strike");
		case "subscript": return editor.isActive("subscript");
		case "superscript": return editor.isActive("superscript");
		case "unordered-list": return editor.isActive("bulletList");
		case "ordered-list": return editor.isActive("orderedList");
		case "blockquote": return editor.isActive("blockquote");
		case "highlight": return editor.isActive("highlight");
		case "code": return editor.isActive("code");
		case "code-block": return editor.isActive("codeBlock");
		case "align-left": return editor.isActive({ textAlign: "left" });
		case "align-center": return editor.isActive({ textAlign: "center" });
		case "align-right": return editor.isActive({ textAlign: "right" });
		case "align-justify": return editor.isActive({ textAlign: "justify" });
		case "link": return editor.isActive("link");
		case "variableTag": return editor.isActive("variableTag");
		default: return false;
	}
}
function runTiptapButton(editor, buttonName, options = {}) {
	if (!isTiptapButtonName(buttonName)) return false;
	const chain = editor.chain().focus();
	const headingMatch = buttonName.match(/^h([1-6])$/);
	if (headingMatch) {
		const level = Number(headingMatch[1]);
		return chain.toggleHeading({ level }).run();
	}
	switch (buttonName) {
		case "bold": return chain.toggleBold().run();
		case "italic": return chain.toggleItalic().run();
		case "underline": return chain.toggleUnderline().run();
		case "strikethrough": return chain.toggleStrike().run();
		case "subscript": return chain.toggleSubscript().run();
		case "superscript": return chain.toggleSuperscript().run();
		case "unordered-list": return chain.toggleBulletList().run();
		case "ordered-list": return chain.toggleOrderedList().run();
		case "blockquote": return chain.toggleBlockquote().run();
		case "highlight": return chain.toggleHighlight().run();
		case "code": return chain.toggleCode().run();
		case "code-block": return chain.toggleCodeBlock().run();
		case "hr": return chain.setHorizontalRule().run();
		case "line-break": return chain.setHardBreak().run();
		case "align-left": return chain.setTextAlign("left").run();
		case "align-center": return chain.setTextAlign("center").run();
		case "align-right": return chain.setTextAlign("right").run();
		case "align-justify": return chain.setTextAlign("justify").run();
		case "clear-format": return chain.clearNodes().unsetAllMarks().run();
		case "undo": return chain.undo().run();
		case "redo": return chain.redo().run();
		case "table": {
			const tableOptions = options.tableOptions ?? {};
			return chain.insertTable({
				rows: tableOptions.rows ?? 3,
				cols: tableOptions.cols ?? 3,
				withHeaderRow: tableOptions.withHeaderRow ?? true
			}).run();
		}
		case "link":
		case "variableTag": return false;
		default: return false;
	}
}
//#endregion
export { isTiptapButtonActive, isTiptapButtonName, runTiptapButton };

//# sourceMappingURL=button-registry.js.map