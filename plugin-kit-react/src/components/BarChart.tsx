import React from 'react';
import { PkBarChart } from '@verbb/plugin-kit-web/components/chart/pk-bar-chart.js';

import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';

/** React facade over `<pk-bar-chart>`. Behaviour and styles live in the web component. */
export const PkBarChartElement = createPluginKitComponent({
    tagName: 'pk-bar-chart',
    elementClass: PkBarChart,
    react: React,
    events: {
        onPkPointSelect: 'pk-point-select',
        onPkLegendToggle: 'pk-legend-toggle',
        onPkViewChange: 'pk-view-change',
    },
});

export const BarChart = PkBarChartElement;
export type BarChartProps = React.ComponentProps<typeof PkBarChartElement>;
