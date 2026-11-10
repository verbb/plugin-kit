import { default as React } from 'react';
import { PkBarChart } from '@verbb/plugin-kit-web/components/chart/pk-bar-chart.js';
/** React facade over `<pk-bar-chart>`. Behaviour and styles live in the web component. */
export declare const PkBarChartElement: import('@lit/react').ReactWebComponent<PkBarChart, {
    onPkPointSelect: string;
    onPkLegendToggle: string;
    onPkViewChange: string;
}>;
export declare const BarChart: import('@lit/react').ReactWebComponent<PkBarChart, {
    onPkPointSelect: string;
    onPkLegendToggle: string;
    onPkViewChange: string;
}>;
export type BarChartProps = React.ComponentProps<typeof PkBarChartElement>;
//# sourceMappingURL=BarChart.d.ts.map