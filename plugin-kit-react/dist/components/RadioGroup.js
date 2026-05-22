import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { jsx } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup as RadioGroup$1 } from "@base-ui/react/radio-group";
//#region src/components/RadioGroup.tsx
function RadioGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(RadioGroup$1, {
		"data-slot": "radio-group",
		className: cn("grid gap-1.5", className),
		...props
	});
}
function RadioGroupItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(Radio.Root, {
		"data-slot": "radio-group-item",
		className: cn("peer cursor-pointer aspect-square shrink-0 rounded-full outline-none border", "size-4 border-slate-400", "focus-visible:border-sky-600 focus-visible:shadow-[0_0_0_1px_var(--color-sky-600),0_0_4px_0_hsl(from_var(--color-sky-600)_h_s_l/0.7)]", "aria-invalid:border-rose-600 aria-invalid:focus-visible:!shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]", "disabled:cursor-not-allowed disabled:opacity-50", "data-checked:bg-slate-50 data-checked:text-[#1f2933]", className),
		...props,
		children: /* @__PURE__ */ jsx(Radio.Indicator, {
			"data-slot": "radio-group-indicator",
			className: cn("flex items-center justify-center h-full w-full"),
			children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
				icon: faCircle,
				className: cn("size-2 fill-current text-current")
			})
		})
	});
}
//#endregion
export { RadioGroup, RadioGroupItem };

//# sourceMappingURL=RadioGroup.js.map