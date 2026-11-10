// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import { completionTime } from '../../../web/components/examples/chart.fixtures';

export function ChartLineDurationExample() {
    return (
        <LineChart
            label="Job Application average time to complete, by week"
            curve="linear"
            data={completionTime}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Durations',
    title: 'Average time to complete by week',
    language: 'tsx',
    source: true,
    render: () => <ChartLineDurationExample />,
};

export default preview;
