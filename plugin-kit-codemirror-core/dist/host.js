import { computeCodeEditorMinHeight } from "./constants.js";
import { createCodeEditorExtensions } from "./extensions.js";
import { Compartment, EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
//#region src/host.ts
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
export { CodeMirrorHost };

//# sourceMappingURL=host.js.map