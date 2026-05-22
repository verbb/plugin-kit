import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { cva } from "class-variance-authority";
import { jsx, jsxs } from "react/jsx-runtime";
import { ScrollArea as ScrollArea$1 } from "@base-ui/react/scroll-area";
//#region src/components/ScrollArea.tsx
var scrollAreaVariants = cva("", {
	variants: { size: {
		xs: "data-[orientation=horizontal]:h-[6px] data-[orientation=vertical]:w-[6px] ",
		sm: "data-[orientation=horizontal]:h-[8px] data-[orientation=vertical]:w-[8px] ",
		default: "data-[orientation=horizontal]:h-[10px] data-[orientation=vertical]:w-[10px] "
	} },
	defaultVariants: { size: "default" }
});
function ScrollArea({ className, children, size = "default", orientation = "vertical", viewPortClassName, viewPortRef, contentClassName, ...props }) {
	return /* @__PURE__ */ jsxs(ScrollArea$1.Root, {
		"data-slot": "scroll-area",
		className,
		...props,
		children: [
			/* @__PURE__ */ jsx(ScrollArea$1.Viewport, {
				"data-slot": "scroll-area-viewport",
				ref: viewPortRef,
				className: cn("focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1", viewPortClassName),
				children: /* @__PURE__ */ jsx(ScrollArea$1.Content, {
					"data-slot": "scroll-area-content",
					className: contentClassName,
					children
				})
			}),
			/* @__PURE__ */ jsx(ScrollArea$1.Scrollbar, {
				"data-slot": "scroll-area-scrollbar",
				orientation,
				className: cn("data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-[#e8e8e8]", "data-[orientation=vertical]:h-full data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent", "flex touch-none transition-colors select-none", "opacity-0 transition-opacity data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0 data-[scrolling]:pointer-events-auto", "rounded-full bg-[#e4edf6]", scrollAreaVariants({ size })),
				children: /* @__PURE__ */ jsx(ScrollArea$1.Thumb, {
					"data-slot": "scroll-area-thumb",
					className: "rounded-full bg-[#9aa5b1] hover:bg-[#657383] relative flex-1"
				})
			}),
			/* @__PURE__ */ jsx(ScrollArea$1.Corner, {})
		]
	});
}
//#endregion
export { ScrollArea };

//# sourceMappingURL=ScrollArea.js.map