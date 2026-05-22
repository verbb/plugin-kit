import { TextSelection } from "@tiptap/pm/state";
//#region src/components/tiptap/variableSerialization.ts
/**
* Shared serialization and variable-tag helpers for Tiptap variable input.
* Used by TiptapInput and InlineVariableSuggestion.
*/
var TRANSFORMER_ID_PREFIX = "transform=";
function parseTokenMetadata(tokenValue) {
	const match = tokenValue.match(/^\{([^}]*)\}$/);
	if (!match) return { tokenWithoutDefault: tokenValue };
	let body = match[1] ?? "";
	let defaultIfEmpty;
	if (body.includes("|")) {
		const split = body.split("|");
		body = split.shift() ?? "";
		defaultIfEmpty = split.join("|").trim() || void 0;
	}
	const segments = body.split(";").map((part) => {
		return part.trim();
	}).filter(Boolean);
	const cleanSegments = [];
	let transformerId;
	let transformerParams;
	segments.forEach((segment) => {
		if (segment.startsWith(TRANSFORMER_ID_PREFIX)) {
			transformerId = decodeURIComponent(segment.slice(10)).trim() || void 0;
			return;
		}
		if (segment.includes("=")) {
			const [keyRaw, ...valueParts] = segment.split("=");
			const key = (keyRaw ?? "").trim();
			if (!key) return;
			const value = decodeURIComponent(valueParts.join("=").trim());
			if (!transformerParams) transformerParams = {};
			transformerParams[key] = value;
			return;
		}
		cleanSegments.push(segment);
	});
	return {
		tokenWithoutDefault: `{${cleanSegments.join(";")}}`,
		defaultIfEmpty,
		transformerId,
		transformerParams
	};
}
function isVariableLikeToken(tokenValue) {
	return /^\{[a-zA-Z][a-zA-Z0-9_]*(?::[^}]*)?\}$/.test(tokenValue);
}
function toTitleWords(value) {
	return value.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim().replace(/\s+/g, " ").replace(/\b\w/g, (char) => {
		return char.toUpperCase();
	});
}
function buildFallbackLabelForUnknownToken(tokenWithoutDefault) {
	const [target = "", identifier = "", selector = ""] = tokenWithoutDefault.replace(/^\{|\}$/g, "").split(":");
	if (target === "field") return "Field";
	if (target) return toTitleWords(selector || identifier || target) || tokenWithoutDefault;
	return tokenWithoutDefault;
}
function serializeTokenMetadata(baseToken, metadata) {
	const baseMatch = baseToken.match(/^\{([^}]*)\}$/);
	if (!baseMatch) return baseToken;
	const parts = [baseMatch[1]];
	const transformerId = metadata.transformerId?.trim();
	if (transformerId) {
		parts.push(`${TRANSFORMER_ID_PREFIX}${encodeURIComponent(transformerId)}`);
		(metadata.transformerParams && typeof metadata.transformerParams === "object" ? Object.entries(metadata.transformerParams) : []).forEach(([key, value]) => {
			const normalizedKey = String(key ?? "").trim();
			if (!normalizedKey || normalizedKey === "transform") return;
			const normalizedValue = value == null ? "" : String(value);
			parts.push(`${normalizedKey}=${encodeURIComponent(normalizedValue)}`);
		});
	}
	const tokenBody = parts.filter(Boolean).join(";");
	const defaultIfEmpty = metadata.defaultIfEmpty?.trim();
	return defaultIfEmpty ? `{${tokenBody}|${defaultIfEmpty}}` : `{${tokenBody}}`;
}
function dedupeVariableOptions(items) {
	const deduped = [];
	const seen = /* @__PURE__ */ new Set();
	items.forEach((item) => {
		const key = String(item?.value ?? "") || `__label:${String(item?.label ?? "")}`;
		if (seen.has(key)) return;
		seen.add(key);
		deduped.push(item);
	});
	return deduped;
}
function flattenVariableOptions(items) {
	const flat = [];
	const visit = (nodes) => {
		nodes.forEach((node) => {
			flat.push(node);
			if (Array.isArray(node.children) && node.children.length > 0) visit(node.children);
		});
	};
	visit(items);
	return flat;
}
/**
* Build VariableTag attributes from base and selected variable options.
* Optional defaultIfEmpty is used when the resolved value is empty (e.g. "Guest" for {user:firstName|Guest}).
*/
function buildVariableTagAttrs(baseVariable, selectedVariable = baseVariable, options = {}) {
	const selectedLabel = selectedVariable?.label ?? baseVariable?.label ?? "";
	const value = selectedVariable?.value ?? baseVariable?.value ?? "";
	const defaultIfEmpty = options.defaultIfEmpty?.trim();
	const attrs = {
		label: selectedLabel,
		value,
		openOnInsert: options.openOnInsert ?? false
	};
	if (defaultIfEmpty) attrs.default = defaultIfEmpty;
	if (options.transformerId?.trim()) attrs.transformerId = options.transformerId.trim();
	if (options.transformerParams && typeof options.transformerParams === "object") attrs.transformerParams = options.transformerParams;
	return attrs;
}
/**
* Strip optional inline default from token for lookup: {user:firstName|Guest} -> {user:firstName}.
* Returns [tokenWithoutDefault, defaultText].
*/
function parseTokenWithDefault(tokenValue) {
	const parsed = parseTokenMetadata(tokenValue);
	return [parsed.tokenWithoutDefault, parsed.defaultIfEmpty];
}
/**
* Resolve variable tag attrs from a token string (e.g. '{form:name}' or '{user:firstName|Guest}').
*/
function resolveVariableTagByValue(tokenValue, topLevelVariables, allVariables) {
	const { tokenWithoutDefault, defaultIfEmpty, transformerId, transformerParams } = parseTokenMetadata(tokenValue);
	const exactTopLevel = topLevelVariables.find((v) => {
		return v.value === tokenWithoutDefault;
	});
	if (exactTopLevel) return buildVariableTagAttrs(exactTopLevel, exactTopLevel, {
		defaultIfEmpty,
		transformerId,
		transformerParams
	});
	for (const variable of topLevelVariables) {
		const matchedChild = (Array.isArray(variable.children) ? variable.children : []).find((c) => {
			return c.value === tokenWithoutDefault;
		});
		if (matchedChild) return buildVariableTagAttrs(variable, matchedChild, {
			defaultIfEmpty,
			transformerId,
			transformerParams
		});
	}
	const fallback = allVariables.find((v) => {
		return v.value === tokenWithoutDefault;
	});
	if (fallback) return buildVariableTagAttrs(fallback, fallback, {
		defaultIfEmpty,
		transformerId,
		transformerParams
	});
	if (isVariableLikeToken(tokenWithoutDefault)) return {
		label: buildFallbackLabelForUnknownToken(tokenWithoutDefault),
		value: tokenWithoutDefault,
		openOnInsert: false,
		...defaultIfEmpty ? { default: defaultIfEmpty } : {},
		...transformerId ? { transformerId } : {},
		...transformerParams ? { transformerParams } : {}
	};
	return null;
}
/**
* Convert string value with {token} placeholders to Tiptap doc content.
*/
function valueToContent(value, topLevelVariables, allVariables, trailingCursorText = "​") {
	if (!value) return null;
	const content = value.split(/({.*?})/).flatMap((param) => {
		if (param.includes("{")) {
			const variable = resolveVariableTagByValue(param, topLevelVariables, allVariables);
			if (variable) return [{
				type: "variableTag",
				attrs: variable
			}];
		}
		if (!param) return [];
		return [{
			type: "text",
			text: param
		}];
	});
	if (trailingCursorText && content.length && content[content.length - 1].type === "variableTag") content.push({
		type: "text",
		text: trailingCursorText
	});
	return {
		type: "doc",
		content
	};
}
/**
* Convert Tiptap content to string value.
* Content is typically editor.getJSON().content (array of block/inline nodes).
*/
function contentToValue(content) {
	if (!content) return "";
	const items = Array.isArray(content) ? content : [];
	let result = "";
	const visit = (nodes) => {
		nodes.forEach((node) => {
			if (!node || typeof node !== "object") return;
			const n = node;
			if (n.type === "paragraph" && Array.isArray(n.content)) visit(n.content);
			else if (n.type === "text") result += (n.text ?? "").replace(/[\u200B\u2060]/g, "");
			else if (n.type === "variableTag") {
				const val = n.attrs?.value ?? "";
				const def = n.attrs?.default?.trim();
				const transformerId = n.attrs?.transformerId?.trim();
				const transformerParams = n.attrs?.transformerParams;
				result += serializeTokenMetadata(val, {
					defaultIfEmpty: def,
					transformerId,
					transformerParams
				});
			}
		});
	};
	visit(items);
	return result.replace(/[\r\n]+/g, " ");
}
/**
* Replace a range in the editor with a variable tag node.
* @param editor - Tiptap editor instance
*/
function replaceTokenWithVariable(editor, attrs, from, to) {
	const { state } = editor;
	const { schema } = state;
	const variableNode = schema.nodes.variableTag?.create(attrs);
	if (!variableNode) return;
	const variableTagExtension = editor.extensionManager.extensions.find((extension) => {
		return extension.name === "variableTag";
	});
	const trailingCursorText = String(variableTagExtension?.options?.trailingCursorText ?? "​");
	const tr = state.tr.deleteRange(from, to);
	tr.insert(from, variableNode);
	if (trailingCursorText) {
		tr.insert(from + variableNode.nodeSize, schema.text(trailingCursorText));
		tr.setSelection(TextSelection.create(tr.doc, from + variableNode.nodeSize + trailingCursorText.length));
	} else tr.setSelection(TextSelection.create(tr.doc, from + variableNode.nodeSize));
	editor.view.dispatch(tr);
}
//#endregion
export { buildVariableTagAttrs, contentToValue, dedupeVariableOptions, flattenVariableOptions, parseTokenWithDefault, replaceTokenWithVariable, resolveVariableTagByValue, valueToContent };

//# sourceMappingURL=variableSerialization.js.map