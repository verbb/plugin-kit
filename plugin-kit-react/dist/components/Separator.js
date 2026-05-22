import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { Separator as Separator$1 } from "@base-ui/react/separator";
import { jsx } from "react/jsx-runtime";
//#region src/components/Separator.tsx
function Separator({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ jsx(Separator$1, {
		"data-slot": "separator",
		orientation,
		className: cn("shrink-0 bg-slate-200", "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full", "data-[orientation=vertical]:w-px data-[orientation=vertical]:h-full", className),
		...props
	});
}
//#endregion
export { Separator };

//# sourceMappingURL=Separator.js.map