import { defineChartPreview } from './chart-preview';
import { deviceShare } from './chart.fixtures';

export default defineChartPreview({
    label: '100% Stacked',
    title: 'Device share by traffic source',
    markup: `
<pk-bar-chart
  id="device-chart"
  label="Visitor device share by traffic source"
  orientation="horizontal"
  stacked="percent"
  style="--pk-chart-height: 220px"
></pk-bar-chart>`,
    properties: { '#device-chart': { data: deviceShare } },
});
