import { cn } from "../utils/classes.js";
import "../utils/index.js";
import { toggleVariants } from "./Toggle.js";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroup$1 } from "@base-ui/react/toggle-group";
//#region src/components/ToggleGroup.tsx
var ToggleGroupContext = React$1.createContext({
	size: "default",
	variant: "default",
	spacing: 0,
	orientation: "horizontal"
});
function ToggleGroup({ className, variant, size, spacing = 0, orientation = "horizontal", children, ...props }) {
	return /* @__PURE__ */ jsx(ToggleGroup$1, {
		"data-slot": "toggle-group",
		"data-variant": variant,
		"data-size": size,
		"data-spacing": spacing,
		"data-orientation": orientation,
		style: { "--gap": spacing },
		className: cn([
			"group/toggle-group flex w-fit flex-row items-center rounded-lg",
			"data-[size=sm]:rounded-[min(var(--radius-md),10px)]",
			"gap-[--spacing(var(--gap))]",
			"data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch"
		], className),
		...props,
		children: /* @__PURE__ */ jsx(ToggleGroupContext.Provider, {
			value: {
				variant,
				size,
				spacing,
				orientation
			},
			children
		})
	});
}
function ToggleGroupItem({ className, children, variant = "default", size = "default", ...props }) {
	const context = React$1.useContext(ToggleGroupContext);
	return /* @__PURE__ */ jsx(Toggle, {
		"data-slot": "toggle-group-item",
		"data-variant": context.variant || variant,
		"data-size": context.size || size,
		"data-spacing": context.spacing,
		className: cn([
			"shrink-0 focus:z-10 focus-visible:z-10",
			"group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2",
			"group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-l-lg",
			"group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-lg",
			"group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r-lg",
			"group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-lg",
			"group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0",
			"group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l",
			"group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0",
			"group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t"
		], toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), className),
		...props,
		children
	});
}
//#endregion
export { ToggleGroup, ToggleGroupItem };

//# sourceMappingURL=ToggleGroup.js.map