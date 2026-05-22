import VariableTagView_default from "./VariableTagView.js";
import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeSelection, Plugin, PluginKey, TextSelection } from "@tiptap/pm/state";
//#region src/components/tiptap/VariableTag.js
var isCursorPlaceholder = (node) => {
	return node && node.isText && (node.text === "​" || node.text === "⁠");
};
var VariableTag_default = Node.create({
	name: "variableTag",
	group: "inline",
	inline: true,
	selectable: true,
	draggable: true,
	atom: true,
	addOptions() {
		return { trailingCursorText: "​" };
	},
	addAttributes() {
		return {
			label: { default: null },
			value: { default: null },
			openOnInsert: { default: false },
			default: { default: null },
			transformerId: { default: null },
			transformerParams: { default: null }
		};
	},
	parseHTML() {
		return [{
			tag: "variable-tag",
			getAttrs: (dom) => {
				try {
					return JSON.parse(dom.innerHTML);
				} catch (e) {
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
				const { selection } = state;
				const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
				const node = this.type.create(options);
				const transaction = state.tr.insert(position, node);
				const insertPos = position + node.nodeSize;
				const trailingCursorText = this.options.trailingCursorText;
				if (trailingCursorText) {
					transaction.insert(insertPos, state.schema.text(trailingCursorText));
					transaction.setSelection(TextSelection.create(transaction.doc, insertPos + trailingCursorText.length));
				} else transaction.setSelection(TextSelection.create(transaction.doc, insertPos));
				dispatch(transaction);
				return true;
			};
		} };
	},
	addNodeView() {
		return ReactNodeViewRenderer(VariableTagView_default);
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
//#endregion
export { VariableTag_default as default };

//# sourceMappingURL=VariableTag.js.map