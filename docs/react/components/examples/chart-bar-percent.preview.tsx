// #region example
import { BarChart } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';
import { deviceShare } from '../../../web/components/examples/chart.fixtures';

export function ChartBarPercentExample() {
    return (
        <BarChart
            label="Visitor device share by traffic source"
            orientation="horizontal"
            stacked="percent"
            data={deviceShare}
            style={{ '--pk-chart-height': '220px' } as CSSProperties}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: '100% Stacked',
    title: 'Device share by traffic source',
    language: 'tsx',
    source: true,
    render: () => <ChartBarPercentExample />,
};

export default preview;
