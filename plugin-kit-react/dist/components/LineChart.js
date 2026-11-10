import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkLineChart } from "@verbb/plugin-kit-web/components/chart/pk-line-chart.js";
//#region src/components/LineChart.tsx
/** React facade over `<pk-line-chart>`. Behaviour and styles live in the web component. */
var PkLineChartElement = createPluginKitComponent({
	tagName: "pk-line-chart",
	elementClass: PkLineChart,
	react: React,
	events: {
		onPkPointSelect: "pk-point-select",
		onPkLegendToggle: "pk-legend-toggle",
		onPkViewChange: "pk-view-change"
	}
});
var LineChart = PkLineChartElement;
//#endregion
export { LineChart, PkLineChartElement };

//# sourceMappingURL=LineChart.js.map