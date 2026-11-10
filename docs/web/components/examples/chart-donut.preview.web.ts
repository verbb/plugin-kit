import { defineChartPreview } from './chart-preview';
import { visitorsByCountry } from './chart.fixtures';

export default defineChartPreview({
    label: 'Donut',
    title: 'Visitors by country',
    markup: '<pk-donut-chart id="country-chart" label="Visitors by country" table-toggle></pk-donut-chart>',
    properties: { '#country-chart': { data: visitorsByCountry } },
});
