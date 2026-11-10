import { defineChartPreview } from './chart-preview';
import { submissionsByStatus } from './chart.fixtures';

export default defineChartPreview({
    label: 'Table View',
    title: 'Submissions by status as a table',
    markup: '<pk-line-chart id="status-table" label="Form submissions by day, by status" view="table" table-toggle></pk-line-chart>',
    properties: { '#status-table': { data: submissionsByStatus } },
});
