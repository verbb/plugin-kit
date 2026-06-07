import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { useTranslation } from "../hooks/useTranslation.js";
import "../hooks/index.js";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip.js";
import { VariableDropdown } from "./tiptap/VariableDropdown.js";
import { LinkDropdown } from "./tiptap/LinkDropdown.js";
import { VariablePickerProvider } from "./tiptap/VariablePickerContext.js";
import { InlineVariablePickerPopover } from "./tiptap/InlineVariablePickerPopover.js";
import { useInlineVariablePicker } from "./tiptap/useInlineVariablePicker.js";
import { LinkBubbleMenu } from "./tiptap/LinkBubbleMenu.js";
import { InsertLinkDialog } from "./tiptap/InsertLinkDialog.js";
import { createTiptapExtensions, getFatalTiptapContentError, normalizeContentArray, valueToContent } from "./tiptap/editorConfig.js";
import "./index.js";
import { Button } from "./Button.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getMarkRange } from "@tiptap/core";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight, faArrowRotateLeft, faArrowRotateRight, faBold, faBracketsCurly, faCode, faH1, faH2, faH3, faH4, faH5, faH6, faHighlighter, faItalic, faListOl, faListUl, faMinus, faQuoteRight, faStrikethrough, faSubscript, faSuperscript, faTextSlash, faTriangleExclamation, faUnderline } from "@fortawesome/pro-solid-svg-icons";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { faFileDashedLine, faTable } from "@fortawesome/pro-regular-svg-icons";
//#region src/components/TiptapEditor.tsx
var MenuBar = ({ editor, buttons = ["bold", "italic"], linkOptions, linkSelectorStorageKeyPrefix, variableCategories = {}, variableCategoryLabels, variableCategoryOrder, variablePickerOpen, onVariablePickerOpenChange, openInsertLinkDialog }) => {
	const t = useTranslation();
	if (!editor) return null;
	const hasAnyVariables = Object.values(variableCategories ?? {}).some((items) => {
		return Array.isArray(items) && items.length > 0;
	});
	const visibleButtons = buttons.filter((buttonName) => {
		if (buttonName === "variableTag") return hasAnyVariables;
		return true;
	});
	const buttonConfig = {
		bold: {
			icon: FontAwesomeIcon,
			iconProp: faBold,
			title: t("Bold"),
			action: () => {
				return editor.chain().focus().toggleBold().run();
			},
			isActive: () => {
				return editor.isActive("bold");
			}
		},
		italic: {
			icon: FontAwesomeIcon,
			iconProp: faItalic,
			title: t("Italic"),
			action: () => {
				return editor.chain().focus().toggleItalic().run();
			},
			isActive: () => {
				return editor.isActive("italic");
			}
		},
		underline: {
			icon: FontAwesomeIcon,
			iconProp: faUnderline,
			title: t("Underline"),
			action: () => {
				return editor.chain().focus().toggleUnderline().run();
			},
			isActive: () => {
				return editor.isActive("underline");
			}
		},
		strikethrough: {
			icon: FontAwesomeIcon,
			iconProp: faStrikethrough,
			title: t("Strikethrough"),
			action: () => {
				return editor.chain().focus().toggleStrike().run();
			},
			isActive: () => {
				return editor.isActive("strike");
			}
		},
		subscript: {
			icon: FontAwesomeIcon,
			iconProp: faSubscript,
			title: t("Subscript"),
			action: () => {
				return editor.chain().focus().toggleSubscript().run();
			},
			isActive: () => {
				return editor.isActive("subscript");
			}
		},
		superscript: {
			icon: FontAwesomeIcon,
			iconProp: faSuperscript,
			title: t("Superscript"),
			action: () => {
				return editor.chain().focus().toggleSuperscript().run();
			},
			isActive: () => {
				return editor.isActive("superscript");
			}
		},
		"unordered-list": {
			icon: FontAwesomeIcon,
			iconProp: faListUl,
			title: t("Bullet List"),
			action: () => {
				return editor.chain().focus().toggleBulletList().run();
			},
			isActive: () => {
				return editor.isActive("bulletList");
			}
		},
		"ordered-list": {
			icon: FontAwesomeIcon,
			iconProp: faListOl,
			title: t("Ordered List"),
			action: () => {
				return editor.chain().focus().toggleOrderedList().run();
			},
			isActive: () => {
				return editor.isActive("orderedList");
			}
		},
		blockquote: {
			icon: FontAwesomeIcon,
			iconProp: faQuoteRight,
			title: t("Blockquote"),
			action: () => {
				return editor.chain().focus().toggleBlockquote().run();
			},
			isActive: () => {
				return editor.isActive("blockquote");
			}
		},
		highlight: {
			icon: FontAwesomeIcon,
			iconProp: faHighlighter,
			title: t("Highlight"),
			action: () => {
				return editor.chain().focus().toggleHighlight().run();
			},
			isActive: () => {
				return editor.isActive("highlight");
			}
		},
		code: {
			icon: FontAwesomeIcon,
			iconProp: faBracketsCurly,
			title: t("Inline Code"),
			action: () => {
				return editor.chain().focus().toggleCode().run();
			},
			isActive: () => {
				return editor.isActive("code");
			}
		},
		"code-block": {
			icon: FontAwesomeIcon,
			iconProp: faCode,
			title: t("Code Block"),
			action: () => {
				return editor.chain().focus().toggleCodeBlock().run();
			},
			isActive: () => {
				return editor.isActive("codeBlock");
			}
		},
		hr: {
			icon: FontAwesomeIcon,
			iconProp: faMinus,
			title: t("Horizontal Rule"),
			action: () => {
				return editor.chain().focus().setHorizontalRule().run();
			}
		},
		"line-break": {
			icon: FontAwesomeIcon,
			iconProp: faFileDashedLine,
			title: t("Line Break"),
			action: () => {
				return editor.chain().focus().setHardBreak().run();
			}
		},
		"align-left": {
			icon: FontAwesomeIcon,
			iconProp: faAlignLeft,
			title: t("Align Left"),
			action: () => {
				return editor.chain().focus().setTextAlign("left").run();
			},
			isActive: () => {
				return editor.isActive({ textAlign: "left" });
			}
		},
		"align-center": {
			icon: FontAwesomeIcon,
			iconProp: faAlignCenter,
			title: t("Align Center"),
			action: () => {
				return editor.chain().focus().setTextAlign("center").run();
			},
			isActive: () => {
				return editor.isActive({ textAlign: "center" });
			}
		},
		"align-right": {
			icon: FontAwesomeIcon,
			iconProp: faAlignRight,
			title: t("Align Right"),
			action: () => {
				return editor.chain().focus().setTextAlign("right").run();
			},
			isActive: () => {
				return editor.isActive({ textAlign: "right" });
			}
		},
		"align-justify": {
			icon: FontAwesomeIcon,
			iconProp: faAlignJustify,
			title: t("Justify"),
			action: () => {
				return editor.chain().focus().setTextAlign("justify").run();
			},
			isActive: () => {
				return editor.isActive({ textAlign: "justify" });
			}
		},
		"clear-format": {
			icon: FontAwesomeIcon,
			iconProp: faTextSlash,
			title: t("Clear Format"),
			action: () => {
				return editor.chain().focus().clearNodes().unsetAllMarks().run();
			}
		},
		undo: {
			icon: FontAwesomeIcon,
			iconProp: faArrowRotateLeft,
			title: t("Undo"),
			action: () => {
				return editor.chain().focus().undo().run();
			}
		},
		redo: {
			icon: FontAwesomeIcon,
			iconProp: faArrowRotateRight,
			title: t("Redo"),
			action: () => {
				return editor.chain().focus().redo().run();
			}
		},
		link: {
			title: t("Link"),
			isActive: () => {
				return editor.isActive("link");
			},
			isDropdown: true
		},
		table: {
			icon: FontAwesomeIcon,
			iconProp: faTable,
			title: t("Insert Table"),
			action: () => {
				return editor.chain().focus().insertTable({
					rows: 3,
					cols: 3,
					withHeaderRow: true
				}).run();
			}
		},
		variableTag: {
			title: t("Insert Variable"),
			isActive: () => {
				return editor.isActive("variableTag");
			},
			isDropdown: true
		}
	};
	[
		1,
		2,
		3,
		4,
		5,
		6
	].forEach((level) => {
		buttonConfig[`h${level}`] = {
			icon: FontAwesomeIcon,
			iconProp: {
				1: faH1,
				2: faH2,
				3: faH3,
				4: faH4,
				5: faH5,
				6: faH6
			}[level],
			title: t("Heading {level}", { level: String(level) }),
			action: () => {
				return editor.chain().focus().toggleHeading({ level }).run();
			},
			isActive: () => {
				return editor.isActive("heading", { level });
			}
		};
	});
	const resolveIsActive = (config) => {
		if (!config.isActive) return false;
		return typeof config.isActive === "function" ? config.isActive() : config.isActive;
	};
	const renderedButtons = visibleButtons.map((buttonName) => {
		const config = buttonConfig[buttonName];
		if (!config) return null;
		if (config.isDropdown && buttonName === "link") return /* @__PURE__ */ jsx(LinkDropdown, {
			editor,
			linkOptions,
			linkSelectorStorageKeyPrefix,
			openInsertLinkDialog,
			title: config.title
		}, buttonName);
		if (config.isDropdown && buttonName === "variableTag") return /* @__PURE__ */ jsx(VariableDropdown, {
			editor,
			variableCategories,
			variableCategoryLabels,
			variableCategoryOrder,
			title: config.title,
			open: variablePickerOpen,
			onOpenChange: onVariablePickerOpenChange
		}, buttonName);
		const Icon = config.icon;
		return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, { render: /* @__PURE__ */ jsx(Button, {
			variant: "transparent",
			onClick: config.action,
			className: cn("w-[32px] h-[32px]", "text-[#1c2e36]", "hover:bg-slate-100!", resolveIsActive(config) && "bg-slate-250! hover:bg-slate-250!"),
			children: /* @__PURE__ */ jsx(Icon, {
				icon: config.iconProp,
				className: "size-4"
			})
		}) }), /* @__PURE__ */ jsx(TooltipContent, {
			sideOffset: 4,
			children: config.title
		})] }, buttonName);
	}).filter(Boolean);
	if (renderedButtons.length === 0) return null;
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-wrap relative z-10 gap-1 px-[8px] py-[4px]", "border-b border-[rgba(96,125,159,0.4)] bg-white", "shadow-[0_2px_3px_rgba(49,49,93,.07)]"),
		children: renderedButtons
	});
};
var TiptapEditor = ({ value = "", onChange, buttons = ["bold", "italic"], tableOptions = [], linkOptions, linkSelectorStorageKeyPrefix, variableCategories = {}, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry, variablePickerTriggerCharacters = ["@"], renderVariableConfigureSection, resolveVariableTagLabel, toolbarContent, rows, className, isInvalid, disabled = false, readOnly = false, invalidContentMessage, ...props }) => {
	useTranslation();
	const wrapperRef = useRef(null);
	const handleKeyDownRef = useRef(null);
	const lastEmittedContentRef = useRef(null);
	const extensions = useMemo(() => {
		return createTiptapExtensions({ trailingCursorText: "⁠" });
	}, []);
	const [isVariablePickerOpen, setIsVariablePickerOpen] = useState(false);
	const hasAnyVariables = useMemo(() => {
		return Object.values(variableCategories || {}).some((variables) => {
			return Array.isArray(variables) && variables.length > 0;
		});
	}, [variableCategories]);
	const editorContent = useMemo(() => {
		return valueToContent(value, { trailingCursorText: "⁠" });
	}, [value]);
	const contentError = useMemo(() => {
		const detectedError = getFatalTiptapContentError(value);
		return detectedError ? invalidContentMessage || detectedError : "";
	}, [invalidContentMessage, value]);
	const serializeContent = (content) => {
		return normalizeContentArray(content);
	};
	const serializeEditorDocument = useCallback((editorInstance) => {
		return JSON.stringify(serializeContent(editorInstance.getJSON().content));
	}, []);
	const editor = useEditor({
		extensions,
		content: contentError ? null : editorContent,
		editable: !disabled && !readOnly,
		editorProps: { handleKeyDown: (view, event) => {
			return handleKeyDownRef.current?.(view, event) ?? false;
		} },
		onUpdate: ({ editor: editorInstance }) => {
			const serialized = serializeContent(editorInstance.getJSON().content);
			lastEmittedContentRef.current = JSON.stringify(serialized);
			if (onChange) onChange(serialized);
		}
	});
	const inlinePicker = useInlineVariablePicker(editor, {
		variableCategories,
		variableCategoryLabels,
		variableCategoryOrder,
		variablePickerTriggerCharacters,
		disabled,
		readOnly,
		wrapperRef,
		onOpenDropdown: () => {
			return setIsVariablePickerOpen(true);
		}
	});
	useEffect(() => {
		handleKeyDownRef.current = inlinePicker.handleKeyDown;
	}, [inlinePicker.handleKeyDown]);
	const [insertLinkDialogOpen, setInsertLinkDialogOpen] = useState(false);
	const [insertLinkInitialValues, setInsertLinkInitialValues] = useState();
	const editorMinHeight = useMemo(() => {
		return `${Math.max(1, Number(rows || 0)) * 24 + 32}px`;
	}, [rows]);
	useEffect(() => {
		if (!editor?.view?.dom) return;
		editor.view.dom.style.minHeight = editorMinHeight;
	}, [editor, editorMinHeight]);
	const openInsertLinkDialog = useCallback((initial) => {
		if (initial) {
			const openInNewTab = editor?.isActive("link") ? editor.getAttributes("link").target === "_blank" : false;
			setInsertLinkInitialValues({
				...initial,
				openInNewTab
			});
		} else setInsertLinkInitialValues(void 0);
		setInsertLinkDialogOpen(true);
	}, [editor]);
	const insertLink = useCallback((params) => {
		if (!editor) return;
		const { url, text, openInNewTab, from: fromParam, to: toParam } = params;
		const chain = editor.chain().focus();
		const linkAttrs = { href: url };
		if (openInNewTab) linkAttrs.target = "_blank";
		const content = {
			type: "text",
			text: text.trim() || url,
			marks: [{
				type: "link",
				attrs: linkAttrs
			}]
		};
		if (typeof fromParam === "number" && typeof toParam === "number" && fromParam !== toParam) chain.insertContentAt({
			from: fromParam,
			to: toParam
		}, [content]).run();
		else {
			const { from, to } = editor.state.selection;
			if (editor.state.doc.textBetween(from, to, " ")) chain.extendMarkRange("link").setLink(linkAttrs).run();
			else chain.insertContent([content]).run();
		}
	}, [editor]);
	useEffect(() => {
		if (!editor) return;
		const incomingContent = contentError ? null : editorContent;
		const incomingSerialized = JSON.stringify(incomingContent?.content ?? []);
		const currentSerialized = serializeEditorDocument(editor);
		const isVariableConfigActive = Boolean(document.activeElement?.closest("[data-variable-config-popover]"));
		if (incomingSerialized === currentSerialized) return;
		if (lastEmittedContentRef.current === incomingSerialized) return;
		if (!readOnly && (editor.isFocused || isVariableConfigActive || lastEmittedContentRef.current && currentSerialized === lastEmittedContentRef.current && incomingSerialized !== lastEmittedContentRef.current)) return;
		editor.commands.setContent(incomingContent ?? {
			type: "doc",
			content: []
		});
		lastEmittedContentRef.current = incomingSerialized;
	}, [
		contentError,
		editor,
		editorContent,
		readOnly,
		serializeEditorDocument
	]);
	const handleLinkBubbleEdit = useCallback(() => {
		if (!editor) return;
		const { href } = editor.getAttributes("link");
		const { state } = editor;
		const linkType = state.schema.marks.link;
		const range = getMarkRange(state.selection.$from, linkType);
		const from = range?.from ?? state.selection.from;
		const to = range?.to ?? state.selection.to;
		openInsertLinkDialog({
			url: href,
			text: editor.state.doc.textBetween(from, to, " "),
			from,
			to
		});
	}, [editor, openInsertLinkDialog]);
	return /* @__PURE__ */ jsx("div", {
		className: cn("border border-[rgba(96,125,159,0.4)] rounded-sm overflow-hidden", isInvalid && ["border-rose-600!", "[focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]!"], className),
		children: /* @__PURE__ */ jsxs(VariablePickerProvider, {
			variableCategories,
			variableCategoryLabels,
			variableCategoryOrder,
			variableTransformerRegistry,
			renderVariableConfigureSection,
			resolveVariableTagLabel,
			children: [/* @__PURE__ */ jsxs(EditorContext.Provider, {
				value: { editor },
				children: [
					toolbarContent ? toolbarContent({
						editor,
						variableCategories,
						variableCategoryLabels,
						variableCategoryOrder,
						variablePickerOpen: isVariablePickerOpen,
						onVariablePickerOpenChange: setIsVariablePickerOpen
					}) : /* @__PURE__ */ jsx(MenuBar, {
						editor,
						buttons,
						tableOptions,
						linkOptions,
						linkSelectorStorageKeyPrefix,
						variableCategories,
						variableCategoryLabels,
						variableCategoryOrder,
						variablePickerOpen: isVariablePickerOpen,
						onVariablePickerOpenChange: setIsVariablePickerOpen,
						openInsertLinkDialog
					}),
					/* @__PURE__ */ jsxs("div", {
						ref: wrapperRef,
						className: "relative",
						children: [
							contentError && /* @__PURE__ */ jsxs("div", {
								className: "flex items-start gap-2 border-b border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-800",
								children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
									icon: faTriangleExclamation,
									className: "mt-0.5 size-3.5 shrink-0"
								}), /* @__PURE__ */ jsx("p", { children: contentError })]
							}),
							/* @__PURE__ */ jsx(EditorContent, {
								editor,
								className: cn("[&_.ProseMirror]:outline-none", "[&_.ProseMirror]:min-h-8", "[&_.ProseMirror]:p-4", "[&_.ProseMirror]:bg-[#fbfcfe]", "[&_.ProseMirror]:shadow-none", "[&_.ProseMirror]:whitespace-pre-wrap", "[&_.ProseMirror_p]:m-0 [&_.ProseMirror_p]:mb-2", "[&_.ProseMirror_p:last-child]:mb-0", "[&_.ProseMirror_h1]:text-xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-2", "[&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:mb-2", "[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:mb-2", "[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:mb-2", "[&_.ProseMirror_li]:mb-1", "[&_.ProseMirror_hr]:border-slate-300 [&_.ProseMirror_hr]:my-4", "[&_.ProseMirror_code]:bg-slate-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-sm", "[&_.ProseMirror_pre]:bg-slate-100 [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:rounded [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_pre]:mb-2", "[&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-slate-300 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-slate-600 [&_.ProseMirror_blockquote]:mb-2", "[&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:mb-2", "[&_.ProseMirror_th]:border [&_.ProseMirror_th]:border-slate-300 [&_.ProseMirror_th]:px-3 [&_.ProseMirror_th]:py-2 [&_.ProseMirror_th]:bg-slate-100 [&_.ProseMirror_th]:text-left", "[&_.ProseMirror_td]:border [&_.ProseMirror_td]:border-slate-300 [&_.ProseMirror_td]:px-3 [&_.ProseMirror_td]:py-2", "[&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:cursor-pointer"),
								...props
							}),
							hasAnyVariables && !readOnly && /* @__PURE__ */ jsx(InlineVariablePickerPopover, {
								open: inlinePicker.state.open,
								onOpenChange: (open) => {
									if (!open) inlinePicker.closePicker();
								},
								position: {
									top: inlinePicker.state.top,
									left: inlinePicker.state.left
								},
								isChildMode: inlinePicker.filteredVariables.isChildMode,
								query: inlinePicker.state.query,
								onQueryChange: inlinePicker.setQuery,
								filteredVariables: inlinePicker.filteredVariables,
								onSelect: inlinePicker.handleSelect,
								onBack: inlinePicker.goBack
							})
						]
					}),
					buttons.includes("link") && editor && /* @__PURE__ */ jsx(LinkBubbleMenu, {
						editor,
						onEdit: handleLinkBubbleEdit,
						dialogOpen: insertLinkDialogOpen
					})
				]
			}), /* @__PURE__ */ jsx(InsertLinkDialog, {
				open: insertLinkDialogOpen,
				onOpenChange: setInsertLinkDialogOpen,
				initialValues: insertLinkInitialValues,
				onInsert: (values) => {
					insertLink({
						...values,
						from: insertLinkInitialValues?.from,
						to: insertLinkInitialValues?.to
					});
					setInsertLinkDialogOpen(false);
				}
			})]
		})
	});
};
//#endregion
export { TiptapEditor };

//# sourceMappingURL=TiptapEditor.js.map