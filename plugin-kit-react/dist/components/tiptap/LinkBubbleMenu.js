import { cn } from "../../utils/classes.js";
import { getPortalTargetForAppend } from "../../utils/portal.js";
import "../../utils/index.js";
import { useTranslation } from "../../hooks/useTranslation.js";
import "../../hooks/index.js";
import { Button } from "../Button.js";
import { useCallback, useEffect, useState } from "react";
import { getMarkRange, posToDOMRect } from "@tiptap/core";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
//#region src/components/tiptap/LinkBubbleMenu.tsx
function LinkBubbleMenu({ editor, onEdit, dialogOpen = false }) {
	const t = useTranslation();
	const pluginKey = "linkBubbleMenu";
	const [dismissed, setDismissed] = useState(false);
	const href = useEditorState({
		editor,
		selector: ({ editor: ed }) => {
			return ed?.isActive("link") ? ed.getAttributes("link").href : void 0;
		}
	});
	const getReferencedVirtualElement = useCallback(() => {
		if (!editor?.isActive("link")) return null;
		const { state, view } = editor;
		const linkType = state.schema.marks.link;
		const getRect = () => {
			const range = getMarkRange(editor.state.selection.$from, linkType);
			if (range) return posToDOMRect(view, range.from, range.to);
			const { from } = editor.state.selection;
			return posToDOMRect(view, from, from);
		};
		return {
			getBoundingClientRect: getRect,
			getClientRects: () => {
				return [getRect()];
			}
		};
	}, [editor]);
	const handleShow = useCallback(() => {
		if (!editor) return;
		requestAnimationFrame(() => {
			editor.view.dispatch(editor.state.tr.setMeta(pluginKey, "updatePosition"));
		});
	}, [editor, pluginKey]);
	useEffect(() => {
		if (!dialogOpen) setDismissed(false);
	}, [dialogOpen]);
	if (!editor) return null;
	const appendTarget = getPortalTargetForAppend();
	return /* @__PURE__ */ jsxs(BubbleMenu, {
		editor,
		pluginKey,
		shouldShow: ({ editor: ed }) => {
			return !dismissed && !dialogOpen && ed.isFocused && ed.isActive("link");
		},
		appendTo: appendTarget ? () => {
			return appendTarget;
		} : void 0,
		getReferencedVirtualElement,
		updateDelay: 0,
		options: {
			placement: "top",
			onShow: handleShow
		},
		className: cn("relative z-[250] flex items-center gap-0 rounded-md overflow-visible", "bg-[#1c2e36] text-white text-[12px]", dismissed && "hidden"),
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "absolute left-1/2 -translate-x-1/2 -bottom-1 size-2 rotate-45 bg-[#1c2e36]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ jsx("span", {
				className: "px-2 py-1.5 max-w-[200px] truncate",
				children: href
			}),
			/* @__PURE__ */ jsx("span", { className: "w-px h-3 bg-[#616d73]" }),
			/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "none",
				size: "xs",
				className: "text-white hover:text-white/70 px-2 py-1.5",
				onClick: () => {
					setDismissed(true);
					editor?.commands?.blur?.();
					onEdit();
				},
				children: t("Edit")
			}),
			/* @__PURE__ */ jsx("span", { className: "w-px h-3 bg-[#616d73]" }),
			/* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "none",
				size: "xs",
				className: "text-white hover:text-white/70 px-2 py-1.5",
				onClick: () => {
					return editor.chain().focus().unsetLink().run();
				},
				children: t("Unlink")
			})
		]
	});
}
//#endregion
export { LinkBubbleMenu };

//# sourceMappingURL=LinkBubbleMenu.js.map