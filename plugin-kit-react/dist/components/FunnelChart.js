import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkFunnelChart } from "@verbb/plugin-kit-web/components/chart/pk-funnel-chart.js";
//#region src/components/FunnelChart.tsx
/** React facade over `<pk-funnel-chart>`. Behaviour and styles live in the web component. */
var PkFunnelChartElement = createPluginKitComponent({
	tagName: "pk-funnel-chart",
	elementClass: PkFunnelChart,
	react: React,
	events: {
		onPkPointSelect: "pk-point-select",
		onPkLegendToggle: "pk-legend-toggle",
		onPkViewChange: "pk-view-change"
	}
});
var FunnelChart = PkFunnelChartElement;
//#endregion
export { FunnelChart, PkFunnelChartElement };

//# sourceMappingURL=FunnelChart.js.map