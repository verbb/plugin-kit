import { default as React } from 'react';
import { PkFunnelChart } from '@verbb/plugin-kit-web/components/chart/pk-funnel-chart.js';
/** React facade over `<pk-funnel-chart>`. Behaviour and styles live in the web component. */
export declare const PkFunnelChartElement: import('@lit/react').ReactWebComponent<PkFunnelChart, {
    onPkPointSelect: string;
    onPkLegendToggle: string;
    onPkViewChange: string;
}>;
export declare const FunnelChart: import('@lit/react').ReactWebComponent<PkFunnelChart, {
    onPkPointSelect: string;
    onPkLegendToggle: string;
    onPkViewChange: string;
}>;
export type FunnelChartProps = React.ComponentProps<typeof PkFunnelChartElement>;
//# sourceMappingURL=FunnelChart.d.ts.map