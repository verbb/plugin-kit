import { defineChartPreview } from './chart-preview';
import { ordersByEmail } from './chart.fixtures';

export default defineChartPreview({
    label: 'Grouped',
    title: 'Recovered orders by sequence email',
    markup: '<pk-bar-chart id="emails-chart" label="Recovered orders by sequence and email"></pk-bar-chart>',
    properties: { '#emails-chart': { data: ordersByEmail } },
});
