import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { useTranslation } from "../hooks/useTranslation.js";
import "../hooks/index.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./DropdownMenu.js";
import { Button } from "./Button.js";
import { cva } from "class-variance-authority";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
//#region src/components/MenuButton.tsx
var menuMainButtonVariants = cva("!rounded-r-none", {
	variants: { split: {
		split: null,
		none: "!border-r-0"
	} },
	defaultVariants: { split: "none" }
});
var menuTriggerVariants = cva("!rounded-l-none !border-l-0", {
	variants: {
		size: {
			xs: "px-1.5 py-[3px]",
			sm: "px-1.5 py-[5px]",
			default: "px-1.5 py-[7px]",
			lg: "px-2 py-[9px]",
			xl: "px-2.5 py-[10px]"
		},
		split: {
			split: "-ml-px",
			none: "ml-[1px]"
		}
	},
	defaultVariants: {
		size: "default",
		split: "none"
	}
});
var menuTriggerIconVariants = cva("", {
	variants: { size: {
		xs: "size-2.5",
		sm: "size-3",
		default: "size-3",
		lg: "size-3.5",
		xl: "size-4"
	} },
	defaultVariants: { size: "default" }
});
var MenuButton = ({ mainAction, menuItems = [], variant = "default", size = "default", loading = false, disabled = false, className = "", defaultOpen = false, modal = true, ...props }) => {
	const t = useTranslation();
	const splitBorderVariant = variant === "outline" || variant === "dashed" ? "split" : "none";
	const triggerClass = menuTriggerVariants({
		size,
		split: splitBorderVariant
	});
	const mainButtonClass = menuMainButtonVariants({ split: splitBorderVariant });
	const handleMainAction = () => {
		mainAction?.onClick?.();
	};
	const renderMenuItems = () => {
		return menuItems.map((item, index) => {
			if ("type" in item && item.type === "separator") return /* @__PURE__ */ jsx(DropdownMenuSeparator, {}, `separator-${index}`);
			const actionItem = item;
			return /* @__PURE__ */ jsxs(DropdownMenuItem, {
				onClick: () => {
					actionItem.onClick?.();
				},
				variant: actionItem.variant,
				children: [actionItem.icon && /* @__PURE__ */ jsx("span", {
					className: cn("mr-2"),
					children: actionItem.icon
				}), actionItem.label]
			}, index);
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("inline-flex", className),
		...props,
		children: [/* @__PURE__ */ jsx(Button, {
			variant,
			size,
			loading,
			disabled,
			onClick: handleMainAction,
			className: mainButtonClass,
			children: /* @__PURE__ */ jsxs("span", {
				className: cn("inline-flex items-center", mainAction?.icon && mainAction?.label && mainAction?.iconPosition !== "overlay" ? "gap-2" : "", mainAction?.iconPosition === "overlay" ? "relative" : ""),
				children: [mainAction?.icon ? /* @__PURE__ */ jsx("span", {
					className: cn(mainAction?.iconPosition === "overlay" ? "absolute inset-0 flex items-center justify-center pointer-events-none" : "", mainAction?.iconClassName || ""),
					children: mainAction.icon
				}) : null, mainAction?.label ? /* @__PURE__ */ jsx("span", {
					className: mainAction?.labelClassName || "",
					children: mainAction.label
				}) : null]
			})
		}), /* @__PURE__ */ jsxs(DropdownMenu, {
			size,
			defaultOpen,
			modal,
			children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
				disabled,
				render: /* @__PURE__ */ jsx(Button, {
					variant,
					size: "none",
					disabled,
					className: triggerClass,
					"aria-label": t("Open menu")
				}),
				children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
					icon: faChevronDown,
					className: cn(menuTriggerIconVariants({ size }), "transition-transform data-[popup-open]:rotate-180")
				})
			}), /* @__PURE__ */ jsx(DropdownMenuContent, {
				align: "end",
				children: renderMenuItems()
			})]
		})]
	});
};
//#endregion
export { MenuButton };

//# sourceMappingURL=MenuButton.js.map