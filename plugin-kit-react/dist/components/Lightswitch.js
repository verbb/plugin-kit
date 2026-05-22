import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
import { Switch } from "@base-ui/react/switch";
//#region src/components/Lightswitch.tsx
var lightswitchVariants = cva("", {
	variants: { size: {
		xs: "h-[16px] w-[24px] rounded-[8px]",
		sm: "h-[18px] w-[28px] rounded-[9px]",
		default: "h-[22px] w-[34px] rounded-[11px]"
	} },
	defaultVariants: { size: "default" }
});
var lightswitchThumbVariants = cva("", {
	variants: { size: {
		xs: "size-[12px] translate-x-[2px] data-checked:translate-x-[calc(100%-2px)]",
		sm: "size-[14px] translate-x-[2px] data-checked:translate-x-[calc(100%-2px)]",
		default: "size-[18px] translate-x-[2px] data-checked:translate-x-[calc(100%-4px)]"
	} },
	defaultVariants: { size: "default" }
});
var lightswitchIconVariants = cva("", {
	variants: { size: {
		xs: "hidden",
		sm: "size-[10px]",
		default: "size-[14px]"
	} },
	defaultVariants: { size: "default" }
});
function Lightswitch({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Switch.Root, {
		"data-slot": "switch",
		className: cn("peer outline-none inline-flex shrink-0 items-center cursor-pointer select-none", lightswitchVariants({ size }), "shadow-[inset_0_0_0_1px_rgba(96,126,160,0.8)]", "bg-gray-200", "data-checked:bg-teal-550", "data-checked:shadow-[inset_0_0_0_1px_#008779]", "focus-visible:!shadow-[0_0_0_1px_#ffffff,0_0_0_3px_var(--color-sky-600),0_0_6px_1px_hsl(from_var(--color-sky-600)_h_s_l/0.8)]", "aria-invalid:!shadow-[0_0_0_1px_#ffffff,0_0_0_2.5px_var(--color-rose-600)]", "aria-invalid:focus-visible:!shadow-[0_0_0_1px_#ffffff,0_0_0_3px_var(--color-rose-600),0_0_6px_1px_hsl(from_var(--color-rose-600)_h_s_l/0.8)]", "disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(Switch.Thumb, {
			"data-slot": "switch-thumb",
			className: cn("pointer-events-none block rounded-full", "flex items-center justify-center", lightswitchThumbVariants({ size }), "bg-white", "shadow-[inset_0_0_0_1px_rgba(96,126,160,0.8)]", "transition-transform", "data-checked:shadow-[inset_0_0_0_1px_#008779]"),
			children: /* @__PURE__ */ jsx("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				role: "img",
				"aria-hidden": "true",
				viewBox: "0 0 640 640",
				className: cn(lightswitchIconVariants({ size }), "text-teal-550", "opacity-0", "translate-y-[1px]", "transition-opacity", "[[data-checked]_&]:opacity-100"),
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: "M557.5 192L534.9 214.6L278.9 470.6C266.4 483.1 246.1 483.1 233.6 470.6L105.6 342.6L83 320L128.3 274.7C129.6 276 172.3 318.7 256.3 402.7L489.7 169.3L512.3 146.7L557.6 192z"
				})
			})
		})
	});
}
//#endregion
export { Lightswitch };

//# sourceMappingURL=Lightswitch.js.map