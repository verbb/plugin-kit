import { n as uniqueId } from "./pk-a11y-Cx5RZvhu.js";
import { m as i } from "./lit-Dnn7gEi2.js";
import { A as Node3, C as index_default$10, D as index_default$1, E as index_default$7, F as PluginKey, I as TextSelection, N as NodeSelection, O as index_default, P as Plugin, S as index_default$11, T as index_default$8, _ as index_default$16, a as index_default$5, b as index_default$13, c as index_default$24, d as index_default$21, f as index_default$20, g as index_default$17, h as index_default$6, i as index_default$2, j as getMarkRange, l as Table, m as index_default$18, n as index_default$25, o as index_default$22, p as index_default$19, r as index_default$3, s as index_default$23, t as index_default$26, u as index_default$4, v as index_default$15, w as index_default$9, x as index_default$12, y as index_default$14 } from "./tiptap-Db7MTUH1.js";
//#region ../plugin-kit-tiptap-core/dist/links/extension.js
/** Shared Tiptap link mark configuration for Plugin Kit editors. */
function createLinkExtension() {
	return index_default.configure({
		openOnClick: false,
		enableClickSelection: false,
		HTMLAttributes: {
			target: null,
			rel: null
		}
	});
}
//#endregion
//#region ../plugin-kit-tiptap-core/dist/extensions/variable-tag.js
var isCursorPlaceholder = (node) => {
	return node && node.isText && (node.text === "​" || node.text === "⁠");
};
function createVariableTagExtension({ trailingCursorText = "​", addNodeView } = {}) {
	return Node3.create({
		name: "variableTag",
		group: "inline",
		inline: true,
		selectable: true,
		draggable: true,
		atom: true,
		addOptions() {
			return { trailingCursorText };
		},
		addAttributes() {
			return {
				label: { default: null },
				value: { default: null },
				openOnInsert: { default: false },
				default: { default: null },
				transformerId: { default: null },
				transformerParams: { default: null },
				unresolved: { default: false }
			};
		},
		parseHTML() {
			return [{
				tag: "variable-tag",
				getAttrs: (dom) => {
					try {
						return JSON.parse(dom.innerHTML);
					} catch {
						return {};
					}
				}
			}];
		},
		renderHTML({ HTMLAttributes }) {
			return ["variable-tag", JSON.stringify(HTMLAttributes)];
		},
		addCommands() {
			return { setVariableTag: (options) => {
				return ({ dispatch, state }) => {
					if (!dispatch) return false;
					const { selection } = state;
					const textSelection = selection;
					const position = textSelection.$cursor ? textSelection.$cursor.pos : textSelection.$to.pos;
					const node = this.type.create(options);
					const transaction = state.tr.insert(position, node);
					const insertPos = position + node.nodeSize;
					const cursorText = this.options.trailingCursorText;
					if (cursorText) {
						transaction.insert(insertPos, state.schema.text(cursorText));
						transaction.setSelection(TextSelection.create(transaction.doc, insertPos + cursorText.length));
					} else transaction.setSelection(TextSelection.create(transaction.doc, insertPos));
					dispatch(transaction);
					return true;
				};
			} };
		},
		addNodeView() {
			return addNodeView ?? null;
		},
		addProseMirrorPlugins() {
			return [new Plugin({
				key: new PluginKey("variableTagProtection"),
				props: {
					handleKeyDown: (view, event) => {
						const { state } = view;
						const { selection, doc } = state;
						if (event.key === "ArrowLeft" && selection.empty) {
							const { $from } = selection;
							const { pos } = $from;
							if (pos > 0) {
								const before = $from.nodeBefore;
								if (isCursorPlaceholder(before)) {
									const posBeforePlaceholder = pos - before.nodeSize;
									const variableTagNode = doc.resolve(posBeforePlaceholder).nodeBefore;
									if (variableTagNode && variableTagNode.type.name === "variableTag") {
										const tagStart = posBeforePlaceholder - variableTagNode.nodeSize;
										event.preventDefault();
										view.dispatch(state.tr.setSelection(NodeSelection.create(doc, tagStart)));
										return true;
									}
								}
							}
						}
						if (event.key === "ArrowRight" && selection.empty) {
							const { $from } = selection;
							const { pos } = $from;
							const after = $from.nodeAfter;
							if (isCursorPlaceholder(after)) {
								const before = $from.nodeBefore;
								if (before && before.type.name === "variableTag") {
									event.preventDefault();
									view.dispatch(state.tr.setSelection(TextSelection.create(doc, pos + after.nodeSize)));
									return true;
								}
							}
						}
						if (event.key === "Backspace" && selection.empty) {
							const { $from } = selection;
							const { pos } = $from;
							if (pos > 0) {
								const before = $from.nodeBefore;
								if (isCursorPlaceholder(before)) {
									const posBeforePlaceholder = pos - before.nodeSize;
									const variableTagNode = doc.resolve(posBeforePlaceholder).nodeBefore;
									if (variableTagNode && variableTagNode.type.name === "variableTag") {
										const deleteFrom = posBeforePlaceholder - variableTagNode.nodeSize;
										event.preventDefault();
										const tr = state.tr.delete(deleteFrom, pos);
										tr.setSelection(TextSelection.create(tr.doc, Math.max(0, deleteFrom)));
										view.dispatch(tr);
										return true;
									}
								}
							}
						}
						if (selection instanceof NodeSelection && selection.node.type.name === "variableTag") {
							if ([
								"ArrowLeft",
								"ArrowRight",
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(event.key)) return false;
							if (["Delete", "Backspace"].includes(event.key)) return false;
							if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return false;
							if (event.key.length === 1 || event.key === "Enter") return true;
						}
						return false;
					},
					handlePaste: (view) => {
						const { selection } = view.state;
						if (selection instanceof NodeSelection && selection.node.type.name === "variableTag") return true;
						return false;
					},
					handleDrop: (view) => {
						const { selection } = view.state;
						if (selection instanceof NodeSelection && selection.node.type.name === "variableTag" && !view.dragging) return true;
						return false;
					}
				}
			})];
		}
	});
}
//#endregion
//#region ../plugin-kit-tiptap-core/dist/extensions/one-liner-document.js
var OneLinerDocument = index_default$1.extend({ content: "inline*" });
//#endregion
//#region ../plugin-kit-tiptap-core/dist/extensions/create-extensions.js
var createTiptapExtensions = ({ trailingCursorText = "​", variableTagNodeView, includeVariableTag = true } = {}) => {
	const extensions = [
		index_default$1,
		index_default$2,
		index_default$3,
		index_default$4,
		index_default$5,
		index_default$6,
		index_default$7,
		index_default$8,
		index_default$9,
		index_default$10,
		index_default$11,
		index_default$12,
		index_default$13,
		index_default$14,
		index_default$15,
		index_default$16,
		index_default$17,
		index_default$18.configure({ levels: [
			1,
			2,
			3,
			4,
			5,
			6
		] }),
		index_default$19,
		index_default$20,
		index_default$21,
		Table.configure({ resizable: true }),
		index_default$22,
		index_default$23,
		index_default$24,
		index_default$25,
		createLinkExtension(),
		index_default$26.configure({
			types: ["heading", "paragraph"],
			defaultAlignment: "start"
		})
	];
	if (includeVariableTag) extensions.push(createVariableTagExtension({
		trailingCursorText,
		addNodeView: variableTagNodeView
	}));
	return extensions;
};
var createTiptapInputExtensions = ({ trailingCursorText = "​", variableTagNodeView } = {}) => {
	return [
		OneLinerDocument,
		index_default$5,
		createVariableTagExtension({
			trailingCursorText,
			addNodeView: variableTagNodeView
		})
	];
};
//#endregion
//#region ../plugin-kit-tiptap-core/dist/serialization/editor.js
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
var valueToContent$1 = (value, options = {}) => {
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
	const content = valueToContent$1(value);
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
//#region ../plugin-kit-tiptap-core/dist/serialization/input.js
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
	const referenceParams = {};
	let isTransformerParam = false;
	segments.forEach((segment) => {
		if (segment.startsWith(TRANSFORMER_ID_PREFIX)) {
			transformerId = decodeURIComponent(segment.slice(10)).trim() || void 0;
			isTransformerParam = true;
			return;
		}
		if (segment.includes("=")) {
			const [keyRaw, ...valueParts] = segment.split("=");
			const key = (keyRaw ?? "").trim().toLowerCase();
			if (!key) return;
			const value = decodeURIComponent(valueParts.join("=").trim());
			if (isTransformerParam) {
				if (!transformerParams) transformerParams = {};
				transformerParams[key] = value;
				return;
			}
			referenceParams[key] = value;
			cleanSegments.push(`${key}=${encodeURIComponent(value)}`);
			return;
		}
		cleanSegments.push(segment);
	});
	return {
		tokenWithoutDefault: `{${cleanSegments.join(";")}}`,
		defaultIfEmpty,
		transformerId,
		transformerParams,
		referenceParams
	};
}
function isVariableLikeToken(tokenValue) {
	return /^\{[a-zA-Z][a-zA-Z0-9_]*(?::[^}]*)?\}$/.test(tokenValue);
}
/** Craft field UIDs — never surface these as chip labels. */
var FIELD_UID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isLikelyFieldUid(value) {
	return FIELD_UID_PATTERN.test(String(value || "").trim());
}
function toTitleWords(value) {
	return value.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim().replace(/\s+/g, " ").replace(/\b\w/g, (char) => {
		return char.toUpperCase();
	});
}
/**
* Label when no variable option matched. Prefer a clear "unknown" prompt over
* title-casing UIDs (e.g. "7aff44ed Bca7…"), which looks broken rather than fixable.
*/
function buildFallbackLabelForUnknownToken(tokenWithoutDefault) {
	if (tokenWithoutDefault.match(/^\{field:([^}]+)\}$/)) return "Unknown field";
	const [target = "", identifier = "", selector = ""] = tokenWithoutDefault.replace(/^\{|\}$/g, "").split(":");
	const reference = String(selector || identifier || target).split(";")[0]?.trim() ?? "";
	if (isLikelyFieldUid(reference) || isLikelyFieldUid(identifier)) return "Unknown variable";
	if (target) return toTitleWords(reference) || "Unknown variable";
	return "Unknown variable";
}
function serializeTokenMetadata(baseToken, metadata) {
	const baseMatch = baseToken.match(/^\{([^}]*)\}$/);
	if (!baseMatch) return baseToken;
	const parts = [baseMatch[1]];
	const transformerId = metadata.transformerId?.trim();
	const params = metadata.transformerParams && typeof metadata.transformerParams === "object" ? Object.entries(metadata.transformerParams) : [];
	if (transformerId) {
		parts.push(`${TRANSFORMER_ID_PREFIX}${encodeURIComponent(transformerId)}`);
		params.forEach(([key, value]) => {
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
	const selectedLabel = options.label ?? selectedVariable?.label ?? baseVariable?.label ?? "";
	const value = options.value ?? selectedVariable?.value ?? baseVariable?.value ?? "";
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
function getReferenceBaseToken(tokenValue) {
	const [tokenWithoutDefault] = parseTokenWithDefault(tokenValue);
	const match = tokenWithoutDefault.match(/^\{([^}]*)\}$/);
	if (!match) return tokenWithoutDefault;
	const body = match[1].split(";")[0]?.trim() ?? "";
	return body ? `{${body}}` : tokenWithoutDefault;
}
function variableValuesMatchReference(tokenValue, optionValue) {
	if (!tokenValue || !optionValue) return false;
	if (tokenValue === optionValue) return true;
	return getReferenceBaseToken(tokenValue) === getReferenceBaseToken(optionValue);
}
function resolveVariableTagLabel(tokenValue, option) {
	const { tokenWithoutDefault } = parseTokenMetadata(String(tokenValue || ""));
	if (option?.label) return option.label;
	return buildFallbackLabelForUnknownToken(tokenWithoutDefault);
}
function findMatchingVariableOption(items, tokenWithoutDefault) {
	let fallbackMatch = null;
	for (const item of items) {
		const children = Array.isArray(item.children) ? item.children : [];
		const itemValue = String(item.value ?? "");
		if (itemValue === tokenWithoutDefault) return item;
		if (children.length) {
			const childMatch = findMatchingVariableOption(children, tokenWithoutDefault);
			if (childMatch?.value === tokenWithoutDefault) return childMatch;
			if (childMatch && !fallbackMatch) fallbackMatch = childMatch;
		}
		if (variableValuesMatchReference(tokenWithoutDefault, itemValue)) {
			if (!fallbackMatch) fallbackMatch = item;
		}
	}
	return fallbackMatch;
}
/**
* Resolve variable tag attrs from a token string (e.g. '{form:name}' or '{user:firstName|Guest}').
*/
function resolveVariableTagByValue(tokenValue, topLevelVariables, allVariables) {
	const { tokenWithoutDefault, defaultIfEmpty, transformerId, transformerParams } = parseTokenMetadata(tokenValue);
	const resolvedValue = tokenWithoutDefault;
	const topLevelMatch = findMatchingVariableOption(topLevelVariables, tokenWithoutDefault);
	if (topLevelMatch) return buildVariableTagAttrs(topLevelMatch, topLevelMatch, {
		defaultIfEmpty,
		transformerId,
		transformerParams,
		label: resolveVariableTagLabel(resolvedValue, topLevelMatch),
		value: resolvedValue
	});
	const fallback = findMatchingVariableOption(allVariables, tokenWithoutDefault);
	if (fallback) return buildVariableTagAttrs(fallback, fallback, {
		defaultIfEmpty,
		transformerId,
		transformerParams,
		label: resolveVariableTagLabel(resolvedValue, fallback),
		value: resolvedValue
	});
	if (isVariableLikeToken(tokenWithoutDefault)) return {
		label: resolveVariableTagLabel(tokenWithoutDefault, null),
		value: tokenWithoutDefault,
		openOnInsert: false,
		unresolved: true,
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
//#endregion
//#region ../plugin-kit-tiptap-core/dist/links/craft-element.js
function isLinkOptionsArray(value) {
	return Array.isArray(value) && value.length > 0;
}
function getCraftLinkOptions(linkOptions) {
	if (!linkOptions) return [];
	if (isLinkOptionsArray(linkOptions)) return linkOptions;
	const items = [];
	if (linkOptions.linkToEntry) items.push({
		...linkOptions.linkToEntry,
		optionTitle: "Link to an entry"
	});
	if (linkOptions.linkToAsset) items.push({
		...linkOptions.linkToAsset,
		optionTitle: "Link to an asset"
	});
	if (linkOptions.linkToCategory) items.push({
		...linkOptions.linkToCategory,
		optionTitle: "Link to a category"
	});
	return items;
}
function getLinkOptionsElementSiteId(linkOptions) {
	if (!linkOptions || isLinkOptionsArray(linkOptions)) return;
	return linkOptions.elementSiteId;
}
/**
* Build a Craft element link URL with the standard ref fragment:
* `https://example.com/page#refHandle:123@1`
*/
function buildCraftElementLinkUrl(element, refHandle) {
	return `${element.url || ""}#${refHandle}:${element.id}@${element.siteId}`;
}
function buildCraftElementSelectorStorageKey(linkSelectorStorageKeyPrefix, elementType) {
	return `${linkSelectorStorageKeyPrefix}.${elementType}`;
}
/** Open Craft's element selector modal and return a Plugin Kit link URL on selection. */
function openCraftElementLinkSelector({ config, elementSiteId, linkSelectorStorageKeyPrefix, getSelectedText, onSelect, host }) {
	if (!linkSelectorStorageKeyPrefix) throw new Error("Craft element links require \"linkSelectorStorageKeyPrefix\".");
	host.openElementSelector(config.elementType, {
		storageKey: buildCraftElementSelectorStorageKey(linkSelectorStorageKeyPrefix, config.elementType),
		sources: config.sources,
		criteria: config.criteria,
		defaultSiteId: elementSiteId,
		autoFocusSearchBox: false,
		onSelect: (elements) => {
			if (!elements?.length) return;
			const [element] = elements;
			onSelect({
				url: buildCraftElementLinkUrl(element, config.refHandle),
				text: getSelectedText() || element.label || ""
			});
		},
		closeOtherModals: false
	});
}
//#endregion
//#region ../plugin-kit-tiptap-core/dist/links/commands.js
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
//#region ../plugin-kit-tiptap-core/dist/toolbar/button-registry.js
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
//#region ../plugin-kit-tiptap-core/dist/toolbar/toolbar-schema.js
var DEFAULT_HEADING_LEVELS = [
	1,
	2,
	3,
	4
];
var PRESET_DEFAULT_ICONS = {
	formatting: "paragraph",
	headings: "heading",
	lists: "unordered-list",
	align: "align-left"
};
var VALID_PRESETS = new Set([
	"formatting",
	"headings",
	"lists",
	"align"
]);
function isFormattingToolbarPreset(preset) {
	return preset === "formatting";
}
function isHeadingsOnlyToolbarPreset(preset) {
	return preset === "headings";
}
function getToolbarGroupDefaultIcon(group) {
	if (group.preset) return PRESET_DEFAULT_ICONS[group.preset];
	return getToolbarGroupItems(group)[0] ?? "bold";
}
var SEPARATOR_TOKENS = new Set(["|", "separator"]);
function isToolbarSeparatorToken(value) {
	return SEPARATOR_TOKENS.has(value);
}
function expandPresetItems(group) {
	if (group.items?.length) return group.items.filter((item) => typeof item === "string" && isTiptapButtonName(item));
	switch (group.preset) {
		case "formatting": return [
			...(group.headingLevels ?? DEFAULT_HEADING_LEVELS).map((level) => `h${level}`),
			"blockquote",
			"code-block"
		];
		case "headings": return (group.headingLevels ?? DEFAULT_HEADING_LEVELS).map((level) => `h${level}`);
		case "lists": return ["unordered-list", "ordered-list"];
		case "align": return [
			"align-left",
			"align-center",
			"align-right",
			"align-justify"
		];
		default: return [];
	}
}
function getToolbarGroupItems(group) {
	return expandPresetItems(group);
}
function flattenToolbarButtonNames(nodes) {
	const names = [];
	nodes.forEach((node) => {
		if (node.type === "button") {
			names.push(node.name);
			return;
		}
		if (node.type === "group") names.push(...getToolbarGroupItems(node.group));
	});
	return names;
}
function toolbarIncludesButton(nodes, buttonName) {
	return flattenToolbarButtonNames(nodes).includes(buttonName);
}
function normalizeGroupItemDefinition(raw) {
	if (typeof raw === "string") {
		const token = raw.trim();
		if (!token) return null;
		if (isToolbarSeparatorToken(token)) return token;
		if (token === "paragraph") return "paragraph";
		return normalizeButtonName(token);
	}
	if (!raw || typeof raw !== "object") return null;
	const record = raw;
	if (record.type === "separator") return { type: "separator" };
	if (record.type === "item" && typeof record.name === "string") {
		if (record.name === "paragraph") return "paragraph";
		return normalizeButtonName(record.name);
	}
	return null;
}
function normalizeGroupItemDefinitions(raw) {
	return raw.map((item) => normalizeGroupItemDefinition(item)).filter((item) => item !== null);
}
function isGroupItemSeparator(item) {
	return item === "|" || item === "separator" || typeof item === "object" && item.type === "separator";
}
function isToolbarGroupMenuButton(item) {
	return !isGroupItemSeparator(item);
}
function groupItemDefinitionsToMenuEntries(items) {
	return items.flatMap((item) => {
		if (isGroupItemSeparator(item)) return [{ type: "separator" }];
		if (!isToolbarGroupMenuButton(item)) return [];
		return [{
			type: "item",
			name: item
		}];
	});
}
function getToolbarGroupMenuButtons(group) {
	return getToolbarGroupMenuItems(group).filter((entry) => entry.type === "item").map((entry) => entry.name);
}
function normalizeButtonName(value) {
	return isTiptapButtonName(value) ? value : null;
}
function normalizeHeadingLevels(value) {
	if (!Array.isArray(value)) return;
	const levels = value.map((level) => Number(level)).filter((level) => [
		1,
		2,
		3,
		4,
		5,
		6
	].includes(level));
	return levels.length > 0 ? levels : void 0;
}
function normalizeToolbarGroup(raw) {
	const source = typeof raw.group === "object" && raw.group !== null ? raw.group : raw;
	const preset = typeof source.preset === "string" ? source.preset : void 0;
	const label = typeof source.label === "string" ? source.label : void 0;
	const iconRaw = typeof source.icon === "string" ? source.icon : void 0;
	const icon = iconRaw ? normalizeButtonName(iconRaw) ?? void 0 : void 0;
	const headingLevels = normalizeHeadingLevels(source.headingLevels);
	const items = Array.isArray(source.items) ? normalizeGroupItemDefinitions(source.items) : void 0;
	if (!preset && !items?.length) return null;
	if (preset && !VALID_PRESETS.has(preset)) return null;
	return {
		type: "group",
		group: {
			...label ? { label } : {},
			...icon ? { icon } : {},
			...preset ? { preset } : {},
			...items?.length ? { items } : {},
			...headingLevels ? { headingLevels } : {}
		}
	};
}
function normalizeToolbarNode(raw) {
	if (typeof raw === "string") {
		const token = raw.trim();
		if (!token) return null;
		if (isToolbarSeparatorToken(token)) return { type: "separator" };
		const buttonName = normalizeButtonName(token);
		return buttonName ? {
			type: "button",
			name: buttonName
		} : null;
	}
	if (!raw || typeof raw !== "object") return null;
	const record = raw;
	if (record.type === "separator") return { type: "separator" };
	if (record.type === "button" && typeof record.name === "string") {
		const buttonName = normalizeButtonName(record.name);
		return buttonName ? {
			type: "button",
			name: buttonName
		} : null;
	}
	if (record.type === "group" || record.preset || record.items || record.group) return normalizeToolbarGroup(record);
	if (typeof record.button === "string") {
		const buttonName = normalizeButtonName(record.button);
		return buttonName ? {
			type: "button",
			name: buttonName
		} : null;
	}
	return null;
}
function normalizeToolbarNodes(raw) {
	return raw.map((item) => normalizeToolbarNode(item)).filter((item) => item !== null);
}
function parseToolbarConfig(input) {
	if (input === null || input === void 0 || input === "") return [{
		type: "button",
		name: "bold"
	}, {
		type: "button",
		name: "italic"
	}];
	if (Array.isArray(input)) {
		const normalized = normalizeToolbarNodes(input);
		return normalized.length > 0 ? normalized : [{
			type: "button",
			name: "bold"
		}, {
			type: "button",
			name: "italic"
		}];
	}
	if (typeof input === "string") {
		const trimmed = input.trim();
		if (!trimmed) return [{
			type: "button",
			name: "bold"
		}, {
			type: "button",
			name: "italic"
		}];
		if (trimmed.startsWith("[")) try {
			const parsed = JSON.parse(trimmed);
			return Array.isArray(parsed) ? parseToolbarConfig(parsed) : parseToolbarConfig(null);
		} catch {
			return parseToolbarConfig(null);
		}
		return parseToolbarConfig(trimmed.split(",").map((token) => token.trim()).filter(Boolean));
	}
	return parseToolbarConfig(null);
}
function runToolbarButton(editor, buttonName, options = {}) {
	if (buttonName === "paragraph") return editor.chain().focus().setParagraph().run();
	return runTiptapButton(editor, buttonName, options);
}
function isToolbarButtonActive(editor, buttonName) {
	if (buttonName === "paragraph") return editor.isActive("paragraph") && !editor.isActive("heading");
	return isTiptapButtonActive(editor, buttonName);
}
function getActiveHeadingLevel(editor) {
	for (const level of [
		1,
		2,
		3,
		4,
		5,
		6
	]) if (editor.isActive("heading", { level })) return level;
	return null;
}
function getToolbarGroupTriggerState(editor, group) {
	const fallbackIcon = group.icon ?? getToolbarGroupDefaultIcon(group);
	const menuButtons = getToolbarGroupMenuButtons(group);
	if (isHeadingsOnlyToolbarPreset(group.preset)) {
		const activeLevel = getActiveHeadingLevel(editor);
		if (activeLevel) {
			const name = `h${activeLevel}`;
			return {
				activeName: name,
				label: `H${activeLevel}`,
				isActive: true,
				icon: name
			};
		}
		return {
			activeName: null,
			label: "",
			isActive: false,
			icon: "heading"
		};
	}
	if (isFormattingToolbarPreset(group.preset)) {
		const activeLevel = getActiveHeadingLevel(editor);
		if (activeLevel) {
			const name = `h${activeLevel}`;
			return {
				activeName: name,
				label: `H${activeLevel}`,
				isActive: true,
				icon: name
			};
		}
		if (isToolbarButtonActive(editor, "blockquote")) return {
			activeName: "blockquote",
			label: "",
			isActive: true,
			icon: "blockquote"
		};
		if (isToolbarButtonActive(editor, "code-block")) return {
			activeName: "code-block",
			label: "",
			isActive: true,
			icon: "code-block"
		};
		return {
			activeName: "paragraph",
			label: "Text",
			isActive: isToolbarButtonActive(editor, "paragraph"),
			icon: "paragraph"
		};
	}
	const activeName = menuButtons.find((name) => isToolbarButtonActive(editor, name)) ?? null;
	if (activeName) {
		const icon = activeName === "paragraph" ? "paragraph" : isTiptapButtonName(activeName) ? activeName : fallbackIcon;
		return {
			activeName: activeName === "paragraph" ? "paragraph" : activeName,
			label: activeName === "paragraph" ? "Text" : group.label ?? activeName,
			isActive: true,
			icon
		};
	}
	return {
		activeName: null,
		label: group.label ?? "",
		isActive: false,
		icon: fallbackIcon
	};
}
function getFormattingHeadingLevels(group) {
	return group.headingLevels ?? DEFAULT_HEADING_LEVELS;
}
function getFormattingMenuEntries(group) {
	return [
		{
			type: "item",
			name: "paragraph"
		},
		{ type: "separator" },
		...getFormattingHeadingLevels(group).map((level) => ({
			type: "item",
			name: `h${level}`
		})),
		{ type: "separator" },
		{
			type: "item",
			name: "blockquote"
		},
		{
			type: "item",
			name: "code-block"
		}
	];
}
function getToolbarGroupMenuItems(group) {
	if (group.items?.length) return groupItemDefinitionsToMenuEntries(group.items);
	if (isFormattingToolbarPreset(group.preset)) return getFormattingMenuEntries(group);
	return getToolbarGroupItems(group).map((name) => ({
		type: "item",
		name
	}));
}
//#endregion
//#region src/components/tiptap/variable-tag-node-view.ts
/** Match kit v1 VariableTagView chip chrome (indigo + remove). */
var REMOVE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M2.1 1.4 5 4.3l2.9-2.9.7.7L5.7 5l2.9 2.9-.7.7L5 5.7l-2.9 2.9-.7-.7L4.3 5 1.4 2.1z"/>
</svg>
`.trim();
var PK_VARIABLE_TAG_CONFIGURE_EVENT = "pk-variable-tag-configure";
var findTiptapHost = (viewDom) => {
	let node = viewDom;
	while (node) {
		if (node instanceof HTMLElement && node.localName.startsWith("pk-tiptap")) return node;
		node = node.parentNode instanceof ShadowRoot ? node.parentNode.host : node.parentNode;
	}
	return null;
};
var emitConfigure = (editor, detail) => {
	const viewDom = editor.view.dom;
	const host = findTiptapHost(viewDom);
	const configure = host && "variableTagConfigure" in host ? host.variableTagConfigure : null;
	if (typeof configure === "function") configure(detail);
	(host ?? viewDom).dispatchEvent(new CustomEvent(PK_VARIABLE_TAG_CONFIGURE_EVENT, {
		bubbles: true,
		composed: true,
		detail
	}));
};
/**
* DOM NodeViewRendererProps do NOT include React's `deleteNode` / `updateAttributes`
* (those live on NodeViewProps for ReactNodeViewRenderer only). Build them from
* editor + getPos — same operations ReactNodeViewRenderer wires for VariableTagView.
*/
function createNodeViewCommands(editor, getPos) {
	const resolvePos = () => {
		const pos = typeof getPos === "function" ? getPos() : getPos;
		return typeof pos === "number" ? pos : void 0;
	};
	const deleteNode = () => {
		const pos = resolvePos();
		if (typeof pos !== "number") return;
		const live = editor.state.doc.nodeAt(pos);
		if (!live || live.type.name !== "variableTag") return;
		editor.chain().focus().deleteRange({
			from: pos,
			to: pos + live.nodeSize
		}).run();
	};
	const updateAttributes = (attributes) => {
		const pos = resolvePos();
		if (typeof pos !== "number") return;
		const live = editor.state.doc.nodeAt(pos);
		if (!live || live.type.name !== "variableTag") return;
		editor.chain().command(({ tr, dispatch }) => {
			if (dispatch) tr.setNodeMarkup(pos, void 0, {
				...live.attrs,
				...attributes
			});
			return true;
		}).run();
	};
	return {
		deleteNode,
		updateAttributes,
		resolvePos
	};
}
/**
* DOM node view for variable tags in vanilla editors.
* Chip + remove match kit v1; configure UI is opened via `pk-variable-tag-configure`
* (Formie mounts the edit overlay beside the WC editor).
*/
function createVariableTagDomNodeView() {
	return (props) => {
		const { editor, getPos } = props;
		const { deleteNode, updateAttributes, resolvePos } = createNodeViewCommands(editor, getPos);
		let currentNode = props.node;
		const syncUnresolvedPresentation = (attrs) => {
			const unresolved = Boolean(attrs.unresolved);
			const token = String(attrs.value ?? "");
			const chipLabel = String(attrs.label || attrs.value || "");
			dom.classList.toggle("pk-variable-tag--unresolved", unresolved);
			if (unresolved) {
				dom.dataset.unresolved = "true";
				dom.title = token ? `Unknown or missing reference — ${token}` : "Unknown or missing reference";
				label.setAttribute("aria-invalid", "true");
			} else {
				delete dom.dataset.unresolved;
				dom.removeAttribute("title");
				label.removeAttribute("aria-invalid");
			}
			label.textContent = chipLabel;
		};
		const dom = document.createElement("span");
		dom.className = "pk-variable-tag";
		dom.id = uniqueId("pk-variable-tag");
		dom.setAttribute("contenteditable", "false");
		dom.setAttribute("data-drag-handle", "");
		dom.dataset.label = String(currentNode.attrs.label ?? "");
		dom.dataset.variableValue = String(currentNode.attrs.value ?? "");
		const label = document.createElement("button");
		label.type = "button";
		label.className = "pk-variable-tag__label";
		label.draggable = false;
		dom.append(label);
		syncUnresolvedPresentation(currentNode.attrs);
		let removeButton = null;
		let openOnInsertHandled = false;
		let openedAt = 0;
		const readLiveAttrs = () => {
			const pos = resolvePos();
			if (typeof pos === "number") {
				const live = editor.state.doc.nodeAt(pos);
				if (live?.type.name === "variableTag") return { ...live.attrs };
			}
			return { ...currentNode.attrs };
		};
		const openConfigure = () => {
			if (!editor.isEditable) return;
			const now = Date.now();
			if (now - openedAt < 300) return;
			openedAt = now;
			dom.removeAttribute("draggable");
			emitConfigure(editor, {
				editor,
				anchor: dom,
				attrs: readLiveAttrs(),
				getPos: resolvePos,
				updateAttributes,
				deleteNode
			});
		};
		label.addEventListener("pointerdown", (event) => {
			if (event.button !== 0) return;
			event.preventDefault();
			event.stopPropagation();
			openConfigure();
		});
		label.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
			openConfigure();
		});
		const syncRemoveButton = (editable) => {
			if (editable) {
				if (removeButton) return;
				removeButton = document.createElement("button");
				removeButton.type = "button";
				removeButton.className = "pk-variable-tag__remove";
				removeButton.setAttribute("aria-label", "Remove");
				removeButton.draggable = false;
				removeButton.innerHTML = REMOVE_ICON;
				removeButton.addEventListener("pointerdown", (event) => {
					event.preventDefault();
					event.stopPropagation();
				});
				removeButton.addEventListener("click", (event) => {
					event.preventDefault();
					event.stopPropagation();
					deleteNode();
				});
				dom.append(removeButton);
				return;
			}
			removeButton?.remove();
			removeButton = null;
		};
		syncRemoveButton(editor.isEditable);
		if (currentNode.attrs.openOnInsert && editor.isEditable && !openOnInsertHandled) {
			openOnInsertHandled = true;
			queueMicrotask(() => {
				updateAttributes({ openOnInsert: false });
				openConfigure();
			});
		}
		return {
			dom,
			stopEvent: (event) => {
				const target = event.target;
				if (!(target instanceof Element)) return false;
				return Boolean(target.closest(".pk-variable-tag__label") || target.closest(".pk-variable-tag__remove"));
			},
			selectNode: () => {
				dom.classList.add("ProseMirror-selectednode");
				dom.removeAttribute("draggable");
			},
			deselectNode: () => {
				dom.classList.remove("ProseMirror-selectednode");
				dom.removeAttribute("draggable");
			},
			update(updatedNode) {
				if (updatedNode.type.name !== "variableTag") return false;
				currentNode = updatedNode;
				dom.dataset.label = String(updatedNode.attrs.label ?? "");
				dom.dataset.variableValue = String(updatedNode.attrs.value ?? "");
				syncUnresolvedPresentation(updatedNode.attrs);
				syncRemoveButton(editor.isEditable);
				return true;
			}
		};
	};
}
//#endregion
//#region src/components/tiptap/tiptap.styles.ts
/**
* Indigo chip matching kit v1 VariableTagView (`bg-[#5C6BC0] text-white rounded-[2px]`).
* Shared by rich editor + single-line input ProseMirror hosts.
*/
var variableTagStyles = i`
    .pk-variable-tag {
        position: relative;
        display: inline-flex;
        align-items: stretch;
        max-width: 100%;
        margin-inline: 1px;
        margin-block-start: -3px;
        padding: 0;
        border-radius: 2px;
        background: #5c6bc0;
        color: #fff;
        font-size: 11px;
        font-weight: 400;
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        overflow: hidden;
        cursor: default;
        box-sizing: border-box;
    }

    /* Unresolved / missing reference — muted grey (not alarm yellow). */
    .pk-variable-tag--unresolved {
        background: var(--pk-color-gray-100, #f3f4f6);
        color: var(--pk-color-gray-600, #4b5563);
        box-shadow: inset 0 0 0 1px var(--pk-color-gray-300, #d1d5db);
    }

    .pk-variable-tag--unresolved.ProseMirror-selectednode {
        box-shadow:
            inset 0 0 0 1px var(--pk-color-gray-400, #9ca3af),
            0 0 0 2px rgba(156, 163, 175, 0.45);
    }

    .pk-variable-tag.ProseMirror-selectednode {
        outline: none;
        box-shadow: 0 0 0 2px rgba(123, 140, 232, 0.5);
    }

    .pk-variable-tag__label {
        display: inline-flex;
        align-items: center;
        max-width: 220px;
        margin: 0;
        padding: 4px 5px;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: inherit;
        line-height: inherit;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        user-select: none;
    }

    .pk-variable-tag__remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        margin: 0;
        padding: 4px 5px 4px 4px;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        line-height: 0;
        appearance: none;
    }

    .pk-variable-tag__remove svg {
        display: block;
        width: 10px;
        height: 10px;
        pointer-events: none;
    }
`;
var tiptapProseMirrorStyles = i`
    @layer pk-component {
        .ProseMirror {
            outline: none;
            min-height: 2rem;
            padding: 1rem;
            background: rgb(251, 252, 254);
            /* Craft CP body text (~gray-700), not gray-900. */
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            /* Match pk-input / body (14px). sm (13px) matched field instructions and looked undersized vs v1. */
            font-size: var(--pk-font-size-base);
            line-height: 1.5;
            white-space: pre-wrap;
            box-sizing: border-box;
        }

        .ProseMirror p {
            margin: 0 0 0.5rem;
        }

        .ProseMirror p:last-child {
            margin-bottom: 0;
        }

        .ProseMirror h1 {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 0.5rem;
        }

        .ProseMirror h2 {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0 0 0.5rem;
        }

        .ProseMirror h3,
        .ProseMirror h4,
        .ProseMirror h5,
        .ProseMirror h6 {
            font-weight: 600;
            margin: 0 0 0.5rem;
        }

        .ProseMirror a {
            color: var(--pk-color-blue-600);
            text-decoration: underline;
            cursor: pointer;
        }

        .ProseMirror ul,
        .ProseMirror ol {
            margin: 0 0 0.5rem;
            padding-left: 1.25rem;
        }

        .ProseMirror blockquote {
            margin: 0 0 0.5rem;
            padding-left: 0.75rem;
            border-left: 3px solid var(--pk-color-gray-300);
            color: var(--pk-color-gray-600);
        }

        .ProseMirror code {
            font-family: var(--pk-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: var(--pk-font-size-mono, 0.9em);
            line-height: var(--pk-line-height-mono, 1.5);
            background: var(--pk-color-gray-100);
            border-radius: 0.2rem;
            padding: 0.1rem 0.25rem;
        }

        .ProseMirror pre {
            margin: 0 0 0.5rem;
            padding: 0.75rem;
            background: var(--pk-color-gray-900);
            color: var(--pk-color-gray-50);
            border-radius: var(--pk-radius-md);
            overflow-x: auto;
            font-family: var(--pk-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: var(--pk-font-size-mono, 0.9em);
            line-height: var(--pk-line-height-mono, 1.5);
        }

        ${variableTagStyles}
    }
`;
/**
* Single-line TipTap field — same box metrics as `pk-input` .input
* (14px / line-height 1.4 / padding 6px 8px).
*
* ProseMirror always injects `br.ProseMirror-trailingBreak` for the caret.
* Never `display: none` it — that freezes one-liner docs after the first character.
* Clip to one line height instead so the break cannot inflate the control.
*/
var tiptapInputProseMirrorStyles = i`
    @layer pk-component {
        .ProseMirror {
            outline: none;
            margin: 0;
            /* Match stock pk-input padding by default. Hosts can override density via
             * --pk-tiptap-input-* (light DOM cannot style .ProseMirror in the shadow tree).
             */
            padding-block: var(--pk-tiptap-input-padding-block, 6px);
            padding-inline-start: var(--pk-tiptap-input-padding-inline-start, 8px);
            padding-inline-end: var(--pk-tiptap-input-padding-inline-end, 8px);
            /* One-liner clip: padding + control line-height (v1 text-sm), not a fixed shell token. */
            height: var(--pk-tiptap-input-height, calc(var(--pk-input-control-line-height, 1.25rem) + 12px));
            max-height: var(--pk-tiptap-input-height, calc(var(--pk-input-control-line-height, 1.25rem) + 12px));
            background: var(--pk-input-bg);
            /* Craft CP body / field value text. */
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-tiptap-input-font-size, var(--pk-font-size-base));
            line-height: var(--pk-tiptap-input-line-height, var(--pk-input-control-line-height, 1.25rem));
            white-space: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            box-sizing: border-box;
            scrollbar-width: none;
        }

        .ProseMirror::-webkit-scrollbar {
            display: none;
        }

        /* OneLinerDocument is inline-only; keep p inline if a schema ever wraps text. */
        .ProseMirror p {
            margin: 0;
            display: inline;
            line-height: inherit;
        }

        /* Read-only display: no input padding/height box (v1 skipped chrome when readOnly).
         * Inherit color/weight so list name links (text-blue-600 font-bold) show through. */
        :host([readonly]) .ProseMirror {
            padding-block: 0;
            padding-inline: 0;
            height: auto;
            max-height: none;
            background: transparent;
            overflow: visible;
            white-space: normal;
            color: inherit;
            font-weight: inherit;
            font-size: inherit;
        }

        ${variableTagStyles}
    }
`;
var tiptapContentProseMirrorStyles = i`
    @layer pk-component {
        /* Inherit host color/size so light-DOM wrappers (warning banners, badges)
           can restyle read-only TipTap without piercing the shadow tree. */
        .ProseMirror {
            outline: none;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
        }

        .ProseMirror p {
            margin: 0;
        }
    }
`;
//#endregion
export { createTiptapExtensions as A, contentToValue as C, getFatalTiptapContentError as D, valueToContent as E, normalizeContentArray as O, openCraftElementLinkSelector as S, flattenVariableOptions as T, getLinkOpenInNewTab as _, getToolbarGroupDefaultIcon as a, getCraftLinkOptions as b, isFormattingToolbarPreset as c, parseToolbarConfig as d, runToolbarButton as f, getLinkEditState as g, applyLinkToEditor as h, createVariableTagDomNodeView as i, createTiptapInputExtensions as j, valueToContent$1 as k, isHeadingsOnlyToolbarPreset as l, isTiptapButtonActive as m, tiptapInputProseMirrorStyles as n, getToolbarGroupMenuItems as o, toolbarIncludesButton as p, tiptapProseMirrorStyles as r, getToolbarGroupTriggerState as s, tiptapContentProseMirrorStyles as t, isToolbarButtonActive as u, getSelectedText as v, dedupeVariableOptions as w, getLinkOptionsElementSiteId as x, unsetLinkFromEditor as y };
