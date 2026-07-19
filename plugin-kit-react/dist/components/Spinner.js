import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
import { PkSpinner } from "@verbb/plugin-kit-web/components/spinner/pk-spinner.js";
//#region src/components/Spinner.tsx
var PkSpinnerElement = createPluginKitComponent({
	tagName: "pk-spinner",
	elementClass: PkSpinner,
	react: React
});
/** React facade over `<pk-spinner>`. Behavior and styles live in the web component. */
function Spinner({ variant = "default", size = "sm", tone, centered = false, ...props }) {
	return /* @__PURE__ */ jsx(PkSpinnerElement, {
		variant,
		size,
		...tone ? { tone } : {},
		...centered ? { centered: true } : {},
		...props
	});
}
//#endregion
export { PkSpinnerElement, Spinner };

//# sourceMappingURL=Spinner.js.map