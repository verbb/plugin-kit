//#region src/serialization/editor.ts
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
export { getFatalTiptapContentError, normalizeContentArray, valueToContent };

//# sourceMappingURL=editor.js.map