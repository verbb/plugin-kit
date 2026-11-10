import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/chart/pk-funnel-chart.js";
//#region src/components/FunnelChart.ts
/** Vue facade over `<pk-funnel-chart>`. Behaviour and styles live in the web component. */
var FunnelChart = createPkComponent({
	name: "PkFunnelChart",
	tagName: "pk-funnel-chart"
});
var PkFunnelChartElement = FunnelChart;
//#endregion
export { FunnelChart, PkFunnelChartElement };

//# sourceMappingURL=FunnelChart.js.map