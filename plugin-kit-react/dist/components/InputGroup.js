import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { Input } from "./Input.js";
import { Textarea } from "./Textarea.js";
import "./index.js";
import { Button } from "./Button.js";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
//#region src/components/InputGroup.tsx
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group outline-none relative flex w-full min-w-0 items-center", "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col", "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col", "has-[>[data-align=block-end]]:[&>input]:pt-3", "has-[>[data-align=block-start]]:[&>input]:pb-3", "has-[>[data-align=inline-end]]:[&>input]:pr-1.5", "has-[>[data-align=inline-start]]:[&>input]:pl-1.5", "rounded-sm", "border border-[rgba(96,125,159,0.4)]", "bg-[rgb(251,252,254)] bg-clip-padding", "has-[[data-slot=input-group-control]:focus-visible]:border-sky-600", "has-[[data-slot=field-control]:focus-visible]:border-sky-600", "has-[[data-slot=input-group-control]:focus-visible]:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]", "has-[[data-slot=field-control]:focus-visible]:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]", "has-[[data-slot][aria-invalid=true]]:border-rose-600!", "has-disabled:opacity-50", className),
		...props
	});
}
var inputGroupAddonVariants = cva([
	"flex h-auto items-center justify-center gap-2",
	"px-2 text-sm",
	"cursor-text select-none",
	"group-data-[disabled=true]/input-group:opacity-50",
	"[&>svg:not([class*='size-'])]:size-3",
	"[&>kbd]:rounded-[calc(var(--radius)-5px)]"
].join(" "), {
	variants: { align: {
		"inline-start": [
			"order-first pl-2",
			"has-[>button]:ml-[-0.3rem]",
			"has-[>kbd]:ml-[-0.15rem]"
		].join(" "),
		"inline-end": [
			"order-last pr-2",
			"has-[>button]:mr-[-0.3rem]",
			"has-[>kbd]:mr-[-0.15rem]"
		].join(" "),
		"block-start": [
			"order-first w-full justify-start",
			"px-2.5 pt-2",
			"group-has-[>input]/input-group:pt-2",
			"[.border-b]:pb-2"
		].join(" "),
		"block-end": [
			"order-last w-full justify-start",
			"px-2.5 pb-2",
			"group-has-[>input]/input-group:pb-2",
			"[.border-t]:pt-2"
		].join(" ")
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva([
	"flex items-center gap-2",
	"text-gray-500 text-sm",
	"shadow-none rounded-sm",
	"hover:bg-slate-100"
].join(" "), {
	variants: { size: {
		xs: "",
		sm: "",
		"icon-xs": "size-6 [&>svg]:size-3.5 p-0 has-[>svg]:p-0",
		"icon-sm": ""
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "none", size = "xs", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupText({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		className: cn("flex items-center gap-2 text-sm", "text-gray-500", "[&_svg:not([class*='size-'])]:size-3", "[&_svg]:pointer-events-none", className),
		...props
	});
}
function InputGroupInput({ className, ...props }) {
	return /* @__PURE__ */ jsx(Input, {
		"data-slot": "input-group-control",
		className: cn("flex-1", "rounded-none border-0", "bg-transparent", "shadow-none!", "disabled:bg-transparent", className),
		...props
	});
}
function InputGroupTextarea({ className, ...props }) {
	return /* @__PURE__ */ jsx(Textarea, {
		"data-slot": "input-group-control",
		className: cn("flex-1", "rounded-none border-0 py-2", "resize-none", "bg-transparent", "shadow-none!", "disabled:bg-transparent", className),
		...props
	});
}
//#endregion
export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea };

//# sourceMappingURL=InputGroup.js.map