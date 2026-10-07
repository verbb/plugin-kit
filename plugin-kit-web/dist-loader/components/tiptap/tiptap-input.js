import { a as e, c as customElement, m as i, o as r, p as b, s as n } from "../../chunks/lit-B6nFKgbW.js";
import { c as __decorate, i as PkFormAssociatedElement, n as formControlStyles } from "../../chunks/pk-base-BGegy7-X.js";
import { t as MirrorValidator } from "../../chunks/mirror-validator-BkZlEv1Z.js";
import { t as Editor } from "../../chunks/tiptap-uppXgD5k.js";
import { i as createVariableTagDomNodeView, n as tiptapInputProseMirrorStyles, s as createTiptapInputExtensions } from "../../chunks/tiptap.styles-CyqI_Wrl.js";
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
//#region src/components/tiptap/pk-tiptap-input.styles.ts
var pkTiptapInputStyles = i`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: 1.4;
        }

        /* Same chrome as pk-input .input — border/radius live on the shell. */
        .shell {
            box-sizing: border-box;
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius, var(--pk-radius-sm));
            background: var(--pk-input-bg);
            overflow: hidden;
        }

        :host([invalid]) .shell,
        :host(:state(user-invalid)) .shell {
            border-color: var(--pk-color-rose-600);
        }

        /* Editable-table cells (v1): flush TipTap shell — chips sit in the row, not a boxed field. */
        :host([fit-cell]),
        :host([data-editable-table-input]) {
            display: block;
            height: 100%;
            min-height: 100%;
            box-sizing: border-box;
        }

        :host([fit-cell]) .shell,
        :host([data-editable-table-input]) .shell {
            border: none;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            height: 100%;
            min-height: 100%;
        }

        /* Read-only display (lists, picker cards): v1 skipped input chrome when readOnly. */
        :host([readonly]) .shell {
            border: none;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            overflow: visible;
        }

        :host([fit-cell][invalid]) .shell,
        :host([fit-cell]:state(user-invalid)) .shell,
        :host([data-editable-table-input][invalid]) .shell,
        :host([data-editable-table-input]:state(user-invalid)) .shell {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }

        .editor-mount {
            display: block;
            min-width: 0;
        }

        .mirror-input {
            display: none;
        }
    }
`;
//#endregion
//#region src/components/tiptap/pk-tiptap-input.ts
var PkTiptapInput = class PkTiptapInput extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["blur", "input"];
		this.editor = null;
		this.lastEmitted = null;
		this.suppressUpdateEmission = false;
		this._value = null;
		this.variableCategories = {};
		this.variableTagConfigure = null;
		this.readonly = false;
		this.invalid = false;
		this.fitCell = false;
		this.defaultValue = "";
	}
	static {
		this.styles = [
			formControlStyles,
			pkTiptapInputStyles,
			tiptapInputProseMirrorStyles
		];
	}
	static get validators() {
		return [...super.validators, MirrorValidator()];
	}
	get value() {
		if (this.valueHasChanged) return this._value ?? "";
		return this._value ?? this.defaultValue ?? "";
	}
	set value(val) {
		const next = val ?? "";
		if (this._value === next) return;
		this.valueHasChanged = true;
		this._value = next;
	}
	get editorInstance() {
		return this.editor;
	}
	resolveVariableLists() {
		const topLevel = dedupeVariableOptions(Object.values(this.variableCategories ?? {}).flatMap((items) => {
			return Array.isArray(items) ? items : [];
		}));
		return {
			topLevel,
			all: flattenVariableOptions(topLevel)
		};
	}
	resolveEditorContent() {
		const { topLevel, all } = this.resolveVariableLists();
		return valueToContent(this.value, topLevel, all);
	}
	syncFormValue() {
		this.setValue(this.value || "");
		if (this.input) this.input.value = this.value || "";
	}
	resetToDefaultValue() {
		this.valueHasChanged = false;
		this._value = null;
		this.syncEditorContent(true);
	}
	restoreFormState(state) {
		if (typeof state === "string") {
			this.value = state;
			this.syncEditorContent(true);
		}
	}
	disconnectedCallback() {
		this.editor?.destroy();
		this.editor = null;
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("value") && !changed.has("defaultValue")) this.syncEditorContent();
		if (changed.has("defaultValue") && !this.valueHasChanged) this.syncEditorContent();
		if (changed.has("variableCategories") && this.editor) this.syncEditorContent(true);
		if (changed.has("disabled") || changed.has("readonly")) this.editor?.setEditable(!this.disabled && !this.readonly);
		super.updated(changed);
	}
	firstUpdated() {
		this.mountEditor();
		this.syncFormValue();
	}
	mountEditor() {
		const content = this.resolveEditorContent();
		this.editor = new Editor({
			element: this.editorMount,
			extensions: createTiptapInputExtensions({ variableTagNodeView: createVariableTagDomNodeView() }),
			content,
			editable: !this.disabled && !this.readonly,
			onUpdate: ({ editor }) => {
				const nextValue = contentToValue(editor.getJSON().content);
				this.lastEmitted = nextValue;
				if (this.suppressUpdateEmission) return;
				this.value = nextValue;
				if (this.input) this.input.value = nextValue;
				this.syncFormValue();
				this.emitValueChange(nextValue);
			}
		});
	}
	syncEditorContent(force = false) {
		if (!this.editor) return;
		if (!force && !this.readonly && this.editor.isFocused) return;
		const nextContent = this.resolveEditorContent();
		const currentContent = this.editor.getJSON();
		if (JSON.stringify(nextContent) === JSON.stringify(currentContent)) return;
		if (!force && this.lastEmitted === this.value) return;
		this.suppressUpdateEmission = true;
		try {
			this.editor.commands.setContent(nextContent ?? {
				type: "doc",
				content: []
			});
		} finally {
			this.suppressUpdateEmission = false;
		}
	}
	emitValueChange(value) {
		this.dispatchEvent(new CustomEvent("pk-change", {
			detail: { value },
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	render() {
		return b`
            <div class="shell" part="shell">
                <div class="editor-mount" part="editor"></div>
                <input class="mirror-input" type="text" .value=${this.value} readonly tabindex="-1" aria-hidden="true" />
            </div>
        `;
	}
};
__decorate([e(".editor-mount")], PkTiptapInput.prototype, "editorMount", void 0);
__decorate([e(".mirror-input")], PkTiptapInput.prototype, "input", void 0);
__decorate([n({ attribute: false })], PkTiptapInput.prototype, "variableCategories", void 0);
__decorate([n({ attribute: false })], PkTiptapInput.prototype, "variableTagConfigure", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkTiptapInput.prototype, "readonly", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkTiptapInput.prototype, "invalid", void 0);
__decorate([n({
	type: Boolean,
	reflect: true,
	attribute: "fit-cell"
})], PkTiptapInput.prototype, "fitCell", void 0);
__decorate([r()], PkTiptapInput.prototype, "value", null);
__decorate([n({
	attribute: "value",
	reflect: true
})], PkTiptapInput.prototype, "defaultValue", void 0);
PkTiptapInput = __decorate([customElement("pk-tiptap-input")], PkTiptapInput);
//#endregion
export { PkTiptapInput };
