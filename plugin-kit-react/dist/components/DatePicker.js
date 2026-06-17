import { cn } from "../utils/classes.js";
import { hostFormatDate } from "../utils/hostBridge.js";
import { parseLocalDate, resolveCalendarMonth } from "../utils/datetime.js";
import "../utils/index.js";
import { Calendar } from "./Calendar.js";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover.js";
import "./index.js";
import { Button } from "./Button.js";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/pro-solid-svg-icons";
//#region src/components/DatePicker.tsx
var toDate = (value) => {
	return parseLocalDate(value);
};
function DatePicker({ value, onValueChange, placeholder = "", className, disabled = false, isInvalid = false, ...props }) {
	const [open, setOpen] = useState(false);
	const date = useMemo(() => toDate(value), [value]);
	const [month, setMonth] = useState(() => resolveCalendarMonth(date));
	useEffect(() => {
		if (date) setMonth(resolveCalendarMonth(date));
	}, [date]);
	const handleOpenChange = (nextOpen) => {
		if (nextOpen) setMonth(resolveCalendarMonth(date));
		setOpen(nextOpen);
	};
	const handleSelect = (selectedDate) => {
		onValueChange?.(selectedDate);
		setOpen(false);
	};
	return /* @__PURE__ */ jsxs(Popover, {
		open,
		onOpenChange: handleOpenChange,
		children: [/* @__PURE__ */ jsx(PopoverTrigger, { render: /* @__PURE__ */ jsxs(Button, {
			variant: "outline",
			className: cn("min-h-[2.125rem] h-[2.125rem]", "w-[130px] px-[10px] !py-0", "!cursor-default", "justify-start text-left font-normal", "bg-transparent border border-slate-400", "hover:bg-slate-50!", "active:bg-slate-150!", "data-[popup-open]:bg-slate-150!", "[&>svg]:size-[14px]", isInvalid && ["border-rose-600!", "focus-visible:shadow-[0_0_0_1px_var(--color-rose-600),0_0_4px_0_hsl(from_var(--color-rose-600)_h_s_l/0.7)]!"], className),
			disabled,
			...props,
			children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
				icon: faCalendar,
				className: cn("mr-1 text-gray-400")
			}), date ? hostFormatDate(date) : placeholder]
		}) }), /* @__PURE__ */ jsx(PopoverContent, {
			className: cn("w-auto p-0!"),
			children: /* @__PURE__ */ jsx(Calendar, {
				mode: "single",
				selected: date,
				month,
				onMonthChange: setMonth,
				captionLayout: "dropdown",
				onSelect: handleSelect
			})
		})]
	});
}
//#endregion
export { DatePicker };

//# sourceMappingURL=DatePicker.js.map