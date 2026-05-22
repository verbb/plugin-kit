import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { Checkbox } from "./Checkbox.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/CheckboxInput.tsx
function CheckboxInput({ label, description, className, checkboxClassName, labelClassName, descriptionClassName, disabled, ...props }) {
	return /* @__PURE__ */ jsxs("label", {
		"data-slot": "checkbox-input",
		className: cn("flex items-start gap-2 text-sm", disabled ? "cursor-not-allowed" : "cursor-pointer", className),
		children: [/* @__PURE__ */ jsx(Checkbox, {
			className: checkboxClassName,
			disabled,
			...props
		}), /* @__PURE__ */ jsxs("span", {
			className: "min-w-0 peer-disabled:opacity-50 peer-data-disabled:opacity-50",
			children: [/* @__PURE__ */ jsx("span", {
				"data-slot": "checkbox-input-label",
				className: cn("block leading-4", labelClassName),
				children: label
			}), description && /* @__PURE__ */ jsx("span", {
				"data-slot": "checkbox-input-description",
				className: cn("mt-1 block text-gray-500", descriptionClassName),
				children: description
			})]
		})]
	});
}
//#endregion
export { CheckboxInput };

//# sourceMappingURL=CheckboxInput.js.map