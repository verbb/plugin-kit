import { defineChartPreview } from './chart-preview';
import { recoveredRevenue } from './chart.fixtures';

export default defineChartPreview({
    label: 'Description',
    title: 'Chart with a screen-reader description',
    markup: `
<pk-line-chart
  id="described-chart"
  label="Recovered revenue by day"
  description="Recovered revenue was 18% higher than the previous 14 days, peaking at $1,104.90 on Wednesday 4 November."
  area
></pk-line-chart>`,
    properties: { '#described-chart': { data: recoveredRevenue } },
});
