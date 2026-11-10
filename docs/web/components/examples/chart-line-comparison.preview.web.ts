import { defineChartPreview } from './chart-preview';
import { recoveredRevenue } from './chart.fixtures';

export default defineChartPreview({
    label: 'Previous Period',
    title: 'Recovered revenue against the previous 14 days',
    markup: '<pk-line-chart id="revenue-chart" label="Recovered revenue by day" area table-toggle></pk-line-chart>',
    properties: { '#revenue-chart': { data: recoveredRevenue } },
});
