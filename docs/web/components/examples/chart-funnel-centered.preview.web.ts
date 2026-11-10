import { defineChartPreview } from './chart-preview';
import { applicationCompletion } from './chart.fixtures';

export default defineChartPreview({
    label: 'Centred',
    title: 'Job Application completion by page',
    markup: `
<pk-funnel-chart
  id="application-chart"
  label="Job Application completion by page"
  shape="centered"
  of-previous-label="of the previous page"
  of-first-label="of people who started"
  table-toggle
></pk-funnel-chart>`,
    properties: { '#application-chart': { data: applicationCompletion } },
});
