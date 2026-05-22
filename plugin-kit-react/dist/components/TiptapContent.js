import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { createTiptapExtensions, valueToContent } from "./tiptap/editorConfig.js";
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import { EditorContent, useEditor } from "@tiptap/react";
//#region src/components/TiptapContent.tsx
var TiptapContent = ({ value = "", className, ...props }) => {
	return /* @__PURE__ */ jsx(EditorContent, {
		editor: useEditor({
			extensions: useMemo(() => {
				return createTiptapExtensions();
			}, []),
			content: valueToContent(value),
			editable: false
		}),
		className: cn("[&_.ProseMirror]:outline-none", "[&_.ProseMirror_p]:m-0", "[&_.ProseMirror_p]:leading-[1.4]", "[&_.ProseMirror]:text-sm", className),
		...props
	});
};
//#endregion
export { TiptapContent };

//# sourceMappingURL=TiptapContent.js.map