import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { jsx } from "react/jsx-runtime";
import { Tabs } from "@base-ui/react/tabs";
//#region src/components/ModalTabs.tsx
function ModalTabs({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Root, {
		"data-slot": "tabs",
		className: cn("overflow-hidden", "rounded-lg", "h-full", "min-h-0", "flex flex-col", className),
		...props
	});
}
function ModalTabsList({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.List, {
		"data-slot": "tabs-list",
		className: cn("flex flex-row flex-nowrap", "w-full", "min-w-0 max-w-full", "overflow-x-auto overflow-y-hidden", "bg-white", "z-11", "shadow-[0_1px_5px_#cdd8e440]", "border-b border-b-gray-100", className),
		...props
	});
}
function ModalTabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Tab, {
		"data-slot": "tabs-trigger",
		className: cn("outline-none shadow-none cursor-pointer", "shrink-0 whitespace-nowrap", "relative", "px-[15px]", "pt-[15px]", "pb-[15px]", "text-[#64788d]", "text-[12px]", "font-medium", "uppercase", "hover:text-sky-600", "focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]", "data-[active]:after:content-[\"\"]", "data-[active]:after:absolute", "data-[active]:after:bottom-0", "data-[active]:after:left-[15px]", "data-[active]:after:right-0", "data-[active]:after:w-[calc(100%-30px)]", "data-[active]:after:h-[2px]", "data-[active]:after:bg-sky-600", className),
		...props
	});
}
function ModalTabsContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(Tabs.Panel, {
		"data-slot": "tabs-content",
		className: cn("outline-none", "flex-1 min-h-0", "p-4", "overflow-y-auto", "focus-visible:shadow-[inset_0_0_0_2px_var(--color-sky-600)]", className),
		...props
	});
}
//#endregion
export { ModalTabs, ModalTabsContent, ModalTabsList, ModalTabsTrigger };

//# sourceMappingURL=ModalTabs.js.map