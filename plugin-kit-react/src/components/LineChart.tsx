import React from 'react';
import { PkLineChart } from '@verbb/plugin-kit-web/components/chart/pk-line-chart.js';

import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';

/** React facade over `<pk-line-chart>`. Behaviour and styles live in the web component. */
export const PkLineChartElement = createPluginKitComponent({
    tagName: 'pk-line-chart',
    elementClass: PkLineChart,
    react: React,
    events: {
        onPkPointSelect: 'pk-point-select',
        onPkLegendToggle: 'pk-legend-toggle',
        onPkViewChange: 'pk-view-change',
    },
});

export const LineChart = PkLineChartElement;
export type LineChartProps = React.ComponentProps<typeof PkLineChartElement>;
