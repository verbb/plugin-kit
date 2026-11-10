import { defineChartPreview } from './chart-preview';
import { submissionsByStatus } from './chart.fixtures';

export default defineChartPreview({
    label: 'No Legend',
    title: 'Chart without a legend',
    markup: `
<p id="status-key">Completed submissions in blue, incomplete in orange and spam in red.</p>
<pk-line-chart id="status-plain" label="Form submissions by day, by status" legend="none"></pk-line-chart>`,
    properties: { '#status-plain': { data: submissionsByStatus } },
    frame: (markup) => markup.replace('<p id="status-key">', '<p id="status-key" style="margin:0 0 8px;font-size:13px">'),
});
