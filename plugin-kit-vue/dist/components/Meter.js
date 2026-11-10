import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/chart/pk-meter.js";
//#region src/components/Meter.ts
/** Vue facade over `<pk-meter>`. Behaviour and styles live in the web component. */
var Meter = createPkComponent({
	name: "PkMeter",
	tagName: "pk-meter"
});
var PkMeterElement = Meter;
//#endregion
export { Meter, PkMeterElement };

//# sourceMappingURL=Meter.js.map