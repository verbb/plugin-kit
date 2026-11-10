import { defineChartPreview } from './chart-preview';
import { completionRate } from './chart.fixtures';

export default defineChartPreview({
    label: 'Axis Titles and Range',
    title: 'Completion rate on a fixed 0–100% axis',
    markup: `
<pk-line-chart
  id="rate-chart"
  label="Job Application completion rate by week"
  x-label="Week starting"
  y-label="Completion rate"
  min="0"
  max="1"
  curve="linear"
></pk-line-chart>`,
    properties: { '#rate-chart': { data: completionRate } },
});
