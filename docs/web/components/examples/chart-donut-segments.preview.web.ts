import { defineChartPreview } from './chart-preview';
import { visitorsByCountry } from './chart.fixtures';

export default defineChartPreview({
    label: 'Fewer Segments',
    title: 'Four segments with a custom Other label',
    markup: '<pk-donut-chart id="country-top" label="Visitors by country" max-segments="4" other-label="Other countries" style="--pk-chart-height: 200px"></pk-donut-chart>',
    properties: { '#country-top': { data: visitorsByCountry } },
});
