import { defineChartPreview } from './chart-preview';
import { cartRecoveryTracks } from './chart.fixtures';

export default defineChartPreview({
    label: 'Tracks',
    title: 'Cart recovery funnel',
    markup: '<pk-funnel-chart id="tracks-chart" label="Cart recovery funnel" shape="tracks" table-toggle></pk-funnel-chart>',
    properties: { '#tracks-chart': { data: cartRecoveryTracks } },
});
