import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./Dialog.js";
import "./index.js";
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-solid-svg-icons";
import { Command as Command$1, useCommandState } from "cmdk";
//#region src/components/Command.tsx
function Command({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command$1, {
		"data-slot": "command",
		className: cn("flex h-full w-full flex-col", "text-xs", "rounded shadow-md focus:shadow-md", className),
		...props
	});
}
function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ jsxs(Dialog, {
		...props,
		children: [/* @__PURE__ */ jsxs(DialogHeader, {
			className: "sr-only",
			children: [/* @__PURE__ */ jsx(DialogTitle, { children: title }), /* @__PURE__ */ jsx(DialogDescription, { children: description })]
		}), /* @__PURE__ */ jsx(DialogContent, {
			className: "p-0 shadow-lg",
			showCloseButton,
			children: /* @__PURE__ */ jsx(Command, {
				className: cn("[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5", "[&_[cmdk-group-heading]]:font-medium", "[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"),
				children
			})
		})]
	});
}
function CommandInput({ className, ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		"data-slot": "command-input-wrapper",
		className: "flex items-center border-b border-slate-150 px-2",
		children: [/* @__PURE__ */ jsx(FontAwesomeIcon, {
			icon: faSearch,
			className: "mr-2 size-3 shrink-0 opacity-50"
		}), /* @__PURE__ */ jsx(Command$1.Input, {
			"data-slot": "command-input",
			className: cn("flex w-full py-2.5", "rounded-md text-xs", "shadow-none outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className),
			...props
		})]
	});
}
var CommandList = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(Command$1.List, {
		ref,
		"data-slot": "command-list",
		className: cn("max-h-[300px] overflow-y-auto", className),
		...props
	});
});
function CommandEmpty({ ...props }) {
	return /* @__PURE__ */ jsx(Command$1.Empty, {
		"data-slot": "command-empty",
		className: cn("pt-4 pb-3 text-center", "text-xs"),
		...props
	});
}
function CommandGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command$1.Group, {
		"data-slot": "command-group",
		className: cn("text-xs", "text-gray-600", "**:[[cmdk-group-heading]]:text-gray-500", "overflow-hidden", "py-1", "**:[[cmdk-group-heading]]:px-2", "**:[[cmdk-group-heading]]:py-1", "**:[[cmdk-group-heading]]:text-[11px]", "**:[[cmdk-group-heading]]:font-medium", className),
		...props
	});
}
function CommandSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command$1.Separator, {
		"data-slot": "command-separator",
		className: cn("pointer-events-none", "h-px", "bg-slate-200", className),
		...props
	});
}
function CommandItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command$1.Item, {
		"data-slot": "command-item",
		className: cn("relative flex gap-2 items-center px-2 py-1.5", "text-xs data-[selected=true]:bg-slate-100", "cursor-default select-none outline-hidden data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50", "[&_svg]:pointer-events-none [&_svg]:not([class*=\"size-\"]):size-3 [&_svg]:shrink-0", className),
		...props
	});
}
function CommandShortcut({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		"data-slot": "command-shortcut",
		className: cn("ml-auto", "text-xs tracking-widest", className),
		...props
	});
}
//#endregion
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, useCommandState };

//# sourceMappingURL=Command.js.map