import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkSparkline } from "@verbb/plugin-kit-web/components/chart/pk-sparkline.js";
//#region src/components/Sparkline.tsx
/** React facade over `<pk-sparkline>`. Behaviour and styles live in the web component. */
var PkSparklineElement = createPluginKitComponent({
	tagName: "pk-sparkline",
	elementClass: PkSparkline,
	react: React
});
var Sparkline = PkSparklineElement;
//#endregion
export { PkSparklineElement, Sparkline };

//# sourceMappingURL=Sparkline.js.map