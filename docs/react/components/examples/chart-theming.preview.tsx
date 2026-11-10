// #region example
import { BarChart } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';
import { revenueByMonth } from '../../../web/components/examples/chart.fixtures';

export function ChartThemingExample() {
    return (
        <div
            style={{
                '--pk-chart-height': '160px',
                '--pk-chart-series-1': 'var(--pk-color-teal-600)',
                '--pk-chart-grid': 'transparent',
            } as CSSProperties}
        >
            <BarChart label="Recovered revenue by month" data={revenueByMonth} />
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Theming',
    title: 'Chart tokens set on a wrapper',
    language: 'tsx',
    source: true,
    render: () => <ChartThemingExample />,
};

export default preview;
