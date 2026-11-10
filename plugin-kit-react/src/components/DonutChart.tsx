import React from 'react';
import { PkDonutChart } from '@verbb/plugin-kit-web/components/chart/pk-donut-chart.js';

import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';

/** React facade over `<pk-donut-chart>`. Behaviour and styles live in the web component. */
export const PkDonutChartElement = createPluginKitComponent({
    tagName: 'pk-donut-chart',
    elementClass: PkDonutChart,
    react: React,
    events: {
        onPkPointSelect: 'pk-point-select',
        onPkLegendToggle: 'pk-legend-toggle',
        onPkViewChange: 'pk-view-change',
    },
});

export const DonutChart = PkDonutChartElement;
export type DonutChartProps = React.ComponentProps<typeof PkDonutChartElement>;
