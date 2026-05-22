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
//#endregion
export { getRichTextHtml, getRichTextText };

//# sourceMappingURL=tiptap.js.map