// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';
import { pageViews } from '../../../web/components/examples/chart.fixtures';

const height = { '--pk-chart-height': '180px' } as CSSProperties;

export function ChartLineCurveExample() {
    return (
        <div style={{ display: 'grid', gap: 24 }}>
            <LineChart label="Page views by day" area data={pageViews} style={height} />
            <LineChart label="Page views by day" area curve="linear" data={pageViews} style={height} />
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Area and Curve',
    title: 'Smooth and linear areas',
    language: 'tsx',
    source: true,
    render: () => <ChartLineCurveExample />,
};

export default preview;
