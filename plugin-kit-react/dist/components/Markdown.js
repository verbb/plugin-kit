import { cn } from "../utils/classes.js";
import { utils_exports } from "../utils/index.js";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/Markdown.tsx
var Markdown = forwardRef(({ content, inline = true, as, className, ...props }, ref) => {
	let html = "";
	if (content) html = inline ? (0, utils_exports.renderInlineMarkdown)(content) : (0, utils_exports.renderMarkdown)(content);
	const Component = as ?? (inline ? "span" : "div");
	if (!html) return null;
	if (Component === "span") return /* @__PURE__ */ jsx("span", {
		ref,
		className: cn([
			"[&_a]:text-blue-500 [&_a]:hover:underline",
			"[&_code]:rounded [&_code]:border [&_code]:border-slate-200 [&_code]:bg-slate-150 [&_code]:px-[3px] [&_code]:py-[1px] [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-gray-700",
			className
		]),
		dangerouslySetInnerHTML: { __html: html },
		...props
	});
	if (Component === "p") return /* @__PURE__ */ jsx("p", {
		ref,
		className: cn([
			"[&_a]:text-blue-500 [&_a]:hover:underline",
			"[&_code]:rounded [&_code]:border [&_code]:border-slate-200 [&_code]:bg-slate-150 [&_code]:px-[3px] [&_code]:py-[1px] [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-gray-700",
			className
		]),
		dangerouslySetInnerHTML: { __html: html },
		...props
	});
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn([
			"[&_a]:text-blue-500 [&_a]:hover:underline",
			"[&_code]:rounded [&_code]:border [&_code]:border-slate-200 [&_code]:bg-slate-150 [&_code]:px-[3px] [&_code]:py-[1px] [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-gray-700",
			className
		]),
		dangerouslySetInnerHTML: { __html: html },
		...props
	});
});
Markdown.displayName = "Markdown";
//#endregion
export { Markdown };

//# sourceMappingURL=Markdown.js.map