import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { jsx } from "react/jsx-runtime";
import { Tabs as Tabs$1 } from "@base-ui/react/tabs";
//#region src/components/Tabs.tsx
function Tabs({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs$1.Root, {
		"data-slot": "tabs",
		className: cn("flex flex-col gap-3", className),
		...props
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs$1.List, {
		"data-slot": "tabs-list",
		className: cn("inline-flex w-fit self-start items-center justify-center", "rounded-md p-0.5", "border border-gray-150 bg-gray-100/90 text-gray-500", "shadow-[0_1px_2px_rgba(31,41,51,0.06)]", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs$1.Tab, {
		"data-slot": "tabs-trigger",
		className: cn("inline-flex items-center justify-center whitespace-nowrap cursor-pointer outline-none", "min-h-8 rounded-sm px-3 py-1.5 text-[13px] font-medium", "transition-[background-color,color,box-shadow]", "text-gray-500", "hover:bg-white/70 hover:text-gray-700", "focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]", "disabled:pointer-events-none disabled:opacity-50", "data-[active]:bg-white data-[active]:text-gray-800", "data-[active]:shadow-[0_1px_2px_rgba(31,41,51,0.12)]", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs$1.Panel, {
		"data-slot": "tabs-content",
		className: cn("outline-none", "mt-2", "focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]", className),
		...props
	});
}
//#endregion
export { Tabs, TabsContent, TabsList, TabsTrigger };

//# sourceMappingURL=Tabs.js.map