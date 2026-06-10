import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import { html } from "@codemirror/lang-html";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
//#region src/components/CodeEditor.tsx
var LINE_HEIGHT_PX = 18;
var editorTheme = EditorView.theme({
	"&": {
		backgroundColor: "rgb(251, 252, 254)",
		color: "rgb(31, 41, 51)",
		fontSize: "12px"
	},
	"&.cm-focused": { outline: "none" },
	".cm-scroller": {
		fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
		lineHeight: `${LINE_HEIGHT_PX}px`
	},
	".cm-content": {
		padding: "6px 8px",
		caretColor: "rgb(31, 41, 51)"
	},
	".cm-gutters": {
		backgroundColor: "rgb(245, 247, 250)",
		borderRight: "1px solid rgba(96, 125, 159, 0.2)",
		color: "#7c8793"
	},
	".cm-gutter.cm-lineNumbers .cm-gutterElement": {
		padding: "0 8px",
		minWidth: "3rem"
	},
	".cm-activeLine": { backgroundColor: "rgba(96, 125, 159, 0.06)" },
	".cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection": { backgroundColor: "rgba(59, 130, 246, 0.35) !important" }
});
var CodeEditor = ({ value, onChange, language = "html", tabSize = 4, lineNumbers = true, rows = 12, disabled = false, readOnly = false, isInvalid = false, className, ...props }) => {
	const extensions = useMemo(() => {
		const next = [
			editorTheme,
			EditorState.tabSize.of(Math.max(1, tabSize)),
			EditorView.lineWrapping
		];
		if (language === "html") next.push(html());
		return next;
	}, [language, tabSize]);
	const minHeight = `${Math.max(Number(rows) || 12, 4) * LINE_HEIGHT_PX + 12}px`;
	return /* @__PURE__ */ jsx("div", {
		className: cn("overflow-hidden rounded-sm border border-[rgba(96,125,159,0.4)] bg-[rgb(251,252,254)]", "focus-within:border-sky-600 focus-within:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]", "[&_.cm-editor]:min-h-[var(--formie-code-editor-min-height)]", isInvalid && "border-rose-600 focus-within:border-rose-600 focus-within:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]", (disabled || readOnly) && "opacity-70", className),
		style: { "--formie-code-editor-min-height": minHeight },
		"data-slot": "code-editor",
		children: /* @__PURE__ */ jsx(CodeMirror, {
			value: value ?? "",
			onChange,
			extensions,
			editable: !disabled && !readOnly,
			readOnly: disabled || readOnly,
			basicSetup: {
				lineNumbers,
				foldGutter: false,
				dropCursor: false,
				allowMultipleSelections: false,
				indentOnInput: true,
				bracketMatching: language === "html",
				closeBrackets: language === "html",
				autocompletion: false,
				highlightSelectionMatches: false,
				searchKeymap: false,
				tabSize
			},
			...props
		})
	});
};
//#endregion
export { CodeEditor };

//# sourceMappingURL=CodeEditor.js.map