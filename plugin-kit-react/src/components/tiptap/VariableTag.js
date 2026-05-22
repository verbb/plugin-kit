import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import {
    Plugin, PluginKey, NodeSelection, TextSelection,
} from '@tiptap/pm/state';
import VariableTagView from './VariableTagView';

const isCursorPlaceholder = (node) => {
    return node && node.isText && (node.text === '\u200B' || node.text === '\u2060');
};

export default Node.create({
    name: 'variableTag',
    group: 'inline',
    inline: true,
    selectable: true,
    draggable: true,
    atom: true,

    addOptions() {
        return {
            trailingCursorText: '\u200B',
        };
    },

    addAttributes() {
        return {
            label: { default: null },
            value: { default: null },
            openOnInsert: { default: false },
            default: { default: null },
            transformerId: { default: null },
            transformerParams: { default: null },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'variable-tag',
                getAttrs: (dom) => {
                    try {
                        return JSON.parse(dom.innerHTML);
                    } catch (e) {
                        return {};
                    }
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['variable-tag', JSON.stringify(HTMLAttributes)];
    },

    addCommands() {
        return {
            setVariableTag: (options) => {
                return ({
                    dispatch, state,
                }) => {
                    const { selection } = state;
                    const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
                    const node = this.type.create(options);
                    const transaction = state.tr.insert(position, node);
                    const insertPos = position + node.nodeSize;
                    const trailingCursorText = this.options.trailingCursorText;

                    if (trailingCursorText) {
                        // Inline atoms need an adjacent text position for reliable browser caret placement.
                        transaction.insert(insertPos, state.schema.text(trailingCursorText));
                        transaction.setSelection(TextSelection.create(transaction.doc, insertPos + trailingCursorText.length));
                    } else {
                        transaction.setSelection(TextSelection.create(transaction.doc, insertPos));
                    }

                    dispatch(transaction);
                    return true;
                };
            },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(VariableTagView);
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('variableTagProtection'),

                props: {
                    handleKeyDown: (view, event) => {
                        const { state } = view;
                        const { selection, doc } = state;

                        // Cursor placeholder text should not add an extra arrow-key stop.
                        if (event.key === 'ArrowLeft' && selection.empty) {
                            const { $from } = selection;
                            const { pos } = $from;
                            if (pos > 0) {
                                const before = $from.nodeBefore;
                                if (isCursorPlaceholder(before)) {
                                    const posBeforePlaceholder = pos - before.nodeSize;
                                    const $beforePlaceholder = doc.resolve(posBeforePlaceholder);
                                    const variableTagNode = $beforePlaceholder.nodeBefore;
                                    if (variableTagNode && variableTagNode.type.name === 'variableTag') {
                                        const tagStart = posBeforePlaceholder - variableTagNode.nodeSize;
                                        event.preventDefault();
                                        view.dispatch(state.tr.setSelection(NodeSelection.create(doc, tagStart)));
                                        return true;
                                    }
                                }
                            }
                        }

                        // Cursor placeholder text should not add an extra arrow-key stop.
                        if (event.key === 'ArrowRight' && selection.empty) {
                            const { $from } = selection;
                            const { pos } = $from;
                            const after = $from.nodeAfter;
                            if (isCursorPlaceholder(after)) {
                                const before = $from.nodeBefore;
                                if (before && before.type.name === 'variableTag') {
                                    event.preventDefault();
                                    view.dispatch(state.tr.setSelection(TextSelection.create(doc, pos + after.nodeSize)));
                                    return true;
                                }
                            }
                        }

                        // Backspace from a cursor placeholder should remove the variable tag as one unit.
                        if (event.key === 'Backspace' && selection.empty) {
                            const { $from } = selection;
                            const { pos } = $from;
                            if (pos > 0) {
                                const before = $from.nodeBefore;
                                if (isCursorPlaceholder(before)) {
                                    const posBeforePlaceholder = pos - before.nodeSize;
                                    const $beforePlaceholder = doc.resolve(posBeforePlaceholder);
                                    const variableTagNode = $beforePlaceholder.nodeBefore;
                                    if (variableTagNode && variableTagNode.type.name === 'variableTag') {
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

                        // Check if we have a NodeSelection on a variableTag
                        if (selection instanceof NodeSelection && selection.node.type.name === 'variableTag') {
                            // Allow navigation keys
                            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
                                return false; // Let default behavior handle navigation
                            }

                            // Allow delete/backspace to remove the node
                            if (['Delete', 'Backspace'].includes(event.key)) {
                                return false; // Let default behavior handle deletion
                            }

                            // Allow modifier keys
                            if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
                                return false; // Let default behavior handle shortcuts
                            }

                            // Prevent typing from replacing the node
                            if (event.key.length === 1 || event.key === 'Enter') {
                                return true; // Prevent default
                            }
                        }

                        return false;
                    },

                    // Handle paste events
                    handlePaste: (view) => {
                        const { selection } = view.state;

                        if (selection instanceof NodeSelection && selection.node.type.name === 'variableTag') {
                            // Prevent pasting from replacing the node
                            return true;
                        }

                        return false;
                    },

                    // Handle drop events
                    handleDrop: (view) => {
                        const { selection } = view.state;

                        if (selection instanceof NodeSelection && selection.node.type.name === 'variableTag' && !view.dragging) {
                            // Prevent accidental replacement only for non-drag drop actions.
                            return true;
                        }

                        return false;
                    },
                },
            }),
        ];
    },
});
