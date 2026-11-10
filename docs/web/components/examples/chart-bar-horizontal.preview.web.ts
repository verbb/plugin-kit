import { defineChartPreview } from './chart-preview';
import { topForms } from './chart.fixtures';

export default defineChartPreview({
    label: 'Horizontal',
    title: 'Top forms by submissions',
    markup: `
<pk-bar-chart
  id="forms-chart"
  label="Top forms by submissions"
  orientation="horizontal"
  value-labels
  style="--pk-chart-height: 200px"
></pk-bar-chart>`,
    properties: { '#forms-chart': { data: topForms } },
});
