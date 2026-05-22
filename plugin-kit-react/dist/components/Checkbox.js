import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Checkbox as Checkbox$1 } from "@base-ui/react/checkbox";
//#region src/components/Checkbox.tsx
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ jsx(Checkbox$1.Root, {
		"data-slot": "checkbox",
		className: cn("peer group/checkbox flex items-center justify-center cursor-pointer shrink-0 rounded-sm outline-none border", "size-4 border-[#c0cbd9]", "focus-visible:border-sky-600 focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]", "aria-invalid:border-rose-600 aria-invalid:focus-visible:!shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]", "disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsxs(Checkbox$1.Indicator, {
			"data-slot": "checkbox-indicator",
			className: cn("flex items-center justify-center", "size-[14px] text-current"),
			children: [/* @__PURE__ */ jsx("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				role: "img",
				"aria-hidden": "true",
				viewBox: "0 0 640 640",
				className: "size-[14px] translate-y-[1px] scale-[1.2] group-data-[indeterminate]/checkbox:hidden",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: "M557.5 192L534.9 214.6L278.9 470.6C266.4 483.1 246.1 483.1 233.6 470.6L105.6 342.6L83 320L128.3 274.7C129.6 276 172.3 318.7 256.3 402.7L489.7 169.3L512.3 146.7L557.6 192z"
				})
			}), /* @__PURE__ */ jsx("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				role: "img",
				"aria-hidden": "true",
				viewBox: "0 0 640 640",
				className: "hidden size-[12px] group-data-[indeterminate]/checkbox:block",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: "M96 352V288H544V352H96z"
				})
			})]
		})
	});
}
//#endregion
export { Checkbox };

//# sourceMappingURL=Checkbox.js.map