import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { createTiptapExtensions, valueToContent } from "./tiptap/editorConfig.js";
import { useEffect, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import { EditorContent, useEditor } from "@tiptap/react";
//#region src/components/TiptapContent.tsx
var serializeDocContent = (content) => {
	if (!content) return "[]";
	if (Array.isArray(content.content)) return JSON.stringify(content.content);
	return JSON.stringify(content);
};
var TiptapContent = ({ value = "", className, ...props }) => {
	const extensions = useMemo(() => {
		return createTiptapExtensions();
	}, []);
	const editorContent = useMemo(() => {
		return valueToContent(value);
	}, [value]);
	const editor = useEditor({
		extensions,
		content: editorContent,
		editable: false
	});
	useEffect(() => {
		if (!editor) return;
		const incomingContent = editorContent ?? {
			type: "doc",
			content: []
		};
		if (serializeDocContent(editorContent) === serializeDocContent(editor.getJSON())) return;
		editor.commands.setContent(incomingContent);
	}, [editor, editorContent]);
	return /* @__PURE__ */ jsx(EditorContent, {
		editor,
		className: cn("[&_.ProseMirror]:outline-none", "[&_.ProseMirror_p]:m-0", "[&_.ProseMirror_p]:leading-[1.4]", "[&_.ProseMirror]:text-sm", className),
		...props
	});
};
//#endregion
export { TiptapContent };

//# sourceMappingURL=TiptapContent.js.map