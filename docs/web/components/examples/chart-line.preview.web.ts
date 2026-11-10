import { defineChartPreview } from './chart-preview';
import { formSubmissions } from './chart.fixtures';

export default defineChartPreview({
    label: 'Line',
    title: 'Form submissions by day',
    markup: '<pk-line-chart id="submissions-chart" label="Form submissions by day"></pk-line-chart>',
    properties: { '#submissions-chart': { data: formSubmissions } },
});
