// #region example
import { BarChart } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';
import { completionByForm } from '../../../web/components/examples/chart.fixtures';

export function ChartBarAxesExample() {
    return (
        <BarChart
            label="Completion rate by form"
            orientation="horizontal"
            xLabel="Completion rate"
            max={1}
            data={completionByForm}
            style={{ '--pk-chart-height': '220px' } as CSSProperties}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Axis Titles and Range',
    title: 'Completion rate by form on a fixed 0–100% axis',
    language: 'tsx',
    source: true,
    render: () => <ChartBarAxesExample />,
};

export default preview;
