import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { jsx } from "react/jsx-runtime";
//#region src/components/Label.tsx
function Label({ className, ...props }) {
	return /* @__PURE__ */ jsx("label", {
		"data-slot": "label",
		className: cn("text-sm font-bold leading-none", className),
		...props
	});
}
//#endregion
export { Label };

//# sourceMappingURL=Label.js.map