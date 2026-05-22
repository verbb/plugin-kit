import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
//#region src/components/Textarea.tsx
var textareaVariants = cva("", {
	variants: { size: {
		xs: "px-1.5 py-1 text-[11px]",
		sm: "px-2 py-1 text-[12px]",
		default: "px-2 py-1.5 text-sm",
		lg: "px-3 py-2 text-sm",
		xl: "px-4 py-2.5 text-base"
	} },
	defaultVariants: { size: "default" }
});
function Textarea({ className, size, ...props }) {
	return /* @__PURE__ */ jsx("textarea", {
		"data-slot": "textarea",
		className: cn("flex outline-none bg-clip-padding resize-y", "min-h-[80px] w-full", "rounded-sm", "border border-[rgba(96,125,159,0.4)]", "bg-[rgb(251,252,254)]", textareaVariants({ size }), "placeholder:text-[#7c8793]", "focus-visible:border-sky-600 focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]", "aria-invalid:border-rose-600 aria-invalid:focus-visible:!shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]", className),
		...props
	});
}
//#endregion
export { Textarea };

//# sourceMappingURL=Textarea.js.map