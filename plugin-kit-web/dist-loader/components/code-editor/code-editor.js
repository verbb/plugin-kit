import { c as r, l as n, m as i, p as b, s as e, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, n as formControlStyles } from "../../chunks/pk-base-BlxAYXJD.js";
import { t as MirrorValidator } from "../../chunks/mirror-validator-DEz3BsbN.js";
import { T as EditorState, _ as highlightActiveLine, a as html, b as keymap, c as closeBracketsKeymap, d as defaultHighlightStyle, f as indentOnInput, g as drawSelection, h as EditorView, i as json, l as css, m as syntaxHighlighting, n as history, o as javascript, p as indentUnit, r as historyKeymap, s as closeBrackets, t as defaultKeymap, u as bracketMatching, v as highlightActiveLineGutter, w as Compartment, x as lineNumbers, y as highlightSpecialChars } from "../../chunks/codemirror-CHXb-wYU.js";
//#region ../plugin-kit-codemirror-core/dist/constants.js
function computeCodeEditorMinHeight(rows = 12) {
	return `${Math.max(Number(rows) || 12, 4) * 18 + 12}px`;
}
//#endregion
//#region ../plugin-kit-codemirror-core/dist/languages.js
function languageUsesSyntaxHelpers(language) {
	return language !== "text";
}
function createLanguageExtension(language) {
	switch (language) {
		case "html": return html();
		case "javascript": return javascript();
		case "css": return css();
		case "json": return json();
		default: return null;
	}
}
//#endregion
//#region ../plugin-kit-codemirror-core/dist/theme.js
/** Editor content surface — matches @uiw/react-codemirror default light theme. */
var CODE_EDITOR_SURFACE_BG = "#ffffff";
/** Gutter strip beside line numbers. */
var CODE_EDITOR_GUTTER_BG = "rgb(245, 247, 250)";
var CODE_EDITOR_TEXT_COLOR = "rgb(31, 41, 51)";
var CODE_EDITOR_GUTTER_TEXT_COLOR = "#7c8793";
var CODE_EDITOR_GUTTER_BORDER = "1px solid rgba(96, 125, 159, 0.2)";
var CODE_EDITOR_ACTIVE_LINE_BG = "rgba(96, 125, 159, 0.06)";
/**
* Matches the legacy React CodeEditor theme. The interior surface is white
* (via @uiw/react-codemirror's default light theme); only the gutter uses
* the cooler gray strip.
*/
var codeEditorTheme = EditorView.theme({
	"&": {
		backgroundColor: CODE_EDITOR_SURFACE_BG,
		color: CODE_EDITOR_TEXT_COLOR,
		fontSize: "0.9em"
	},
	"&.cm-focused": { outline: "none" },
	".cm-scroller": {
		fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
		lineHeight: `18px`
	},
	".cm-content": {
		padding: "6px 8px",
		caretColor: CODE_EDITOR_TEXT_COLOR
	},
	".cm-gutters": {
		backgroundColor: CODE_EDITOR_GUTTER_BG,
		borderRight: CODE_EDITOR_GUTTER_BORDER,
		color: CODE_EDITOR_GUTTER_TEXT_COLOR
	},
	".cm-gutter.cm-lineNumbers .cm-gutterElement": {
		padding: "0 8px",
		minWidth: "3rem"
	},
	".cm-activeLine": { backgroundColor: CODE_EDITOR_ACTIVE_LINE_BG },
	"&.cm-light .cm-activeLine": { backgroundColor: CODE_EDITOR_ACTIVE_LINE_BG },
	"&.cm-light .cm-activeLineGutter": { backgroundColor: CODE_EDITOR_GUTTER_BG },
	"&.cm-light .cm-gutters": {
		backgroundColor: CODE_EDITOR_GUTTER_BG,
		color: CODE_EDITOR_GUTTER_TEXT_COLOR,
		border: "0 solid transparent",
		borderRight: CODE_EDITOR_GUTTER_BORDER
	},
	".cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection": { backgroundColor: `rgba(59, 130, 246, 0.35) !important` }
});
//#endregion
//#region ../plugin-kit-codemirror-core/dist/extensions.js
function createEditorSetupExtensions(language, showLineNumbers) {
	const usesSyntaxHelpers = languageUsesSyntaxHelpers(language);
	const extensions = [
		highlightSpecialChars(),
		history(),
		drawSelection(),
		EditorState.allowMultipleSelections.of(false),
		indentOnInput(),
		syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
		highlightActiveLine(),
		keymap.of([
			...usesSyntaxHelpers ? closeBracketsKeymap : [],
			...defaultKeymap,
			...historyKeymap
		])
	];
	if (showLineNumbers) extensions.unshift(lineNumbers(), highlightActiveLineGutter());
	if (usesSyntaxHelpers) {
		extensions.push(bracketMatching());
		if (language === "html" || language === "javascript" || language === "json") extensions.push(closeBrackets());
	}
	return extensions;
}
function createCodeEditorExtensions({ language = "html", tabSize = 4, lineNumbers: showLineNumbers = true, editable = true, editableCompartment, onUpdate, onBlur }) {
	const normalizedTabSize = Math.max(1, tabSize);
	const extensions = [
		codeEditorTheme,
		EditorState.tabSize.of(normalizedTabSize),
		indentUnit.of(" ".repeat(normalizedTabSize)),
		EditorView.lineWrapping,
		...createEditorSetupExtensions(language, showLineNumbers)
	];
	const languageExtension = createLanguageExtension(language);
	if (languageExtension) extensions.push(languageExtension);
	if (editableCompartment) extensions.push(editableCompartment.of(EditorView.editable.of(editable)));
	else extensions.push(EditorView.editable.of(editable));
	if (onUpdate) extensions.push(EditorView.updateListener.of((update) => {
		if (update.docChanged) onUpdate(update.state.doc.toString());
	}));
	if (onBlur) extensions.push(EditorView.domEventHandlers({ blur: () => {
		onBlur();
		return false;
	} }));
	return extensions;
}
//#endregion
//#region ../plugin-kit-codemirror-core/dist/host.js
var CodeMirrorHost = class {
	view = null;
	editableCompartment = new Compartment();
	lastEmitted = null;
	mount({ parent, value = "", language = "html", tabSize = 4, lineNumbers = true, rows = 12, editable = true, onUpdate, onBlur }) {
		this.view = new EditorView({
			state: EditorState.create({
				doc: value,
				extensions: createCodeEditorExtensions({
					language,
					tabSize,
					lineNumbers,
					editable,
					editableCompartment: this.editableCompartment,
					onUpdate: (nextValue) => {
						this.lastEmitted = nextValue;
						onUpdate?.(nextValue);
					},
					onBlur
				})
			}),
			parent
		});
		this.view.dom.style.minHeight = computeCodeEditorMinHeight(rows);
		this.view.dom.style.width = "100%";
	}
	getValue() {
		return this.view?.state.doc.toString() ?? "";
	}
	setValue(value, options = {}) {
		if (!this.view) return;
		const { respectFocus = true } = options;
		if (respectFocus && this.view.hasFocus) return;
		if (this.view.state.doc.toString() === value || value === this.lastEmitted) return;
		this.view.dispatch({ changes: {
			from: 0,
			to: this.view.state.doc.length,
			insert: value
		} });
	}
	setEditable(editable) {
		if (!this.view) return;
		this.view.dispatch({ effects: this.editableCompartment.reconfigure(EditorView.editable.of(editable)) });
	}
	destroy() {
		this.view?.destroy();
		this.view = null;
		this.lastEmitted = null;
	}
};
//#endregion
//#region src/components/code-editor/pk-code-editor.styles.ts
var pkCodeEditorStyles = i`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
        }

        .shell {
            overflow: hidden;
            border: 1px solid rgba(96, 125, 159, 0.4);
            border-radius: var(--pk-radius-sm);
            background: #ffffff;
        }

        .shell:focus-within {
            border-color: var(--pk-color-sky-600);
            box-shadow:
                0 0 0 1px var(--pk-color-sky-600),
                0 0 4px 0 color-mix(in srgb, var(--pk-color-sky-600) 70%, transparent);
        }

        :host([invalid]) .shell,
        :host(:state(user-invalid)) .shell {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) .shell:focus-within,
        :host(:state(user-invalid)) .shell:focus-within {
            border-color: var(--pk-color-rose-600);
            box-shadow:
                0 0 0 1px var(--pk-color-rose-600),
                0 0 4px 0 color-mix(in srgb, var(--pk-color-rose-600) 70%, transparent);
        }

        :host([disabled]),
        :host([readonly]) {
            opacity: 0.7;
        }

        .editor-mount {
            min-height: var(--pk-code-editor-min-height, 12rem);
        }

        .editor-mount .cm-editor {
            min-height: inherit;
        }

        .mirror-input {
            display: none;
        }
    }
`;
//#endregion
//#region src/components/code-editor/pk-code-editor.ts
var PkCodeEditor = class PkCodeEditor extends PkFormAssociatedElement {
	constructor(..._args) {
		super(..._args);
		this.assumeInteractionOn = ["blur", "input"];
		this.host = new CodeMirrorHost();
		this.hasInitializedEditor = false;
		this._value = null;
		this.language = "html";
		this.tabSize = 4;
		this.lineNumbers = true;
		this.rows = 12;
		this.readonly = false;
		this.invalid = false;
		this.defaultValue = "";
	}
	static {
		this.styles = [formControlStyles, pkCodeEditorStyles];
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
	get editorView() {
		return this.host.view;
	}
	syncFormValue() {
		this.setValue(this.value || "");
		if (this.input) this.input.value = this.value || "";
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
	disconnectedCallback() {
		this.host.destroy();
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("value") && !changed.has("defaultValue") || changed.has("defaultValue") && !this.valueHasChanged) this.syncEditorContent();
		if (changed.has("disabled") || changed.has("readonly")) this.host.setEditable(!this.disabled && !this.readonly);
		if (this.hasInitializedEditor && (changed.has("language") || changed.has("tabSize") || changed.has("lineNumbers") || changed.has("rows"))) this.remountEditor();
		super.updated(changed);
	}
	firstUpdated() {
		this.style.setProperty("--pk-code-editor-min-height", computeCodeEditorMinHeight(this.rows));
		this.mountEditor();
		this.hasInitializedEditor = true;
		this.syncFormValue();
	}
	mountEditor() {
		this.host.mount({
			parent: this.editorMount,
			value: this.value,
			language: this.language,
			tabSize: this.tabSize,
			lineNumbers: this.lineNumbers,
			rows: this.rows,
			editable: !this.disabled && !this.readonly,
			onUpdate: (nextValue) => {
				this.value = nextValue;
				if (this.input) this.input.value = nextValue;
				this.syncFormValue();
				this.emitValueChange(nextValue);
			},
			onBlur: () => {
				this.dispatchEvent(new Event("blur", {
					bubbles: true,
					composed: true
				}));
			}
		});
	}
	remountEditor() {
		this.host.destroy();
		this.style.setProperty("--pk-code-editor-min-height", computeCodeEditorMinHeight(this.rows));
		this.mountEditor();
	}
	syncEditorContent() {
		this.host.setValue(this.value);
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
__decorate([e(".editor-mount")], PkCodeEditor.prototype, "editorMount", void 0);
__decorate([e(".mirror-input")], PkCodeEditor.prototype, "input", void 0);
__decorate([n()], PkCodeEditor.prototype, "language", void 0);
__decorate([n({
	type: Number,
	attribute: "tab-size"
})], PkCodeEditor.prototype, "tabSize", void 0);
__decorate([n({
	type: Boolean,
	attribute: "line-numbers"
})], PkCodeEditor.prototype, "lineNumbers", void 0);
__decorate([n({ type: Number })], PkCodeEditor.prototype, "rows", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCodeEditor.prototype, "readonly", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkCodeEditor.prototype, "invalid", void 0);
__decorate([r()], PkCodeEditor.prototype, "value", null);
__decorate([n({
	attribute: "value",
	reflect: true
})], PkCodeEditor.prototype, "defaultValue", void 0);
PkCodeEditor = __decorate([t("pk-code-editor")], PkCodeEditor);
//#endregion
export { PkCodeEditor };
