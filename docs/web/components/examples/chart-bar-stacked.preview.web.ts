import { defineChartPreview } from './chart-preview';
import { skippedCarts } from './chart.fixtures';

export default defineChartPreview({
    label: 'Stacked',
    title: 'Carts not emailed, by reason',
    markup: '<pk-bar-chart id="skipped-chart" label="Carts not emailed by week, by reason" stacked="normal"></pk-bar-chart>',
    properties: { '#skipped-chart': { data: skippedCarts } },
});
