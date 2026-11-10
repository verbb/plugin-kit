import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/chart/pk-donut-chart.js";
//#region src/components/DonutChart.ts
/** Vue facade over `<pk-donut-chart>`. Behaviour and styles live in the web component. */
var DonutChart = createPkComponent({
	name: "PkDonutChart",
	tagName: "pk-donut-chart"
});
var PkDonutChartElement = DonutChart;
//#endregion
export { DonutChart, PkDonutChartElement };

//# sourceMappingURL=DonutChart.js.map