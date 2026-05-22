import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { Separator } from "./Separator.js";
import { cva } from "class-variance-authority";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { jsx } from "react/jsx-runtime";
//#region src/components/ButtonGroup.tsx
var buttonGroupVariants = cva([
	"flex w-fit items-stretch",
	"[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	"*:focus-visible:z-10 *:focus-visible:relative",
	"has-[>[data-slot=button-group]]:gap-2",
	"has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg"
], {
	variants: { orientation: {
		horizontal: [
			"[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg!",
			"[&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
			"*:data-slot:rounded-r-none"
		],
		vertical: [
			"flex-col",
			"[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!",
			"[&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
			"*:data-slot:rounded-b-none"
		]
	} },
	defaultVariants: { orientation: "horizontal" }
});
function ButtonGroup({ className, orientation, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"data-slot": "button-group",
		"data-orientation": orientation,
		className: cn(buttonGroupVariants({ orientation }), className),
		...props
	});
}
function ButtonGroupText({ className, render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn("flex items-center gap-2 rounded-lg border px-2.5", "text-sm font-medium", "border-slate-300 bg-slate-200 text-gray-700", "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none", className) }, props),
		render,
		state: { slot: "button-group-text" }
	});
}
function ButtonGroupSeparator({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ jsx(Separator, {
		"data-slot": "button-group-separator",
		orientation,
		className: cn("relative self-stretch", "bg-white", "data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto", "data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto", className),
		...props
	});
}
//#endregion
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };

//# sourceMappingURL=ButtonGroup.js.map