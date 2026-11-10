import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkDonutChart } from "@verbb/plugin-kit-web/components/chart/pk-donut-chart.js";
//#region src/components/DonutChart.tsx
/** React facade over `<pk-donut-chart>`. Behaviour and styles live in the web component. */
var PkDonutChartElement = createPluginKitComponent({
	tagName: "pk-donut-chart",
	elementClass: PkDonutChart,
	react: React,
	events: {
		onPkPointSelect: "pk-point-select",
		onPkLegendToggle: "pk-legend-toggle",
		onPkViewChange: "pk-view-change"
	}
});
var DonutChart = PkDonutChartElement;
//#endregion
export { DonutChart, PkDonutChartElement };

//# sourceMappingURL=DonutChart.js.map