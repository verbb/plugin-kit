import { t as __decorate } from "./decorate-W02hmVTt.js";
import { t as PkFormAssociatedElement } from "./pk-form-associated-element-DmZKgNPL.js";
import { t as MirrorValidator } from "./mirror-validator-DCjNYrrx.js";
import { t as formControlStyles } from "./form-control.styles-BQdimE5o.js";
import { css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { CodeMirrorHost, computeCodeEditorMinHeight } from "@verbb/plugin-kit-codemirror-core";
//#region src/components/code-editor/pk-code-editor.styles.ts
var pkCodeEditorStyles = css`
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
		return html`
            <div class="shell" part="shell">
                <div class="editor-mount" part="editor"></div>
                <input class="mirror-input" type="text" .value=${this.value} readonly tabindex="-1" aria-hidden="true" />
            </div>
        `;
	}
};
__decorate([query(".editor-mount")], PkCodeEditor.prototype, "editorMount", void 0);
__decorate([query(".mirror-input")], PkCodeEditor.prototype, "input", void 0);
__decorate([property()], PkCodeEditor.prototype, "language", void 0);
__decorate([property({
	type: Number,
	attribute: "tab-size"
})], PkCodeEditor.prototype, "tabSize", void 0);
__decorate([property({
	type: Boolean,
	attribute: "line-numbers"
})], PkCodeEditor.prototype, "lineNumbers", void 0);
__decorate([property({ type: Number })], PkCodeEditor.prototype, "rows", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkCodeEditor.prototype, "readonly", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], PkCodeEditor.prototype, "invalid", void 0);
__decorate([state()], PkCodeEditor.prototype, "value", null);
__decorate([property({
	attribute: "value",
	reflect: true
})], PkCodeEditor.prototype, "defaultValue", void 0);
PkCodeEditor = __decorate([customElement("pk-code-editor")], PkCodeEditor);
//#endregion
export { PkCodeEditor as t };

//# sourceMappingURL=pk-code-editor-DSG6AwLV.js.map