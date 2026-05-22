import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { Spinner } from "./Spinner.js";
import "./index.js";
import { Slot } from "./Slot.js";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/Button.tsx
var buttonVariants = cva("", {
	variants: {
		variant: {
			default: [
				"bg-slate-250 text-gray-700",
				"hover:not-disabled:bg-slate-300",
				"active:not-disabled:bg-slate-400",
				"focus-visible:shadow-[0_0_0_2px_var(--color-sky-600),0_0_5px_1px_hsl(from_var(--color-sky-600)_h_s_l/0.7)]",
				"data-[popup-open]:bg-slate-300"
			],
			primary: [
				"antialiased",
				"bg-red-600 text-white border-primary-500",
				"hover:not-disabled:bg-red-700",
				"active:not-disabled:bg-red-800",
				"focus-visible:shadow-[0_0_0_1px_#ffffff,0_0_0_3px_var(--color-sky-600),0_0_5px_1px_hsl(from_var(--color-sky-600)_h_s_l/0.7)]",
				"data-[popup-open]:bg-red-700"
			],
			secondary: [
				"antialiased",
				"bg-gray-500 text-white",
				"hover:not-disabled:bg-gray-550",
				"active:not-disabled:bg-gray-600",
				"focus-visible:shadow-[0_0_0_1px_#ffffff,0_0_0_3px_var(--color-sky-600),0_0_5px_1px_hsl(from_var(--color-sky-600)_h_s_l/0.7)]",
				"data-[popup-open]:bg-gray-550"
			],
			dashed: [
				"bg-transparent border-dashed border border-slate-500",
				"hover:not-disabled:bg-slate-150",
				"active:not-disabled:bg-slate-250",
				"focus-visible:border-solid focus-visible:border-sky-600 focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_1px_hsl(from_var(--color-sky-600)_h_s_l/0.7)]",
				"data-[popup-open]:bg-slate-250"
			],
			outline: [
				"bg-transparent border border-slate-400",
				"hover:not-disabled:bg-slate-150",
				"active:not-disabled:bg-slate-250",
				"focus-visible:border-solid focus-visible:border-sky-600 focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_1px_hsl(from_var(--color-sky-600)_h_s_l/0.7)]",
				"data-[popup-open]:bg-slate-250"
			],
			transparent: [
				"hover:not-disabled:bg-slate-150",
				"active:not-disabled:bg-slate-250",
				"focus-visible:shadow-[0_0_0_2px_var(--color-sky-600),0_0_5px_1px_hsl(from_var(--color-sky-600)_h_s_l/0.7)]",
				"data-[popup-open]:bg-slate-250"
			],
			ghost: [
				"hover:not-disabled:bg-slate-150",
				"active:not-disabled:bg-slate-250",
				"focus-visible:shadow-[0_0_0_2px_var(--color-sky-600),0_0_5px_1px_hsl(from_var(--color-sky-600)_h_s_l/0.7)]"
			],
			link: [
				"rounded-none px-0 py-0 text-sky-700 underline-offset-2",
				"hover:not-disabled:underline",
				"focus-visible:shadow-none focus-visible:underline"
			],
			none: []
		},
		size: {
			default: "px-[10px] py-[7px]",
			none: "p-0",
			xxs: "px-[5px] py-[1px] text-[11px] rounded-sm",
			xs: "px-[8px] py-[3px] text-[12px] rounded-sm",
			sm: "px-[9px] py-[5px] text-[13px] rounded-md",
			icon: "size-8 p-0 justify-center",
			lg: "px-[12px] py-[9px]",
			xl: "px-[16px] py-[10px] text-base"
		},
		loading: { true: "cursor-default" }
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		loading: false
	}
});
var Button = forwardRef(({ className, variant, size, spinnerSize = null, spinnerVariant, spinnerClassName = "", loading = false, children, asChild = false, render, href, type, ...props }, ref) => {
	if (spinnerSize === null) if (size === "xxs" || size === "xs") spinnerSize = "xxs";
	else if (size === "lg" || size === "xl") spinnerSize = "sm";
	else spinnerSize = "xs";
	const resolvedVariant = variant === "ghost" ? "transparent" : variant;
	const resolvedSpinnerVariant = spinnerVariant || (resolvedVariant === "primary" || resolvedVariant === "secondary" || resolvedVariant === "dashed" || resolvedVariant === "outline" || resolvedVariant === "transparent" ? resolvedVariant : "default");
	const sharedProps = {
		"data-slot": "button",
		"data-size": size || "default",
		className: cn("no-underline hover:no-underline", "inline-flex cursor-pointer outline-none gap-1 items-center justify-center whitespace-nowrap transition-colors", "rounded-lg", "disabled:opacity-50 disabled:cursor-[not-allowed]! disabled:select-none", loading && ["relative pointer-events-none text-transparent!", "select-none!"], "[&[data-size='xxs']_svg:not([class*='size-'])]:size-3", "[&[data-size='xs']_svg:not([class*='size-'])]:size-3.5", "[&[data-size='sm']_svg:not([class*='size-'])]:size-3.5", "[&:not([data-size='xxs']):not([data-size='xs']):not([data-size='sm'])_svg:not([class*='size-'])]:size-4", "[&_svg]:pointer-events-none [&_svg]:shrink-0", buttonVariants({
			variant: resolvedVariant,
			size,
			loading,
			className
		}))
	};
	const content = /* @__PURE__ */ jsxs(Fragment$1, { children: [loading && /* @__PURE__ */ jsx(Spinner, {
		variant: resolvedSpinnerVariant,
		size: spinnerSize,
		className: cn("absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", spinnerClassName)
	}), children] });
	if (render) return /* @__PURE__ */ jsx(Slot, {
		...sharedProps,
		children: render
	});
	if (asChild) return /* @__PURE__ */ jsx(Slot, {
		...sharedProps,
		children
	});
	if (href) {
		const anchorProps = {
			target: props.target,
			rel: props.rel,
			download: props.download,
			onClick: props.onClick,
			onFocus: props.onFocus,
			onBlur: props.onBlur,
			onMouseEnter: props.onMouseEnter,
			onMouseLeave: props.onMouseLeave,
			onKeyDown: props.onKeyDown,
			onKeyUp: props.onKeyUp,
			onCopy: props.onCopy
		};
		return /* @__PURE__ */ jsx("a", {
			ref,
			href,
			...sharedProps,
			...anchorProps,
			children: content
		});
	}
	return /* @__PURE__ */ jsx("button", {
		ref,
		type: type || "button",
		...sharedProps,
		...props,
		children: content
	});
});
//#endregion
export { Button, buttonVariants };

//# sourceMappingURL=Button.js.map