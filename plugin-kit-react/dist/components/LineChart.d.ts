import { default as React } from 'react';
import { PkLineChart } from '@verbb/plugin-kit-web/components/chart/pk-line-chart.js';
/** React facade over `<pk-line-chart>`. Behaviour and styles live in the web component. */
export declare const PkLineChartElement: import('@lit/react').ReactWebComponent<PkLineChart, {
    onPkPointSelect: string;
    onPkLegendToggle: string;
    onPkViewChange: string;
}>;
export declare const LineChart: import('@lit/react').ReactWebComponent<PkLineChart, {
    onPkPointSelect: string;
    onPkLegendToggle: string;
    onPkViewChange: string;
}>;
export type LineChartProps = React.ComponentProps<typeof PkLineChartElement>;
//# sourceMappingURL=LineChart.d.ts.map