import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/chart/pk-bar-chart.js";
//#region src/components/BarChart.ts
/** Vue facade over `<pk-bar-chart>`. Behaviour and styles live in the web component. */
var BarChart = createPkComponent({
	name: "PkBarChart",
	tagName: "pk-bar-chart"
});
var PkBarChartElement = BarChart;
//#endregion
export { BarChart, PkBarChartElement };

//# sourceMappingURL=BarChart.js.map