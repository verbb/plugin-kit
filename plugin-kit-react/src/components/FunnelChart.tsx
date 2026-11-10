import React from 'react';
import { PkFunnelChart } from '@verbb/plugin-kit-web/components/chart/pk-funnel-chart.js';

import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';

/** React facade over `<pk-funnel-chart>`. Behaviour and styles live in the web component. */
export const PkFunnelChartElement = createPluginKitComponent({
    tagName: 'pk-funnel-chart',
    elementClass: PkFunnelChart,
    react: React,
    events: {
        onPkPointSelect: 'pk-point-select',
        onPkLegendToggle: 'pk-legend-toggle',
        onPkViewChange: 'pk-view-change',
    },
});

export const FunnelChart = PkFunnelChartElement;
export type FunnelChartProps = React.ComponentProps<typeof PkFunnelChartElement>;
