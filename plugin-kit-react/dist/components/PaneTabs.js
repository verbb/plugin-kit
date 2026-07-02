import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { jsx } from "react/jsx-runtime";
import { Tabs } from "@base-ui/react/tabs";
//#region src/components/PaneTabs.tsx
function PaneTabs({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Root, {
		"data-slot": "tabs",
		className: cn("flex flex-col h-full", "rounded-lg", "shadow-[0_0_0_1px_var(--color-gray-200),_0_2px_12px_rgb(205_216_228_/_50%)]", className),
		...props
	});
}
function PaneTabsList({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.List, {
		"data-slot": "tabs-list",
		className: cn("flex", "shadow-[inset_0_-1px_0_0_rgba(154,165,177,0.25)]", "bg-gray-50 rounded-t-lg", className),
		...props
	});
}
function PaneTabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Tab, {
		"data-slot": "tabs-trigger",
		className: cn("flex items-center cursor-pointer outline-none whitespace-nowrap", "h-[45px] px-[24px] text-gray-550", "hover:bg-slate-100", "focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]", "data-[active]:rounded-t-xs data-[active]:relative data-[active]:bg-white data-[active]:hover:bg-white data-[active]:text-gray-700 data-[active]:shadow-[inset_0_2px_0_rgb(107,114,128),0_0_0_1px_rgba(51,64,77,0.1),0_2px_12px_rgba(205,216,228,0.9)]", className),
		...props
	});
}
function PaneTabsContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Panel, {
		"data-slot": "tabs-content",
		className: cn("outline-none", "relative", "h-full", "overflow-y-auto", "bg-white rounded-b-lg", className),
		...props
	});
}
//#endregion
export { PaneTabs, PaneTabsContent, PaneTabsList, PaneTabsTrigger };

//# sourceMappingURL=PaneTabs.js.map