// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import { submissionsByStatus } from '../../../web/components/examples/chart.fixtures';

export function ChartTableViewExample() {
    return <LineChart label="Form submissions by day, by status" view="table" tableToggle data={submissionsByStatus} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Table View',
    title: 'Submissions by status as a table',
    language: 'tsx',
    source: true,
    render: () => <ChartTableViewExample />,
};

export default preview;
