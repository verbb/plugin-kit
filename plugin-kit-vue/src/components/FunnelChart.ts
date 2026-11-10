import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/chart/pk-funnel-chart.js';

/** Vue facade over `<pk-funnel-chart>`. Behaviour and styles live in the web component. */
export const FunnelChart = createPkComponent({
    name: 'PkFunnelChart',
    tagName: 'pk-funnel-chart',
});

export const PkFunnelChartElement = FunnelChart;

export type FunnelChartProps = Record<string, unknown>;
