import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/chart/pk-line-chart.js";
//#region src/components/LineChart.ts
/** Vue facade over `<pk-line-chart>`. Behaviour and styles live in the web component. */
var LineChart = createPkComponent({
	name: "PkLineChart",
	tagName: "pk-line-chart"
});
var PkLineChartElement = LineChart;
//#endregion
export { LineChart, PkLineChartElement };

//# sourceMappingURL=LineChart.js.map