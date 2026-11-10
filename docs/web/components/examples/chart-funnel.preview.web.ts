import { defineChartPreview } from './chart-preview';
import { cartRecovery } from './chart.fixtures';

export default defineChartPreview({
    label: 'Steps',
    title: 'Cart recovery funnel',
    markup: '<pk-funnel-chart id="recovery-chart" label="Cart recovery funnel"></pk-funnel-chart>',
    properties: { '#recovery-chart': { data: cartRecovery } },
});
