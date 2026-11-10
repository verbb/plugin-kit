import { defineChartPreview } from './chart-preview';
import { pageViews } from './chart.fixtures';

export default defineChartPreview({
    label: 'Area and Curve',
    title: 'Smooth and linear areas',
    markup: `
<pk-line-chart id="views-smooth" label="Page views by day" area style="--pk-chart-height: 180px"></pk-line-chart>

<pk-line-chart id="views-linear" label="Page views by day" area curve="linear" style="--pk-chart-height: 180px"></pk-line-chart>`,
    properties: {
        '#views-smooth': { data: pageViews },
        '#views-linear': { data: pageViews },
    },
    frame: (markup) => `<div style="display:grid;gap:24px">${markup}</div>`,
});
