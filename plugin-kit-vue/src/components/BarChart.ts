import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/chart/pk-bar-chart.js';

/** Vue facade over `<pk-bar-chart>`. Behaviour and styles live in the web component. */
export const BarChart = createPkComponent({
    name: 'PkBarChart',
    tagName: 'pk-bar-chart',
});

export const PkBarChartElement = BarChart;

export type BarChartProps = Record<string, unknown>;
