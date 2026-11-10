import { defineChartPreview } from './chart-preview';
import { completionByForm } from './chart.fixtures';

export default defineChartPreview({
    label: 'Axis Titles and Range',
    title: 'Completion rate by form on a fixed 0–100% axis',
    markup: `
<pk-bar-chart
  id="form-rate-chart"
  label="Completion rate by form"
  orientation="horizontal"
  x-label="Completion rate"
  max="1"
  style="--pk-chart-height: 220px"
></pk-bar-chart>`,
    properties: { '#form-rate-chart': { data: completionByForm } },
});
