import type { Editor, NodeViewRenderer, NodeViewRendererProps } from '@tiptap/core';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { uniqueId } from '../../a11y/focus.js';

/** Match kit v1 VariableTagView chip chrome (indigo + remove). */
const REMOVE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M2.1 1.4 5 4.3l2.9-2.9.7.7L5.7 5l2.9 2.9-.7.7L5 5.7l-2.9 2.9-.7-.7L4.3 5 1.4 2.1z"/>
</svg>
`.trim();

export const PK_VARIABLE_TAG_CONFIGURE_EVENT = 'pk-variable-tag-configure';

export type PkVariableTagConfigureDetail = {
    editor: Editor;
    anchor: HTMLElement;
    attrs: Record<string, unknown>;
    getPos: () => number | undefined;
    updateAttributes: (attributes: Record<string, unknown>) => void;
    deleteNode: () => void;
};

const findTiptapHost = (viewDom: HTMLElement): HTMLElement | null => {
    let node: Node | null = viewDom;
    while (node) {
        if (node instanceof HTMLElement && node.localName.startsWith('pk-tiptap')) {
            return node;
        }

        node = node.parentNode instanceof ShadowRoot
            ? node.parentNode.host
            : node.parentNode;
    }

    return null;
};

const emitConfigure = (
    editor: Editor,
    detail: PkVariableTagConfigureDetail,
) => {
    const viewDom = editor.view.dom;
    const host = findTiptapHost(viewDom);

    // Preferred bridge for React/Formie: property callback on <pk-tiptap-*>.
    const configure = host && 'variableTagConfigure' in host
        ? (host as HTMLElement & {
            variableTagConfigure?: ((detail: PkVariableTagConfigureDetail) => void) | null;
        }).variableTagConfigure
        : null;

    if (typeof configure === 'function') {
        configure(detail);
    }

    // Composed event is the reliable Formie path (document capture listener).
    const target = host ?? viewDom;
    target.dispatchEvent(new CustomEvent(PK_VARIABLE_TAG_CONFIGURE_EVENT, {
        bubbles: true,
        composed: true,
        detail,
    }));
};

/**
 * DOM NodeViewRendererProps do NOT include React's `deleteNode` / `updateAttributes`
 * (those live on NodeViewProps for ReactNodeViewRenderer only). Build them from
 * editor + getPos — same operations ReactNodeViewRenderer wires for VariableTagView.
 */
function createNodeViewCommands(
    editor: Editor,
    getPos: NodeViewRendererProps['getPos'],
) {
    const resolvePos = (): number | undefined => {
        const pos = typeof getPos === 'function' ? getPos() : getPos;
        return typeof pos === 'number' ? pos : undefined;
    };

    const deleteNode = () => {
        const pos = resolvePos();
        if (typeof pos !== 'number') {
            return;
        }

        const live = editor.state.doc.nodeAt(pos);
        if (!live || live.type.name !== 'variableTag') {
            return;
        }

        editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + live.nodeSize })
            .run();
    };

    const updateAttributes = (attributes: Record<string, unknown>) => {
        const pos = resolvePos();
        if (typeof pos !== 'number') {
            return;
        }

        const live = editor.state.doc.nodeAt(pos);
        if (!live || live.type.name !== 'variableTag') {
            return;
        }

        editor
            .chain()
            .command(({ tr, dispatch }) => {
                if (dispatch) {
                    tr.setNodeMarkup(pos, undefined, {
                        ...live.attrs,
                        ...attributes,
                    });
                }
                return true;
            })
            .run();
    };

    return { deleteNode, updateAttributes, resolvePos };
}

/**
 * DOM node view for variable tags in vanilla editors.
 * Chip + remove match kit v1; configure UI is opened via `pk-variable-tag-configure`
 * (Formie mounts the edit overlay beside the WC editor).
 */
export function createVariableTagDomNodeView(): NodeViewRenderer {
    return (props) => {
        const { editor, getPos } = props;
        const { deleteNode, updateAttributes, resolvePos } = createNodeViewCommands(editor, getPos);

        let currentNode: ProseMirrorNode = props.node;

        const syncUnresolvedPresentation = (attrs: Record<string, unknown>) => {
            const unresolved = Boolean(attrs.unresolved);
            const token = String(attrs.value ?? '');
            const chipLabel = String(attrs.label || attrs.value || '');

            dom.classList.toggle('pk-variable-tag--unresolved', unresolved);
            if (unresolved) {
                dom.dataset.unresolved = 'true';
                // Hover: prompt to fix + keep the raw token for support/debug.
                dom.title = token
                    ? `Unknown or missing reference — ${token}`
                    : 'Unknown or missing reference';
                label.setAttribute('aria-invalid', 'true');
            } else {
                delete dom.dataset.unresolved;
                dom.removeAttribute('title');
                label.removeAttribute('aria-invalid');
            }

            label.textContent = chipLabel;
        };

        const dom = document.createElement('span');
        dom.className = 'pk-variable-tag';
        dom.id = uniqueId('pk-variable-tag');
        dom.setAttribute('contenteditable', 'false');
        // Do NOT set draggable=true permanently — HTML5-draggable hosts suppress click,
        // which kills configure. ProseMirror sets draggable temporarily on mousedown drag.
        // TipTap React node views use data-drag-handle on a TipTap NodeView class; keep the
        // attr for parity, but drag itself is PM's selectable+draggable atom behavior.
        dom.setAttribute('data-drag-handle', '');
        dom.dataset.label = String(currentNode.attrs.label ?? '');
        dom.dataset.variableValue = String(currentNode.attrs.value ?? '');

        // Match kit v1 VariableTagView: real button for activate.
        const label = document.createElement('button');
        label.type = 'button';
        label.className = 'pk-variable-tag__label';
        label.draggable = false;
        dom.append(label);
        syncUnresolvedPresentation(currentNode.attrs);

        let removeButton: HTMLButtonElement | null = null;
        let openOnInsertHandled = false;
        let openedAt = 0;

        const readLiveAttrs = () => {
            const pos = resolvePos();
            if (typeof pos === 'number') {
                const live = editor.state.doc.nodeAt(pos);
                if (live?.type.name === 'variableTag') {
                    return { ...live.attrs };
                }
            }

            return { ...currentNode.attrs };
        };

        const openConfigure = () => {
            if (!editor.isEditable) {
                return;
            }

            // Dedupe repeated emits from nested handlers / openOnInsert.
            const now = Date.now();
            if (now - openedAt < 300) {
                return;
            }
            openedAt = now;

            // Strip any HTML5-draggable PM may have armed so configure stays clickable
            // after this interaction (draggable hosts suppress subsequent clicks).
            dom.removeAttribute('draggable');

            emitConfigure(editor, {
                editor,
                anchor: dom,
                attrs: readLiveAttrs(),
                getPos: resolvePos,
                updateAttributes,
                deleteNode,
            });
        };

        // Open on pointerdown — before ProseMirror can arm HTML5 drag on the atom.
        label.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            openConfigure();
        });
        label.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            openConfigure();
        });

        const syncRemoveButton = (editable: boolean) => {
            if (editable) {
                if (removeButton) {
                    return;
                }

                removeButton = document.createElement('button');
                removeButton.type = 'button';
                removeButton.className = 'pk-variable-tag__remove';
                removeButton.setAttribute('aria-label', 'Remove');
                removeButton.draggable = false;
                removeButton.innerHTML = REMOVE_ICON;
                removeButton.addEventListener('pointerdown', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                });
                removeButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    deleteNode();
                });
                dom.append(removeButton);
                return;
            }

            removeButton?.remove();
            removeButton = null;
        };

        syncRemoveButton(editor.isEditable);

        if (currentNode.attrs.openOnInsert && editor.isEditable && !openOnInsertHandled) {
            openOnInsertHandled = true;
            queueMicrotask(() => {
                updateAttributes({ openOnInsert: false });
                openConfigure();
            });
        }

        return {
            dom,
            // TipTap React node views stop PM from handling events inside the chip —
            // that prevents `draggable=true` arming, which otherwise kills configure.
            // Drag still works via outer NodeSelection + data-drag-handle when the
            // pointer starts on the chip chrome (not the label/remove controls).
            stopEvent: (event) => {
                const target = event.target as Node | null;
                if (!(target instanceof Element)) {
                    return false;
                }

                return Boolean(
                    target.closest('.pk-variable-tag__label')
                    || target.closest('.pk-variable-tag__remove'),
                );
            },
            selectNode: () => {
                dom.classList.add('ProseMirror-selectednode');
                // Never keep HTML5-draggable while selected — it suppresses clicks.
                dom.removeAttribute('draggable');
            },
            deselectNode: () => {
                dom.classList.remove('ProseMirror-selectednode');
                dom.removeAttribute('draggable');
            },
            update(updatedNode) {
                if (updatedNode.type.name !== 'variableTag') {
                    return false;
                }

                currentNode = updatedNode;
                dom.dataset.label = String(updatedNode.attrs.label ?? '');
                dom.dataset.variableValue = String(updatedNode.attrs.value ?? '');
                syncUnresolvedPresentation(updatedNode.attrs);
                syncRemoveButton(editor.isEditable);
                return true;
            },
        };
    };
}
