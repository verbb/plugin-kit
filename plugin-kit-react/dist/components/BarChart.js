import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkBarChart } from "@verbb/plugin-kit-web/components/chart/pk-bar-chart.js";
//#region src/components/BarChart.tsx
/** React facade over `<pk-bar-chart>`. Behaviour and styles live in the web component. */
var PkBarChartElement = createPluginKitComponent({
	tagName: "pk-bar-chart",
	elementClass: PkBarChart,
	react: React,
	events: {
		onPkPointSelect: "pk-point-select",
		onPkLegendToggle: "pk-legend-toggle",
		onPkViewChange: "pk-view-change"
	}
});
var BarChart = PkBarChartElement;
//#endregion
export { BarChart, PkBarChartElement };

//# sourceMappingURL=BarChart.js.map