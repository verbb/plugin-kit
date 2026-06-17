import { cn } from "../utils/classes.js";
import { generateTimeOptions } from "../utils/timeOptions.js";
import "../utils/index.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select.js";
import "./index.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/pro-solid-svg-icons";
//#region src/components/TimePicker.tsx
function TimePicker({ value, onValueChange, placeholder = "", className, disabled = false, isInvalid = false, ...props }) {
	const timeOptions = generateTimeOptions();
	return /* @__PURE__ */ jsxs(Select, {
		value,
		onValueChange: (nextValue) => {
			onValueChange?.(String(nextValue ?? ""));
		},
		disabled,
		...props,
		children: [/* @__PURE__ */ jsxs(SelectTrigger, {
			"aria-invalid": isInvalid,
			className: cn("min-w-[7rem] min-h-[2.125rem]! h-[2.125rem]!", "w-[130px] justify-start text-left font-normal", "bg-transparent border border-slate-400!", "hover:bg-slate-50!", "active:bg-slate-150!", "data-[popup-open]:bg-slate-150!", className),
			children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
				icon: faClock,
				className: cn("mr-1 text-gray-400")
			}), /* @__PURE__ */ jsx(SelectValue, { placeholder })]
		}), /* @__PURE__ */ jsx(SelectContent, {
			alignItemWithTrigger: false,
			className: cn("max-h-[15rem] min-w-[8rem]"),
			children: timeOptions.map((option) => {
				return /* @__PURE__ */ jsx(SelectItem, {
					value: option.value,
					children: option.label
				}, option.value);
			})
		})]
	});
}
//#endregion
export { TimePicker };

//# sourceMappingURL=TimePicker.js.map