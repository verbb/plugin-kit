// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import { submissionsByStatus } from '../../../web/components/examples/chart.fixtures';

export function ChartLineSeriesExample() {
    return <LineChart label="Form submissions by day, by status" data={submissionsByStatus} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Several Series',
    title: 'Submissions by status',
    language: 'tsx',
    source: true,
    render: () => <ChartLineSeriesExample />,
};

export default preview;
