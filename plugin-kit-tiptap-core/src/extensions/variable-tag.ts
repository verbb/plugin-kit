import { Node } from '@tiptap/core';
import type { CommandProps, NodeViewRenderer, RawCommands } from '@tiptap/core';
import {
    Plugin, PluginKey, NodeSelection, TextSelection,
} from '@tiptap/pm/state';

export type VariableTagExtensionOptions = {
    trailingCursorText?: string;
    addNodeView?: NodeViewRenderer;
};

const isCursorPlaceholder = (node: { isText?: boolean; text?: string } | null | undefined) => {
    return node && node.isText && (node.text === '\u200B' || node.text === '\u2060');
};

export function createVariableTagExtension({
    trailingCursorText = '\u200B',
    addNodeView,
}: VariableTagExtensionOptions = {}) {
    return Node.create({
        name: 'variableTag',
        group: 'inline',
        inline: true,
        selectable: true,
        draggable: true,
        atom: true,

        addOptions() {
            return {
                trailingCursorText,
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
                // Display-only: token did not match a known variable option.
                unresolved: { default: false },
            };
        },

        parseHTML() {
            return [
                {
                    tag: 'variable-tag',
                    getAttrs: (dom) => {
                        try {
                            return JSON.parse((dom as HTMLElement).innerHTML);
                        } catch {
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
                setVariableTag: (options: Record<string, unknown>) => {
                    return ({ dispatch, state }: CommandProps) => {
                        if (!dispatch) {
                            return false;
                        }

                        const { selection } = state;
                        const textSelection = selection as TextSelection;
                        const position = textSelection.$cursor ? textSelection.$cursor.pos : textSelection.$to.pos;
                        const node = this.type.create(options);
                        const transaction = state.tr.insert(position, node);
                        const insertPos = position + node.nodeSize;
                        const cursorText = this.options.trailingCursorText;

                        if (cursorText) {
                            transaction.insert(insertPos, state.schema.text(cursorText));
                            transaction.setSelection(TextSelection.create(transaction.doc, insertPos + cursorText.length));
                        } else {
                            transaction.setSelection(TextSelection.create(transaction.doc, insertPos));
                        }

                        dispatch(transaction);
                        return true;
                    };
                },
            } as Partial<RawCommands>;
        },

        addNodeView() {
            return addNodeView ?? null;
        },

        addProseMirrorPlugins() {
            return [
                new Plugin({
                    key: new PluginKey('variableTagProtection'),

                    props: {
                        handleKeyDown: (view, event) => {
                            const { state } = view;
                            const { selection, doc } = state;

                            if (event.key === 'ArrowLeft' && selection.empty) {
                                const { $from } = selection;
                                const { pos } = $from;
                                if (pos > 0) {
                                    const before = $from.nodeBefore;
                                    if (isCursorPlaceholder(before)) {
                                        const posBeforePlaceholder = pos - before!.nodeSize;
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

                            if (event.key === 'ArrowRight' && selection.empty) {
                                const { $from } = selection;
                                const { pos } = $from;
                                const after = $from.nodeAfter;
                                if (isCursorPlaceholder(after)) {
                                    const before = $from.nodeBefore;
                                    if (before && before.type.name === 'variableTag') {
                                        event.preventDefault();
                                        view.dispatch(state.tr.setSelection(TextSelection.create(doc, pos + after!.nodeSize)));
                                        return true;
                                    }
                                }
                            }

                            if (event.key === 'Backspace' && selection.empty) {
                                const { $from } = selection;
                                const { pos } = $from;
                                if (pos > 0) {
                                    const before = $from.nodeBefore;
                                    if (isCursorPlaceholder(before)) {
                                        const posBeforePlaceholder = pos - before!.nodeSize;
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

                            if (selection instanceof NodeSelection && selection.node.type.name === 'variableTag') {
                                if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
                                    return false;
                                }

                                if (['Delete', 'Backspace'].includes(event.key)) {
                                    return false;
                                }

                                if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
                                    return false;
                                }

                                if (event.key.length === 1 || event.key === 'Enter') {
                                    return true;
                                }
                            }

                            return false;
                        },

                        handlePaste: (view) => {
                            const { selection } = view.state;

                            if (selection instanceof NodeSelection && selection.node.type.name === 'variableTag') {
                                return true;
                            }

                            return false;
                        },

                        handleDrop: (view) => {
                            const { selection } = view.state;

                            if (selection instanceof NodeSelection && selection.node.type.name === 'variableTag' && !view.dragging) {
                                return true;
                            }

                            return false;
                        },
                    },
                }),
            ];
        },
    });
}
