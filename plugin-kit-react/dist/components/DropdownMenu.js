import { cn } from "../utils/classes.js";
import { getPortalClassName, getPortalContainer } from "../utils/portal.js";
import "../utils/index.js";
import { createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { Menu } from "@base-ui/react/menu";
//#region src/components/DropdownMenu.tsx
var dropdownMenuItemVariants = cva([
	"relative flex w-full cursor-default items-center outline-hidden select-none",
	"focus:bg-slate-100 data-[highlighted]:bg-slate-100",
	"data-disabled:pointer-events-none data-disabled:opacity-50",
	"[&_svg:not([class*=\"size-\"])]:[width:var(--icon-size)]",
	"[&_svg:not([class*=\"size-\"])]:[height:var(--icon-size)]",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0"
], {
	variants: {
		size: {
			xs: "py-[3px] px-[8px] gap-1.5 text-[12px] [--icon-size:10px]",
			sm: "py-[4px] px-[10px] gap-1.75 text-[13px] [--icon-size:11px]",
			default: "py-[8px] px-[12px] gap-2.5 text-sm [--icon-size:12px]",
			lg: "py-[10px] px-[14px] gap-3 text-base [--icon-size:12px]",
			xl: "py-[12px] px-[16px] gap-3 text-lg [--icon-size:12px]"
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
var dropdownMenuLabelVariants = cva(["text-slate-700"], {
	variants: { size: {
		xs: "py-[0px] px-[8px] text-[11px]",
		sm: "py-[0px] px-[10px] text-[11px]",
		default: "py-[0px] px-[12px] text-[13px]",
		lg: "py-[0px] px-[14px] text-[14px]",
		xl: "py-[0px] px-[16px] text-[15px]"
	} },
	defaultVariants: { size: "default" }
});
var dropdownMenuShortcutVariants = cva("", {
	variants: { size: {
		xs: "text-[11px]",
		sm: "text-xs",
		default: "text-sm",
		lg: "text-sm",
		xl: "text-base"
	} },
	defaultVariants: { size: "default" }
});
var DropdownMenuContext = createContext({});
function DropdownMenu({ size, children, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuContext.Provider, {
		value: { size },
		children: /* @__PURE__ */ jsx(Menu.Root, {
			"data-slot": "dropdown-menu",
			...props,
			children
		})
	});
}
function DropdownMenuPortal({ container, ...props }) {
	const resolvedPortalContainer = getPortalContainer(container);
	return /* @__PURE__ */ jsx(Menu.Portal, {
		"data-slot": "dropdown-menu-portal",
		container: resolvedPortalContainer,
		...props
	});
}
function DropdownMenuTrigger({ size, ...props }) {
	const context = useContext(DropdownMenuContext);
	const finalSize = size || context.size || "default";
	return /* @__PURE__ */ jsx(Menu.Trigger, {
		"data-slot": "dropdown-menu-trigger",
		"data-size": finalSize,
		...props
	});
}
function DropdownMenuContent({ align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, portalClassName, portalContainer, ...props }) {
	const resolvedPortalClassName = getPortalClassName(portalClassName);
	const resolvedPortalContainer = getPortalContainer(portalContainer);
	return /* @__PURE__ */ jsx(Menu.Portal, {
		className: resolvedPortalClassName,
		container: resolvedPortalContainer,
		children: /* @__PURE__ */ jsx(Menu.Positioner, {
			align,
			alignOffset,
			side,
			sideOffset,
			className: "z-[250]",
			children: /* @__PURE__ */ jsx(Menu.Popup, {
				"data-slot": "dropdown-menu-content",
				className: cn("relative isolate z-[250] overflow-x-hidden overflow-y-auto", "min-w-(--anchor-width)", "py-1", "rounded-md bg-white", "shadow-[0_0_0_1px_rgba(31,41,51,0.1),0_5px_20px_rgba(31,41,51,0.25)]", "duration-100", "data-open:animate-in data-closed:animate-out", "data-open:fade-in-0 data-closed:fade-out-0", "data-open:zoom-in-95 data-closed:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2", "data-[side=top]:slide-in-from-bottom-2", "data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2", "data-[side=inline-start]:slide-in-from-right-2", "data-[side=inline-end]:slide-in-from-left-2", "data-[align-trigger=true]:animate-none", "origin-(--transform-origin)", className),
				...props
			})
		})
	});
}
function DropdownMenuGroup({ ...props }) {
	return /* @__PURE__ */ jsx(Menu.Group, {
		"data-slot": "dropdown-menu-group",
		...props
	});
}
function DropdownMenuLabel({ className, inset, size, ...props }) {
	const context = useContext(DropdownMenuContext);
	const finalSize = size || context.size || "default";
	return /* @__PURE__ */ jsx(Menu.GroupLabel, {
		"data-slot": "dropdown-menu-label",
		"data-inset": inset,
		"data-size": finalSize,
		className: cn(dropdownMenuLabelVariants({
			size: finalSize,
			className
		})),
		...props
	});
}
function DropdownMenuItem({ className, inset, size, variant = "default", ...props }) {
	const context = useContext(DropdownMenuContext);
	const finalSize = size || context.size || "default";
	return /* @__PURE__ */ jsx(Menu.Item, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		"data-size": finalSize,
		className: cn(dropdownMenuItemVariants({
			size: finalSize,
			variant,
			className
		}), inset && "pl-8"),
		...props
	});
}
function DropdownMenuSub({ ...props }) {
	return /* @__PURE__ */ jsx(Menu.SubmenuRoot, {
		"data-slot": "dropdown-menu-sub",
		...props
	});
}
function DropdownMenuSubTrigger({ className, inset, children, size, ...props }) {
	const context = useContext(DropdownMenuContext);
	const finalSize = size || context.size || "default";
	return /* @__PURE__ */ jsxs(Menu.SubmenuTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": inset,
		"data-size": finalSize,
		className: cn(dropdownMenuItemVariants({ size: finalSize }), "data-[popup-open]:bg-slate-100", "[&_svg]:pointer-events-none [&_svg]:shrink-0", inset && "pl-8", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(FontAwesomeIcon, {
			icon: faChevronRight,
			className: "ml-auto size-3 text-slate-700"
		})]
	});
}
function DropdownMenuSubContent({ align = "start", alignOffset = -3, side = "right", sideOffset = 0, className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuContent, {
		"data-slot": "dropdown-menu-sub-content",
		className: cn("min-w-32 w-auto", className),
		align,
		alignOffset,
		side,
		sideOffset,
		...props
	});
}
function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }) {
	const finalSize = useContext(DropdownMenuContext)?.size || "default";
	return /* @__PURE__ */ jsxs(Menu.CheckboxItem, {
		"data-slot": "dropdown-menu-checkbox-item",
		"data-inset": inset,
		className: cn(dropdownMenuItemVariants({
			size: finalSize,
			className
		})),
		checked,
		...props,
		children: [children, /* @__PURE__ */ jsx("span", {
			"data-slot": "dropdown-menu-checkbox-item-indicator",
			className: cn("ml-auto pl-4"),
			children: /* @__PURE__ */ jsx(Menu.CheckboxItemIndicator, { children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
				icon: faCheck,
				className: cn("size-3")
			}) })
		})]
	});
}
function DropdownMenuRadioGroup({ ...props }) {
	return /* @__PURE__ */ jsx(Menu.RadioGroup, {
		"data-slot": "dropdown-menu-radio-group",
		...props
	});
}
function DropdownMenuRadioItem({ className, children, inset, ...props }) {
	const finalSize = useContext(DropdownMenuContext)?.size || "default";
	return /* @__PURE__ */ jsxs(Menu.RadioItem, {
		"data-slot": "dropdown-menu-radio-item",
		"data-inset": inset,
		className: cn(dropdownMenuItemVariants({
			size: finalSize,
			className
		})),
		...props,
		children: [children, /* @__PURE__ */ jsx("span", {
			"data-slot": "dropdown-menu-radio-item-indicator",
			className: cn("ml-auto pl-4"),
			children: /* @__PURE__ */ jsx(Menu.RadioItemIndicator, { children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
				icon: faCheck,
				className: cn("size-3")
			}) })
		})]
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Menu.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: cn("my-1 h-px bg-slate-200", className),
		...props
	});
}
function DropdownMenuShortcut({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: cn("text-slate-700 group-focus/dropdown-menu-item:text-slate-700 ml-auto tracking-widest", dropdownMenuShortcutVariants({
			size: useContext(DropdownMenuContext)?.size || "default",
			className
		}), className),
		...props
	});
}
//#endregion
export { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger };

//# sourceMappingURL=DropdownMenu.js.map