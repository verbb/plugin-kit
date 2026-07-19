import { c as r, l as n, m as i, p as b, s as e, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, i as PkFormAssociatedElement, n as formControlStyles } from "../../chunks/pk-base-BlxAYXJD.js";
import { t as MirrorValidator } from "../../chunks/mirror-validator-C5XrXPaq.js";
import { k as Editor } from "../../chunks/tiptap-Db7MTUH1.js";
import { C as contentToValue, E as valueToContent, T as flattenVariableOptions, i as createVariableTagDomNodeView, j as createTiptapInputExtensions, n as tiptapInputProseMirrorStyles, w as dedupeVariableOptions } from "../../chunks/tiptap.styles-DAH_90Fi.js";
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
PkTiptapInput = __decorate([t("pk-tiptap-input")], PkTiptapInput);
//#endregion
export { PkTiptapInput };
