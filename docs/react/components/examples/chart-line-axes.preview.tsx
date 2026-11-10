// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import { completionRate } from '../../../web/components/examples/chart.fixtures';

export function ChartLineAxesExample() {
    return (
        <LineChart
            label="Job Application completion rate by week"
            xLabel="Week starting"
            yLabel="Completion rate"
            min={0}
            max={1}
            curve="linear"
            data={completionRate}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Axis Titles and Range',
    title: 'Completion rate on a fixed 0–100% axis',
    language: 'tsx',
    source: true,
    render: () => <ChartLineAxesExample />,
};

export default preview;
