// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';
import { pageViews } from '../../../web/components/examples/chart.fixtures';

export function ChartHeightExample() {
    return (
        <LineChart
            label="Page views by day"
            area
            data={pageViews}
            style={{ '--pk-chart-height': '340px' } as CSSProperties}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Height',
    title: 'A taller drawing area',
    language: 'tsx',
    source: true,
    render: () => <ChartHeightExample />,
};

export default preview;
