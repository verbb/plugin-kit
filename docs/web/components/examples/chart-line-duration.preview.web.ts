import { defineChartPreview } from './chart-preview';
import { completionTime } from './chart.fixtures';

export default defineChartPreview({
    label: 'Durations',
    title: 'Average time to complete by week',
    markup: '<pk-line-chart id="duration-chart" label="Job Application average time to complete, by week" curve="linear"></pk-line-chart>',
    properties: { '#duration-chart': { data: completionTime } },
});
