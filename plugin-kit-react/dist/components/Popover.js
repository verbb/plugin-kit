import { cn } from "../utils/classes.js";
import { getPortalClassName, getPortalContainer } from "../utils/portal.js";
import "../utils/index.js";
import { jsx } from "react/jsx-runtime";
import { Popover as Popover$1 } from "@base-ui/react/popover";
//#region src/components/Popover.tsx
function Popover({ ariaLabel = "Popover", ...props }) {
	return /* @__PURE__ */ jsx(Popover$1.Root, {
		"data-slot": "popover",
		ariaLabel,
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(Popover$1.Trigger, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, positionMethod, collisionBoundary, collisionPadding, sticky, collisionAvoidance, portalClassName, portalContainer, ...props }) {
	const resolvedPortalClassName = getPortalClassName(portalClassName);
	const resolvedPortalContainer = getPortalContainer(portalContainer);
	const resolvedPositionMethod = positionMethod ?? (resolvedPortalContainer instanceof ShadowRoot ? "fixed" : void 0);
	return /* @__PURE__ */ jsx(Popover$1.Portal, {
		"data-slot": "popover-portal",
		className: resolvedPortalClassName,
		container: resolvedPortalContainer,
		children: /* @__PURE__ */ jsx(Popover$1.Positioner, {
			align,
			alignOffset,
			side,
			sideOffset,
			positionMethod: resolvedPositionMethod,
			collisionBoundary,
			collisionPadding,
			sticky,
			collisionAvoidance,
			className: "isolate z-50",
			children: /* @__PURE__ */ jsx(Popover$1.Popup, {
				"data-slot": "popover-content",
				className: cn("z-50 w-72 rounded-md outline-hidden will-change-[transform,opacity]", "bg-white p-4", "shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]", "focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2", "data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2", "data-[side=top]:slide-in-from-bottom-2", className),
				...props
			})
		})
	});
}
function PopoverHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "popover-header",
		className: cn("flex flex-col gap-0.5 text-sm", className),
		...props
	});
}
function PopoverTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(Popover$1.Title, {
		"data-slot": "popover-title",
		className: cn("font-medium text-sm", className),
		...props
	});
}
function PopoverDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Popover$1.Description, {
		"data-slot": "popover-description",
		className: cn("text-gray-500", className),
		...props
	});
}
//#endregion
export { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger };

//# sourceMappingURL=Popover.js.map