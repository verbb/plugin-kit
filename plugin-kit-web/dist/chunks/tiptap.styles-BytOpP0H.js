import { i as uniqueId } from "./focus-aa5dlv8k.js";
import { css } from "lit";
//#region src/components/tiptap/variable-tag-node-view.ts
/** Match kit v1 VariableTagView chip chrome (indigo + remove). */
var REMOVE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M2.1 1.4 5 4.3l2.9-2.9.7.7L5.7 5l2.9 2.9-.7.7L5 5.7l-2.9 2.9-.7-.7L4.3 5 1.4 2.1z"/>
</svg>
`.trim();
var PK_VARIABLE_TAG_CONFIGURE_EVENT = "pk-variable-tag-configure";
var findTiptapHost = (viewDom) => {
	let node = viewDom;
	while (node) {
		if (node instanceof HTMLElement && node.localName.startsWith("pk-tiptap")) return node;
		node = node.parentNode instanceof ShadowRoot ? node.parentNode.host : node.parentNode;
	}
	return null;
};
var emitConfigure = (editor, detail) => {
	const viewDom = editor.view.dom;
	const host = findTiptapHost(viewDom);
	const configure = host && "variableTagConfigure" in host ? host.variableTagConfigure : null;
	if (typeof configure === "function") configure(detail);
	(host ?? viewDom).dispatchEvent(new CustomEvent(PK_VARIABLE_TAG_CONFIGURE_EVENT, {
		bubbles: true,
		composed: true,
		detail
	}));
};
/**
* DOM NodeViewRendererProps do NOT include React's `deleteNode` / `updateAttributes`
* (those live on NodeViewProps for ReactNodeViewRenderer only). Build them from
* editor + getPos — same operations ReactNodeViewRenderer wires for VariableTagView.
*/
function createNodeViewCommands(editor, getPos) {
	const resolvePos = () => {
		const pos = typeof getPos === "function" ? getPos() : getPos;
		return typeof pos === "number" ? pos : void 0;
	};
	const deleteNode = () => {
		const pos = resolvePos();
		if (typeof pos !== "number") return;
		const live = editor.state.doc.nodeAt(pos);
		if (!live || live.type.name !== "variableTag") return;
		editor.chain().focus().deleteRange({
			from: pos,
			to: pos + live.nodeSize
		}).run();
	};
	const updateAttributes = (attributes) => {
		const pos = resolvePos();
		if (typeof pos !== "number") return;
		const live = editor.state.doc.nodeAt(pos);
		if (!live || live.type.name !== "variableTag") return;
		editor.chain().command(({ tr, dispatch }) => {
			if (dispatch) tr.setNodeMarkup(pos, void 0, {
				...live.attrs,
				...attributes
			});
			return true;
		}).run();
	};
	return {
		deleteNode,
		updateAttributes,
		resolvePos
	};
}
/**
* DOM node view for variable tags in vanilla editors.
* Chip + remove match kit v1; configure UI is opened via `pk-variable-tag-configure`
* (Formie mounts the edit overlay beside the WC editor).
*/
function createVariableTagDomNodeView() {
	return (props) => {
		const { editor, getPos } = props;
		const { deleteNode, updateAttributes, resolvePos } = createNodeViewCommands(editor, getPos);
		let currentNode = props.node;
		const syncUnresolvedPresentation = (attrs) => {
			const unresolved = Boolean(attrs.unresolved);
			const token = String(attrs.value ?? "");
			const chipLabel = String(attrs.label || attrs.value || "");
			dom.classList.toggle("pk-variable-tag--unresolved", unresolved);
			if (unresolved) {
				dom.dataset.unresolved = "true";
				dom.title = token ? `Unknown or missing reference — ${token}` : "Unknown or missing reference";
				label.setAttribute("aria-invalid", "true");
			} else {
				delete dom.dataset.unresolved;
				dom.removeAttribute("title");
				label.removeAttribute("aria-invalid");
			}
			label.textContent = chipLabel;
		};
		const dom = document.createElement("span");
		dom.className = "pk-variable-tag";
		dom.id = uniqueId("pk-variable-tag");
		dom.setAttribute("contenteditable", "false");
		dom.setAttribute("data-drag-handle", "");
		dom.dataset.label = String(currentNode.attrs.label ?? "");
		dom.dataset.variableValue = String(currentNode.attrs.value ?? "");
		const label = document.createElement("button");
		label.type = "button";
		label.className = "pk-variable-tag__label";
		label.draggable = false;
		dom.append(label);
		syncUnresolvedPresentation(currentNode.attrs);
		let removeButton = null;
		let openOnInsertHandled = false;
		let openedAt = 0;
		const readLiveAttrs = () => {
			const pos = resolvePos();
			if (typeof pos === "number") {
				const live = editor.state.doc.nodeAt(pos);
				if (live?.type.name === "variableTag") return { ...live.attrs };
			}
			return { ...currentNode.attrs };
		};
		const openConfigure = () => {
			if (!editor.isEditable) return;
			const now = Date.now();
			if (now - openedAt < 300) return;
			openedAt = now;
			dom.removeAttribute("draggable");
			emitConfigure(editor, {
				editor,
				anchor: dom,
				attrs: readLiveAttrs(),
				getPos: resolvePos,
				updateAttributes,
				deleteNode
			});
		};
		label.addEventListener("pointerdown", (event) => {
			if (event.button !== 0) return;
			event.preventDefault();
			event.stopPropagation();
			openConfigure();
		});
		label.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
			openConfigure();
		});
		const syncRemoveButton = (editable) => {
			if (editable) {
				if (removeButton) return;
				removeButton = document.createElement("button");
				removeButton.type = "button";
				removeButton.className = "pk-variable-tag__remove";
				removeButton.setAttribute("aria-label", "Remove");
				removeButton.draggable = false;
				removeButton.innerHTML = REMOVE_ICON;
				removeButton.addEventListener("pointerdown", (event) => {
					event.preventDefault();
					event.stopPropagation();
				});
				removeButton.addEventListener("click", (event) => {
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
			stopEvent: (event) => {
				const target = event.target;
				if (!(target instanceof Element)) return false;
				return Boolean(target.closest(".pk-variable-tag__label") || target.closest(".pk-variable-tag__remove"));
			},
			selectNode: () => {
				dom.classList.add("ProseMirror-selectednode");
				dom.removeAttribute("draggable");
			},
			deselectNode: () => {
				dom.classList.remove("ProseMirror-selectednode");
				dom.removeAttribute("draggable");
			},
			update(updatedNode) {
				if (updatedNode.type.name !== "variableTag") return false;
				currentNode = updatedNode;
				dom.dataset.label = String(updatedNode.attrs.label ?? "");
				dom.dataset.variableValue = String(updatedNode.attrs.value ?? "");
				syncUnresolvedPresentation(updatedNode.attrs);
				syncRemoveButton(editor.isEditable);
				return true;
			}
		};
	};
}
//#endregion
//#region src/components/tiptap/tiptap.styles.ts
/**
* Indigo chip matching kit v1 VariableTagView (`bg-[#5C6BC0] text-white rounded-[2px]`).
* Shared by rich editor + single-line input ProseMirror hosts.
*/
var variableTagStyles = css`
    .pk-variable-tag {
        position: relative;
        display: inline-flex;
        align-items: stretch;
        max-width: 100%;
        margin-inline: 1px;
        margin-block-start: -3px;
        padding: 0;
        border-radius: 2px;
        background: #5c6bc0;
        color: #fff;
        font-size: 11px;
        font-weight: 400;
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        overflow: hidden;
        cursor: default;
        box-sizing: border-box;
    }

    /* Unresolved / missing reference — muted grey (not alarm yellow). */
    .pk-variable-tag--unresolved {
        background: var(--pk-color-gray-100, #f3f4f6);
        color: var(--pk-color-gray-600, #4b5563);
        box-shadow: inset 0 0 0 1px var(--pk-color-gray-300, #d1d5db);
    }

    .pk-variable-tag--unresolved.ProseMirror-selectednode {
        box-shadow:
            inset 0 0 0 1px var(--pk-color-gray-400, #9ca3af),
            0 0 0 2px rgba(156, 163, 175, 0.45);
    }

    .pk-variable-tag.ProseMirror-selectednode {
        outline: none;
        box-shadow: 0 0 0 2px rgba(123, 140, 232, 0.5);
    }

    .pk-variable-tag__label {
        display: inline-flex;
        align-items: center;
        max-width: 220px;
        margin: 0;
        padding: 4px 5px;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: inherit;
        line-height: inherit;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        user-select: none;
    }

    .pk-variable-tag__remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        margin: 0;
        padding: 4px 5px 4px 4px;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        line-height: 0;
        appearance: none;
    }

    .pk-variable-tag__remove svg {
        display: block;
        width: 10px;
        height: 10px;
        pointer-events: none;
    }
`;
var tiptapProseMirrorStyles = css`
    @layer pk-component {
        .ProseMirror {
            outline: none;
            min-height: 2rem;
            padding: 1rem;
            background: rgb(251, 252, 254);
            /* Craft CP body text (~gray-700), not gray-900. */
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            /* Match pk-input / body (14px). sm (13px) matched field instructions and looked undersized vs v1. */
            font-size: var(--pk-font-size-base);
            line-height: 1.5;
            white-space: pre-wrap;
            box-sizing: border-box;
        }

        .ProseMirror p {
            margin: 0 0 0.5rem;
        }

        .ProseMirror p:last-child {
            margin-bottom: 0;
        }

        .ProseMirror h1 {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 0.5rem;
        }

        .ProseMirror h2 {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0 0 0.5rem;
        }

        .ProseMirror h3,
        .ProseMirror h4,
        .ProseMirror h5,
        .ProseMirror h6 {
            font-weight: 600;
            margin: 0 0 0.5rem;
        }

        .ProseMirror a {
            color: var(--pk-color-blue-600);
            text-decoration: underline;
            cursor: pointer;
        }

        .ProseMirror ul,
        .ProseMirror ol {
            margin: 0 0 0.5rem;
            padding-left: 1.25rem;
        }

        .ProseMirror blockquote {
            margin: 0 0 0.5rem;
            padding-left: 0.75rem;
            border-left: 3px solid var(--pk-color-gray-300);
            color: var(--pk-color-gray-600);
        }

        .ProseMirror code {
            font-family: var(--pk-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: var(--pk-font-size-mono, 0.9em);
            line-height: var(--pk-line-height-mono, 1.5);
            background: var(--pk-color-gray-100);
            border-radius: 0.2rem;
            padding: 0.1rem 0.25rem;
        }

        .ProseMirror pre {
            margin: 0 0 0.5rem;
            padding: 0.75rem;
            background: var(--pk-color-gray-900);
            color: var(--pk-color-gray-50);
            border-radius: var(--pk-radius-md);
            overflow-x: auto;
            font-family: var(--pk-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: var(--pk-font-size-mono, 0.9em);
            line-height: var(--pk-line-height-mono, 1.5);
        }

        ${variableTagStyles}
    }
`;
/**
* Single-line TipTap field — same box metrics as `pk-input` .input
* (14px / line-height 1.4 / padding 6px 8px).
*
* ProseMirror always injects `br.ProseMirror-trailingBreak` for the caret.
* Never `display: none` it — that freezes one-liner docs after the first character.
* Clip to one line height instead so the break cannot inflate the control.
*/
var tiptapInputProseMirrorStyles = css`
    @layer pk-component {
        .ProseMirror {
            outline: none;
            margin: 0;
            /* Match stock pk-input padding by default. Hosts can override density via
             * --pk-tiptap-input-* (light DOM cannot style .ProseMirror in the shadow tree).
             */
            padding-block: var(--pk-tiptap-input-padding-block, 6px);
            padding-inline-start: var(--pk-tiptap-input-padding-inline-start, 8px);
            padding-inline-end: var(--pk-tiptap-input-padding-inline-end, 8px);
            /* One-liner clip: padding + control line-height (v1 text-sm), not a fixed shell token. */
            height: var(--pk-tiptap-input-height, calc(var(--pk-input-control-line-height, 1.25rem) + 12px));
            max-height: var(--pk-tiptap-input-height, calc(var(--pk-input-control-line-height, 1.25rem) + 12px));
            background: var(--pk-input-bg);
            /* Craft CP body / field value text. */
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-tiptap-input-font-size, var(--pk-font-size-base));
            line-height: var(--pk-tiptap-input-line-height, var(--pk-input-control-line-height, 1.25rem));
            white-space: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            box-sizing: border-box;
            scrollbar-width: none;
        }

        .ProseMirror::-webkit-scrollbar {
            display: none;
        }

        /* OneLinerDocument is inline-only; keep p inline if a schema ever wraps text. */
        .ProseMirror p {
            margin: 0;
            display: inline;
            line-height: inherit;
        }

        /* Read-only display: no input padding/height box (v1 skipped chrome when readOnly).
         * Inherit color/weight so list name links (text-blue-600 font-bold) show through. */
        :host([readonly]) .ProseMirror {
            padding-block: 0;
            padding-inline: 0;
            height: auto;
            max-height: none;
            background: transparent;
            overflow: visible;
            white-space: normal;
            color: inherit;
            font-weight: inherit;
            font-size: inherit;
        }

        ${variableTagStyles}
    }
`;
var tiptapContentProseMirrorStyles = css`
    @layer pk-component {
        /* Inherit host color/size so light-DOM wrappers (warning banners, badges)
           can restyle read-only TipTap without piercing the shadow tree. */
        .ProseMirror {
            outline: none;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
        }

        .ProseMirror p {
            margin: 0;
        }
    }
`;
//#endregion
export { createVariableTagDomNodeView as i, tiptapInputProseMirrorStyles as n, tiptapProseMirrorStyles as r, tiptapContentProseMirrorStyles as t };

//# sourceMappingURL=tiptap.styles-BytOpP0H.js.map