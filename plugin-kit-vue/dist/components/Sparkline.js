import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/chart/pk-sparkline.js";
//#region src/components/Sparkline.ts
/** Vue facade over `<pk-sparkline>`. Behaviour and styles live in the web component. */
var Sparkline = createPkComponent({
	name: "PkSparkline",
	tagName: "pk-sparkline"
});
var PkSparklineElement = Sparkline;
//#endregion
export { PkSparklineElement, Sparkline };

//# sourceMappingURL=Sparkline.js.map