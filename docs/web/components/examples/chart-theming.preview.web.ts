import { defineChartPreview } from './chart-preview';
import { revenueByMonth } from './chart.fixtures';

export default defineChartPreview({
    label: 'Theming',
    title: 'Chart tokens set on a wrapper',
    markup: `
<div style="--pk-chart-height: 160px; --pk-chart-series-1: var(--pk-color-teal-600); --pk-chart-grid: transparent">
  <pk-bar-chart id="themed-chart" label="Recovered revenue by month"></pk-bar-chart>
</div>`,
    properties: { '#themed-chart': { data: revenueByMonth } },
});
