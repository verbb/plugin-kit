import { defineChartPreview } from './chart-preview';
import { revenueByMonth } from './chart.fixtures';

export default defineChartPreview({
    label: 'Bar',
    title: 'Recovered revenue by month',
    markup: '<pk-bar-chart id="monthly-chart" label="Recovered revenue by month"></pk-bar-chart>',
    properties: { '#monthly-chart': { data: revenueByMonth } },
});
