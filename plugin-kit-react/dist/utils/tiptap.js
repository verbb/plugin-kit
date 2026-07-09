import { generateHTML } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
//#region src/utils/tiptap.ts
/**
* Convert ProseMirror JSON content to HTML
* @param {Array} json - ProseMirror JSON content array
* @returns {string} - Generated HTML string
*/
var getRichTextHtml = (json) => {
	if (!json) return "";
	if (typeof json === "string") try {
		json = JSON.parse(json);
	} catch {
		return json;
	}
	return generateHTML({
		type: "doc",
		content: json
	}, [
		Document,
		Paragraph,
		Text
	]);
};
/**
* Extract plain text from ProseMirror JSON content
* @param {Array} json - ProseMirror JSON content array
* @returns {string} - Plain text string
*/
var getRichTextText = (json) => {
	if (!json) return "";
	return getRichTextHtml(json).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
};
var INVISIBLE_CHAR_PATTERN = /[\u200B\u200C\u200D\u2060\uFEFF]/g;
var normalizeRichTextNodes = (value) => {
	if (value == null || value === "") return [];
	if (Array.isArray(value)) return value;
	if (typeof value === "object") {
		const node = value;
		if (node.type === "doc" && Array.isArray(node.content)) return node.content;
		if (node.type) return [node];
	}
	if (typeof value === "string") try {
		return normalizeRichTextNodes(JSON.parse(value));
	} catch {
		return value.replace(INVISIBLE_CHAR_PATTERN, "").trim() ? [{
			type: "paragraph",
			content: [{
				type: "text",
				text: value
			}]
		}] : [];
	}
	return [];
};
var collectRichTextPlainText = (nodes) => {
	let text = "";
	const visit = (node) => {
		if (!node || typeof node !== "object") return;
		const jsonNode = node;
		if (jsonNode.type === "text" && typeof jsonNode.text === "string") {
			text += jsonNode.text.replace(INVISIBLE_CHAR_PATTERN, "");
			return;
		}
		if (jsonNode.type === "variableTag") {
			const attrs = jsonNode.attrs;
			const label = typeof attrs?.label === "string" ? attrs.label : "";
			const variableValue = typeof attrs?.value === "string" ? attrs.value : "";
			text += (label || variableValue).replace(INVISIBLE_CHAR_PATTERN, "");
			return;
		}
		if (Array.isArray(jsonNode.content)) jsonNode.content.forEach(visit);
	};
	nodes.forEach(visit);
	return text.trim();
};
/**
* Whether stored TipTap/ProseMirror content has no user-visible text.
* Empty editors often serialize to `[]` or `[{ type: 'paragraph' }]`, which are
* not blank for generic `isEmptyValue` checks.
*/
var isRichTextEmpty = (value) => {
	const nodes = normalizeRichTextNodes(value);
	if (!nodes.length) return true;
	return collectRichTextPlainText(nodes).length === 0;
};
//#endregion
export { getRichTextHtml, getRichTextText, isRichTextEmpty };

//# sourceMappingURL=tiptap.js.map