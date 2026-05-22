import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
import { Toggle as Toggle$1 } from "@base-ui/react/toggle";
//#region src/components/Toggle.tsx
var toggleVariants = cva([
	"group/toggle inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg",
	"cursor-pointer",
	"transition-all outline-none",
	"hover:bg-slate-250",
	"aria-pressed:bg-slate-250 data-[state=on]:bg-slate-250 data-[pressed]:bg-slate-250 data-[pressed=true]:bg-slate-250",
	"focus-visible:shadow-[0_0_0_2px_var(--color-sky-600),0_0_5px_1px_hsl(from_var(--color-sky-600)_h_s_l/0.7)]",
	"aria-invalid:border-rose-600 aria-invalid:focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]",
	"disabled:pointer-events-none disabled:opacity-50",
	"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
], {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: ["border border-slate-300 bg-transparent", "hover:bg-slate-250"]
		},
		size: {
			default: "h-8 min-w-8 px-2",
			sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-1.5 text-[0.8rem]",
			lg: "h-9 min-w-9 px-2.5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Toggle({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Toggle$1, {
		"data-slot": "toggle",
		className: cn(toggleVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
export { Toggle, toggleVariants };

//# sourceMappingURL=Toggle.js.map