import { default as React } from 'react';
import { PkDonutChart } from '@verbb/plugin-kit-web/components/chart/pk-donut-chart.js';
/** React facade over `<pk-donut-chart>`. Behaviour and styles live in the web component. */
export declare const PkDonutChartElement: import('@lit/react').ReactWebComponent<PkDonutChart, {
    onPkPointSelect: string;
    onPkLegendToggle: string;
    onPkViewChange: string;
}>;
export declare const DonutChart: import('@lit/react').ReactWebComponent<PkDonutChart, {
    onPkPointSelect: string;
    onPkLegendToggle: string;
    onPkViewChange: string;
}>;
export type DonutChartProps = React.ComponentProps<typeof PkDonutChartElement>;
//# sourceMappingURL=DonutChart.d.ts.map