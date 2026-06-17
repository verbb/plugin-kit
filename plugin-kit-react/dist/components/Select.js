import { cn } from "../utils/classes.js";
import { getPortalClassName, getPortalContainer } from "../utils/portal.js";
import "../utils/index.js";
import { createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import { Select as Select$1 } from "@base-ui/react/select";
//#region src/components/Select.tsx
var selectTriggerVariants = cva("", {
	variants: { size: {
		xs: "px-2 py-1 text-[11px] rounded-sm [&_svg:not([class*=\"size-\"])]:size-3",
		sm: "px-2.5 py-1.5 text-[12px] rounded-md [&_svg:not([class*=\"size-\"])]:size-3",
		default: "px-[10px] py-[6px] text-[14px] rounded-lg [&_svg:not([class*=\"size-\"])]:size-3",
		lg: "px-3 py-2 text-sm rounded-lg [&_svg:not([class*=\"size-\"])]:size-3",
		xl: "px-3.5 py-2.5 text-sm rounded-lg [&_svg:not([class*=\"size-\"])]:size-3"
	} },
	defaultVariants: { size: "default" }
});
var selectTriggerIconVariants = cva("", {
	variants: { size: {
		xs: "size-[10px]",
		sm: "size-[11px]",
		default: "size-3",
		lg: "size-3",
		xl: "size-3.5"
	} },
	defaultVariants: { size: "default" }
});
var selectItemIndicatorVariants = cva("", {
	variants: { size: {
		xs: "right-2 size-3",
		sm: "right-2.5 size-3",
		default: "right-2 size-3",
		lg: "right-3 size-3",
		xl: "right-3.5 size-3"
	} },
	defaultVariants: { size: "default" }
});
var selectItemIndicatorIconVariants = cva("", {
	variants: { size: {
		xs: "size-3",
		sm: "size-3",
		default: "size-3",
		lg: "size-3",
		xl: "size-3"
	} },
	defaultVariants: { size: "default" }
});
var selectLabelVariants = cva(["text-slate-700"], {
	variants: { size: {
		xs: "px-2 pt-1 text-[11px]",
		sm: "px-2.5 pt-1 text-[12px]",
		default: "px-2.5 pt-1 text-xs",
		lg: "px-3 pt-1 text-sm",
		xl: "px-3.5 pt-1 text-base"
	} },
	defaultVariants: { size: "default" }
});
var selectItemVariants = cva("", {
	variants: {
		size: {
			xs: "px-2 py-1 pr-7 text-[11px] [&_svg:not([class*=\"size-\"])]:size-3",
			sm: "px-2.5 py-1.5 pr-7 text-[12px] [&_svg:not([class*=\"size-\"])]:size-3",
			default: "px-[10px] py-[6px] pr-8 text-[14px] [&_svg:not([class*=\"size-\"])]:size-3",
			lg: "px-3 py-2 pr-8 text-sm [&_svg:not([class*=\"size-\"])]:size-3",
			xl: "px-3.5 py-2.5 pr-9 text-sm [&_svg:not([class*=\"size-\"])]:size-3"
		},
		variant: {
			default: "",
			destructive: "text-error"
		}
	},
	defaultVariants: {
		size: "default",
		variant: "default"
	}
});
var SelectContext = createContext({ size: "default" });
function Select({ size = "default", children, ...props }) {
	return /* @__PURE__ */ jsx(SelectContext.Provider, {
		value: { size },
		children: /* @__PURE__ */ jsx(Select$1.Root, {
			"data-slot": "select",
			"data-size": size,
			...props,
			children
		})
	});
}
function SelectGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select$1.Group, {
		"data-slot": "select-group",
		className: cn(className),
		...props
	});
}
function SelectValue({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select$1.Value, {
		"data-slot": "select-value",
		className: cn("min-w-0 flex-1 basis-0 overflow-hidden text-left truncate", className),
		...props
	});
}
function SelectTrigger({ className, size, children, ...props }) {
	const context = useContext(SelectContext);
	const finalSize = size || context.size || "default";
	return /* @__PURE__ */ jsxs(Select$1.Trigger, {
		"data-slot": "select-trigger",
		"data-size": finalSize,
		className: cn("flex w-fit items-center justify-between whitespace-nowrap outline-none select-none transition-none", "gap-3", "bg-slate-250", "border border-transparent", "hover:not-disabled:bg-slate-300", "*:data-[slot=select-value]:flex", "*:data-[slot=select-value]:items-center", "*:data-[slot=select-value]:gap-1.5", "*:data-[slot=select-value]:line-clamp-1", "focus-visible:border-sky-600 focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]", "aria-invalid:border-rose-600! aria-invalid:focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]!", "disabled:cursor-not-allowed disabled:opacity-50", "[&_svg]:pointer-events-none [&_svg]:shrink-0", selectTriggerVariants({ size: finalSize }), className),
		...props,
		children: [children, /* @__PURE__ */ jsx(Select$1.Icon, { render: /* @__PURE__ */ jsx(FontAwesomeIcon, {
			icon: faChevronDown,
			className: cn("pointer-events-none", selectTriggerIconVariants({ size: finalSize }))
		}) })]
	});
}
function SelectContent({ className, children, side = "bottom", sideOffset = 4, align = "center", alignOffset = 0, alignItemWithTrigger = true, positionMethod, ...props }) {
	const resolvedPortalClassName = getPortalClassName();
	const resolvedPortalContainer = getPortalContainer();
	const resolvedPositionMethod = positionMethod ?? (resolvedPortalContainer instanceof ShadowRoot ? "fixed" : void 0);
	return /* @__PURE__ */ jsx(Select$1.Portal, {
		className: resolvedPortalClassName,
		container: resolvedPortalContainer,
		children: /* @__PURE__ */ jsx(Select$1.Positioner, {
			side,
			sideOffset,
			align,
			alignOffset,
			alignItemWithTrigger,
			positionMethod: resolvedPositionMethod,
			className: "isolate z-50",
			children: /* @__PURE__ */ jsxs(Select$1.Popup, {
				"data-slot": "select-content",
				"data-align-trigger": alignItemWithTrigger,
				className: cn("relative isolate z-50 overflow-x-hidden overflow-y-auto", "min-w-(--anchor-width)", "max-w-[min(36rem,calc(100vw-2rem))]", "rounded-md bg-white", "shadow-[0_0_0_1px_rgba(31,41,51,0.1),0_5px_20px_rgba(31,41,51,0.25)]", "duration-100", "data-open:animate-in data-closed:animate-out", "data-open:fade-in-0 data-closed:fade-out-0", "data-open:zoom-in-95 data-closed:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2", "data-[side=top]:slide-in-from-bottom-2", "data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2", "data-[side=inline-start]:slide-in-from-right-2", "data-[side=inline-end]:slide-in-from-left-2", "data-[align-trigger=true]:animate-none", "origin-(--transform-origin)", className),
				...props,
				children: [
					/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
					/* @__PURE__ */ jsx(Select$1.List, { children }),
					/* @__PURE__ */ jsx(SelectScrollDownButton, {})
				]
			})
		})
	});
}
function SelectLabel({ className, ...props }) {
	const { size } = useContext(SelectContext);
	return /* @__PURE__ */ jsx(Select$1.GroupLabel, {
		"data-slot": "select-label",
		className: cn("text-slate-700", selectLabelVariants({ size }), className),
		...props
	});
}
function SelectItem({ className, children, ...props }) {
	const { size } = useContext(SelectContext);
	return /* @__PURE__ */ jsxs(Select$1.Item, {
		"data-slot": "select-item",
		className: cn("relative flex w-full cursor-default items-center outline-hidden select-none", "gap-1.5", "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", "focus:bg-slate-100 data-[highlighted]:bg-slate-100", "data-disabled:pointer-events-none data-disabled:opacity-50", "[&_svg]:pointer-events-none [&_svg]:shrink-0", selectItemVariants({ size }), className),
		...props,
		children: [/* @__PURE__ */ jsx(Select$1.ItemText, {
			className: "flex min-w-0 items-center flex-1 gap-2 whitespace-nowrap",
			children
		}), /* @__PURE__ */ jsx(Select$1.ItemIndicator, { render: /* @__PURE__ */ jsx("span", {
			className: cn("pointer-events-none absolute flex items-center justify-center", selectItemIndicatorVariants({ size })),
			children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
				icon: faCheck,
				className: cn("pointer-events-none", selectItemIndicatorIconVariants({ size }))
			})
		}) })]
	});
}
function SelectSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select$1.Separator, {
		"data-slot": "select-separator",
		className: cn("pointer-events-none", "-mx-1 my-1 h-px", "bg-slate-200", className),
		...props
	});
}
function SelectScrollUpButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select$1.ScrollUpArrow, {
		"data-slot": "select-scroll-up-button",
		className: cn("top-0 w-full flex items-center justify-center", "cursor-default", "bg-white py-1", "[&_svg:not([class*='size-'])]:size-3", className),
		...props,
		children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
			icon: faChevronUp,
			className: "size-3 pointer-events-none"
		})
	});
}
function SelectScrollDownButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(Select$1.ScrollDownArrow, {
		"data-slot": "select-scroll-down-button",
		className: cn("bottom-0 w-full flex items-center justify-center", "cursor-default", "bg-white py-1", "[&_svg:not([class*='size-'])]:size-3", className),
		...props,
		children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
			icon: faChevronDown,
			className: "size-3 pointer-events-none"
		})
	});
}
//#endregion
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue };

//# sourceMappingURL=Select.js.map