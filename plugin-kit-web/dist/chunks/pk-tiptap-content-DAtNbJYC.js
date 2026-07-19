import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { i as createVariableTagDomNodeView, t as tiptapContentProseMirrorStyles } from "./tiptap.styles-BytOpP0H.js";
import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Editor } from "@tiptap/core";
import { createTiptapExtensions, valueToContent } from "@verbb/plugin-kit-tiptap-core";
//#region src/components/tiptap/pk-tiptap-content.styles.ts
var pkTiptapContentStyles = css`
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
		return html`<div class="editor-mount" part="content"></div>`;
	}
};
__decorate([query(".editor-mount")], PkTiptapContent.prototype, "editorMount", void 0);
__decorate([property({ attribute: "value" })], PkTiptapContent.prototype, "value", void 0);
PkTiptapContent = __decorate([customElement("pk-tiptap-content")], PkTiptapContent);
//#endregion
export { PkTiptapContent as t };

//# sourceMappingURL=pk-tiptap-content-DAtNbJYC.js.map