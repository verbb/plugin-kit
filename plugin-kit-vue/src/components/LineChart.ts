import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/chart/pk-line-chart.js';

/** Vue facade over `<pk-line-chart>`. Behaviour and styles live in the web component. */
export const LineChart = createPkComponent({
    name: 'PkLineChart',
    tagName: 'pk-line-chart',
});

export const PkLineChartElement = LineChart;

export type LineChartProps = Record<string, unknown>;
