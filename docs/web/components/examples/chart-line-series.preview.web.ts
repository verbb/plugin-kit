import { defineChartPreview } from './chart-preview';
import { submissionsByStatus } from './chart.fixtures';

export default defineChartPreview({
    label: 'Several Series',
    title: 'Submissions by status',
    markup: '<pk-line-chart id="status-chart" label="Form submissions by day, by status"></pk-line-chart>',
    properties: { '#status-chart': { data: submissionsByStatus } },
});
