import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkMeter } from "@verbb/plugin-kit-web/components/chart/pk-meter.js";
//#region src/components/Meter.tsx
/** React facade over `<pk-meter>`. Behaviour and styles live in the web component. */
var PkMeterElement = createPluginKitComponent({
	tagName: "pk-meter",
	elementClass: PkMeter,
	react: React
});
var Meter = PkMeterElement;
//#endregion
export { Meter, PkMeterElement };

//# sourceMappingURL=Meter.js.map