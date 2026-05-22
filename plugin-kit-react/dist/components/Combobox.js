import { cn } from "../utils/classes.js";
import { getPortalClassName, getPortalContainer } from "../utils/portal.js";
import "../utils/index.js";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./InputGroup.js";
import "./index.js";
import { Button } from "./Button.js";
import { createContext, useContext, useRef } from "react";
import { cva } from "class-variance-authority";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faXmark } from "@fortawesome/pro-solid-svg-icons";
import { Combobox as Combobox$1 } from "@base-ui/react";
//#region src/components/Combobox.tsx
var comboboxItemVariants = cva([
	"relative flex w-full cursor-default items-center outline-hidden select-none",
	"gap-1.5",
	"focus:bg-slate-100 data-[highlighted]:bg-slate-100",
	"data-disabled:pointer-events-none data-disabled:opacity-50",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0"
], {
	variants: {
		size: {
			xs: "px-2 py-1 pr-7 text-[11px] [&_svg:not([class*=\"size-\"])]:size-3",
			sm: "px-2.5 py-1.5 pr-7 text-[12px] [&_svg:not([class*=\"size-\"])]:size-3",
			default: "px-[10px] py-[6px] pr-8 text-[14px] [&_svg:not([class*=\"size-\"])]:size-3",
			lg: "px-3 py-2 pr-8 text-sm [&_svg:not([class*=\"size-\"])]:size-3",
			xl: "px-3.5 py-2.5 pr-9 text-sm [&_svg:not([class*=\"size-\"])]:size-3"
		},
		variant: {
			default: "",
			destructive: "text-error"
		}
	},
	defaultVariants: {
		size: "default",
		variant: "default"
	}
});
var comboboxItemIndicatorVariants = cva("", {
	variants: { size: {
		xs: "right-2 size-3",
		sm: "right-2.5 size-3",
		default: "right-2 size-3",
		lg: "right-3 size-3",
		xl: "right-3.5 size-3"
	} },
	defaultVariants: { size: "default" }
});
var comboboxItemIndicatorIconVariants = cva("", {
	variants: { size: {
		xs: "size-3",
		sm: "size-3",
		default: "size-3",
		lg: "size-3",
		xl: "size-3"
	} },
	defaultVariants: { size: "default" }
});
var comboboxLabelVariants = cva(["text-slate-700"], {
	variants: { size: {
		xs: "px-2 pt-1 text-[11px]",
		sm: "px-2.5 pt-1 text-[12px]",
		default: "px-2.5 pt-1 text-xs",
		lg: "px-3 pt-1 text-sm",
		xl: "px-3.5 pt-1 text-base"
	} },
	defaultVariants: { size: "default" }
});
var comboboxInputGroupVariants = cva("", {
	variants: { size: {
		xs: "h-7 text-[11px]",
		sm: "h-8 text-[12px]",
		default: "h-9 text-[13px]",
		lg: "h-10 text-sm",
		xl: "h-11 text-base"
	} },
	defaultVariants: { size: "default" }
});
var comboboxSelectInputGroupVariants = cva("", {
	variants: { size: {
		xs: "h-auto rounded-sm text-[11px]",
		sm: "h-auto rounded-md text-[12px]",
		default: "h-auto rounded-lg text-[14px]",
		lg: "h-auto rounded-lg text-sm",
		xl: "h-auto rounded-lg text-sm"
	} },
	defaultVariants: { size: "default" }
});
var comboboxInputControlVariants = cva("", {
	variants: { size: {
		xs: "px-1.5 py-1 text-[11px]",
		sm: "px-2 py-1 text-[12px]",
		default: "px-2 py-1.5 text-sm",
		lg: "px-3 py-2 text-sm",
		xl: "px-4 py-2.5 text-base"
	} },
	defaultVariants: { size: "default" }
});
var comboboxSelectInputControlVariants = cva("", {
	variants: { size: {
		xs: "px-2 py-1 text-[11px]",
		sm: "px-2.5 py-1.5 text-[12px]",
		default: "px-[10px] py-[6px] text-[14px]",
		lg: "px-3 py-2 text-sm",
		xl: "px-3.5 py-2.5 text-sm"
	} },
	defaultVariants: { size: "default" }
});
var comboboxTriggerIconVariants = cva("", {
	variants: { size: {
		xs: "size-[10px]",
		sm: "size-[11px]",
		default: "size-3",
		lg: "size-3",
		xl: "size-3.5"
	} },
	defaultVariants: { size: "default" }
});
var comboboxTriggerButtonIconVariants = cva("", {
	variants: { size: {
		xs: "[&>svg]:size-[10px]",
		sm: "[&>svg]:size-[11px]",
		default: "[&>svg]:size-3",
		lg: "[&>svg]:size-3",
		xl: "[&>svg]:size-3.5"
	} },
	defaultVariants: { size: "default" }
});
var comboboxClearIconVariants = cva("", {
	variants: { size: {
		xs: "size-[10px]",
		sm: "size-[11px]",
		default: "size-3",
		lg: "size-3",
		xl: "size-3.5"
	} },
	defaultVariants: { size: "default" }
});
var comboboxClearButtonIconVariants = cva("", {
	variants: { size: {
		xs: "[&>svg]:size-[10px]",
		sm: "[&>svg]:size-[11px]",
		default: "[&>svg]:size-3",
		lg: "[&>svg]:size-3",
		xl: "[&>svg]:size-3.5"
	} },
	defaultVariants: { size: "default" }
});
var ComboboxContext = createContext({ size: "default" });
function Combobox({ size = "default", children, ...props }) {
	return /* @__PURE__ */ jsx(ComboboxContext.Provider, {
		value: { size },
		children: /* @__PURE__ */ jsx(Combobox$1.Root, {
			"data-slot": "combobox",
			"data-size": size,
			...props,
			children
		})
	});
}
function ComboboxValue({ ...props }) {
	return /* @__PURE__ */ jsx(Combobox$1.Value, {
		"data-slot": "combobox-value",
		...props
	});
}
function ComboboxTrigger({ className, children, ...props }) {
	const { size } = useContext(ComboboxContext);
	return /* @__PURE__ */ jsxs(Combobox$1.Trigger, {
		"data-slot": "combobox-trigger",
		className: cn("[&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(FontAwesomeIcon, {
			icon: faChevronDown,
			className: cn("pointer-events-none", comboboxTriggerIconVariants({ size }))
		})]
	});
}
function ComboboxClear({ className, ...props }) {
	const { size } = useContext(ComboboxContext);
	return /* @__PURE__ */ jsx(Combobox$1.Clear, {
		"data-slot": "combobox-clear",
		className: cn(className),
		...props,
		render: /* @__PURE__ */ jsx(InputGroupButton, {
			variant: "none",
			size: "icon-xs",
			className: comboboxClearButtonIconVariants({ size }),
			children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
				icon: faXmark,
				className: cn("pointer-events-none", comboboxClearIconVariants({ size }))
			})
		})
	});
}
function ComboboxPrimitiveInput({ className, children, disabled = false, showTrigger = true, showClear = false, ...props }) {
	const { size } = useContext(ComboboxContext);
	const useSelectTriggerStyle = showTrigger;
	return /* @__PURE__ */ jsxs(InputGroup, {
		className: cn("w-fit mb-1!", comboboxInputGroupVariants({ size }), useSelectTriggerStyle && [
			"border-transparent bg-slate-250",
			"hover:bg-slate-300",
			"has-[[data-slot=input-group-control]:focus]:bg-white",
			"has-[[data-popup-open]]:bg-white",
			comboboxSelectInputGroupVariants({ size })
		], className),
		children: [
			/* @__PURE__ */ jsx(Combobox$1.Input, {
				render: /* @__PURE__ */ jsx(InputGroupInput, {
					disabled,
					className: cn(comboboxInputControlVariants({ size }), useSelectTriggerStyle && [
						"placeholder:text-inherit",
						"focus:placeholder:text-gray-300",
						comboboxSelectInputControlVariants({ size })
					])
				}),
				...props
			}),
			/* @__PURE__ */ jsxs(InputGroupAddon, {
				align: "inline-end",
				children: [showTrigger && /* @__PURE__ */ jsx(InputGroupButton, {
					size: "icon-xs",
					variant: "none",
					render: /* @__PURE__ */ jsx(ComboboxTrigger, {}),
					"data-slot": "input-group-button",
					className: cn("group-has-data-[slot=combobox-clear]/input-group:hidden", "data-pressed:bg-transparent", comboboxTriggerButtonIconVariants({ size })),
					disabled
				}), showClear && /* @__PURE__ */ jsx(ComboboxClear, { disabled })]
			}),
			children
		]
	});
}
function ComboboxContent({ className, side = "bottom", sideOffset = 6, align = "start", alignOffset = 0, anchor, ...props }) {
	const { size } = useContext(ComboboxContext);
	const resolvedPortalClassName = getPortalClassName();
	const resolvedPortalContainer = getPortalContainer();
	return /* @__PURE__ */ jsx(Combobox$1.Portal, {
		className: resolvedPortalClassName,
		container: resolvedPortalContainer,
		children: /* @__PURE__ */ jsx(Combobox$1.Positioner, {
			side,
			sideOffset,
			align,
			alignOffset,
			anchor,
			className: "isolate z-250",
			children: /* @__PURE__ */ jsx(Combobox$1.Popup, {
				"data-slot": "combobox-content",
				"data-chips": !!anchor,
				"data-size": size,
				className: cn("group/combobox-content relative", "max-h-(--available-height) w-[calc(var(--anchor-width)_+_2.25rem)] max-w-(--available-width)", "min-w-[calc(var(--anchor-width)_+_2.25rem)]", "overflow-hidden", "origin-(--transform-origin)", "rounded-md bg-white", "shadow-[0_0_0_1px_rgba(31,41,51,0.1),0_5px_20px_rgba(31,41,51,0.25)]", "duration-100", "data-open:animate-in data-closed:animate-out", "data-open:fade-in-0 data-closed:fade-out-0", "data-open:zoom-in-95 data-closed:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2", "data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2", "data-[side=top]:slide-in-from-bottom-2", "data-[side=inline-start]:slide-in-from-right-2", "data-[side=inline-end]:slide-in-from-left-2", "data-[chips=true]:min-w-(--anchor-width)", "*:data-[slot=input-group]:m-1", "*:data-[slot=input-group]:w-[calc(100%_-_0.5rem)]", "*:data-[slot=input-group]:mb-0", "data-[size=xs]:*:data-[slot=input-group]:h-7", "data-[size=sm]:*:data-[slot=input-group]:h-8", "data-[size=default]:*:data-[slot=input-group]:h-9", "data-[size=lg]:*:data-[slot=input-group]:h-10", "data-[size=xl]:*:data-[slot=input-group]:h-11", "*:data-[slot=input-group]:bg-input/30", "*:data-[slot=input-group]:border-input/30", "*:data-[slot=input-group]:shadow-none", className),
				...props
			})
		})
	});
}
function ComboboxList({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox$1.List, {
		"data-slot": "combobox-list",
		className: cn("max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))]", "overflow-y-auto overscroll-contain", "no-scrollbar", "data-empty:p-0", className),
		...props
	});
}
function ComboboxItem({ className, children, ...props }) {
	const { size } = useContext(ComboboxContext);
	return /* @__PURE__ */ jsxs(Combobox$1.Item, {
		"data-slot": "combobox-item",
		className: cn(comboboxItemVariants({ size }), className),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "flex min-w-0 flex-1 items-center gap-2 whitespace-nowrap",
			children
		}), /* @__PURE__ */ jsx(Combobox$1.ItemIndicator, { render: /* @__PURE__ */ jsx("span", {
			className: cn("pointer-events-none absolute flex items-center justify-center", comboboxItemIndicatorVariants({ size })),
			children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
				icon: faCheck,
				className: cn("pointer-events-none", comboboxItemIndicatorIconVariants({ size }))
			})
		}) })]
	});
}
function ComboboxGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox$1.Group, {
		"data-slot": "combobox-group",
		className: cn([className]),
		...props
	});
}
function ComboboxLabel({ className, ...props }) {
	const { size } = useContext(ComboboxContext);
	return /* @__PURE__ */ jsx(Combobox$1.GroupLabel, {
		"data-slot": "combobox-label",
		className: cn("text-slate-700", comboboxLabelVariants({ size }), className),
		...props
	});
}
function ComboboxCollection({ ...props }) {
	return /* @__PURE__ */ jsx(Combobox$1.Collection, {
		"data-slot": "combobox-collection",
		...props
	});
}
function ComboboxEmpty({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox$1.Empty, {
		"data-slot": "combobox-empty",
		className: cn("hidden w-full justify-center py-2 text-center text-sm", "text-gray-500", "group-data-empty/combobox-content:flex", className),
		...props
	});
}
function ComboboxSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox$1.Separator, {
		"data-slot": "combobox-separator",
		className: cn("-mx-1 my-1 h-px", "bg-slate-200", className),
		...props
	});
}
function ComboboxChips({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox$1.Chips, {
		"data-slot": "combobox-chips",
		className: cn("flex-wrap gap-1", "px-2 py-1.5 text-sm", className),
		render: /* @__PURE__ */ jsx(InputGroup, {}),
		...props
	});
}
function ComboboxChip({ className, children, showRemove = true, ...props }) {
	return /* @__PURE__ */ jsxs(Combobox$1.Chip, {
		"data-slot": "combobox-chip",
		className: cn("flex w-fit items-center justify-center gap-1", "rounded-sm px-1.5 py-[2px]", "text-xs font-medium whitespace-nowrap", "bg-slate-200", "has-data-[slot=combobox-chip-remove]:pr-0", "has-disabled:pointer-events-none", "has-disabled:cursor-not-allowed", "has-disabled:opacity-50", className),
		...props,
		children: [children, showRemove && /* @__PURE__ */ jsx(Combobox$1.ChipRemove, {
			className: "-ml-1 opacity-50 hover:opacity-100",
			"data-slot": "combobox-chip-remove",
			render: /* @__PURE__ */ jsx(Button, {
				variant: "none",
				size: "xs",
				children: /* @__PURE__ */ jsx(FontAwesomeIcon, {
					icon: faXmark,
					className: "pointer-events-none size-2.5"
				})
			})
		})]
	});
}
function ComboboxChipsInput({ className, ...props }) {
	return /* @__PURE__ */ jsx(Combobox$1.Input, {
		render: /* @__PURE__ */ jsx(InputGroupInput, { className: cn("min-w-16 px-0 py-0", className) }),
		...props
	});
}
function useComboboxAnchor() {
	return useRef(null);
}
function ComboboxHighlightedText({ text = "", search = "", className, matchClassName }) {
	const label = String(text || "");
	const query = String(search || "").trim();
	if (!query) return label;
	const lowerLabel = label.toLowerCase();
	const lowerQuery = query.toLowerCase();
	const parts = [];
	let cursor = 0;
	let matchIndex = lowerLabel.indexOf(lowerQuery);
	while (matchIndex !== -1) {
		if (matchIndex > cursor) parts.push({
			text: label.slice(cursor, matchIndex),
			match: false
		});
		parts.push({
			text: label.slice(matchIndex, matchIndex + query.length),
			match: true
		});
		cursor = matchIndex + query.length;
		matchIndex = lowerLabel.indexOf(lowerQuery, cursor);
	}
	if (cursor < label.length) parts.push({
		text: label.slice(cursor),
		match: false
	});
	return /* @__PURE__ */ jsx("span", {
		className: cn("min-w-0 truncate", className),
		children: parts.map((part, index) => {
			if (!part.match) return /* @__PURE__ */ jsx("span", { children: part.text }, index);
			return /* @__PURE__ */ jsx("span", {
				className: cn("rounded-[2px] bg-blue-100", matchClassName),
				children: part.text
			}, index);
		})
	});
}
//#endregion
export { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxCollection, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxHighlightedText, ComboboxItem, ComboboxLabel, ComboboxList, ComboboxPrimitiveInput, ComboboxSeparator, ComboboxTrigger, ComboboxValue, useComboboxAnchor };

//# sourceMappingURL=Combobox.js.map