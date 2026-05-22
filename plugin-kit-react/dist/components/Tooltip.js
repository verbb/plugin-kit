import { cn } from "../utils/classes.js";
import { getPortalContainer } from "../utils/portal.js";
import "../utils/index.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Tooltip as Tooltip$1 } from "@base-ui/react/tooltip";
//#region src/components/Tooltip.tsx
function TooltipProvider({ delay = 0, ...props }) {
	return /* @__PURE__ */ jsx(Tooltip$1.Provider, {
		"data-slot": "tooltip-provider",
		delay,
		...props
	});
}
function Tooltip({ ...props }) {
	return /* @__PURE__ */ jsx(Tooltip$1.Provider, {
		delay: 0,
		children: /* @__PURE__ */ jsx(Tooltip$1.Root, {
			"data-slot": "tooltip",
			...props
		})
	});
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Tooltip$1.Trigger, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, side = "top", sideOffset = 4, align = "center", alignOffset = 0, portalContainer, children, ...props }) {
	const resolvedPortalContainer = getPortalContainer(portalContainer);
	return /* @__PURE__ */ jsx(Tooltip$1.Portal, {
		container: resolvedPortalContainer,
		children: /* @__PURE__ */ jsx(Tooltip$1.Positioner, {
			align,
			alignOffset,
			side,
			sideOffset,
			className: "isolate z-250",
			children: /* @__PURE__ */ jsxs(Tooltip$1.Popup, {
				"data-slot": "tooltip-content",
				className: cn("rounded-sm px-[8px] py-[4px] w-fit max-w-xs", "bg-[#1c2e36] text-white text-[12px]", "z-50 origin-(--transform-origin)", "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95", "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95", "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", "data-[side=top]:slide-in-from-bottom-2", "data-[side=bottom]:slide-in-from-top-2", "data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2", "data-[side=inline-start]:slide-in-from-right-2", "data-[side=inline-end]:slide-in-from-left-2", className),
				...props,
				children: [children, /* @__PURE__ */ jsx(Tooltip$1.Arrow, { className: cn("size-2.5 rotate-45 rounded-[2px]", "translate-y-[calc(-50%-2px)]", "bg-[#1c2e36] fill-[#1c2e36]", "z-50", "data-[side=top]:-bottom-2.5", "data-[side=bottom]:top-1", "data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2", "data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2", "data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2", "data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2") })]
			})
		})
	});
}
//#endregion
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

//# sourceMappingURL=Tooltip.js.map