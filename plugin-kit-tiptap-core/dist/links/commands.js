import { getMarkRange } from "@tiptap/core";
//#region src/links/commands.ts
function buildLinkMarkAttributes(url, openInNewTab) {
	const linkAttrs = { href: url };
	if (openInNewTab) linkAttrs.target = "_blank";
	return linkAttrs;
}
function getSelectedText(editor) {
	const { from, to } = editor.state.selection;
	return editor.state.doc.textBetween(from, to, " ");
}
function getLinkOpenInNewTab(editor) {
	return editor.isActive("link") && editor.getAttributes("link").target === "_blank";
}
function getLinkEditState(editor) {
	const { href } = editor.getAttributes("link");
	const { state } = editor;
	const linkType = state.schema.marks.link;
	const range = getMarkRange(state.selection.$from, linkType);
	const from = range?.from ?? state.selection.from;
	const to = range?.to ?? state.selection.to;
	const text = editor.state.doc.textBetween(from, to, " ");
	return {
		from,
		to,
		href: href ?? "",
		text,
		openInNewTab: getLinkOpenInNewTab(editor)
	};
}
function applyLinkToEditor(editor, params) {
	const { url, text, openInNewTab, from: fromParam, to: toParam } = params;
	const chain = editor.chain().focus();
	const linkAttrs = buildLinkMarkAttributes(url, openInNewTab);
	const content = {
		type: "text",
		text: text.trim() || url,
		marks: [{
			type: "link",
			attrs: linkAttrs
		}]
	};
	if (typeof fromParam === "number" && typeof toParam === "number" && fromParam !== toParam) {
		chain.insertContentAt({
			from: fromParam,
			to: toParam
		}, [content]).run();
		return;
	}
	const { from, to } = editor.state.selection;
	if (editor.state.doc.textBetween(from, to, " ")) {
		chain.extendMarkRange("link").setLink(linkAttrs).run();
		return;
	}
	chain.insertContent([content]).run();
}
function unsetLinkFromEditor(editor) {
	editor.chain().focus().extendMarkRange("link").unsetLink().run();
}
//#endregion
export { applyLinkToEditor, buildLinkMarkAttributes, getLinkEditState, getLinkOpenInNewTab, getSelectedText, unsetLinkFromEditor };

//# sourceMappingURL=commands.js.map