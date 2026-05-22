import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { contentToValue, dedupeVariableOptions, flattenVariableOptions, valueToContent } from "./tiptap/variableSerialization.js";
import { VariableDropdown } from "./tiptap/VariableDropdown.js";
import { VariablePickerProvider } from "./tiptap/VariablePickerContext.js";
import { InlineVariablePickerPopover } from "./tiptap/InlineVariablePickerPopover.js";
import { useInlineVariablePicker } from "./tiptap/useInlineVariablePicker.js";
import VariableTag_default from "./tiptap/VariableTag.js";
import { useEffect, useMemo, useRef, useState } from "react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { jsx, jsxs } from "react/jsx-runtime";
import { EditorContent, useEditor } from "@tiptap/react";
//#region src/components/TiptapInput.tsx
var OneLinerDocument = Document.extend({ content: "inline*" });
var TiptapInput = ({ value = "", onChange, className, isInvalid, disabled = false, readOnly = false, variableCategories = {}, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry, variablePickerTriggerCharacters = ["@"], ...props }) => {
	const wrapperRef = useRef(null);
	const [isVariablePickerOpen, setIsVariablePickerOpen] = useState(false);
	const handleKeyDownRef = useRef(null);
	const topLevelVariables = useMemo(() => {
		return dedupeVariableOptions(Object.values(variableCategories ?? {}).flatMap((items) => {
			return Array.isArray(items) ? items : [];
		}));
	}, [variableCategories]);
	const variables = useMemo(() => {
		return flattenVariableOptions(topLevelVariables);
	}, [topLevelVariables]);
	const editor = useEditor({
		extensions: useMemo(() => {
			return [
				OneLinerDocument,
				Text,
				VariableTag_default.configure({})
			];
		}, []),
		content: valueToContent(value, topLevelVariables, variables),
		editable: !disabled && !readOnly,
		editorProps: { handleKeyDown: (view, event) => {
			return handleKeyDownRef.current?.(view, event) ?? false;
		} },
		onUpdate: ({ editor: ed }) => {
			if (onChange) onChange(contentToValue(ed.getJSON().content));
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
	useEffect(() => {
		if (!editor) return;
		if (!readOnly && editor.isFocused) return;
		const newContent = valueToContent(value, topLevelVariables, variables);
		const currentContent = editor.getJSON();
		if (JSON.stringify(newContent) !== JSON.stringify(currentContent)) queueMicrotask(() => {
			const content = newContent ?? {
				type: "doc",
				content: []
			};
			editor.commands.setContent(content);
		});
	}, [
		editor,
		value,
		readOnly,
		topLevelVariables,
		variables
	]);
	const hasVariables = variables.length > 0;
	return /* @__PURE__ */ jsx(VariablePickerProvider, {
		variableCategories,
		variableCategoryLabels,
		variableCategoryOrder,
		variableTransformerRegistry,
		children: /* @__PURE__ */ jsxs("div", {
			ref: wrapperRef,
			className: cn("relative", className),
			children: [
				/* @__PURE__ */ jsx(EditorContent, {
					editor,
					className: cn(!readOnly && [
						"[&_.ProseMirror]:outline-none [&_.ProseMirror]:bg-clip-padding",
						"[&_.ProseMirror]:rounded-sm",
						"[&_.ProseMirror]:border [&_.ProseMirror]:border-[rgba(96,125,159,0.4)]",
						"[&_.ProseMirror]:bg-[rgb(251,252,254)]",
						"[&_.ProseMirror]:whitespace-pre-wrap",
						"[&_.ProseMirror]:w-full [&_.ProseMirror]:h-[34px] [&_.ProseMirror]:px-2 [&_.ProseMirror]:pr-10 [&_.ProseMirror]:pt-[6px] [&_.ProseMirror]:text-sm",
						"[&_.ProseMirror]:whitespace-nowrap [&_.ProseMirror]:overflow-x-auto [&_.ProseMirror]:overflow-y-hidden",
						"[&_.ProseMirror]:[scrollbar-width:none] [&_.ProseMirror::-webkit-scrollbar]:hidden",
						"[&_.ProseMirror]:placeholder:text-[#7c8793]",
						"[&_.ProseMirror]:focus-visible:border-sky-600 [&_.ProseMirror]:focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]",
						"[&_.ProseMirror]:disabled:cursor-not-allowed [&_.ProseMirror]:disabled:opacity-50"
					], isInvalid && ["[&_.ProseMirror]:border-rose-600", "[&_.ProseMirror]:focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]"], "[&_.ProseMirror_p]:m-0 [&_.ProseMirror_p]:inline", "[&_.ProseMirror_p]:leading-tight", "[&_.ProseMirror-trailingBreak]:inline [&_.ProseMirror-trailingBreak]:leading-none [&_.ProseMirror-trailingBreak]:w-0 [&_.ProseMirror-trailingBreak]:h-0"),
					...props
				}),
				hasVariables && !readOnly && /* @__PURE__ */ jsx(VariableDropdown, {
					editor,
					variableCategories,
					variableCategoryLabels,
					variableCategoryOrder,
					triggerMode: "input",
					open: isVariablePickerOpen,
					onOpenChange: setIsVariablePickerOpen
				}),
				hasVariables && !readOnly && /* @__PURE__ */ jsx(InlineVariablePickerPopover, {
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
		})
	});
};
//#endregion
export { TiptapInput };

//# sourceMappingURL=TiptapInput.js.map