import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/chart/pk-donut-chart.js';

/** Vue facade over `<pk-donut-chart>`. Behaviour and styles live in the web component. */
export const DonutChart = createPkComponent({
    name: 'PkDonutChart',
    tagName: 'pk-donut-chart',
});

export const PkDonutChartElement = DonutChart;

export type DonutChartProps = Record<string, unknown>;
