import { defineChartPreview } from './chart-preview';
import { visitorsByDevice } from './chart.fixtures';

export default defineChartPreview({
    label: 'Several Series',
    title: 'Visitors by device against the previous 14 days',
    markup: '<pk-line-chart id="device-comparison" label="Visitors by device, by day"></pk-line-chart>',
    properties: { '#device-comparison': { data: visitorsByDevice } },
});
