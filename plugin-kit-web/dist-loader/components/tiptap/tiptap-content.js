import { l as n, m as i, p as b, s as e, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
import { k as Editor } from "../../chunks/tiptap-_LAjdgeV.js";
import { A as createTiptapExtensions, i as createVariableTagDomNodeView, k as valueToContent, t as tiptapContentProseMirrorStyles } from "../../chunks/tiptap.styles-CDjt6Iz4.js";
//#region src/components/tiptap/pk-tiptap-content.styles.ts
var pkTiptapContentStyles = i`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            /* Inherit light-DOM color/size (warning banners, badges). Tokens override when set. */
            color: var(--pk-tiptap-content-color, inherit);
            font-family: var(--pk-font-family);
            font-size: var(--pk-tiptap-content-font-size, inherit);
            line-height: var(--pk-tiptap-content-line-height, 1.4);
        }
    }
`;
//#endregion
//#region src/components/tiptap/pk-tiptap-content.ts
function serializeContent(doc) {
	if (!doc) return "[]";
	if (Array.isArray(doc.content)) return JSON.stringify(doc.content);
	return JSON.stringify(doc);
}
var PkTiptapContent = class PkTiptapContent extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.editor = null;
		this.value = "";
	}
	static {
		this.styles = [pkTiptapContentStyles, tiptapContentProseMirrorStyles];
	}
	disconnectedCallback() {
		this.editor?.destroy();
		this.editor = null;
		super.disconnectedCallback();
	}
	updated(changed) {
		if (changed.has("value") && this.editor) this.syncContent();
		super.updated(changed);
	}
	firstUpdated() {
		this.mountEditor();
	}
	mountEditor() {
		this.editor = new Editor({
			element: this.editorMount,
			extensions: createTiptapExtensions({ variableTagNodeView: createVariableTagDomNodeView() }),
			content: valueToContent(this.value),
			editable: false
		});
	}
	syncContent() {
		if (!this.editor) return;
		const doc = valueToContent(this.value) ?? {
			type: "doc",
			content: []
		};
		if (serializeContent(valueToContent(this.value)) === serializeContent(this.editor.getJSON())) return;
		this.editor.commands.setContent(doc);
	}
	render() {
		return b`<div class="editor-mount" part="content"></div>`;
	}
};
__decorate([e(".editor-mount")], PkTiptapContent.prototype, "editorMount", void 0);
__decorate([n({ attribute: "value" })], PkTiptapContent.prototype, "value", void 0);
PkTiptapContent = __decorate([t("pk-tiptap-content")], PkTiptapContent);
//#endregion
export { PkTiptapContent };
