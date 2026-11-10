import { defineChartPreview } from './chart-preview';
import { pageViews } from './chart.fixtures';

export default defineChartPreview({
    label: 'Height',
    title: 'A taller drawing area',
    markup: '<pk-line-chart id="views-tall" label="Page views by day" area style="--pk-chart-height: 340px"></pk-line-chart>',
    properties: { '#views-tall': { data: pageViews } },
});
