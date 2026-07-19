import { t as icons_exports } from "./icons-BR8JcQj2.js";
import { t as __decorate } from "./decorate-W02hmVTt.js";
import { t as PkFormAssociatedElement } from "./pk-form-associated-element-DmZKgNPL.js";
import { t as MirrorValidator } from "./mirror-validator-DCjNYrrx.js";
import { t as formControlStyles } from "./form-control.styles-BQdimE5o.js";
import { n as renderIconHtml } from "./render-Dvc3MHQR.js";
import { i as uniqueId } from "./focus-aa5dlv8k.js";
import { i as createVariableTagDomNodeView, r as tiptapProseMirrorStyles } from "./tiptap.styles-BytOpP0H.js";
import { css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { Editor, getMarkRange, posToDOMRect } from "@tiptap/core";
import { applyLinkToEditor, createTiptapExtensions, getCraftLinkOptions, getFatalTiptapContentError, getLinkEditState, getLinkOpenInNewTab, getLinkOptionsElementSiteId, getSelectedText, getToolbarGroupDefaultIcon, getToolbarGroupMenuItems, getToolbarGroupTriggerState, isFormattingToolbarPreset, isHeadingsOnlyToolbarPreset, isTiptapButtonActive, isToolbarButtonActive, normalizeContentArray, openCraftElementLinkSelector, parseToolbarConfig, runToolbarButton, toolbarIncludesButton, unsetLinkFromEditor, valueToContent } from "@verbb/plugin-kit-tiptap-core";
//#region src/components/tiptap/tiptap-editor-host.ts
function serializeTiptapDocumentContent(content) {
	return JSON.stringify(normalizeContentArray(content));
}
/** Normalize React/HTML `value` into the JSON string the editor stores and emits. */
function serializeTiptapDocumentValue(raw) {
	if (raw == null) return "[]";
	if (typeof raw === "string") return raw;
	if (Array.isArray(raw)) return JSON.stringify(raw);
	return "[]";
}
function parseTiptapDocumentValue(raw) {
	if (raw == null || raw === "") return [];
	if (Array.isArray(raw)) return raw;
	if (typeof raw !== "string") return [];
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
var TiptapEditorHost = class {
	constructor() {
		this.editor = null;
		this.lastEmitted = null;
		this.suppressUpdateEmission = false;
	}
	mount({ element, extensions, content, editable, trailingCursorText = "⁠", minHeight, onUpdate }) {
		const doc = valueToContent(content, { trailingCursorText });
		this.editor = new Editor({
			element,
			extensions: extensions ?? createTiptapExtensions({ trailingCursorText }),
			content: doc,
			editable,
			onUpdate: ({ editor }) => {
				const normalized = normalizeContentArray(editor.getJSON().content);
				const serialized = JSON.stringify(normalized);
				this.lastEmitted = serialized;
				if (this.suppressUpdateEmission) return;
				onUpdate?.(normalized);
			}
		});
		if (minHeight) this.editor.view.dom.style.minHeight = minHeight;
	}
	setContent(content, options = {}) {
		if (!this.editor) return;
		const { trailingCursorText = "⁠", respectFocus = true } = options;
		if (respectFocus && this.editor.isFocused) return;
		const doc = valueToContent(content, { trailingCursorText });
		const incoming = JSON.stringify(doc?.content ?? []);
		if (incoming === JSON.stringify(this.editor.getJSON().content ?? []) || incoming === this.lastEmitted) return;
		this.suppressUpdateEmission = true;
		try {
			this.editor.commands.setContent(doc ?? {
				type: "doc",
				content: []
			});
		} finally {
			this.suppressUpdateEmission = false;
		}
	}
	destroy() {
		this.editor?.destroy();
		this.editor = null;
		this.lastEmitted = null;
		this.suppressUpdateEmission = false;
	}
};
//#endregion
//#region src/components/tiptap/tiptap-utils.ts
function createCraftElementSelectorHost() {
	return { openElementSelector: (elementType, options) => {
		const open = window.Craft?.createElementSelectorModal;
		if (!open) throw new Error("Craft element selector is not available in this environment.");
		open(elementType, options);
	} };
}
function parseLinkOptionsAttribute(raw) {
	if (!raw) return;
	try {
		return JSON.parse(raw);
	} catch {
		return;
	}
}
function parseToolbarAttribute(toolbarRaw, buttonsRaw) {
	if (Array.isArray(toolbarRaw)) return parseToolbarConfig(toolbarRaw);
	if (typeof toolbarRaw === "string" && toolbarRaw.trim()) return parseToolbarConfig(toolbarRaw);
	if (Array.isArray(buttonsRaw)) return parseToolbarConfig(buttonsRaw.join(","));
	return parseToolbarConfig(buttonsRaw ?? "bold,italic");
}
//#endregion
//#region src/components/tiptap/tiptap-toolbar.ts
var TOOLBAR_CHEVRON_HTML = renderIconHtml(icons_exports.chevronDown);
var TOOLBAR_ICONS = {
	bold: renderIconHtml(icons_exports.bold),
	italic: renderIconHtml(icons_exports.italic),
	underline: renderIconHtml(icons_exports.underline),
	strikethrough: renderIconHtml(icons_exports.strikethrough),
	subscript: renderIconHtml(icons_exports.subscript),
	superscript: renderIconHtml(icons_exports.superscript),
	code: renderIconHtml(icons_exports.bracketsCurly),
	"code-block": renderIconHtml(icons_exports.code),
	highlight: renderIconHtml(icons_exports.highlighter),
	h1: renderIconHtml(icons_exports.h1),
	h2: renderIconHtml(icons_exports.h2),
	h3: renderIconHtml(icons_exports.h3),
	h4: renderIconHtml(icons_exports.h4),
	h5: renderIconHtml(icons_exports.h5),
	h6: renderIconHtml(icons_exports.h6),
	heading: renderIconHtml(icons_exports.heading),
	paragraph: renderIconHtml(icons_exports.paragraph),
	"unordered-list": renderIconHtml(icons_exports.listUl),
	"ordered-list": renderIconHtml(icons_exports.listOl),
	blockquote: renderIconHtml(icons_exports.quoteRight),
	"align-left": renderIconHtml(icons_exports.alignLeft),
	"align-center": renderIconHtml(icons_exports.alignCenter),
	"align-right": renderIconHtml(icons_exports.alignRight),
	"align-justify": renderIconHtml(icons_exports.alignJustify),
	"clear-format": renderIconHtml(icons_exports.textSlash),
	hr: renderIconHtml(icons_exports.minus),
	"line-break": renderIconHtml(icons_exports.fileDashedLine),
	link: renderIconHtml(icons_exports.link),
	table: renderIconHtml(icons_exports.table),
	undo: renderIconHtml(icons_exports.arrowRotateLeft),
	redo: renderIconHtml(icons_exports.arrowRotateRight)
};
var TOOLBAR_LABELS = {
	bold: "Bold",
	italic: "Italic",
	underline: "Underline",
	strikethrough: "Strikethrough",
	subscript: "Subscript",
	superscript: "Superscript",
	code: "Inline code",
	"code-block": "Code block",
	highlight: "Highlight",
	h1: "Heading 1",
	h2: "Heading 2",
	h3: "Heading 3",
	h4: "Heading 4",
	h5: "Heading 5",
	h6: "Heading 6",
	paragraph: "Paragraph",
	"unordered-list": "Bullet list",
	"ordered-list": "Numbered list",
	blockquote: "Blockquote",
	"align-left": "Align left",
	"align-center": "Align center",
	"align-right": "Align right",
	"align-justify": "Justify",
	"clear-format": "Clear format",
	hr: "Horizontal rule",
	"line-break": "Line break",
	link: "Link",
	table: "Table",
	undo: "Undo",
	redo: "Redo"
};
function getToolbarMenuItemLabel(buttonName) {
	return TOOLBAR_LABELS[buttonName] ?? buttonName;
}
/** Prefix icon for `pk-dropdown-item` — SVG must carry `slot="prefix"` directly. */
function createToolbarPrefixIcon(buttonName) {
	const iconHtml = TOOLBAR_ICONS[buttonName];
	if (!iconHtml) return null;
	const template = document.createElement("template");
	template.innerHTML = iconHtml.trim();
	const icon = template.content.firstElementChild;
	if (!(icon instanceof SVGSVGElement)) return null;
	icon.setAttribute("slot", "prefix");
	icon.setAttribute("aria-hidden", "true");
	icon.setAttribute("width", "12");
	icon.setAttribute("height", "12");
	icon.classList.add("pk-dropdown-item__prefix-icon");
	return icon;
}
//#endregion
//#region src/components/tiptap/pk-tiptap-editor.styles.ts
var pkTiptapEditorStyles = css`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
        }

        .shell {
            overflow: hidden;
            border: var(--pk-input-border);
            border-radius: var(--pk-radius-md);
            background: #fff;
        }

        :host([invalid]) .shell,
        :host(:state(user-invalid)) .shell {
            border-color: var(--pk-color-rose-600);
        }

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
            padding: 0.25rem 0.5rem;
            border-bottom: 1px solid rgba(96, 125, 159, 0.4);
            background: #fff;
            box-shadow: 0 2px 3px rgba(49, 49, 93, 0.07);
        }

        .toolbar-item {
            display: inline-flex;
        }

        .toolbar-item pk-tooltip {
            display: contents;
        }

        .toolbar-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            margin: 0;
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-md);
            background: transparent;
            color: #1c2e36;
            cursor: pointer;
        }

        .toolbar-btn:hover:not(:disabled) {
            background: rgb(241, 245, 249);
        }

        .toolbar-btn[data-state='active'] {
            background: rgb(226, 232, 240);
        }

        .toolbar-btn:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .toolbar-btn svg {
            display: block;
            width: 1rem;
            height: 1rem;
            pointer-events: none;
        }

        .toolbar-btn--menu {
            width: auto;
            min-width: 2rem;
            gap: 0.125rem;
            padding: 0 0.375rem;
        }

        .toolbar-btn__trigger-label {
            font-size: 0.625rem;
            font-weight: 700;
            line-height: 1;
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }

        .toolbar-btn__chevron {
            display: inline-flex;
            flex-shrink: 0;
            opacity: 0.7;
        }

        .toolbar-btn__chevron svg {
            width: 0.5rem;
            height: 0.5rem;
        }

        .toolbar-separator {
            align-self: center;
            flex-shrink: 0;
            width: 1px;
            height: 1.25rem;
            margin: 0 0.125rem;
            background: rgba(96, 125, 159, 0.35);
        }

        .toolbar-btn__label {
            font-size: 0.625rem;
            font-weight: 600;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.02em;
        }

        /* Full toolbar replace (slot=toolbar on host when hasCustomToolbar). */
        .toolbar ::slotted([slot='toolbar']) {
            display: contents;
        }

        /* Append lane inside the stock toolbar — one flex item per slotted root (same gap). */
        .toolbar ::slotted([slot='toolbar-end']) {
            display: inline-flex;
            align-items: center;
        }

        .editor-mount {
            position: relative;
        }

        .content-error {
            display: flex;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid var(--pk-color-rose-200);
            background: var(--pk-color-rose-50);
            color: var(--pk-color-rose-800);
            font-size: var(--pk-font-size-sm);
        }

        .mirror-input {
            display: none;
        }

        /* No trigger slot — collapse the host so it does not reserve shell space.
           Toolbar refresh while open is still gated by linkDialogBusy / open. */
        .link-dialog {
            display: contents;
        }

        .link-dialog__fields {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .link-bubble {
            position: absolute;
            z-index: 250;
            display: flex;
            align-items: center;
            gap: 0;
            width: max-content;
            max-width: calc(100% - 1rem);
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-md);
            background: #1c2e36;
            color: #fff;
            font-size: 12px;
            line-height: 1.5;
            overflow: visible;
            pointer-events: auto;
            white-space: nowrap;
        }

        .link-bubble__arrow {
            position: absolute;
            left: 50%;
            bottom: -0.25rem;
            width: 0.5rem;
            height: 0.5rem;
            background: #1c2e36;
            transform: translateX(-50%) rotate(45deg);
            pointer-events: none;
        }

        .link-bubble__url,
        .link-bubble__action {
            box-sizing: border-box;
            padding: 6px 8px;
            font-size: 12px;
            line-height: 1.5;
        }

        .link-bubble__url {
            display: inline-flex;
            align-items: center;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .link-bubble__divider {
            flex-shrink: 0;
            align-self: center;
            width: 1px;
            height: 12px;
            background: #616d73;
        }

        .link-bubble__action {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: #fff;
            font-family: inherit;
            font-weight: inherit;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
            min-height: 0;
            transition: color 0.15s ease;
        }

        .link-bubble__action:hover {
            color: rgb(255 255 255 / 0.7);
        }
    }
`;
//#endregion
//#region src/components/tiptap/pk-tiptap-editor.ts
var PkTiptapEditor = class PkTiptapEditor extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["blur", "input"];
		this.linkUrlInputId = uniqueId("pk-tiptap-link-url");
		this.linkTextInputId = uniqueId("pk-tiptap-link-text");
		this.host = new TiptapEditorHost();
		this._value = null;
		this.buttons = "bold,italic";
		this.toolbar = null;
		this.linkOptions = null;
		this.rows = 4;
		this.placeholder = "";
		this.readonly = false;
		this.invalid = false;
		this.variableTagConfigure = null;
		this.invalidContentMessage = "";
		this.toolbarTooltips = true;
		this.linkDialogBusy = false;
		this.linkDialogSeed = {};
		this.linkDialogTitle = "Insert Link";
		this.linkDialogSubmitLabel = "Insert";
		this.linkDialogMounted = false;
		this.linkBubbleVisible = false;
		this.linkBubbleHref = "";
		this.linkBubbleTop = 0;
		this.linkBubbleLeft = 0;
		this.hasCustomToolbar = false;
		this.linkButtonId = uniqueId("pk-tiptap-link-btn");
		this.toolbarButtonIds = /* @__PURE__ */ new Map();
		this.toolbarGroupIds = /* @__PURE__ */ new Map();
		this.selectionListenerAttached = false;
		this.defaultValue = "[]";
		this.handleLinkBubbleEdit = (event) => {
			event.preventDefault();
			const editor = this.host.editor;
			if (!editor) return;
			const state = getLinkEditState(editor);
			this.linkBubbleVisible = false;
			this.openLinkDialog({
				url: state.href,
				text: state.text,
				openInNewTab: state.openInNewTab,
				from: state.from,
				to: state.to
			});
		};
		this.handleLinkBubbleUnlink = (event) => {
			event.preventDefault();
			const editor = this.host.editor;
			if (!editor) return;
			unsetLinkFromEditor(editor);
			this.linkBubbleVisible = false;
		};
		this.handleLinkDialogAfterHide = () => {
			this.linkDialogBusy = false;
			queueMicrotask(() => {
				if (this.isConnected && !this.linkDialog?.open) this.requestUpdate();
			});
		};
		this.handleLinkUrlInput = () => {
			this.updateLinkDialogSubmitState();
		};
		this.handleLinkDialogKeyDown = (event) => {
			if (event.key !== "Enter") return;
			const path = event.composedPath();
			if (path.some((node) => node instanceof HTMLElement && node.localName === "pk-checkbox")) return;
			if (path.some((node) => node instanceof HTMLElement && node.localName === "pk-button")) return;
			if (path.some((node) => node instanceof HTMLButtonElement)) return;
			event.preventDefault();
			event.stopPropagation();
			this.submitLinkDialog();
		};
		this.handleLinkDialogSubmit = () => {
			this.submitLinkDialog();
		};
	}
	static {
		this.styles = [
			formControlStyles,
			pkTiptapEditorStyles,
			tiptapProseMirrorStyles
		];
	}
	static get validators() {
		return [...super.validators, MirrorValidator()];
	}
	get value() {
		if (this.valueHasChanged) return this._value ?? "[]";
		return this._value ?? this.defaultValue ?? "[]";
	}
	/**
	* Document JSON string. Also accepts a TipTap node array (common from React)
	* and serializes it — arrays previously bypassed JSON.parse and mounted empty.
	*/
	set value(val) {
		const next = serializeTiptapDocumentValue(val);
		if (this._value === next) return;
		this.valueHasChanged = true;
		this._value = next;
	}
	get editor() {
		return this.host.editor;
	}
	get toolbarNodes() {
		const buttonsRaw = Array.isArray(this.buttons) ? this.buttons.join(",") : this.buttons;
		return parseToolbarAttribute(this.toolbar, buttonsRaw).filter((node) => node.type !== "button" || node.name !== "variableTag");
	}
	/** Resolved flat button names from the active toolbar config. */
	get buttonNames() {
		return this.toolbarNodes.filter((node) => node.type === "button").map((node) => node.name);
	}
	toolbarHasLink() {
		return toolbarIncludesButton(this.toolbarNodes, "link");
	}
	resolveLinkOptions() {
		return parseLinkOptionsAttribute(this.linkOptions);
	}
	get contentError() {
		return this.resolveContentError();
	}
	syncFormValue() {
		this.setValue(this.value || "[]");
		if (this.input) this.input.value = this.value || "[]";
	}
	resetToDefaultValue() {
		this.valueHasChanged = false;
		this._value = null;
		this.syncEditorContent();
	}
	restoreFormState(state) {
		if (typeof state === "string") {
			this.value = state;
			this.syncEditorContent();
		}
	}
	connectedCallback() {
		super.connectedCallback();
		this.hasCustomToolbar = Boolean(this.querySelector("[slot=\"toolbar\"]"));
	}
	disconnectedCallback() {
		this.linkDialog?.forceOverlayReset();
		this.linkDialogBusy = false;
		this.host.destroy();
		this.selectionListenerAttached = false;
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("value") && !changed.has("defaultValue")) this.syncEditorContent();
		if (changed.has("defaultValue") && !this.valueHasChanged) this.syncEditorContent();
		if (changed.has("disabled") || changed.has("readonly")) this.host.editor?.setEditable(!this.disabled && !this.readonly);
		super.updated(changed);
	}
	firstUpdated() {
		queueMicrotask(() => {
			this.mountEditor();
			this.syncFormValue();
		});
	}
	resolveContentError() {
		const detected = getFatalTiptapContentError(this.value);
		return detected ? this.invalidContentMessage || detected : "";
	}
	mountEditor() {
		const content = this.contentError ? null : parseTiptapDocumentValue(this.value);
		const minHeight = `${Math.max(1, Number(this.rows || 0)) * 24 + 32}px`;
		this.host.mount({
			element: this.editorMount,
			extensions: createTiptapExtensions({
				trailingCursorText: "⁠",
				variableTagNodeView: createVariableTagDomNodeView()
			}),
			content,
			editable: !this.disabled && !this.readonly && !this.contentError,
			trailingCursorText: "⁠",
			minHeight,
			onUpdate: (nextContent) => {
				const serialized = serializeTiptapDocumentContent(nextContent);
				this.value = serialized;
				if (this.input) this.input.value = serialized;
				this.syncFormValue();
				this.emitValueChange(serialized);
			}
		});
		queueMicrotask(() => {
			this.attachSelectionListeners();
		});
	}
	attachSelectionListeners() {
		const editor = this.host.editor;
		if (!editor || this.selectionListenerAttached) return;
		const refreshToolbar = () => {
			if (this.linkDialogBusy || this.linkDialog?.open) {
				this.linkBubbleVisible = false;
				return;
			}
			this.updateLinkBubble();
			queueMicrotask(() => {
				if (this.isConnected && !this.linkDialogBusy && !this.linkDialog?.open) this.requestUpdate();
			});
		};
		editor.on("selectionUpdate", refreshToolbar);
		editor.on("transaction", refreshToolbar);
		editor.on("focus", refreshToolbar);
		editor.on("blur", () => {
			this.linkBubbleVisible = false;
			this.requestUpdate();
		});
		this.selectionListenerAttached = true;
	}
	updateLinkBubble() {
		const editor = this.host.editor;
		if (!editor || this.disabled || this.readonly || this.linkDialogBusy || this.linkDialog?.open || !editor.isFocused || !editor.isActive("link")) {
			this.linkBubbleVisible = false;
			return;
		}
		const linkType = editor.state.schema.marks.link;
		const range = getMarkRange(editor.state.selection.$from, linkType);
		if (!range) {
			this.linkBubbleVisible = false;
			return;
		}
		const linkRect = posToDOMRect(editor.view, range.from, range.to);
		const mountRect = this.editorMount.getBoundingClientRect();
		const bubbleOffset = 8;
		this.linkBubbleHref = String(editor.getAttributes("link").href ?? "");
		this.linkBubbleTop = linkRect.top - mountRect.top - bubbleOffset;
		this.linkBubbleLeft = linkRect.left - mountRect.left + linkRect.width / 2;
		this.linkBubbleVisible = true;
	}
	renderLinkBubble() {
		return html`
            <div
                class="link-bubble"
                role="toolbar"
                aria-label="Link actions"
                tabindex="0"
                style=${`top:${this.linkBubbleTop}px;left:${this.linkBubbleLeft}px;transform:translate(-50%, -100%);`}
            >
                <span class="link-bubble__arrow" aria-hidden="true"></span>
                <span class="link-bubble__url" title=${this.linkBubbleHref}>${this.linkBubbleHref}</span>
                <span class="link-bubble__divider" aria-hidden="true"></span>
                <button
                    type="button"
                    class="link-bubble__action"
                    @mousedown=${(event) => event.preventDefault()}
                    @click=${this.handleLinkBubbleEdit}
                >Edit</button>
                <span class="link-bubble__divider" aria-hidden="true"></span>
                <button
                    type="button"
                    class="link-bubble__action"
                    @mousedown=${(event) => event.preventDefault()}
                    @click=${this.handleLinkBubbleUnlink}
                >Unlink</button>
            </div>
        `;
	}
	syncEditorContent() {
		const content = this.contentError ? null : parseTiptapDocumentValue(this.value);
		this.host.setContent(content, { trailingCursorText: "⁠" });
		if (this.input) this.input.value = this.value || "[]";
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
	handleToolbarCommand(buttonName) {
		const editor = this.host.editor;
		if (!editor) return;
		runToolbarButton(editor, buttonName);
	}
	openLinkMenu() {
		const editor = this.host.editor;
		if (!editor) return;
		const selected = getSelectedText(editor);
		const { from, to } = editor.state.selection;
		const menu = this.shadowRoot?.querySelector(`pk-dropdown-menu[for="${this.linkButtonId}"]`);
		(async () => {
			await menu?.whenClosed();
			this.openLinkDialog(from !== to ? {
				text: selected,
				from,
				to
			} : void 0);
		})();
	}
	openLinkDialog(initial) {
		const editor = this.host.editor;
		const url = initial?.url ?? "";
		this.linkDialogBusy = true;
		this.linkBubbleVisible = false;
		this.linkDialogSeed = {
			url,
			text: initial?.text ?? "",
			openInNewTab: initial?.openInNewTab ?? (editor ? getLinkOpenInNewTab(editor) : false),
			from: initial?.from,
			to: initial?.to
		};
		this.linkDialogTitle = url.trim() ? "Update Link" : "Insert Link";
		this.linkDialogSubmitLabel = url.trim() ? "Update" : "Insert";
		if (!this.linkDialogMounted) this.linkDialogMounted = true;
		queueMicrotask(async () => {
			await this.updateComplete;
			await this.linkDialog?.updateComplete;
			this.syncLinkDialogFields();
			await this.linkDialog?.show();
		});
	}
	closeLinkDialog() {
		this.linkDialog?.hide("close-button");
	}
	syncLinkDialogFields() {
		const seed = this.linkDialogSeed;
		if (this.linkUrlInput) this.linkUrlInput.value = seed.url ?? "";
		if (this.linkTextInput) this.linkTextInput.value = seed.text ?? "";
		if (this.linkNewTabCheckbox) this.linkNewTabCheckbox.checked = Boolean(seed.openInNewTab);
		this.updateLinkDialogSubmitState();
	}
	updateLinkDialogSubmitState() {
		const canSubmit = Boolean(this.linkUrlInput?.value.trim());
		if (this.linkSubmitButton) this.linkSubmitButton.disabled = !canSubmit;
	}
	submitLinkDialog() {
		const editor = this.host.editor;
		const url = this.linkUrlInput?.value.trim() ?? "";
		if (!editor || !url) return;
		applyLinkToEditor(editor, {
			url,
			text: this.linkTextInput?.value ?? "",
			openInNewTab: Boolean(this.linkNewTabCheckbox?.checked),
			from: this.linkDialogSeed.from,
			to: this.linkDialogSeed.to
		});
		this.closeLinkDialog();
	}
	isLinkActive() {
		const editor = this.host.editor;
		return editor ? isTiptapButtonActive(editor, "link") : false;
	}
	renderLinkDialog() {
		return html`
            <pk-dialog
                class="link-dialog"
                size="wide"
                label=${this.linkDialogTitle}
                @pk-after-hide=${this.handleLinkDialogAfterHide}
                @keydown=${this.handleLinkDialogKeyDown}
            >
                <div class="link-dialog__fields">
                    <pk-field label="URL" required .for=${this.linkUrlInputId}>
                        <pk-input
                            id=${this.linkUrlInputId}
                            class="link-dialog__url-input"
                            type="url"
                            placeholder="https://"
                            autofocus
                            @input=${this.handleLinkUrlInput}
                        ></pk-input>
                    </pk-field>
                    <pk-field label="Text" .for=${this.linkTextInputId}>
                        <pk-input
                            id=${this.linkTextInputId}
                            class="link-dialog__text-input"
                            type="text"
                        ></pk-input>
                    </pk-field>
                    <pk-checkbox>Open link in new tab</pk-checkbox>
                </div>
                <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
                <pk-button
                    slot="footer"
                    class="link-dialog__submit"
                    variant="primary"
                    disabled
                    @click=${this.handleLinkDialogSubmit}
                >
                    ${this.linkDialogSubmitLabel}
                </pk-button>
            </pk-dialog>
        `;
	}
	getToolbarButtonId(buttonName) {
		let id = this.toolbarButtonIds.get(buttonName);
		if (!id) {
			id = uniqueId(`pk-tiptap-toolbar-${buttonName}`);
			this.toolbarButtonIds.set(buttonName, id);
		}
		return id;
	}
	getToolbarButtonLabel(buttonName) {
		return TOOLBAR_LABELS[buttonName] ?? buttonName;
	}
	renderToolbarTooltip(buttonId, label) {
		if (!this.toolbarTooltips) return nothing;
		return html`
            <pk-tooltip for=${buttonId} content=${label} placement="top"></pk-tooltip>
        `;
	}
	renderToolbarButton(buttonName) {
		const editor = this.host.editor;
		const icon = TOOLBAR_ICONS[buttonName];
		const label = this.getToolbarButtonLabel(buttonName);
		const buttonId = this.getToolbarButtonId(buttonName);
		const active = editor ? isTiptapButtonActive(editor, buttonName) : false;
		return html`
            <div class="toolbar-item">
                <button
                    id=${buttonId}
                    type="button"
                    class="toolbar-btn"
                    aria-label=${label}
                    ?disabled=${this.disabled || this.readonly}
                    data-state=${active ? "active" : nothing}
                    @click=${() => this.handleToolbarCommand(buttonName)}
                >
                    ${icon ? unsafeSVG(icon) : html`<span class="toolbar-btn__label">${label}</span>`}
                </button>
                ${this.renderToolbarTooltip(buttonId, label)}
            </div>
        `;
	}
	handleCraftLink(config) {
		const editor = this.host.editor;
		if (!editor) return;
		openCraftElementLinkSelector({
			config,
			elementSiteId: getLinkOptionsElementSiteId(this.resolveLinkOptions()),
			linkSelectorStorageKeyPrefix: this.linkSelectorStorageKeyPrefix,
			getSelectedText: () => getSelectedText(editor),
			onSelect: ({ url, text }) => {
				this.openLinkDialog({
					url,
					text
				});
			},
			host: createCraftElementSelectorHost()
		});
	}
	getToolbarGroupId(groupKey) {
		let id = this.toolbarGroupIds.get(groupKey);
		if (!id) {
			id = uniqueId("pk-tiptap-toolbar-group");
			this.toolbarGroupIds.set(groupKey, id);
		}
		return id;
	}
	renderToolbarSeparator() {
		return html`<span class="toolbar-separator" aria-hidden="true"></span>`;
	}
	renderGroupTriggerContent(group, triggerLabel, iconName) {
		const icon = TOOLBAR_ICONS[iconName];
		if (Boolean(group.label) && triggerLabel) return html`
                <span class="toolbar-btn__trigger-label">${triggerLabel}</span>
                <span class="toolbar-btn__chevron">${unsafeSVG(TOOLBAR_CHEVRON_HTML)}</span>
            `;
		return html`
            ${icon ? unsafeSVG(icon) : html`<span class="toolbar-btn__trigger-label">${triggerLabel}</span>`}
            <span class="toolbar-btn__chevron">${unsafeSVG(TOOLBAR_CHEVRON_HTML)}</span>
        `;
	}
	renderToolbarGroup(group, groupKey) {
		const editor = this.host.editor;
		const groupId = this.getToolbarGroupId(groupKey);
		const trigger = editor ? getToolbarGroupTriggerState(editor, group) : {
			activeName: null,
			label: group.label ?? "",
			isActive: false,
			icon: group.icon ?? getToolbarGroupDefaultIcon(group)
		};
		const menuItems = getToolbarGroupMenuItems(group);
		const tooltipLabel = group.label ?? (isHeadingsOnlyToolbarPreset(group.preset) ? "Headings" : isFormattingToolbarPreset(group.preset) ? "Formatting" : group.preset === "lists" ? "Lists" : group.preset === "align" ? "Alignment" : "More");
		return html`
            <div class="toolbar-item">
                <button
                    id=${groupId}
                    type="button"
                    class="toolbar-btn toolbar-btn--menu"
                    aria-label=${tooltipLabel}
                    aria-haspopup="menu"
                    ?disabled=${this.disabled || this.readonly}
                    data-state=${trigger.isActive ? "active" : nothing}
                >
                    ${this.renderGroupTriggerContent(group, trigger.label, trigger.icon)}
                </button>
                ${this.renderToolbarTooltip(groupId, tooltipLabel)}
                <pk-dropdown-menu for=${groupId} placement="bottom-start">
                    ${menuItems.map((entry, itemIndex) => {
			if (entry.type === "separator") return html`<pk-dropdown-separator key=${`${groupKey}-sep-${itemIndex}`}></pk-dropdown-separator>`;
			const itemName = entry.name;
			const active = editor ? isToolbarButtonActive(editor, itemName) : false;
			const prefixIcon = createToolbarPrefixIcon(itemName);
			const itemLabel = getToolbarMenuItemLabel(itemName);
			return html`
                            <pk-dropdown-item
                                key=${`${groupKey}-${itemName}-${itemIndex}`}
                                ?data-active=${active || nothing}
                                @click=${() => this.handleToolbarCommand(itemName)}
                            >
                                ${prefixIcon ?? nothing}
                                ${itemLabel}
                            </pk-dropdown-item>
                        `;
		})}
                </pk-dropdown-menu>
            </div>
        `;
	}
	renderToolbarNode(node, index) {
		if (node.type === "separator") return this.renderToolbarSeparator();
		if (node.type === "group") return this.renderToolbarGroup(node.group, `group-${index}`);
		if (node.name === "link") return this.renderLinkToolbarButton();
		return this.renderToolbarButton(node.name);
	}
	renderDefaultToolbar() {
		return html`
            <div class="toolbar" part="toolbar">
                ${this.toolbarNodes.map((node, index) => this.renderToolbarNode(node, index))}
                <slot name="toolbar-end"></slot>
            </div>
        `;
	}
	renderLinkToolbarButton() {
		const editor = this.host.editor;
		const craftOptions = getCraftLinkOptions(this.resolveLinkOptions());
		const label = this.getToolbarButtonLabel("link");
		const active = this.isLinkActive();
		return html`
            <div class="toolbar-item">
                <button
                    id=${this.linkButtonId}
                    type="button"
                    class="toolbar-btn"
                    aria-label=${label}
                    aria-haspopup="menu"
                    ?disabled=${this.disabled || this.readonly}
                    data-state=${active ? "active" : nothing}
                >
                    ${unsafeSVG(TOOLBAR_ICONS.link)}
                </button>
                ${this.renderToolbarTooltip(this.linkButtonId, label)}
                <pk-dropdown-menu for=${this.linkButtonId} placement="bottom-start">
                    ${craftOptions.map((option) => html`
                        <pk-dropdown-item @click=${() => this.handleCraftLink(option)}>
                            ${option.optionTitle}
                        </pk-dropdown-item>
                    `)}
                    ${craftOptions.length > 0 ? html`<pk-dropdown-separator></pk-dropdown-separator>` : nothing}
                    <pk-dropdown-item @click=${() => this.openLinkMenu()}>Insert Link</pk-dropdown-item>
                    <pk-dropdown-item
                        ?disabled=${!active}
                        @click=${() => editor && unsetLinkFromEditor(editor)}
                    >Unlink</pk-dropdown-item>
                </pk-dropdown-menu>
            </div>
        `;
	}
	render() {
		return html`
            <div class="shell" part="shell">
                ${this.hasCustomToolbar ? html`<slot name="toolbar"></slot>` : this.renderDefaultToolbar()}

                <div class="editor-mount" part="editor">
                    ${this.contentError ? html`
                        <div class="content-error">
                            <span>${unsafeSVG(renderIconHtml(icons_exports.triangleExclamation))}</span>
                            <span>${this.contentError}</span>
                        </div>
                    ` : nothing}
                    ${this.toolbarHasLink() && this.linkBubbleVisible ? this.renderLinkBubble() : nothing}
                </div>

                <input class="mirror-input" type="text" .value=${this.value} readonly tabindex="-1" aria-hidden="true" />
                ${this.toolbarHasLink() && this.linkDialogMounted ? this.renderLinkDialog() : nothing}
            </div>
        `;
	}
};
__decorate([query(".editor-mount")], PkTiptapEditor.prototype, "editorMount", void 0);
__decorate([query(".mirror-input")], PkTiptapEditor.prototype, "input", void 0);
__decorate([query(".link-dialog")], PkTiptapEditor.prototype, "linkDialog", void 0);
__decorate([query("pk-input.link-dialog__url-input")], PkTiptapEditor.prototype, "linkUrlInput", void 0);
__decorate([query("pk-input.link-dialog__text-input")], PkTiptapEditor.prototype, "linkTextInput", void 0);
__decorate([query("pk-checkbox")], PkTiptapEditor.prototype, "linkNewTabCheckbox", void 0);
__decorate([query("pk-button.link-dialog__submit")], PkTiptapEditor.prototype, "linkSubmitButton", void 0);
__decorate([property({
	attribute: "buttons",
	converter: {
		fromAttribute: (value) => value ?? "bold,italic",
		toAttribute: (value) => {
			if (value == null) return "bold,italic";
			return Array.isArray(value) ? value.join(",") : value;
		}
	}
})], PkTiptapEditor.prototype, "buttons", void 0);
__decorate([property({
	attribute: "toolbar",
	converter: {
		fromAttribute: (value) => value,
		toAttribute: (value) => {
			if (value == null) return null;
			return typeof value === "string" ? value : JSON.stringify(value);
		}
	}
})], PkTiptapEditor.prototype, "toolbar", void 0);
__decorate([property({ attribute: "link-options" })], PkTiptapEditor.prototype, "linkOptions", void 0);
__decorate([property({ attribute: "link-selector-storage-key-prefix" })], PkTiptapEditor.prototype, "linkSelectorStorageKeyPrefix", void 0);
__decorate([property({ type: Number })], PkTiptapEditor.prototype, "rows", void 0);
__decorate([property()], PkTiptapEditor.prototype, "placeholder", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkTiptapEditor.prototype, "readonly", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkTiptapEditor.prototype, "invalid", void 0);
__decorate([property({ attribute: false })], PkTiptapEditor.prototype, "variableTagConfigure", void 0);
__decorate([property({ attribute: "invalid-content-message" })], PkTiptapEditor.prototype, "invalidContentMessage", void 0);
__decorate([property({
	type: Boolean,
	attribute: "toolbar-tooltips"
})], PkTiptapEditor.prototype, "toolbarTooltips", void 0);
__decorate([state()], PkTiptapEditor.prototype, "linkDialogTitle", void 0);
__decorate([state()], PkTiptapEditor.prototype, "linkDialogSubmitLabel", void 0);
__decorate([state()], PkTiptapEditor.prototype, "linkDialogMounted", void 0);
__decorate([state()], PkTiptapEditor.prototype, "linkBubbleVisible", void 0);
__decorate([state()], PkTiptapEditor.prototype, "linkBubbleHref", void 0);
__decorate([state()], PkTiptapEditor.prototype, "linkBubbleTop", void 0);
__decorate([state()], PkTiptapEditor.prototype, "linkBubbleLeft", void 0);
__decorate([state()], PkTiptapEditor.prototype, "value", null);
__decorate([property({
	attribute: "value",
	reflect: true
})], PkTiptapEditor.prototype, "defaultValue", void 0);
PkTiptapEditor = __decorate([customElement("pk-tiptap-editor")], PkTiptapEditor);
//#endregion
export { PkTiptapEditor as t };

//# sourceMappingURL=pk-tiptap-editor-umIuEaXh.js.map