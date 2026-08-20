import { Icon } from "../components/Icon.js";
import { Button } from "../components/Button.js";
import { cn } from "./cn.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/utils/StatePanel.tsx
var ICON_SHELL_STYLE = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "2.5rem",
	height: "2.5rem",
	marginBottom: "0.75rem",
	borderRadius: "10px"
};
var ICON_GLYPH_STYLE = {
	width: "1.25rem",
	height: "1.25rem",
	fontSize: "1.25rem"
};
var VARIANT_CONFIG = {
	empty: {
		icon: "empty-set",
		iconColor: "var(--pk-color-slate-500)",
		iconContainerBackground: "color-mix(in srgb, var(--pk-color-slate-200) 55%, transparent)",
		titleClassName: "text-base font-medium text-gray-900",
		messageClassName: "text-sm text-gray-500"
	},
	error: {
		icon: "triangle-exclamation",
		iconColor: "var(--pk-color-rose-600)",
		iconContainerBackground: "color-mix(in srgb, var(--pk-color-rose-500) 12%, transparent)",
		titleClassName: "text-base font-medium text-gray-900",
		messageClassName: "text-sm text-gray-500"
	},
	success: {
		icon: "circle-check",
		iconColor: "var(--pk-color-emerald-600)",
		iconContainerBackground: "var(--pk-color-slate-100)",
		titleClassName: "text-base font-medium text-gray-900",
		messageClassName: "text-sm text-gray-500"
	},
	info: {
		icon: "circle-info",
		iconColor: "var(--pk-color-sky-600)",
		iconContainerBackground: "var(--pk-color-slate-100)",
		titleClassName: "text-base font-medium text-gray-900",
		messageClassName: "text-sm text-gray-500"
	}
};
/**
* Centered empty / error / success / info surface for full React CP apps.
* Hosts must register any icons they render (error uses `triangle-exclamation`).
*/
function StatePanel({ variant = "empty", icon = null, title = null, message = null, primaryAction = null, secondaryAction = null, children = null, containerClassName = "flex flex-1 items-center justify-center py-12", contentClassName = "flex w-[90%] max-w-[560px] flex-col items-center text-center", titleClassName = "", messageClassName = "", showIcon = true }) {
	const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.empty;
	const resolvedIcon = icon || config.icon;
	return /* @__PURE__ */ jsx("div", {
		className: containerClassName,
		children: /* @__PURE__ */ jsxs("div", {
			className: contentClassName,
			children: [
				showIcon && resolvedIcon ? /* @__PURE__ */ jsx("div", {
					style: {
						...ICON_SHELL_STYLE,
						backgroundColor: config.iconContainerBackground
					},
					children: /* @__PURE__ */ jsx(Icon, {
						icon: resolvedIcon,
						style: {
							...ICON_GLYPH_STYLE,
							color: config.iconColor
						}
					})
				}) : null,
				title ? /* @__PURE__ */ jsx("h2", {
					className: cn("mb-2", config.titleClassName, titleClassName),
					children: title
				}) : null,
				message ? /* @__PURE__ */ jsx("p", {
					className: cn("mb-4 max-w-[560px]", config.messageClassName, messageClassName),
					children: message
				}) : null,
				children,
				primaryAction || secondaryAction ? /* @__PURE__ */ jsxs("div", {
					className: "mt-2 flex items-center justify-center gap-2",
					children: [secondaryAction?.label && secondaryAction?.onClick ? /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: secondaryAction.variant || "secondary",
						onClick: secondaryAction.onClick,
						children: secondaryAction.label
					}) : null, primaryAction?.label && primaryAction?.onClick ? /* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: primaryAction.variant || "primary",
						onClick: primaryAction.onClick,
						children: primaryAction.label
					}) : null]
				}) : null
			]
		})
	});
}
//#endregion
export { StatePanel };

//# sourceMappingURL=StatePanel.js.map