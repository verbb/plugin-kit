import { cn } from "../utils/classes.js";
import "../utils/index.js";
import "./index.js";
import { Button, buttonVariants } from "./Button.js";
import { useEffect, useRef } from "react";
import { jsx } from "react/jsx-runtime";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/pro-solid-svg-icons";
//#region src/components/Calendar.tsx
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "none", locale, formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ jsx(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar", "p-2", "[--cell-radius:100%] [--cell-size:--spacing(7)]", "[[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		locale,
		formatters: {
			formatMonthDropdown: (date) => {
				return date.toLocaleString(locale?.code, { month: "short" });
			},
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("flex gap-4 flex-col md:flex-row relative", defaultClassNames.months),
			month: cn("flex flex-col w-full gap-2", defaultClassNames.month),
			nav: cn("flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between", defaultClassNames.nav),
			"button_previous": cn(buttonVariants({
				variant: buttonVariant,
				size: "none"
			}), "cursor-pointer rounded-sm", "p-2!", "[&>svg]:size-3", defaultClassNames.button_previous),
			"button_next": cn(buttonVariants({
				variant: buttonVariant,
				size: "none"
			}), "cursor-pointer rounded-sm", "p-2!", "[&>svg]:size-3", defaultClassNames.button_next),
			"month_caption": cn("flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5", defaultClassNames.dropdowns),
			"dropdown_root": cn("relative cn-calendar-dropdown-root rounded-(--cell-radius)", defaultClassNames.dropdown_root),
			dropdown: cn("absolute bg-white inset-0 opacity-0", defaultClassNames.dropdown),
			"caption_label": cn("select-none font-medium", captionLayout === "label" ? "text-[13px]" : [
				"cn-calendar-caption-label",
				"rounded-(--cell-radius)",
				"flex items-center gap-1 text-[13px]",
				"[&>svg]:text-slate-800",
				"[&>svg]:size-2.5"
			].join(" "), defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-gray-500 rounded-(--cell-radius) flex-1 font-normal text-[0.8rem] select-none", defaultClassNames.weekday),
			week: cn("flex w-full mt-2", defaultClassNames.week),
			"week_number_header": cn("select-none w-(--cell-size)", defaultClassNames.week_number_header),
			"week_number": cn("text-[0.8rem]", "select-none", "text-gray-500", defaultClassNames.week_number),
			day: cn("relative w-full h-full p-0 text-center group/day aspect-square select-none", defaultClassNames.day),
			"range_start": cn(defaultClassNames.range_start),
			"range_middle": cn(defaultClassNames.range_middle),
			"range_end": cn(defaultClassNames.range_end),
			today: cn(defaultClassNames.today),
			outside: cn("opacity-60", defaultClassNames.outside),
			disabled: cn("opacity-40", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ jsx("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ jsx(FontAwesomeIcon, {
					icon: faChevronLeft,
					className: cn("cn-rtl-flip size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ jsx(FontAwesomeIcon, {
					icon: faChevronRight,
					className: cn("cn-rtl-flip size-4", className),
					...props
				});
				return /* @__PURE__ */ jsx(FontAwesomeIcon, {
					icon: faChevronDown,
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: ({ ...props }) => {
				return /* @__PURE__ */ jsx(CalendarDayButton, {
					locale,
					...props
				});
			},
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ jsx("td", {
					...props,
					children: /* @__PURE__ */ jsx("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, locale, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = useRef(null);
	useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ jsx(Button, {
		ref,
		variant: "none",
		size: "none",
		"data-today": modifiers.today,
		"data-day": day.date.toLocaleDateString(locale?.code),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal", "rounded-none transition-none", "data-[selected-single=true]:bg-gray-200", "data-[selected-single=true]:rounded-(--cell-radius)", "data-[range-middle=true]:bg-gray-200", "data-[range-start=true]:bg-gray-200", "data-[range-end=true]:bg-gray-200", "data-[today=true]:after:absolute", "data-[today=true]:after:w-full", "data-[today=true]:after:h-full", "data-[today=true]:after:m-2", "data-[today=true]:after:-z-0", "data-[today=true]:after:isolate", "data-[today=true]:after:border", "data-[today=true]:after:border-blue-500", "data-[today=true]:after:rounded-(--cell-radius)", "data-[range-start=true]:data-[range-end=true]:rounded-(--cell-radius)", "data-[range-start=true]:data-[range-end=false]:rounded-l-(--cell-radius)", "data-[range-middle=true]:rounded-none", "data-[range-start=false]:data-[range-end=true]:rounded-r-(--cell-radius)", "[&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
//#endregion
export { Calendar, CalendarDayButton };

//# sourceMappingURL=Calendar.js.map