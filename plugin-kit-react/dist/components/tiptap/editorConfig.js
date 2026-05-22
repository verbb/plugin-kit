import VariableTag_default from "./VariableTag.js";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Underline from "@tiptap/extension-underline";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
//#region src/components/tiptap/editorConfig.ts
var createTiptapExtensions = ({ trailingCursorText = "​" } = {}) => {
	return [
		Document,
		Dropcursor,
		Gapcursor,
		Paragraph,
		Text,
		HardBreak,
		Bold,
		Code,
		Highlight,
		Italic,
		Strike,
		Subscript,
		Superscript,
		Underline,
		Blockquote,
		BulletList,
		CodeBlock,
		Heading.configure({ levels: [
			1,
			2,
			3,
			4,
			5,
			6
		] }),
		HorizontalRule,
		ListItem,
		OrderedList,
		Table.configure({ resizable: true }),
		TableRow,
		TableHeader,
		TableCell,
		History,
		Link.configure({
			openOnClick: false,
			enableClickSelection: false,
			HTMLAttributes: {
				target: null,
				rel: null
			}
		}),
		TextAlign.configure({
			types: ["heading", "paragraph"],
			defaultAlignment: "start"
		}),
		VariableTag_default.configure({ trailingCursorText })
	];
};
var isJsonContent = (value) => {
	return Boolean(value) && typeof value === "object";
};
var withTrailingCursorText = (content, trailingCursorText) => {
	if (!trailingCursorText || !content.length) return content;
	if (content[content.length - 1].type !== "variableTag") return content;
	return [...content, {
		type: "text",
		text: trailingCursorText
	}];
};
var normalizeContentArray = (content, { trailingCursorText } = {}) => {
	if (!Array.isArray(content)) return [];
	return withTrailingCursorText(content.flatMap((node) => {
		if (!node) return [];
		if (Array.isArray(node)) return normalizeContentArray(node, { trailingCursorText });
		if (typeof node !== "object") return [];
		if (!("type" in node)) {
			if (isJsonContent(node) && Array.isArray(node.content)) return normalizeContentArray(node.content, { trailingCursorText });
			return [];
		}
		if (isJsonContent(node) && node.type === "text" && typeof node.text === "string") {
			const text = node.text.replace(/[\u200B\u2060]/g, "");
			return text ? [{
				...node,
				text
			}] : [];
		}
		if (isJsonContent(node) && Array.isArray(node.content)) {
			const cleaned = normalizeContentArray(node.content, { trailingCursorText });
			return [{
				...node,
				content: cleaned
			}];
		}
		return isJsonContent(node) ? [node] : [];
	}), trailingCursorText);
};
var valueToContent = (value, options = {}) => {
	if (!value) return null;
	if (Array.isArray(value)) {
		const cleaned = normalizeContentArray(value, options);
		return cleaned.length ? {
			type: "doc",
			content: cleaned
		} : null;
	}
	if (isJsonContent(value)) {
		if (value.type === "doc" && Array.isArray(value.content)) {
			const cleaned = normalizeContentArray(value.content, options);
			return cleaned.length ? {
				...value,
				content: cleaned
			} : null;
		}
		if (Array.isArray(value.content)) {
			const cleaned = normalizeContentArray(value.content, options);
			return cleaned.length ? {
				type: "doc",
				content: cleaned
			} : null;
		}
	}
	if (typeof value === "string") try {
		const parsed = JSON.parse(value);
		if (Array.isArray(parsed)) {
			const cleaned = normalizeContentArray(parsed, options);
			return cleaned.length ? {
				type: "doc",
				content: cleaned
			} : null;
		}
		if (isJsonContent(parsed)) {
			if (parsed.type === "doc" && Array.isArray(parsed.content)) {
				const cleaned = normalizeContentArray(parsed.content, options);
				return cleaned.length ? {
					...parsed,
					content: cleaned
				} : null;
			}
			if (Array.isArray(parsed.content)) {
				const cleaned = normalizeContentArray(parsed.content, options);
				return cleaned.length ? {
					type: "doc",
					content: cleaned
				} : null;
			}
		}
	} catch {
		return null;
	}
	return null;
};
var getFatalTiptapContentError = (value) => {
	const content = valueToContent(value);
	if (!content) return "";
	const visit = (node) => {
		if (!node || typeof node !== "object") return false;
		const jsonNode = node;
		if (jsonNode.type === "text" && typeof jsonNode.text === "string" && jsonNode.text === "") return true;
		if (!Array.isArray(jsonNode.content)) return false;
		return jsonNode.content.some((child) => {
			return visit(child);
		});
	};
	return visit(content) ? "This field contains invalid rich-text content. The editor could not fully parse the stored document, so some content may not be shown until it is repaired and saved again." : "";
};
//#endregion
export { createTiptapExtensions, getFatalTiptapContentError, normalizeContentArray, valueToContent };

//# sourceMappingURL=editorConfig.js.map